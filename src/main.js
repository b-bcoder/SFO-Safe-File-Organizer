const { app, BrowserWindow, dialog, ipcMain, Menu, shell } = require('electron');
const { randomUUID } = require('node:crypto');
const nodeFs = require('node:fs');
const fs = require('node:fs/promises');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const initSqlJs = require('sql.js');

const PRODUCT_NAME = 'SFO - Safe File Organizer';
const PAGE_SIZE = 150;
const BATCH_SIZE = 300;
const BASKET_BATCH_SIZE = 50;
const PERSIST_INTERVAL = 10000;
const CATEGORIES = new Set(['Afbeeldingen', "Video's", 'Documenten', 'Audio', 'Overig']);
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tif', '.tiff', '.heic', '.raw', '.cr2', '.nef', '.arw']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.mkv', '.avi', '.mov', '.wmv', '.webm', '.m4v']);
const AUDIO_EXTENSIONS = new Set(['.mp3', '.wav', '.flac', '.aac', '.m4a', '.ogg', '.wma']);
const DOCUMENT_EXTENSIONS = new Set(['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.rtf', '.csv']);

app.setName(PRODUCT_NAME);
app.setPath('userData', path.join(app.getPath('appData'), PRODUCT_NAME));

let mainWindow;
let db;
let databasePath;
let activeScan = null;

function classifyFile(extension) {
  const ext = extension.toLowerCase();
  if (IMAGE_EXTENSIONS.has(ext)) return 'Afbeeldingen';
  if (VIDEO_EXTENSIONS.has(ext)) return "Video's";
  if (AUDIO_EXTENSIONS.has(ext)) return 'Audio';
  if (DOCUMENT_EXTENSIONS.has(ext)) return 'Documenten';
  return 'Overig';
}

function persistDatabase() {
  const bytes = db.export();
  const temporaryPath = `${databasePath}.tmp`;
  nodeFs.writeFileSync(temporaryPath, Buffer.from(bytes));
  nodeFs.renameSync(temporaryPath, databasePath);
}

function execute(sql, parameters = []) {
  db.run(sql, parameters);
}

function queryAll(sql, parameters = []) {
  const statement = db.prepare(sql);
  try {
    statement.bind(parameters);
    const rows = [];
    while (statement.step()) rows.push(statement.getAsObject());
    return rows;
  } finally {
    statement.free();
  }
}

function getFileFilter(safeFilters) {
  const conditions = [];
  const parameters = [];
  if (CATEGORIES.has(safeFilters.category)) {
    conditions.push('category = ?');
    parameters.push(safeFilters.category);
  }
  if (typeof safeFilters.query === 'string' && safeFilters.query.trim()) {
    conditions.push('(name LIKE ? ESCAPE \'\\\' OR extension LIKE ? ESCAPE \'\\\')');
    const pattern = `%${safeFilters.query.trim().replace(/[\\%_]/g, '\\$&')}%`;
    parameters.push(pattern, pattern);
  }
  if (safeFilters.size === 'small') conditions.push('size < 10485760');
  if (safeFilters.size === 'medium') conditions.push('size >= 10485760 AND size <= 104857600');
  if (safeFilters.size === 'large') conditions.push('size > 104857600');
  if (typeof safeFilters.location === 'string' && safeFilters.location) {
    conditions.push('root_path = ?');
    parameters.push(path.resolve(safeFilters.location));
  }
  return {
    where: conditions.length ? `WHERE ${conditions.join(' AND ')}` : '',
    parameters
  };
}

function initializeDatabase() {
  db.run(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS locations (
      path TEXT PRIMARY KEY COLLATE NOCASE,
      added_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS files (
      path TEXT PRIMARY KEY COLLATE NOCASE,
      name TEXT NOT NULL,
      extension TEXT NOT NULL,
      category TEXT NOT NULL,
      size INTEGER NOT NULL,
      created_utc TEXT NOT NULL,
      modified_utc TEXT NOT NULL,
      root_path TEXT NOT NULL,
      scan_id TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_files_category ON files(category);
    CREATE INDEX IF NOT EXISTS idx_files_name ON files(name COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_files_root ON files(root_path);
    CREATE INDEX IF NOT EXISTS idx_files_size ON files(size);
    CREATE TABLE IF NOT EXISTS basket (
      path TEXT PRIMARY KEY COLLATE NOCASE,
      added_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);
  persistDatabase();
}

function getProtectedRoots() {
  const systemRoot = process.env.SystemRoot || 'C:\\Windows';
  const programFiles = process.env.ProgramFiles || 'C:\\Program Files';
  const programFilesX86 = process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)';
  const programData = process.env.ProgramData || 'C:\\ProgramData';
  return [systemRoot, programFiles, programFilesX86, programData, path.dirname(app.getPath('exe'))]
    .filter(Boolean)
    .map((root) => path.resolve(root));
}

function isWithin(candidatePath, rootPath) {
  const candidate = path.resolve(candidatePath).toLowerCase();
  const root = path.resolve(rootPath).toLowerCase();
  return candidate === root || candidate.startsWith(`${root}${path.sep.toLowerCase()}`);
}

function assertSafeDestination(destination) {
  const resolved = path.resolve(destination);
  if (getProtectedRoots().some((root) => isWithin(resolved, root))) {
    throw new Error('Bestanden opslaan in een beschermde Windows- of programmamap is geblokkeerd.');
  }
  return resolved;
}

function getBasketRows(limit = 100) {
  return queryAll(`
    SELECT f.path, f.name, f.extension, f.category, f.size, f.modified_utc, f.root_path
    FROM basket b JOIN files f ON f.path = b.path
    ORDER BY b.added_at
    LIMIT ?
  `, [limit]);
}

function getAllBasketRows() {
  return queryAll(`
    SELECT f.path, f.name, f.extension, f.category, f.size, f.modified_utc, f.root_path
    FROM basket b JOIN files f ON f.path = b.path
    ORDER BY b.added_at
  `);
}

function getBasketSummary() {
  const [summary] = queryAll(`
    SELECT COUNT(*) AS count, COALESCE(SUM(f.size), 0) AS total_size
    FROM basket b JOIN files f ON f.path = b.path
  `);
  return { count: Number(summary.count), totalSize: Number(summary.total_size) };
}

function sendToWindow(channel, payload) {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send(channel, payload);
}

async function removeLocation(location) {
  if (typeof location !== 'string') throw new Error('Ongeldige opslaglocatie.');
  const resolvedPath = path.resolve(location);
  if (activeScan && activeScan.location.toLowerCase() === resolvedPath.toLowerCase()) {
    const scan = activeScan;
    scan.cancelled = true;
    await scan.finished;
  }

  db.run('BEGIN');
  try {
    execute('DELETE FROM basket WHERE path IN (SELECT path FROM files WHERE root_path = ? COLLATE NOCASE)', [resolvedPath]);
    execute('DELETE FROM files WHERE root_path = ? COLLATE NOCASE', [resolvedPath]);
    execute('DELETE FROM locations WHERE path = ?', [resolvedPath]);
    db.run('COMMIT');
  } catch (error) {
    db.run('ROLLBACK');
    throw error;
  }
  persistDatabase();
}

async function clearLibrary() {
  if (activeScan) {
    const scan = activeScan;
    scan.cancelled = true;
    await scan.finished;
  }

  db.run('BEGIN');
  try {
    execute('DELETE FROM basket');
    execute('DELETE FROM files');
    execute('DELETE FROM locations');
    execute('DELETE FROM app_meta');
    db.run('COMMIT');
  } catch (error) {
    db.run('ROLLBACK');
    throw error;
  }
  persistDatabase();
}

async function scanLocation(location) {
  if (activeScan) throw new Error('Er wordt al een scan uitgevoerd.');
  const rootPath = path.resolve(location);
  let finishScan;
  const scanState = {
    location: rootPath,
    cancelled: false,
    finished: new Promise((resolve) => { finishScan = resolve; })
  };
  activeScan = scanState;
  try {
    const locationExists = await fs.stat(rootPath).catch((error) => {
      if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return null;
      throw error;
    });
    if (!locationExists?.isDirectory()) throw new Error(`De opslaglocatie is niet beschikbaar: ${rootPath}`);
  } catch (error) {
    activeScan = null;
    finishScan();
    throw error;
  }

  const scanId = randomUUID();
  const pendingDirectories = [rootPath];
  const batch = [];
  let scanned = 0;
  let errors = 0;
  let pendingPersistence = 0;
  let completed = true;
  const insert = db.prepare(`
    INSERT INTO files(path, name, extension, category, size, created_utc, modified_utc, root_path, scan_id)
    VALUES ($path, $name, $extension, $category, $size, $created, $modified, $root, $scan)
    ON CONFLICT(path) DO UPDATE SET
      name=excluded.name, extension=excluded.extension, category=excluded.category,
      size=excluded.size, created_utc=excluded.created_utc, modified_utc=excluded.modified_utc,
      root_path=excluded.root_path, scan_id=excluded.scan_id
  `);

  const flush = () => {
    db.run('BEGIN');
    try {
      for (const file of batch) {
        insert.run({
          $path: file.path,
          $name: file.name,
          $extension: file.extension,
          $category: file.category,
          $size: file.size,
          $created: file.created,
          $modified: file.modified,
          $root: rootPath,
          $scan: scanId
        });
      }
      db.run('COMMIT');
      pendingPersistence += batch.length;
      batch.length = 0;
      if (pendingPersistence >= PERSIST_INTERVAL) {
        persistDatabase();
        pendingPersistence = 0;
      }
    } catch (error) {
      db.run('ROLLBACK');
      throw error;
    }
  };

  try {
    while (pendingDirectories.length && !scanState.cancelled) {
      const directory = pendingDirectories.pop();
      let entries;
      try {
        entries = await fs.readdir(directory, { withFileTypes: true });
      } catch (error) {
        if (error.code !== 'EACCES' && error.code !== 'EPERM' && error.code !== 'EIO') throw error;
        errors += 1;
        completed = false;
        sendToWindow('scan:progress', { location: rootPath, scanned, errors, message: `Geen toegang tot ${directory}` });
        continue;
      }

      for (const entry of entries) {
        if (scanState.cancelled) break;
        if (entry.isSymbolicLink()) continue;
        const fullPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
          pendingDirectories.push(fullPath);
          continue;
        }
        if (!entry.isFile()) continue;
        try {
          const stats = await fs.stat(fullPath);
          batch.push({
            path: fullPath,
            name: entry.name,
            extension: path.extname(entry.name).toLowerCase(),
            category: classifyFile(path.extname(entry.name)),
            size: stats.size,
            created: stats.birthtime.toISOString(),
            modified: stats.mtime.toISOString()
          });
          scanned += 1;
          if (batch.length >= BATCH_SIZE) {
            flush();
            sendToWindow('scan:progress', { location: rootPath, scanned, errors, message: `Geïndexeerd: ${scanned.toLocaleString('nl-NL')}` });
            await new Promise((resolve) => setImmediate(resolve));
          }
        } catch (error) {
          if (error.code !== 'EACCES' && error.code !== 'EPERM' && error.code !== 'ENOENT' && error.code !== 'EIO') throw error;
          errors += 1;
          completed = false;
        }
      }
    }

    if (batch.length) flush();
    if (completed && !scanState.cancelled) {
      execute('DELETE FROM files WHERE root_path = ? AND scan_id <> ?', [rootPath, scanId]);
      persistDatabase();
    }
    execute('INSERT OR REPLACE INTO app_meta(key, value) VALUES (?, ?)', ['lastScan', new Date().toISOString()]);
    persistDatabase();
    const result = { location: rootPath, scanned, errors, completed: completed && !scanState.cancelled, cancelled: scanState.cancelled };
    sendToWindow('scan:complete', result);
    return result;
  } finally {
    insert.free();
    activeScan = null;
    finishScan();
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1050,
    minHeight: 650,
    title: PRODUCT_NAME,
    backgroundColor: '#11151d',
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://')) shell.openExternal(url);
    return { action: 'deny' };
  });
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

function registerIpcHandlers() {
  ipcMain.handle('app:get-initial-state', async () => {
    const [stats] = queryAll(`
      SELECT COUNT(*) AS total,
        SUM(category = 'Afbeeldingen') AS images,
        SUM(category = 'Video''s') AS videos,
        SUM(category = 'Documenten') AS documents,
        SUM(category = 'Audio') AS audio
      FROM files
    `);
    return {
      locations: queryAll('SELECT path FROM locations ORDER BY path COLLATE NOCASE').map((row) => row.path),
      stats: Object.fromEntries(Object.entries(stats).map(([key, value]) => [key, Number(value || 0)])),
      basket: getBasketSummary(),
      lastScan: queryAll('SELECT value FROM app_meta WHERE key = ?', ['lastScan'])[0]?.value || null
    };
  });

  ipcMain.handle('locations:add', async (_event, language) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: language === 'en' ? 'Choose folders or drives to index' : 'Kies mappen of schijven om te indexeren',
      properties: ['openDirectory', 'createDirectory', 'multiSelections']
    });
    if (result.canceled || !result.filePaths.length) return [];
    const locations = [...new Set(result.filePaths.map((location) => path.resolve(location)))];
    db.run('BEGIN');
    try {
      for (const location of locations) {
        execute('INSERT OR IGNORE INTO locations(path, added_at) VALUES (?, ?)', [location, new Date().toISOString()]);
      }
      db.run('COMMIT');
    } catch (error) {
      db.run('ROLLBACK');
      throw error;
    }
    persistDatabase();
    return locations;
  });

  ipcMain.handle('locations:remove', (_event, location) => {
    return removeLocation(location);
  });

  ipcMain.handle('library:clear', () => clearLibrary());

  ipcMain.handle('locations:scan-cancel', () => {
    if (!activeScan) return false;
    activeScan.cancelled = true;
    return true;
  });

  ipcMain.handle('locations:scan', async (_event, location) => {
    if (typeof location !== 'string') throw new Error('Ongeldige opslaglocatie.');
    const allowed = queryAll('SELECT path FROM locations WHERE path = ?', [path.resolve(location)]);
    if (!allowed.length) throw new Error('Voeg deze opslaglocatie eerst toe aan SFO.');
    return scanLocation(location);
  });

  ipcMain.handle('files:query', (_event, filters) => {
    const safeFilters = filters && typeof filters === 'object' ? filters : {};
    const page = Number.isSafeInteger(safeFilters.page) && safeFilters.page >= 0 ? safeFilters.page : 0;
    const { where, parameters } = getFileFilter(safeFilters);
    const sortOrders = {
      'name-asc': 'f.name COLLATE NOCASE ASC',
      'name-desc': 'f.name COLLATE NOCASE DESC',
      'size-desc': 'f.size DESC, f.name COLLATE NOCASE ASC',
      'size-asc': 'f.size ASC, f.name COLLATE NOCASE ASC'
    };
    const orderBy = Object.hasOwn(sortOrders, safeFilters.sort) ? sortOrders[safeFilters.sort] : sortOrders['name-asc'];
    const [count] = queryAll(`SELECT COUNT(*) AS count FROM files ${where}`, parameters);
    const files = queryAll(`
      SELECT f.path, f.name, f.extension, f.category, f.size, f.modified_utc, f.root_path,
        EXISTS(SELECT 1 FROM basket b WHERE b.path = f.path) AS selected
      FROM files f ${where}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `, [...parameters, PAGE_SIZE, page * PAGE_SIZE]);
    return {
      files: files.map((file) => ({
        ...file,
        previewUrl: IMAGE_EXTENSIONS.has(file.extension) || VIDEO_EXTENSIONS.has(file.extension)
          ? pathToFileURL(file.path).href
          : null
      })),
      total: Number(count.count),
      page,
      pageSize: PAGE_SIZE
    };
  });

  ipcMain.handle('basket:get', () => ({ files: getBasketRows(), summary: getBasketSummary() }));
  ipcMain.handle('basket:set-selected', (_event, filePath, selected) => {
    if (typeof filePath !== 'string' || typeof selected !== 'boolean') throw new Error('Ongeldige selectie.');
    if (selected) {
      execute('INSERT OR IGNORE INTO basket(path, added_at) SELECT path, ? FROM files WHERE path = ?', [new Date().toISOString(), path.resolve(filePath)]);
    } else {
      execute('DELETE FROM basket WHERE path = ?', [path.resolve(filePath)]);
    }
    persistDatabase();
    return { files: getBasketRows(), summary: getBasketSummary() };
  });
  ipcMain.handle('basket:select-filtered', async (_event, filters) => {
    const safeFilters = filters && typeof filters === 'object' ? filters : {};
    const { where, parameters } = getFileFilter(safeFilters);
    const [countRow] = queryAll(`SELECT COUNT(*) AS count FROM files f ${where}`, parameters);
    const total = Number(countRow.count);
    const batchId = randomUUID();
    let processed = 0;
    let lastPath = '';

    if (total >= 20) sendToWindow('basket:batch-progress', { batchId, total, processed, phase: 'start' });
    const insert = db.prepare('INSERT OR IGNORE INTO basket(path, added_at) VALUES (?, ?)');

    try {
      while (processed < total) {
        const page = queryAll(`
          SELECT f.path FROM files f ${where}
          ${where ? 'AND' : 'WHERE'} f.path COLLATE NOCASE > ? COLLATE NOCASE
          ORDER BY f.path COLLATE NOCASE
          LIMIT ?
        `, [...parameters, lastPath, BASKET_BATCH_SIZE]);

        db.run('BEGIN');
        try {
          for (const file of page) insert.run([file.path, new Date().toISOString()]);
          db.run('COMMIT');
        } catch (error) {
          db.run('ROLLBACK');
          throw error;
        }

        processed += page.length;
        if (page.length) lastPath = page[page.length - 1].path;
        if (total >= 20) sendToWindow('basket:batch-progress', { batchId, total, processed, phase: 'progress' });
        if (!page.length) break;
        await new Promise((resolve) => setImmediate(resolve));
      }

      persistDatabase();
      const result = { batchId, total, processed, files: getBasketRows(), summary: getBasketSummary() };
      if (total >= 20) sendToWindow('basket:batch-progress', { batchId, total, processed, phase: 'complete' });
      return result;
    } catch (error) {
      persistDatabase();
      if (total >= 20) sendToWindow('basket:batch-progress', { batchId, total, processed, phase: 'error' });
      throw error;
    } finally {
      insert.free();
    }
  });
  ipcMain.handle('basket:clear', () => {
    execute('DELETE FROM basket');
    persistDatabase();
    return { files: [], summary: { count: 0, totalSize: 0 } };
  });
  ipcMain.handle('basket:remove', (_event, filePath) => {
    if (typeof filePath !== 'string') throw new Error('Ongeldig bestandspad.');
    execute('DELETE FROM basket WHERE path = ?', [path.resolve(filePath)]);
    persistDatabase();
    return { files: getBasketRows(), summary: getBasketSummary() };
  });

  ipcMain.handle('organize:choose-destination', async (_event, language) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: language === 'en' ? 'Choose the destination folder' : 'Kies de doelmap',
      properties: ['openDirectory', 'createDirectory']
    });
    return result.canceled ? null : result.filePaths[0];
  });

  ipcMain.handle('organize:run', async (_event, options) => {
    if (!options || typeof options !== 'object' || typeof options.destination !== 'string') throw new Error('Ongeldige bestemming.');
    const destinationRoot = assertSafeDestination(options.destination);
    const destinationStats = await fs.stat(destinationRoot).catch((error) => {
      if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return null;
      throw error;
    });
    if (!destinationStats?.isDirectory()) throw new Error(`De doelmap is niet beschikbaar: ${destinationRoot}`);
    const basketFiles = getAllBasketRows();
    if (!basketFiles.length) throw new Error('Het selectiemandje is leeg.');

    const results = [];
    const startedAt = Date.now();
    sendToWindow('organize:progress', {
      done: 0,
      total: basketFiles.length,
      elapsedMs: 0,
      estimatedRemainingMs: null
    });
    for (const file of basketFiles) {
      try {
        const source = path.resolve(file.path);
        if (options.move === true && getProtectedRoots().some((root) => isWithin(source, root))) {
          throw new Error('Verplaatsen vanuit een beschermde Windows- of programmamap is geblokkeerd.');
        }
        const sourceStats = await fs.stat(source);
        if (!sourceStats.isFile()) throw new Error('Bronbestand bestaat niet meer.');
        const outputPath = await chooseNonConflictingPath(destinationRoot, path.basename(source));
        await copyFileSafely(source, outputPath, sourceStats);
        if (options.move === true) {
          const currentStats = await fs.stat(source);
          if (currentStats.size !== sourceStats.size || currentStats.mtimeMs !== sourceStats.mtimeMs) {
            throw new Error('Het bronbestand is gewijzigd tijdens het kopiëren; het origineel is behouden.');
          }
          await fs.unlink(source);
          execute('DELETE FROM files WHERE path = ?', [source]);
          execute('DELETE FROM basket WHERE path = ?', [source]);
        }
        results.push({ source, destination: outputPath, ok: true, error: null });
      } catch (error) {
        results.push({ source: file.path, destination: null, ok: false, error: error.message });
      }
      const elapsedMs = Date.now() - startedAt;
      const done = results.length;
      sendToWindow('organize:progress', {
        done,
        total: basketFiles.length,
        elapsedMs,
        estimatedRemainingMs: done
          ? Math.ceil((elapsedMs / done) * (basketFiles.length - done))
          : null
      });
    }
    persistDatabase();
    await appendOperationLog(results, options.move === true);
    return {
      results,
      succeeded: results.filter((result) => result.ok).length,
      failed: results.filter((result) => !result.ok).length,
      logPath: path.join(app.getPath('userData'), 'operation-log.tsv'),
      basket: { files: getBasketRows(), summary: getBasketSummary() }
    };
  });

  ipcMain.handle('system:open-path', async (_event, targetPath) => {
    if (typeof targetPath !== 'string') throw new Error('Ongeldig pad.');
    return shell.openPath(targetPath);
  });
}

async function chooseNonConflictingPath(directory, originalName) {
  const extension = path.extname(originalName);
  const base = path.basename(originalName, extension);
  for (let index = 1; ; index += 1) {
    const name = index === 1 ? originalName : `${base} (${index})${extension}`;
    const candidate = path.join(directory, name);
    try {
      await fs.access(candidate);
    } catch (error) {
      if (error.code === 'ENOENT') return candidate;
      throw error;
    }
  }
}

async function copyFileSafely(source, destination, initialStats) {
  let handle;
  try {
    const input = await fs.open(source, 'r');
    try {
      handle = await fs.open(destination, 'wx');
      const buffer = Buffer.allocUnsafe(1024 * 1024);
      let position = 0;
      while (true) {
        const { bytesRead } = await input.read(buffer, 0, buffer.length, position);
        if (!bytesRead) break;
        await handle.write(buffer, 0, bytesRead, position);
        position += bytesRead;
        await new Promise((resolve) => setImmediate(resolve));
      }
      await handle.sync();
      const sourceAfterCopy = await input.stat();
      if (sourceAfterCopy.size !== initialStats.size || sourceAfterCopy.mtimeMs !== initialStats.mtimeMs || position !== initialStats.size) {
        throw new Error('Het bestand is tijdens het kopiëren gewijzigd of onvolledig gelezen.');
      }
    } finally {
      await input.close();
    }
    await handle.close();
    handle = null;
  } catch (error) {
    if (handle) await handle.close().catch(() => {});
    await fs.unlink(destination).catch((cleanupError) => {
      if (cleanupError.code !== 'ENOENT') throw new Error(`Kopiëren mislukt en het gedeeltelijke doelbestand kon niet worden verwijderd: ${cleanupError.message}`);
    });
    throw error;
  }
}

async function appendOperationLog(results, move) {
  const logPath = path.join(app.getPath('userData'), 'operation-log.tsv');
  const rows = results.map((result) => [
    new Date().toISOString(),
    move ? 'MOVE' : 'COPY',
    result.ok ? 'OK' : 'ERROR',
    result.source,
    result.destination || result.error
  ].join('\t'));
  await fs.appendFile(logPath, `${rows.join('\n')}\n`, 'utf8');
}

app.whenReady().then(async () => {
  Menu.setApplicationMenu(null);
  const dataDirectory = app.getPath('userData');
  await fs.mkdir(dataDirectory, { recursive: true });
  databasePath = path.join(dataDirectory, 'sfo-library.sqlite');
  const SQL = await initSqlJs({
    locateFile: (file) => path.join(path.dirname(require.resolve('sql.js')), file)
  });
  const existing = await fs.readFile(databasePath).catch((error) => {
    if (error.code === 'ENOENT') return null;
    throw error;
  });
  db = existing ? new SQL.Database(new Uint8Array(existing)) : new SQL.Database();
  initializeDatabase();
  registerIpcHandlers();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}).catch((error) => {
  dialog.showErrorBox(PRODUCT_NAME, `SFO kon niet starten.\n\n${error.stack || error.message}`);
  app.quit();
});

app.on('window-all-closed', () => {
  if (db) {
    persistDatabase();
    db.close();
  }
  if (process.platform !== 'darwin') app.quit();
});

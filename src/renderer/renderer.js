const PAGE_SIZE = 150;
const translations = {
  nl: {
    library: 'BIBLIOTHEEK', allFiles: 'Alle bestanden', images: 'Afbeeldingen', videos: "Video's",
    documents: 'Documenten', audio: 'Audio', other: 'Overig', fileCategory: 'Bestandscategorie',
    storageLocations: 'OPSLAGLOCATIES', addLocation: 'Locatie toevoegen',
    addLocationsTitle: 'Kies mappen of schijven om te indexeren',
    addedLocations: '{count} opslaglocaties geselecteerd.',
    sidebarNote: 'Je bestanden blijven op hun oorspronkelijke locatie totdat jij een actie uitvoert.',
    headerEyebrow: 'JOUW BESTANDEN, ÉÉN OVERZICHT', fileLibrary: 'Bestandsbibliotheek',
    welcomeSubtitle: 'Voeg een map of schijf toe om te beginnen.', language: 'Taal',
    scanLibrary: 'Bibliotheek scannen', scanning: 'Scannen…', cancelScan: 'Scannen annuleren',
    cancelling: 'Annuleren…', libraryStats: 'Bibliotheekstatistieken', files: 'Bestanden',
    searchPlaceholder: 'Zoek op naam of extensie…', filterBySize: 'Filter op bestandsgrootte',
    anySize: 'Elke grootte', smaller10: 'Kleiner dan 10 MB', from10to100: '10 tot 100 MB',
    larger100: 'Groter dan 100 MB', sortFiles: 'Bestanden sorteren', nameAsc: 'Naam A–Z',
    nameDesc: 'Naam Z–A', sizeDesc: 'Grootte: groot–klein', sizeAsc: 'Grootte: klein–groot',
    viewMode: 'Weergave', gridView: '▦ Raster', detailView: '☷ Details',
    refresh: 'Vernieuwen', clearLibrary: 'Bibliotheek wissen', fileName: 'BESTANDSNAAM',
    type: 'TYPE', size: 'GROOTTE', modified: 'GEWIJZIGD', location: 'LOCATIE',
    emptyTitle: 'Je bibliotheek is nog leeg',
    emptySubtitle: 'Voeg een map of schijf toe om je bestanden te indexeren.',
    addLocationButton: '＋ Locatie toevoegen', noFilesTitle: 'Geen bestanden gevonden',
    noFilesSubtitle: 'Pas je zoekopdracht of filters aan.', filesCount: '{count} bestanden',
    loadMore: 'Meer laden', sortHint: 'Sorteer op naam of grootte', ready: 'Klaar',
    yourSelection: 'JOUW SELECTIE', basket: 'Selectiemandje', basketSummary: '{count} bestanden · {size}',
    selectVisible: 'Selecteer alle resultaten', emptyBasket: 'Leegmaken',
    selectionProgressTitle: 'Bestanden toevoegen aan mandje…',
    selectionProgressCount: '{processed} van {total} verwerkt',
    selectionCompleteCount: '{count} resultaten verwerkt · {selected} bestanden in mandje',
    selectionProgressFailed: 'Toevoegen aan mandje mislukt',
    basketPreviewLimit: 'Eerste {count} bestanden getoond',
    safeNote: 'Kies een doelmap; daarna kun je de bestanden kopiëren of verplaatsen.',
    makeFolder: 'Opslaan naar map…', selectFile: 'Selecteer {name}', removeLocation: 'Locatie verwijderen',
    removeFromBasket: 'Uit mandje verwijderen', emptyBasketMessage: 'Je mandje is leeg.',
    basketHint: 'Selecteer bestanden uit de bibliotheek.', fileLoadFailed: 'Bestanden laden mislukt: {error}',
    locationAdded: 'Opslaglocatie toegevoegd.', addLocationFailed: 'Locatie toevoegen mislukt: {error}',
    scannedCount: '{count} bestanden geïndexeerd', scanFinishedErrors: 'Scan gereed met {count} fouten; bestaande metadata is behouden',
    scanCancelled: 'Scan geannuleerd · {count} bestanden verwerkt',
    scanCancelledToast: 'Scan geannuleerd. {count} gevonden bestanden zijn behouden.',
    scanCompleteToast: 'Scan klaar: {count} bestanden.', scanErrorsToast: 'Scan klaar met {count} fouten.',
    scanFailed: 'Scannen mislukt', scanFailedToast: 'Scannen mislukt: {error}',
    addLocationFirst: 'Voeg eerst een opslaglocatie toe.', scanAlreadyRunning: 'Er wordt al een scan uitgevoerd.',
    scanLocationStatus: 'Scannen: {location}', cancelScanStatus: 'Scan wordt geannuleerd…',
    scanProgress: '{location} · {message} · {errors} fouten',
    accessDenied: 'Geen toegang tot {location}',
    filesRemaining: 'en nog {count} bestanden',
    locationUnavailable: 'De opslaglocatie is niet beschikbaar: {path}',
    destinationUnavailable: 'De doelmap is niet beschikbaar: {path}',
    basketIsEmpty: 'Het selectiemandje is leeg.',
    protectedDestination: 'Bestanden opslaan in een beschermde Windows- of programmamap is geblokkeerd.',
    protectedSource: 'Verplaatsen vanuit een beschermde Windows- of programmamap is geblokkeerd.',
    sourceMissing: 'Bronbestand bestaat niet meer.',
    copyIntoSource: 'Een bestand kan niet naar zichzelf of een bovenliggende map worden gekopieerd.',
    sourceChanged: 'Het bronbestand is gewijzigd tijdens het kopiëren; het origineel is behouden.',
    copyIncomplete: 'Het bestand is tijdens het kopiëren gewijzigd of onvolledig gelezen.',
    noActiveScan: 'Er is geen actieve scan meer.', cancelScanFailed: 'Scan annuleren mislukt: {error}',
    moving: 'verplaatsen', copying: 'kopiëren', preparing: '{action} wordt voorbereid…',
    organizeDone: '{succeeded} bestanden {action} · {failed} mislukt',
    organizeProgress: 'Bestand {done} van {total} verwerkt',
    organizeProgressTitle: 'Bestanden verwerken…',
    organizeProgressAction: 'Bestanden {action} naar de doelmap',
    organizeProgressCount: 'Verwerkte bestanden: {done}/{total}',
    organizeProgressEta: 'Geschatte resterende tijd: {time}',
    organizeProgressCalculating: 'Resterende tijd berekenen…',
    chooseFileAction: 'Wat wil je met de bestanden doen?',
    destinationFolder: 'Doelmap',
    dialogFileCount: '{count} bestanden worden opgeslagen in deze map.',
    moveWarning: 'Verplaatsen verwijdert de originelen pas nadat ze veilig zijn gekopieerd en gecontroleerd.',
    cancel: 'Annuleren',
    copyFiles: 'Kopiëren',
    moveFiles: 'Verplaatsen',
    organizeToast: '{succeeded} gelukt, {failed} mislukt. Logboek opgeslagen.',
    organizeComplete: 'Bewerking afgerond.\n{succeeded} gelukt · {failed} mislukt.\n\nLogboek:\n{logPath}\n\nWil je het logbestand openen?',
    organizeFailed: 'Bestandsbewerking mislukt: {error}', organizeFailedStatus: 'Bestandsbewerking mislukt',
    selectFailed: 'Selectie bijwerken mislukt: {error}', removeLocationConfirm: 'Verwijder deze locatie uit SFO?\n\n{location}\n\nDe geïndexeerde bestanden en selecties verdwijnen uit de app. Je originele bestanden blijven op hun locatie staan.',
    removeLocationFailed: 'Locatie verwijderen mislukt: {error}', removeBasketFailed: 'Verwijderen uit mandje mislukt: {error}',
    clearBasketConfirm: 'Weet je zeker dat je het hele selectiemandje wilt leegmaken?',
    clearBasketFailed: 'Mandje leegmaken mislukt: {error}', selectFailedGeneric: 'Bestanden selecteren mislukt: {error}',
    clearLibraryConfirm: 'Weet je zeker dat je de volledige SFO-bibliotheek wilt wissen?\n\nDit verwijdert de index, selecties en opgeslagen locaties uit de app. Je originele bestanden blijven onaangeroerd op schijf.',
    clearLibraryDone: 'Bibliotheek gewist. Je originele bestanden zijn niet verwijderd.',
    clearLibraryFailed: 'Bibliotheek wissen mislukt: {error}', lastScan: 'Laatste scan: {date}',
    indexedSummary: '{files} geïndexeerde bestanden · {locations} locaties',
    organizeLogPrompt: 'Logboek:',
    libraryLoadFailedStatus: 'SFO kon de bibliotheek niet openen',
    libraryLoadFailed: 'Bibliotheek laden mislukt: {error}',
    categoryImages: 'Afbeeldingen', categoryVideos: "Video's", categoryDocuments: 'Documenten',
    categoryAudio: 'Audio', categoryOther: 'Overig'
  },
  en: {
    library: 'LIBRARY', allFiles: 'All files', images: 'Images', videos: 'Videos',
    documents: 'Documents', audio: 'Audio', other: 'Other', fileCategory: 'File category',
    storageLocations: 'STORAGE LOCATIONS', addLocation: 'Add location',
    addLocationsTitle: 'Choose folders or drives to index',
    addedLocations: 'Selected {count} storage locations.',
    sidebarNote: 'Your files stay in their original locations until you choose an action.',
    headerEyebrow: 'YOUR FILES, ALL IN ONE PLACE', fileLibrary: 'File library',
    welcomeSubtitle: 'Add a folder or drive to get started.', language: 'Language',
    scanLibrary: 'Scan library', scanning: 'Scanning…', cancelScan: 'Cancel scan',
    cancelling: 'Cancelling…', libraryStats: 'Library statistics', files: 'Files',
    searchPlaceholder: 'Search by name or extension…', filterBySize: 'Filter by file size',
    anySize: 'Any size', smaller10: 'Smaller than 10 MB', from10to100: '10 to 100 MB',
    larger100: 'Larger than 100 MB', sortFiles: 'Sort files', nameAsc: 'Name A–Z',
    nameDesc: 'Name Z–A', sizeDesc: 'Size: largest first', sizeAsc: 'Size: smallest first',
    viewMode: 'View mode', gridView: '▦ Grid', detailView: '☷ Details',
    refresh: 'Refresh', clearLibrary: 'Clear library', fileName: 'FILE NAME',
    type: 'TYPE', size: 'SIZE', modified: 'MODIFIED', location: 'LOCATION',
    emptyTitle: 'Your library is empty',
    emptySubtitle: 'Add a folder or drive to index your files.',
    addLocationButton: '＋ Add location', noFilesTitle: 'No files found',
    noFilesSubtitle: 'Try adjusting your search or filters.', filesCount: '{count} files',
    loadMore: 'Load more', sortHint: 'Sort by name or size', ready: 'Ready',
    yourSelection: 'YOUR SELECTION', basket: 'Selection basket', basketSummary: '{count} files · {size}',
    selectVisible: 'Select all results', emptyBasket: 'Clear',
    selectionProgressTitle: 'Adding files to the basket…',
    selectionProgressCount: '{processed} of {total} processed',
    selectionCompleteCount: '{count} results processed · {selected} files in basket',
    selectionProgressFailed: 'Adding files to the basket failed',
    basketPreviewLimit: 'Showing the first {count} files',
    safeNote: 'Choose a destination folder, then copy or move your files there.',
    makeFolder: 'Save to folder…', selectFile: 'Select {name}', removeLocation: 'Remove location',
    removeFromBasket: 'Remove from basket', emptyBasketMessage: 'Your basket is empty.',
    basketHint: 'Select files from the library.', fileLoadFailed: 'Could not load files: {error}',
    locationAdded: 'Storage location added.', addLocationFailed: 'Could not add location: {error}',
    scannedCount: 'Indexed {count} files', scanFinishedErrors: 'Scan finished with {count} errors; existing metadata was retained',
    scanCancelled: 'Scan cancelled · {count} files processed',
    scanCancelledToast: 'Scan cancelled. {count} discovered files were retained.',
    scanCompleteToast: 'Scan complete: {count} files.', scanErrorsToast: 'Scan finished with {count} errors.',
    scanFailed: 'Scan failed', scanFailedToast: 'Scan failed: {error}',
    addLocationFirst: 'Add a storage location first.', scanAlreadyRunning: 'A scan is already running.',
    scanLocationStatus: 'Scanning: {location}', cancelScanStatus: 'Cancelling scan…',
    scanProgress: '{location} · {message} · {errors} errors',
    accessDenied: 'Access denied: {location}',
    filesRemaining: 'and {count} more files',
    locationUnavailable: 'Storage location is unavailable: {path}',
    destinationUnavailable: 'Destination folder is unavailable: {path}',
    basketIsEmpty: 'The selection basket is empty.',
    protectedDestination: 'Saving files to a protected Windows or program folder is blocked.',
    protectedSource: 'Moving files from a protected Windows or program folder is blocked.',
    sourceMissing: 'The source file no longer exists.',
    copyIntoSource: 'A file cannot be copied into itself or one of its parent folders.',
    sourceChanged: 'The source file changed during copying; the original was kept.',
    copyIncomplete: 'The file changed or was not fully read during copying.',
    noActiveScan: 'There is no active scan.', cancelScanFailed: 'Could not cancel scan: {error}',
    moving: 'move', copying: 'copy', preparing: 'Preparing to {action}…',
    organizeDone: '{succeeded} files {action} · {failed} failed',
    organizeProgress: 'Processed file {done} of {total}',
    organizeProgressTitle: 'Processing files…',
    organizeProgressAction: 'Files {action} to the destination',
    organizeProgressCount: 'Processed files: {done}/{total}',
    organizeProgressEta: 'Estimated time remaining: {time}',
    organizeProgressCalculating: 'Calculating remaining time…',
    chooseFileAction: 'What would you like to do with these files?',
    destinationFolder: 'Destination folder',
    dialogFileCount: '{count} files will be saved to this folder.',
    moveWarning: 'Moving removes the originals only after they have been safely copied and verified.',
    cancel: 'Cancel',
    copyFiles: 'Copy',
    moveFiles: 'Move',
    organizeToast: '{succeeded} succeeded, {failed} failed. Log saved.',
    organizeComplete: 'Operation complete.\n{succeeded} succeeded · {failed} failed.\n\nLog:\n{logPath}\n\nWould you like to open the log file?',
    organizeFailed: 'File operation failed: {error}', organizeFailedStatus: 'File operation failed',
    selectFailed: 'Could not update selection: {error}', removeLocationConfirm: 'Remove this location from SFO?\n\n{location}\n\nIndexed files and selections will disappear from the app. Your original files will remain on disk.',
    removeLocationFailed: 'Could not remove location: {error}', removeBasketFailed: 'Could not remove from basket: {error}',
    clearBasketConfirm: 'Are you sure you want to clear the entire selection basket?',
    clearBasketFailed: 'Could not clear basket: {error}', selectFailedGeneric: 'Could not select files: {error}',
    clearLibraryConfirm: 'Are you sure you want to clear the entire SFO library?\n\nThis removes the index, selections, and saved locations from the app. Your original files will remain untouched on disk.',
    clearLibraryDone: 'Library cleared. Your original files were not deleted.',
    clearLibraryFailed: 'Could not clear library: {error}', lastScan: 'Last scan: {date}',
    indexedSummary: '{files} indexed files · {locations} locations',
    organizeLogPrompt: 'Log:',
    libraryLoadFailedStatus: 'SFO could not open the library',
    libraryLoadFailed: 'Could not load library: {error}',
    categoryImages: 'Images', categoryVideos: 'Videos', categoryDocuments: 'Documents',
    categoryAudio: 'Audio', categoryOther: 'Other'
  }
};

const languageFromStorage = localStorage.getItem('sfo-language');
const viewFromStorage = localStorage.getItem('sfo-view');
const state = {
  locations: [],
  files: [],
  basket: [],
  basketSummary: { count: 0, totalSize: 0 },
  category: '',
  location: '',
  query: '',
  size: 'all',
  sort: 'name-asc',
  language: languageFromStorage === 'en' ? 'en' : 'nl',
  view: viewFromStorage === 'details' ? 'details' : 'grid',
  page: 0,
  total: 0,
  loading: false,
  fileRequestId: 0,
  scanActive: false,
  scanCancelRequested: false,
  organizing: false,
  bulkSelecting: false,
  bulkSelectionBatchId: null
};

const elements = Object.fromEntries([
  'page-title', 'subtitle', 'locations-list', 'search', 'size-filter', 'sort-order', 'file-list', 'file-grid',
  'empty-state', 'results-count', 'load-more', 'status', 'last-scan', 'basket-count',
  'basket-total', 'basket-list', 'organize', 'toast', 'scan-all', 'add-location', 'language-select',
  'basket-batch-progress', 'basket-progress-count', 'basket-progress-bar', 'select-visible',
  'file-table', 'view-grid', 'view-details', 'clear-library', 'organize-progress-dialog',
  'organize-progress-action', 'organize-progress-bar', 'organize-progress-percent',
  'organize-progress-count', 'organize-progress-eta'
].map((id) => [id, document.getElementById(id)]));

let toastTimer;
let searchTimer;
let basketProgressTimer;
const videoPreviewTimers = new WeakMap();

function t(key, values = {}) {
  const template = translations[state.language][key] || translations.nl[key] || key;
  return template.replace(/\{(\w+)\}/g, (_match, name) => String(values[name] ?? ''));
}

function localizedError(message) {
  if (state.language !== 'en') return message;
  const knownErrors = [
    [/^Er wordt al een scan uitgevoerd\.$/, 'scanAlreadyRunning'],
    [/^De opslaglocatie is niet beschikbaar: (.+)$/, 'locationUnavailable'],
    [/^De doelmap is niet beschikbaar: (.+)$/, 'destinationUnavailable'],
    [/^Voeg deze opslaglocatie eerst toe aan SFO\.$/, 'addLocationFirst'],
    [/^Het selectiemandje is leeg\.$/, 'basketIsEmpty'],
    [/^Bestanden opslaan in een beschermde Windows- of programmamap is geblokkeerd\.$/, 'protectedDestination'],
    [/^Verplaatsen vanuit een beschermde Windows- of programmamap is geblokkeerd\.$/, 'protectedSource'],
    [/^Bronbestand bestaat niet meer\.$/, 'sourceMissing'],
    [/^Een bestand kan niet naar zichzelf of een bovenliggende map worden gekopieerd\.$/, 'copyIntoSource'],
    [/^Het bronbestand is gewijzigd tijdens het kopiëren; het origineel is behouden\.$/, 'sourceChanged'],
    [/^Het bestand is tijdens het kopiëren gewijzigd of onvolledig gelezen\.$/, 'copyIncomplete']
  ];
  for (const [pattern, key] of knownErrors) {
    const match = message.match(pattern);
    if (match) return t(key, { path: match[1] });
  }
  return message;
}

function formatNumber(value) {
  return Number(value).toLocaleString(state.language === 'nl' ? 'nl-NL' : 'en-US');
}

function categoryName(category) {
  const keys = {
    Afbeeldingen: 'categoryImages',
    "Video's": 'categoryVideos',
    Documenten: 'categoryDocuments',
    Audio: 'categoryAudio',
    Overig: 'categoryOther'
  };
  return keys[category] ? t(keys[category]) : category;
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-title]').forEach((element) => {
    element.title = t(element.dataset.i18nTitle);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel));
  });
  elements['language-select'].value = state.language;
  elements['scan-all'].innerHTML = `${state.scanActive ? '×' : '⟳'} <span>${escapeHtml(t(state.scanActive ? 'cancelScan' : 'scanLibrary'))}</span>`;
  updateView();
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB', 'TB'];
  let size = bytes / 1024;
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index += 1;
  }
  return `${size.toFixed(size < 10 ? 1 : 0)} ${units[index]}`;
}

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat(state.language === 'nl' ? 'nl-NL' : 'en-US', { dateStyle: 'medium' }).format(date);
}

function formatDuration(milliseconds) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;
  return [hours, minutes, remainder].map((part) => String(part).padStart(2, '0')).join(':');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function showToast(message, isError = false) {
  elements.toast.textContent = message;
  elements.toast.classList.toggle('error', isError);
  elements.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => elements.toast.classList.remove('show'), 3600);
}

function setStatus(message) {
  elements.status.textContent = message;
}

function currentFilters(page = 0) {
  return {
    page,
    category: state.category,
    location: state.location,
    query: state.query,
    size: state.size,
    sort: state.sort
  };
}

async function refreshFiles(reset = true) {
  if (state.loading && !reset) return;
  const requestId = ++state.fileRequestId;
  state.loading = true;
  const page = reset ? 0 : state.page + 1;
  try {
    const result = await window.sfo.queryFiles(currentFilters(page));
    if (requestId !== state.fileRequestId) return;
    state.total = result.total;
    state.page = result.page;
    state.files = reset ? result.files : [...state.files, ...result.files];
    renderFiles();
  } catch (error) {
    if (requestId === state.fileRequestId)     showToast(t('fileLoadFailed', { error: localizedError(error.message) }), true);
  } finally {
    if (requestId === state.fileRequestId) state.loading = false;
  }
}

function renderFiles() {
  elements['file-list'].innerHTML = state.files.map((file) => `
    <tr>
      <td><input type="checkbox" class="file-checkbox" data-path="${escapeHtml(file.path)}" ${Number(file.selected) ? 'checked' : ''} aria-label="${escapeHtml(t('selectFile', { name: file.name }))}"></td>
      <td class="name-cell" title="${escapeHtml(file.path)}">${mediaMarkup(file)}<span class="name-label">${escapeHtml(file.name)}</span></td>
      <td>${escapeHtml(categoryName(file.category))}</td>
      <td>${formatSize(Number(file.size))}</td>
      <td>${formatDate(file.modified_utc)}</td>
      <td title="${escapeHtml(file.root_path)}">${escapeHtml(file.root_path)}</td>
    </tr>
  `).join('');
  elements['file-grid'].innerHTML = state.files.map((file) => `
    <article class="file-card" title="${escapeHtml(file.path)}">
      <label class="file-card-select">
        <input type="checkbox" class="file-checkbox" data-path="${escapeHtml(file.path)}" ${Number(file.selected) ? 'checked' : ''} aria-label="${escapeHtml(t('selectFile', { name: file.name }))}">
      </label>
      <div class="card-media">${mediaMarkup(file, true)}</div>
      <div class="file-card-info">
        <div class="file-card-name" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</div>
        <div class="file-card-meta">${escapeHtml(categoryName(file.category))} · ${formatSize(Number(file.size))}</div>
      </div>
    </article>
  `).join('');
  setupMediaPreviews(elements['file-list']);
  setupMediaPreviews(elements['file-grid']);

  elements['results-count'].textContent = t('filesCount', { count: formatNumber(state.total) });
  elements['load-more'].hidden = state.files.length >= state.total;
  elements['empty-state'].classList.toggle('visible', state.files.length === 0);
  if (!state.locations.length && !state.files.length) {
    elements['empty-state'].querySelector('strong').textContent = t('emptyTitle');
    elements['empty-state'].querySelector('span').textContent = t('emptySubtitle');
  } else if (state.files.length === 0) {
    elements['empty-state'].querySelector('strong').textContent = t('noFilesTitle');
    elements['empty-state'].querySelector('span').textContent = t('noFilesSubtitle');
  }
}

function mediaMarkup(file, card = false) {
  const mediaClass = `media-thumb${card ? ' card-thumb' : ''}`;
  if (file.category === 'Afbeeldingen' && file.previewUrl) {
    return `<span class="${mediaClass} image-thumb"><span class="media-icon">▧</span><img src="${escapeHtml(file.previewUrl)}" alt="" loading="lazy"></span>`;
  }
  if (file.category === "Video's" && file.previewUrl) {
    return `<span class="${mediaClass} video-thumb"><span class="media-icon">▷</span><video data-src="${escapeHtml(file.previewUrl)}" muted playsinline preload="none" aria-label="${escapeHtml(t('videos'))}"></video></span>`;
  }
  return `<span class="${mediaClass} file-thumb"><span class="media-icon">${file.category === 'Audio' ? '♫' : file.category === 'Documenten' ? '▤' : '▧'}</span></span>`;
}

function setupMediaPreviews(container) {
  container.querySelectorAll('.image-thumb img').forEach((image) => {
    if (image.complete && image.naturalWidth) image.parentElement.classList.add('has-image');
    image.addEventListener('load', () => image.parentElement.classList.add('has-image'), { once: true });
    image.addEventListener('error', () => image.remove(), { once: true });
  });
  container.querySelectorAll('.video-thumb').forEach((preview) => {
    const video = preview.querySelector('video');
    preview.addEventListener('mouseenter', () => {
      clearTimeout(videoPreviewTimers.get(video));
      if (!video.src) {
        video.src = video.dataset.src;
        video.load();
      }
      video.currentTime = 0;
      video.play().then(() => {
        if (!preview.matches(':hover')) {
          stopVideoPreview(preview, video);
          return;
        }
        preview.classList.add('is-playing');
        videoPreviewTimers.set(video, setTimeout(() => stopVideoPreview(preview, video), 3500));
      }).catch(() => {
        preview.classList.remove('is-playing');
      });
    });
    preview.addEventListener('mouseleave', () => stopVideoPreview(preview, video));
  });
}

function stopVideoPreview(preview, video) {
  clearTimeout(videoPreviewTimers.get(video));
  video.pause();
  video.currentTime = 0;
  preview.classList.remove('is-playing');
}

function updateView() {
  const isGrid = state.view === 'grid';
  elements['file-table'].hidden = isGrid;
  elements['file-grid'].hidden = !isGrid;
  elements['view-grid'].setAttribute('aria-pressed', String(isGrid));
  elements['view-details'].setAttribute('aria-pressed', String(!isGrid));
}

function renderLocations() {
  elements['locations-list'].innerHTML = state.locations.map((location) => `
    <button class="location-item ${state.location === location ? 'selected' : ''}" data-location="${escapeHtml(location)}" title="${escapeHtml(location)}">
      <span>▣</span><span>${escapeHtml(location)}</span><span class="remove-location" data-remove="${escapeHtml(location)}" title="${escapeHtml(t('removeLocation'))}" aria-label="${escapeHtml(t('removeLocation'))}">×</span>
    </button>
  `).join('');
}

function renderBasket() {
  elements['basket-count'].textContent = formatNumber(state.basketSummary.count);
  elements['basket-total'].textContent = t('basketSummary', {
    count: formatNumber(state.basketSummary.count),
    size: formatSize(state.basketSummary.totalSize)
  });
  elements.organize.disabled = state.basketSummary.count === 0 || state.bulkSelecting;
  elements['clear-library'].disabled = state.organizing || state.bulkSelecting;
  elements['select-visible'].disabled = state.bulkSelecting || state.total === 0;
  document.getElementById('clear-basket').disabled = state.bulkSelecting || state.basketSummary.count === 0;
  elements['basket-list'].innerHTML = state.basket.length
    ? state.basket.map((file) => `
      <div class="basket-item">
        <span class="basket-file-icon">▤</span>
        <div class="basket-file-details">
          <div class="basket-file-name" title="${escapeHtml(file.path)}">${escapeHtml(file.name)}</div>
          <div class="basket-file-size">${formatSize(Number(file.size))} · ${escapeHtml(categoryName(file.category))}</div>
        </div>
        <button class="remove-basket" data-remove-basket="${escapeHtml(file.path)}" title="${escapeHtml(t('removeFromBasket'))}" aria-label="${escapeHtml(t('removeFromBasket'))}">×</button>
      </div>
    `).join('') + (state.basketSummary.count > state.basket.length
      ? `<div class="basket-preview-limit">${escapeHtml(t('basketPreviewLimit', { count: formatNumber(state.basket.length) }))}</div>`
      : '')
    : `<div class="basket-empty">${escapeHtml(t('emptyBasketMessage'))}<br>${escapeHtml(t('basketHint'))}</div>`;
}

async function refreshBasket() {
  const basket = await window.sfo.getBasket();
  state.basket = basket.files;
  state.basketSummary = basket.summary;
  renderBasket();
}

function setCategory(category) {
  state.category = category;
  state.location = '';
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.category === category));
  document.querySelectorAll('.location-item').forEach((item) => item.classList.remove('selected'));
  const categoryLabel = categoryName(category) || t('fileLibrary');
  elements['page-title'].textContent = categoryLabel;
  refreshFiles();
}

async function addLocation() {
  try {
    const locations = await window.sfo.addLocation(state.language);
    if (!locations.length) return;
    await refreshState();
    setStatus(t('addedLocations', { count: formatNumber(locations.length) }));
    showToast(t('addedLocations', { count: formatNumber(locations.length) }));
    state.scanCancelRequested = false;
    for (const location of locations) {
      if (state.scanCancelRequested) break;
      const result = await scanLocation(location);
      if (result?.cancelled) break;
    }
  } catch (error) {
    showToast(t('addLocationFailed', { error: localizedError(error.message) }), true);
  }
}

async function refreshState() {
  const initial = await window.sfo.getInitialState();
  state.locations = initial.locations;
  renderLocations();
  document.getElementById('stat-total').textContent = formatNumber(initial.stats.total);
  document.getElementById('stat-images').textContent = formatNumber(initial.stats.images);
  document.getElementById('stat-videos').textContent = formatNumber(initial.stats.videos);
  document.getElementById('stat-documents').textContent = formatNumber(initial.stats.documents);
  document.getElementById('stat-audio').textContent = formatNumber(initial.stats.audio);
  elements.subtitle.textContent = t('indexedSummary', {
    files: formatNumber(initial.stats.total),
    locations: formatNumber(initial.locations.length)
  });
  elements['last-scan'].textContent = initial.lastScan ? t('lastScan', { date: formatDate(initial.lastScan) }) : '';
  await refreshBasket();
  await refreshFiles();
}

async function scanLocation(location) {
  if (state.scanActive) {
    showToast(t('scanAlreadyRunning'));
    return;
  }
  state.scanActive = true;
  elements['scan-all'].innerHTML = `× <span>${escapeHtml(t('cancelScan'))}</span>`;
  setStatus(t('scanLocationStatus', { location }));
  try {
    const result = await window.sfo.scanLocation(location);
    await refreshState();
    setStatus(result.cancelled
      ? t('scanCancelled', { count: formatNumber(result.scanned) })
      : result.completed
        ? t('scannedCount', { count: formatNumber(result.scanned) })
        : t('scanFinishedErrors', { count: formatNumber(result.errors) }));
    showToast(result.cancelled
      ? t('scanCancelledToast', { count: formatNumber(result.scanned) })
      : result.completed
        ? t('scanCompleteToast', { count: formatNumber(result.scanned) })
        : t('scanErrorsToast', { count: formatNumber(result.errors) }), !result.completed && !result.cancelled);
    return result;
  } catch (error) {
    setStatus(t('scanFailed'));
    showToast(t('scanFailedToast', { error: localizedError(error.message) }), true);
  } finally {
    state.scanActive = false;
    elements['scan-all'].innerHTML = `⟳ <span>${escapeHtml(t('scanLibrary'))}</span>`;
    elements['clear-library'].disabled = state.organizing;
  }
}

async function scanAll() {
  if (!state.locations.length) {
    showToast(t('addLocationFirst'));
    return;
  }
  state.scanCancelRequested = false;
  for (const location of state.locations) {
    if (state.scanCancelRequested) break;
    const result = await scanLocation(location);
    if (result?.cancelled) break;
  }
}

async function cancelScan() {
  state.scanCancelRequested = true;
  elements['scan-all'].innerHTML = `× <span>${escapeHtml(t('cancelling'))}</span>`;
  setStatus(t('cancelScanStatus'));
  try {
    const cancelled = await window.sfo.cancelScan();
    if (!cancelled) setStatus(t('noActiveScan'));
  } catch (error) {
    showToast(t('cancelScanFailed', { error: localizedError(error.message) }), true);
  }
}

async function toggleFile(filePath, selected) {
  try {
    const result = await window.sfo.setSelected(filePath, selected);
    state.basket = result.files;
    state.basketSummary = result.summary;
    state.files = state.files.map((file) => file.path === filePath ? { ...file, selected: Number(selected) } : file);
    renderBasket();
  } catch (error) {
    showToast(t('selectFailed', { error: localizedError(error.message) }), true);
    await refreshFiles();
  }
}

async function organizeFiles() {
  if (!state.basketSummary.count) return;
  const destination = await window.sfo.chooseDestination(state.language);
  if (!destination) return;
  const action = await chooseFileAction(destination);
  if (action !== 'copy' && action !== 'move') return;
  const move = action === 'move';
  const actionLabel = move ? t('moving') : t('copying');

  state.organizing = true;
  elements.organize.disabled = true;
  elements['clear-library'].disabled = true;
  setStatus(t('preparing', { action: actionLabel }));
  elements['organize-progress-action'].textContent = t('organizeProgressAction', { action: actionLabel });
  updateOrganizeProgress({ done: 0, total: state.basketSummary.count, estimatedRemainingMs: null });
  elements['organize-progress-dialog'].showModal();
  try {
    const result = await window.sfo.organize({ destination, move });
    elements['organize-progress-dialog'].close();
    state.basket = result.basket.files;
    state.basketSummary = result.basket.summary;
    await refreshBasket();
    await refreshState();
    setStatus(t('organizeDone', {
      succeeded: formatNumber(result.succeeded),
      action: move ? (state.language === 'nl' ? 'verplaatst' : 'moved') : (state.language === 'nl' ? 'gekopieerd' : 'copied'),
      failed: formatNumber(result.failed)
    }));
    showToast(t('organizeToast', {
      succeeded: formatNumber(result.succeeded),
      failed: formatNumber(result.failed)
    }));
    const openLog = window.confirm(t('organizeComplete', {
      succeeded: formatNumber(result.succeeded),
      failed: formatNumber(result.failed),
      logPath: result.logPath
    }));
    if (openLog) await window.sfo.openPath(result.logPath);
  } catch (error) {
    if (elements['organize-progress-dialog'].open) elements['organize-progress-dialog'].close();
    showToast(t('organizeFailed', { error: localizedError(error.message) }), true);
    setStatus(t('organizeFailedStatus'));
  } finally {
    state.organizing = false;
    if (elements['organize-progress-dialog'].open) elements['organize-progress-dialog'].close();
    elements['clear-library'].disabled = false;
    elements.organize.disabled = state.basketSummary.count === 0;
  }
}

function updateOrganizeProgress(progress) {
  const done = Number(progress.done) || 0;
  const total = Number(progress.total) || 0;
  const percent = total ? Math.min(100, Math.floor(done / total * 100)) : 0;
  elements['organize-progress-bar'].max = 100;
  elements['organize-progress-bar'].value = percent;
  elements['organize-progress-percent'].textContent = `${percent}%`;
  elements['organize-progress-count'].textContent = t('organizeProgressCount', {
    done: formatNumber(done),
    total: formatNumber(total)
  });
  elements['organize-progress-eta'].textContent = progress.estimatedRemainingMs === null
    || progress.estimatedRemainingMs === undefined
    ? t('organizeProgressCalculating')
    : t('organizeProgressEta', { time: formatDuration(progress.estimatedRemainingMs) });
  setStatus(t('organizeProgress', {
    done: formatNumber(done),
    total: formatNumber(total)
  }));
}

function chooseFileAction(destination) {
  const dialog = document.getElementById('organize-dialog');
  document.getElementById('organize-destination').textContent = destination;
  document.getElementById('organize-dialog-summary').textContent = t('dialogFileCount', {
    count: formatNumber(state.basketSummary.count)
  });
  const preview = document.getElementById('organize-file-preview');
  preview.replaceChildren();
  for (const file of state.basket.slice(0, 5)) {
    const item = document.createElement('li');
    item.textContent = file.name;
    preview.append(item);
  }
  if (state.basket.length > 5) {
    const item = document.createElement('li');
    item.textContent = t('filesRemaining', { count: formatNumber(state.basket.length - 5) });
    preview.append(item);
  }

  dialog.returnValue = 'cancel';
  const result = new Promise((resolve) => {
    dialog.addEventListener('close', () => resolve(dialog.returnValue), { once: true });
  });
  dialog.showModal();
  return result;
}

async function clearLibrary() {
  if (!window.confirm(t('clearLibraryConfirm'))) return;
  state.scanCancelRequested = true;
  state.fileRequestId += 1;
  elements['clear-library'].disabled = true;
  try {
    await window.sfo.clearLibrary();
    state.loading = false;
    state.files = [];
    state.total = 0;
    state.page = 0;
    state.category = '';
    state.location = '';
    state.query = '';
    state.size = 'all';
    state.sort = 'name-asc';
    elements.search.value = '';
    elements['size-filter'].value = 'all';
    elements['sort-order'].value = 'name-asc';
    document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.category === ''));
    elements['page-title'].textContent = t('fileLibrary');
    setStatus(t('ready'));
    await refreshState();
    showToast(t('clearLibraryDone'));
  } catch (error) {
    showToast(t('clearLibraryFailed', { error: localizedError(error.message) }), true);
  } finally {
    elements['clear-library'].disabled = state.organizing;
  }
}

function changeLanguage(language) {
  state.language = language === 'en' ? 'en' : 'nl';
  localStorage.setItem('sfo-language', state.language);
  applyLanguage();
  elements['page-title'].textContent = state.location || categoryName(state.category) || t('fileLibrary');
  renderLocations();
  renderBasket();
  renderFiles();
  refreshState().catch((error) => showToast(localizedError(error.message), true));
}

function changeView(view) {
  state.view = view === 'details' ? 'details' : 'grid';
  localStorage.setItem('sfo-view', state.view);
  updateView();
  renderFiles();
}

document.querySelectorAll('.nav-item').forEach((item) => item.addEventListener('click', () => setCategory(item.dataset.category)));
document.getElementById('all-files').addEventListener('click', (event) => {
  event.preventDefault();
  setCategory('');
});
elements['add-location'].addEventListener('click', addLocation);
document.getElementById('empty-add-location').addEventListener('click', addLocation);
elements['scan-all'].addEventListener('click', () => {
  if (state.scanActive) cancelScan();
  else scanAll();
});
elements['language-select'].addEventListener('change', () => changeLanguage(elements['language-select'].value));
elements['view-grid'].addEventListener('click', () => changeView('grid'));
elements['view-details'].addEventListener('click', () => changeView('details'));
elements['clear-library'].addEventListener('click', clearLibrary);
document.getElementById('refresh').addEventListener('click', () => refreshState().catch((error) => showToast(localizedError(error.message), true)));
elements.search.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    state.query = elements.search.value;
    refreshFiles();
  }, 180);
});
elements['size-filter'].addEventListener('change', () => {
  state.size = elements['size-filter'].value;
  refreshFiles();
});
elements['sort-order'].addEventListener('change', () => {
  state.sort = elements['sort-order'].value;
  refreshFiles();
});
elements['load-more'].addEventListener('click', () => refreshFiles(false));
elements['file-list'].addEventListener('change', (event) => {
  const checkbox = event.target.closest('.file-checkbox');
  if (checkbox) toggleFile(checkbox.dataset.path, checkbox.checked);
});
elements['file-grid'].addEventListener('change', (event) => {
  const checkbox = event.target.closest('.file-checkbox');
  if (checkbox) toggleFile(checkbox.dataset.path, checkbox.checked);
});
elements['locations-list'].addEventListener('click', async (event) => {
  const remove = event.target.closest('[data-remove]');
  if (remove) {
    event.stopPropagation();
    const location = remove.dataset.remove;
    if (!window.confirm(t('removeLocationConfirm', { location }))) return;
    try {
      await window.sfo.removeLocation(location);
      if (state.location === location) {
        state.location = '';
        elements['page-title'].textContent = categoryName(state.category) || t('fileLibrary');
      }
      await refreshState();
    } catch (error) {
      showToast(t('removeLocationFailed', { error: localizedError(error.message) }), true);
    }
    return;
  }
  const locationButton = event.target.closest('[data-location]');
  if (!locationButton) return;
  state.location = locationButton.dataset.location;
  state.category = '';
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.category === ''));
  renderLocations();
  elements['page-title'].textContent = state.location;
  refreshFiles();
});
elements['basket-list'].addEventListener('click', async (event) => {
  const button = event.target.closest('[data-remove-basket]');
  if (!button) return;
  try {
    const result = await window.sfo.removeFromBasket(button.dataset.removeBasket);
    state.basket = result.files;
    state.basketSummary = result.summary;
    renderBasket();
    await refreshFiles();
  } catch (error) {
    showToast(t('removeBasketFailed', { error: localizedError(error.message) }), true);
  }
});
document.getElementById('clear-basket').addEventListener('click', async () => {
  if (!state.basketSummary.count || !window.confirm(t('clearBasketConfirm'))) return;
  try {
    const result = await window.sfo.clearBasket();
    state.basket = result.files;
    state.basketSummary = result.summary;
    renderBasket();
    await refreshFiles();
  } catch (error) {
    showToast(t('clearBasketFailed', { error: localizedError(error.message) }), true);
  }
});
document.getElementById('select-visible').addEventListener('click', async () => {
  if (state.bulkSelecting) return;
  clearTimeout(basketProgressTimer);
  elements['basket-batch-progress'].hidden = true;
  state.bulkSelecting = true;
  state.bulkSelectionBatchId = null;
  renderBasket();
  try {
    const result = await window.sfo.selectFilteredFiles(currentFilters());
    state.basket = result.files;
    state.basketSummary = result.summary;
    if (result.total >= 20) {
      state.bulkSelectionBatchId = result.batchId;
      elements['basket-batch-progress'].hidden = false;
      elements['basket-progress-bar'].value = 100;
      elements['basket-progress-count'].textContent = t('selectionCompleteCount', {
        count: formatNumber(result.processed),
        selected: formatNumber(result.summary.count)
      });
      clearTimeout(basketProgressTimer);
      basketProgressTimer = setTimeout(() => {
        elements['basket-batch-progress'].hidden = true;
        state.bulkSelectionBatchId = null;
      }, 1400);
    }
    setStatus(t('selectionCompleteCount', {
      count: formatNumber(result.processed),
      selected: formatNumber(result.summary.count)
    }));
    renderBasket();
    await refreshFiles();
  } catch (error) {
    showToast(t('selectFailedGeneric', { error: localizedError(error.message) }), true);
    try {
      await refreshBasket();
    } catch (refreshError) {
      showToast(t('fileLoadFailed', { error: localizedError(refreshError.message) }), true);
    }
  } finally {
    state.bulkSelecting = false;
    if (elements['basket-batch-progress'].hidden) state.bulkSelectionBatchId = null;
    renderBasket();
  }
});
elements.organize.addEventListener('click', organizeFiles);
elements['organize-progress-dialog'].addEventListener('cancel', (event) => {
  if (state.organizing) event.preventDefault();
});

window.sfo.onScanProgress((progress) => {
  const message = progress.message.startsWith('Geen toegang tot ')
    ? t('accessDenied', { location: progress.message.slice('Geen toegang tot '.length) })
    : progress.message.startsWith('Geïndexeerd: ')
      ? t('scannedCount', { count: progress.message.slice('Geïndexeerd: '.length) })
      : progress.message;
  setStatus(t('scanProgress', {
    location: progress.location,
    message,
    errors: formatNumber(progress.errors)
  }));
});
window.sfo.onScanComplete((result) => {
  setStatus(result.cancelled
    ? t('scanCancelled', { count: formatNumber(result.scanned) })
    : result.completed
      ? t('scannedCount', { count: formatNumber(result.scanned) })
      : t('scanErrorsToast', { count: formatNumber(result.errors) }));
});
window.sfo.onOrganizeProgress(updateOrganizeProgress);
window.sfo.onBasketBatchProgress((progress) => {
  if (progress.phase === 'start') {
    state.bulkSelectionBatchId = progress.batchId;
    clearTimeout(basketProgressTimer);
    elements['basket-batch-progress'].hidden = false;
    elements['basket-progress-bar'].value = 0;
  }
  if (progress.batchId !== state.bulkSelectionBatchId) return;

  const total = Number(progress.total);
  const processed = Number(progress.processed);
  elements['basket-progress-count'].textContent = t(
    progress.phase === 'complete' ? 'selectionCompleteCount' : 'selectionProgressCount',
    progress.phase === 'complete'
      ? { count: formatNumber(processed), selected: formatNumber(state.basketSummary.count) }
      : { processed: formatNumber(processed), total: formatNumber(total) }
  );
  elements['basket-progress-bar'].value = progress.phase === 'complete'
    ? 100
    : total ? Math.min(100, Math.round(processed / total * 100)) : 0;

  if (progress.phase === 'complete' || progress.phase === 'error') {
    if (progress.phase === 'error') elements['basket-progress-count'].textContent = t('selectionProgressFailed');
    basketProgressTimer = setTimeout(() => {
      elements['basket-batch-progress'].hidden = true;
      state.bulkSelectionBatchId = null;
    }, progress.phase === 'error' ? 4000 : 1400);
  }
});

applyLanguage();
updateView();
renderBasket();
refreshState().catch((error) => {
  setStatus(t('libraryLoadFailedStatus'));
  showToast(t('libraryLoadFailed', { error: localizedError(error.message) }), true);
});

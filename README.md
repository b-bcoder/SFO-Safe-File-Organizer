# SFO - Safe File Organizer

SFO is a Windows desktop app built with Electron. It indexes selected folders and drives, stores metadata in a local SQLite database, and lets you safely copy or move selected files into a new folder.

## Requirements

- Windows 10 or later (64-bit)
- Node.js LTS and npm to develop or build the installer

The generated installer contains Electron and does not require users to install Node.js or .NET.

## Install dependencies

```powershell
npm ci
```

If there is no `package-lock.json` yet, run `npm install` once instead. Commit the generated lock file; use `npm ci` for repeatable installs thereafter.

## Development

```powershell
npm run dev
```

## Build a Windows installer

```powershell
npm run dist
```

The NSIS installer is written to `release/`. The installer lets users select an installation folder and creates Start menu and desktop shortcuts.

Other packaging commands:

```powershell
npm run build          # Unpacked Windows app, useful for testing
npm run dist:portable  # Portable Windows executable
```

## Data and safety

- The SQLite metadata database, selected-files basket, and operation log are stored under `%APPDATA%\SFO - Safe File Organizer\`.
- File contents stay in their original locations until you choose to copy or move them.
- Scans skip symbolic links, update file metadata incrementally, and retain stale metadata when a scan encounters inaccessible folders.
- Image files show thumbnails, and hovering over a video briefly plays a muted preview.
- The library can be sorted alphabetically or by file size, in either direction.
- Switch between a responsive thumbnail grid and the detailed file list.
- Choose Dutch or English in the app; the choice is remembered on this device.
- Clear the SFO library to remove its index, selections, and saved locations without deleting original files.
- Add and scan multiple source folders or drives at once by multi-selecting them in the folder picker.
- Copy or move selected files directly into a chosen destination folder.
- Copying and moving show a centered progress dialog with percent complete, processed-file count, and an estimated remaining time.
- Select every file matching the current library filters into the basket, with progress shown for batches of 20 or more. The basket preview is capped for responsiveness; copying and moving still process the complete selection.
- Removing a storage location removes its indexed entries and basket selections from SFO; it never deletes the original files.
- An active library scan can be cancelled from the scan button. Files found before cancellation remain indexed.
- Conflicting filenames receive a numbered suffix instead of overwriting an existing file.
- Moving copies and verifies each file before removing its source; moves from protected Windows and program folders and writes into those folders are blocked.
- Individual file errors are logged without stopping the rest of a batch.

## License

SFO is distributed under the custom terms in [LICENSE.md](Documentation/LICENSE.md).
The application may be used and unmodified copies may be shared with the
required author and repository attribution. Reusing the source code in another
project requires prior written permission from me (B&B Coder); see the license for
the request process and conditions.

Third-party software included with the application is listed in
[THIRD-PARTY-NOTICES.md](Documentation/THIRD-PARTY-NOTICES.md). Electron's bundled
third-party license details are also shipped with the packaged application.
The custom license and third-party notices are placed in the app's `resources`
folder when packaged.

## Project layout

- `src/main.js` — Electron main process, SQLite metadata, indexing, and protected file operations.
- `src/preload.js` — narrow, context-isolated interface between the UI and main process.
- `src/renderer/` — application UI.
- `package.json` — development scripts, production dependencies, Electron packaging, and NSIS settings.

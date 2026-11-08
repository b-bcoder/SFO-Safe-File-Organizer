const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('sfo', {
  getInitialState: () => ipcRenderer.invoke('app:get-initial-state'),
  clearLibrary: () => ipcRenderer.invoke('library:clear'),
  addLocation: (language) => ipcRenderer.invoke('locations:add', language),
  removeLocation: (location) => ipcRenderer.invoke('locations:remove', location),
  scanLocation: (location) => ipcRenderer.invoke('locations:scan', location),
  cancelScan: () => ipcRenderer.invoke('locations:scan-cancel'),
  queryFiles: (filters) => ipcRenderer.invoke('files:query', filters),
  getBasket: () => ipcRenderer.invoke('basket:get'),
  setSelected: (filePath, selected) => ipcRenderer.invoke('basket:set-selected', filePath, selected),
  selectFilteredFiles: (filters) => ipcRenderer.invoke('basket:select-filtered', filters),
  clearBasket: () => ipcRenderer.invoke('basket:clear'),
  removeFromBasket: (filePath) => ipcRenderer.invoke('basket:remove', filePath),
  chooseDestination: (language) => ipcRenderer.invoke('organize:choose-destination', language),
  organize: (options) => ipcRenderer.invoke('organize:run', options),
  openPath: (targetPath) => ipcRenderer.invoke('system:open-path', targetPath),
  onScanProgress: (callback) => {
    const listener = (_event, message) => callback(message);
    ipcRenderer.on('scan:progress', listener);
    return () => ipcRenderer.removeListener('scan:progress', listener);
  },
  onScanComplete: (callback) => {
    const listener = (_event, result) => callback(result);
    ipcRenderer.on('scan:complete', listener);
    return () => ipcRenderer.removeListener('scan:complete', listener);
  },
  onOrganizeProgress: (callback) => {
    const listener = (_event, progress) => callback(progress);
    ipcRenderer.on('organize:progress', listener);
    return () => ipcRenderer.removeListener('organize:progress', listener);
  },
  onBasketBatchProgress: (callback) => {
    const listener = (_event, progress) => callback(progress);
    ipcRenderer.on('basket:batch-progress', listener);
    return () => ipcRenderer.removeListener('basket:batch-progress', listener);
  }
});

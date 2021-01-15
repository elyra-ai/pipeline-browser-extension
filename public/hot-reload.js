const POLLING_INTERVAL = 1_000;

async function getManifestTimestamp(dir) {
  return new Promise((resolve) => {
    dir.createReader().readEntries((entries) => {
      const manifest = entries.find((e) => e.name === "manifest.json");
      manifest.file((f) => {
        resolve(f.lastModified);
      });
    });
  });
}

async function watchChanges(dir) {
  let lastTimestamp = undefined;

  setInterval(async () => {
    const timestamp = await getManifestTimestamp(dir);
    console.log(timestamp);
    if (lastTimestamp !== undefined && lastTimestamp !== timestamp) {
      console.log("reloading...");
      chrome.runtime.reload();
    }
    lastTimestamp = timestamp;
  }, POLLING_INTERVAL);
}

chrome.management.getSelf((self) => {
  if (self.installType === "development") {
    chrome.runtime.getPackageDirectoryEntry((dir) => watchChanges(dir));
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      // NB: see https://github.com/xpl/crx-hotreload/issues/5
      if (tabs[0]) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  }
});

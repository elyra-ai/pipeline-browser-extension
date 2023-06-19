/*
 * Copyright 2018-2023 Elyra Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const POLLING_INTERVAL = 1000;

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

/*
 * Copyright 2018-2021 Elyra Authors
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
chrome.tabs.onUpdated.addListener((tabId, changeInfo, _tab) => {
  if (changeInfo.status === "complete") {
    chrome.tabs.sendMessage(tabId, "page-load-complete");
  }
});

chrome.runtime.onMessage.addListener((request, sender) => {
  if (sender.tab) {
    if (request.hasDetectedPipeline) {
      chrome.browserAction.setIcon({
        tabId: sender.tab.id,
        path: {
          16: "logo32.png",
          32: "logo32.png",
          48: "logo32.png",
          128: "logo32.png",
        },
      });
    } else {
      chrome.browserAction.setIcon({
        tabId: sender.tab.id,
        path: {
          16: "logo32-deactivated.png",
          32: "logo32-deactivated.png",
          48: "logo32-deactivated.png",
          128: "logo32-deactivated.png",
        },
      });
    }
  }
});

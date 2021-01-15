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

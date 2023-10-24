chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.enabled !== undefined) {
        // Update the state in browser storage
        chrome.storage.sync.set({ enabled: message.enabled });
    }
});

  
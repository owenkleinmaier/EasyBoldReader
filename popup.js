document.addEventListener("DOMContentLoaded", function () {
    const switchCheckbox = document.getElementById("switch");

    // Load the initial state from browser storage
    chrome.storage.sync.get("enabled", function (data) {
        switchCheckbox.checked = data.enabled || false;

        // Initialize content script when the popup loads
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const tabId = tabs[0].id;
            chrome.scripting.executeScript({
                target: { tabId },
                function: (enabled) => {
                    if (enabled) {
                        // Enable the content script logic here
                        chrome.scripting.executeScript({
                            target: { tabId },
                            files: ["content.js"]
                        });
                    }
                },
                args: [data.enabled]
            });
        });
    });

    // Add an event listener for the checkbox change event
    switchCheckbox.addEventListener("change", function () {
        const enabled = switchCheckbox.checked;

        // Send a message to the background script to update the state
        chrome.runtime.sendMessage({ enabled });

        // Send a message to the content script to enable or disable it
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const tabId = tabs[0].id;
            chrome.scripting.executeScript({
                target: { tabId },
                function: (enabled) => {
                    if (enabled) {
                        // Enable the content script logic here
                        chrome.scripting.executeScript({
                            target: { tabId },
                            files: ["content.js"]
                        });
                    } else {
                        // Disable the content script logic here (if necessary)
                        chrome.scripting.removeScript({
                            target: { tabId },
                            function: () => {
                                // You can include any logic here to remove content.js behavior
                            }
                        });
                    }
                },
                args: [enabled]
            });
        });
    });
});

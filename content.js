// Check if the checkbox is enabled before running the content script logic
chrome.storage.sync.get("enabled", function (data) {
    if (data.enabled) {
        let paragraphs = document.querySelectorAll('p');

        for (let elt of paragraphs) {
            // Check if the element contains text content
            if (elt.textContent) {
                // Create a new span element to wrap the modified text
                let span = document.createElement('span');

                // Modify the text content within the span
                let words = elt.textContent.split(' ');
                let newWords = [];
                for (let word of words) {
                    if (word.length > 1) {
                        let midIndex = Math.ceil(word.length / 2);
                        let firstPart = word.substring(0, midIndex);
                        let secondPart = word.substring(midIndex);
                        newWords.push(`<span style="font-weight:bold">${firstPart}</span>${secondPart}`);
                    } else {
                        newWords.push(word);
                    }
                }
                span.innerHTML = newWords.join(' ');

                // Replace the text content of the original element with the modified span
                elt.innerHTML = '';
                elt.appendChild(span);
            }
        }
    }
});

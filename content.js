

let paragraphs = document.getElementsByTagName('p');

console.log(paragraphs);

for (let elt of paragraphs){
    let words = elt.innerHTML.split(' ');
    let newWords = [];
    for (let word of words) {
        if (word.length > 1) {
            let midIndex = Math.ceil(word.length / 2);
            let firstPart = word.substring(0, midIndex);
            let secondPart;
            if (word.length > 0){
                secondPart = word.substring(midIndex, word.length);
            } else {
                secondPart = "";
            }
            console.log(newWords);
            newWords.push(`<span style="font-weight:bolder">${firstPart}</span>${secondPart}`);
        } else {
            newWords.push(word);
        }
    }
    elt.innerHTML = newWords.join(' ');
}

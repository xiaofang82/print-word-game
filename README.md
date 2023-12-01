# Print Word Game

Print Word Game is a text-based game where players need to correctly identify a provided word by printing it character by character.

## Features:

- Word selection: The game randomly selects words for players to print.
- Limited attempts: Players have a set number of attempts to print the word correctly.

```JavaScript
let wordsLength = words.length;
    let randomNum = (Math.random() * wordsLength).toFixed(0);
    let word = words[randomNum];
    input.value = '';
    words.splice(randomNum,1);
    wordsObj.innerHTML = word;
    fill.style.width = `${((wordsInitLen - words.length) / wordsInitLen).toFixed(4) * 100}%`;
    return words.length;
```


## Demo Link

[DEMO LINK](https://xiaofang82.github.io/print-word-game/)
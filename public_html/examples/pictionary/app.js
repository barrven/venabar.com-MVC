//loading from js script until you update php
//easyWords
//mediumWords
//hardWords
//customWords
const levelSelect = document.getElementById('level')
const display = document.getElementById('display')

function displayWord() {
    let level = levelSelect.value
    const word = getWord(level)
    
    if(word === undefined) {
        display.innerHTML = `<span class="display-word">The list for "${level}" is empty</span>`
        return
    }
    display.innerHTML = `<span class="display-word">${word}</span>`
}

function getWord(level) {
    let list = []
    switch (level) {
        case 'easy':
            list = easyWords
            break
        case 'medium':
            list = mediumWords
            break
        case 'hard':
            list = hardWords
            break
        case 'custom':
            list = customWords
            break
    }

    return getRandomWord(list)
}

function getRandomWord(list) {
    return list[getRandomInt(list.length - 1)]
}

function getRandomInt(max) {
    let min = 0
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


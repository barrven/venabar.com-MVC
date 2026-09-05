let inputElement = document.getElementById('text-input')
inputElement.addEventListener('input', trackChange)

let wordCounter = document.getElementById('word-count')
wordCounter.innerHTML = 0

let wordlistCont = document.getElementById('list-container')

function trackChange(){
    let inputList = []
    let rawInputList = inputElement.value.split(/[\s\n]+/)

    let i = 0
    for (item of rawInputList){
        let temp = { word: item, count: 1 }
        if (item === ''){
            continue
        }
        inputList[i++] = temp
    }

    createUniqueWordList(inputList)
    wordCounter.innerHTML = inputList.length
}

function createUniqueWordList(list){
    let wordList = []
    
    let i = 0
    for (item of list){
        let strippedItem = { word:stripUnwantedChars(item.word), count: item.count }
        
        //returns -1 if no duplicate is found
        let dupIndex = isCaseInsensitiveDuplicate(wordList, strippedItem.word)
        //only add unique words to the list
        if(dupIndex === -1){
            wordList[i++] = strippedItem
        }
        else{
            wordList[dupIndex].count++
            console.log(wordList[dupIndex])
        }
    }
    populateWordListCont(wordList)
}

function populateWordListCont(list){
    //clear the container first
    wordlistCont.innerHTML = ''
    let sortedList = sortListAlphabetically(list)
    //let sortedList = list

    for (entry of sortedList){
        //if there is a duplicate count then add the badge
        if(entry.count !== 1){
            wordlistCont.innerHTML += '<p>'+entry.word+'<span class="badge">'+ entry.count+ '</span></p>'
        }
        else {
            wordlistCont.innerHTML += '<p>'+entry.word+'</p>'  
        }
        
    }
    
}

function stripUnwantedChars(word){
    return word.replace(/[^a-zA-Z]/g, '')
}

function isCaseInsensitiveDuplicate(list, word){
    return list.findIndex(x => x.word.toLowerCase() === word.toLowerCase())
}

function sortListAlphabetically(list){
    return list.sort((a, b) => {
        let aWord = a.word.toUpperCase()
        let bWord = b.word.toUpperCase()
        if(aWord>bWord) return 1
        if(aWord<bWord) return -1
        return 0
    })
}
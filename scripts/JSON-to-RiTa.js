const fs = require('fs')
const RiTa = require('rita');

let outDirectorySentences = 'output/rita.json'

let wordsURL = 'output/words.json'
let sentenceURL = 'output/sentences.json'

// load input text
let inputText = function(url) {
    try {
        const data = fs.readFileSync(url, 'utf8')
        return JSON.parse(data)
    } catch (err) {
        console.error(err)
    }
}

let writeFile = function(input, directory) {
    try {
        const data = fs.writeFileSync(directory, input)
        console.log("written successfully")
        //file written successfully
    } catch (err) {
        console.error(err)
    }
}

// use Regex!
let punctuationCheck = function(character){
    const regex = /[.,()`!?']/g
    return regex.test(character);
    // if punctuation, return false
    // if not punctuation, return true
}

// use Regex!
let punctuationSpaceCheck = function(character) {
    // returns true or false if entry is an end punctuation mark
    // used for checking ahead an entry
    const regex = /[,)!?'.]/g
    return regex.test(character);
}

let endPunctuationSpace = function(character) {
    // if comma, end symbol )/, colon, semicolon - add a space
    // otherwise, do not add a space
    const regex = /[,)!?']/g
    if (regex.test(character)){
        return `${character} `
    } else {
        return character
    }
}

// input data
let words = inputText(wordsURL)
let sentences = inputText(sentenceURL)

// data structures
let tempObj = {}
let tempSentenceArray = []
let tempWordObj={}

// procsesing words
    // read through each array
    // combine each array with a '|' symbol
    // add array to a new object

console.log('words',sentences)

// tempObj.sentences = tempSentenceArray;
// tempObj.words = tempWordObj
// writeFile(JSON.stringify(tempObj),outDirectorySentences)
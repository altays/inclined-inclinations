const fs = require('fs')
const RiTa = require('rita');

let outDirectorySentences = 'output/sentences.json'

// load input text
let inputText = function() {
    try {
        const data = fs.readFileSync('rawData/prompts.json', 'utf8')
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
    const regex = /[,)!?]/g
    if (regex.test(character)){
        return `${character} `
    } else {
        return character
    }
}

let promptArray = inputText().prompts

let promptObj = {}
let tempStringArray= []

// looping over each sentence in the file

for (let h = 0; h < promptArray.length; h++) {

    let promptSentences = RiTa.sentences(promptArray[h]);

    // looping over each sentence in one prompt
    let tempSentenceArray = []
    let sentenceString = ""

    for (let i = 0; i < promptSentences.length; i++) {
        
        let stringPOSArray= RiTa.analyze(promptSentences[i]).pos.split(" ")
   
        // for expediency, replace the string of punctuation checks w/ regex
        for (let o = 0; o < stringPOSArray.length; o++) {
            if ((stringPOSArray[o] !== '\'') && (stringPOSArray[o] !== '.') && (stringPOSArray[o] !== ',') && (stringPOSArray[o] !== '?') && (stringPOSArray[o] !== '!') && (stringPOSArray[o] !== '(') && (stringPOSArray[o] !== ')') && (stringPOSArray[o] !== '[') && (stringPOSArray[o] !== ']')) {
                tempSentenceArray.push(`$${stringPOSArray[o]}`)
            } else {
                tempSentenceArray.push(`${stringPOSArray[o]}`)
            }
        }
    }
    
    for (let j = 0; j < tempSentenceArray.length; j++) {
      
        let newEntry = tempSentenceArray[j]
        let nextEntry = tempSentenceArray[j+1]
      

        if (punctuationCheck(newEntry) == true) {
            // if punctuation
            sentenceString +=endPunctuationSpace(newEntry);
        } else {
            // if not punctuation
            if (punctuationSpaceCheck(nextEntry)==true) {
                sentenceString += `${newEntry}`
            }  else {
                sentenceString += `${newEntry} `
            }
        
        }  
    }
    // console.log(sentenceString)
    tempStringArray.push(sentenceString.trimEnd())

}
promptObj.sentences=tempStringArray;

console.log(promptObj)
// insert array into object
writeFile(JSON.stringify(promptObj),outDirectorySentences)
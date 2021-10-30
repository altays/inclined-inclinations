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

let promptArray = inputText().prompts

let promptObj = {}

// looping over each sentence in the file

// console.log(promptArray)

for (let h = 0; h < promptArray.length; h++) {

    let promptSentences = RiTa.sentences(promptArray[h]);

    // looping over each sentence in one prompt

    let tempSentenceArray = []

    // console.log(promptSentences)

    for (let i = 0; i < promptSentences.length; i++) {
        
        let individualSentence = promptSentences[i]

        let sentencePOSString = ""

        console.log(individualSentence)
    }
}

// writeFile(JSON.stringify(promptObj),outDirectorySentences)
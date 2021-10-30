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

for (let h = 0; h < promptArray.length; h++) {

    let promptSentences = RiTa.sentences(promptArray[h]);

    // looping over each sentence in one prompt

    let tempSentenceArray = []

    for (let i = 0; i < promptSentences.length; i++) {
        
        let tokens = RiTa.analyze(promptSentences[i]).tokens.split(" ")
        // console.log(tokens)
        // looping over each word in a sentence

        let sentencePOSString = ""

        for (let j = 0; j < tokens.length; j++) {            

            console.log(`$${RiTa.pos(tokens[j])}`)
            
            // push sentencePOS to the temp sentence ARray
        }
    }
}

writeFile(JSON.stringify(promptObj),outDirectorySentences)

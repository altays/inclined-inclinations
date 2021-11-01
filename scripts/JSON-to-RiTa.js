const fs = require('fs')

let outDirectoryRiTa = 'output/rita.js'
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

// input data
let words = inputText(wordsURL)
let sentences = inputText(sentenceURL)

// data structures
let tempObj = {
    "start": "$lines",
    "lines": "$sentences | $sentences $sentences | $sentences $sentences $sentences"
}
let tempSentenceArray = []

// combining sentence array entries into one string
tempSentenceArray = sentences.join('|')

// pulling out keys
let wordKeys = Object.keys(words) 

for (let i = 0; i < wordKeys.length; i++) {
    tempObj[wordKeys[i]] = words[wordKeys[i]].join('|')
}

tempObj.sentences = tempSentenceArray;

writeFile(`let data = ${JSON.stringify(tempObj)}`,outDirectoryRiTa);
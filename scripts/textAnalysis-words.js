const fs = require('fs')
const RiTa = require('rita');
let outDirectoryWords = 'output/words.json'

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
    for (let i = 0; i < promptSentences.length; i++) {
        
        let tokens = RiTa.analyze(promptSentences[i]).tokens.split(" ")
        // looping over each word in a sentence

        for (let j = 0; j < tokens.length; j++) {            

            // let newWord = simplifyWord(tokens[j])
            let newWord= tokens[j].toLowerCase(); // not attempting to convert nouns and verbs to different conjugations/ singularizations
            let newWordPOS = `${RiTa.pos(newWord)}`
            
            // for conciseness, replace this with a regex thing
            if ((newWord !== '\'') && (newWord !== '.') && (newWord !== ',') && (newWord !== '?') && (newWord !== '!') && (newWord !== '(') && (newWord !== ')') && (newWord !== '[') && (newWord !== ']')) {
                
                if (Object.keys(promptObj).indexOf(newWordPOS) == -1) {
                    promptObj[newWordPOS]=[] 
                    promptObj[newWordPOS].push(newWord);
                } else {

                    if (promptObj[newWordPOS].indexOf(newWord) == -1) {
                        promptObj[newWordPOS].push(newWord);
                    }
                }   
            }
        }
    }
}

writeFile(JSON.stringify(promptObj),outDirectoryWords)
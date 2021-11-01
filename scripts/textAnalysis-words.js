const fs = require('fs')
const RiTa = require('rita');

let outDirectoryWords = 'output/words.json'

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

// converting verbs, nouns to consistent type
let simplifyWord = function(word) {
    let pos = RiTa.pos(word)
    
    let conjArgs = {
        tense: RiTa.PRESENT,
        number: RiTa.SINGULAR,
        person: RiTa.SECOND
    }
    
    switch (pos) {
        case 'vb':
        case 'vbd':
        case 'vbg':
        case 'vbn':
        case 'vbp':
        case 'vbz':
            return RiTa.conjugate(RiTa.stem(word),conjArgs).toLowerCase();
        case 'nns':
        case 'nnps':
            return RiTa.singularize(word).toLowerCase();

        default:
            return word.toLowerCase()
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
        // console.log(tokens)
        // looping over each word in a sentence

        for (let j = 0; j < tokens.length; j++) {            

            // let newWord = simplifyWord(tokens[j])
            let newWord= tokens[j].toLowerCase(); // not attempting to convert nouns and verbs to different conjugations/ singularizations
            let newWordPOS = `${RiTa.pos(newWord)}`
            
            // for conciseness, replace this with a regex thing
            if ((newWord !== '\'') && (newWord !== '.') && (newWord !== ',') && (newWord !== '?') && (newWord !== '!') && (newWord !== '(') && (newWord !== ')') && (newWord !== '[') && (newWord !== ']')) {
                
                // checking if array exists. 
                    //If it does, add new word if it doesn't already exist. 
                    // If it doesn't, create new array and add new word
                
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
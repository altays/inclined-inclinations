const fs = require('fs')
const RiTa = require('rita');

// load input text
let inputText = function() {
    try {
        const data = fs.readFileSync('rawData/prompts.json', 'utf8')
        return JSON.parse(data)
    } catch (err) {
        console.error(err)
    }
}

let writeFile = function(input) {
    try {
        const data = fs.writeFileSync('output/text.txt', input)
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
    
    switch (pos[0]) {
        case 'vb':
        case 'vbd':
        case 'vbg':
        case 'vbn':
        case 'vbp':
        case 'vbz':
            return RiTa.conjugate(word,conjArgs).toLowerCase();
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
    // console.log('NEW PROMPT')

    for (let i = 0; i < promptSentences.length; i++) {
        
        let tokens = RiTa.analyze(promptSentences[i]).tokens.split(" ")

        // looping over each word in a sentence
        // console.log('NEW SENTENCE')
      
        for (let j = 0; j < tokens.length; j++) {
            // console.log(analysis[j],RiTa.pos(analysis[j]))

            let newWord = simplifyWord(tokens[j])
            let newWordPOS = `$${RiTa.pos(newWord)}`

            // for conciseness, replace this with a regex thing
            if ((newWord !== '\'') && (newWord !== '.') && (newWord !== ',') && (newWord !== '?') && (newWord !== '!') && (newWord !== '(') && (newWord !== ')') && (newWord !== '[') && (newWord !== ']')) {
                
                // console.log(RiTa.pos(tokens[j]))
                if (Object.keys(promptObj).indexOf(newWordPOS) == -1) {
                    // console.log('this does not exist')
                    // promptObj.RiTa.pos(tokens[j]) = [];
                    promptObj[newWordPOS]=[] 
                    promptObj[newWordPOS].push(newWord);
                    
    
                } else {
                    // console.log('this does exist')
                    promptObj[newWordPOS].push(newWord);
                }   
            }
       
            // reconstruct sentence array entries with each entry starting with a $ sign
                // 
                // if character is punctuation, add  directly to the last word

            // if property doesn't exist, 
            // if (Object.keys(promptObj).indexOf(RiTa.pos(analysis[j])) !== -1) {

                // promptObj[RiTa.pos(analysis[j])] = [analysis[j]]
                // console.log(Object.keys(promptObj))
                // console.log("unique",promptObj[RiTa.pos(analysis[j])])
            // } else {
            //     // otherwise 
            //     promptObj[RiTa.pos(analysis[j])].push(analysis[j])
            //     console.log("not unique", analysis[j])
            // }
        }

    }
}

console.log(promptObj)

// using fs, save file

// writeFile(content)
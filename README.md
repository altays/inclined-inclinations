# inclined-inclinations

Ever get stuck? Generate your way out of it!

This uses RiTa.js to programmatically / randomly generate text based on preset grammar patterns and sets of words organized by parts of speech.

In less jargony terms, for all of the individual words in a sentence, it pulls a word from one of many hats labelled by part of speech then organizes them by that sentence structure.

Apart from reconstructing sentences, there isn't any extra 'grammar' that goes into it, which can lead to some very dadaist output.

# ways to hack it

Want to use the words from Brian Eno's 'Oblique Strategies' with the grammatical patterns from Mary Shelley's 'Frankenstein'? You can do that!

If you have Node.js and a code editor, you can do this by cloning the repo, dropping JSON into the 'input' folder, and running 'npm run generate' - this will analyze the words and sentence structures, then recombine those outputs into a js file that gets used by the index.html file.

Future improvements include a script to break large blocks of text into json files to make implementation of new text easier.

# acknowledgements

THis project is both inspired by and uses grammar / words from the wonderful folx at Dogbotic Labs (https://dogbotic.com/ - check out their workshops!) as well as Brian Eno's Oblique Strategies. 
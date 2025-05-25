const data = ['kayak', 'SOS', 'Kayak', 'Bonjour'];
//check if it is a plaimdrom

function isPalindrome(data){
   const reverseWord = data.toLowerCase().split("").reverse().join("")
   const ifTrue = data.toLowerCase() === reverseWord
   let answer ;
   if(ifTrue){
     answer = "is"
   }else{
     answer = "is not"
   }
   
   return console.log(`This word: ${data} ${answer} a palindrome`)
}

for(let word of data){
    isPalindrome(word)
}



const students = [
    {
        name: 'John',
        notes: [1, 20, 18, 19, 12]
    },
    {
        name: 'Jane',
        notes: [17, 18, 20, 13, 15]
    },
    {
        name: 'Sophie',
        notes: [17, 12, 14, 15, 13]
    },
    {
        name: 'Marc',
        notes: [2, 3, 5, 8, 9]
    },
    {
        name: 'Manon',
        notes: [18, 17, 18, 19, 12]
    }
]

//add moyenne 

function addMoyenne(classe){
   for(let student of classe){
    const sum = student.notes.reduce((acc,val) => acc + val, 0)
    const moyenne = sum / student.notes.length
    student.moyenne = moyenne
   }
   console.log(classe)
}

addMoyenne(students)

// moyenne G 

function moyenneG(classe){
    const sumG = Object.values(classe)
    console.log(sumG)
    let arrayNotes = sumG.map((student) => student.moyenne)
    console.log(arrayNotes)
    arrayNotes = arrayNotes.reduce((acc,val)=> acc + val, 0)
    console.log(arrayNotes)
    const moyenneG = arrayNotes / sumG.length
    console.log(moyenneG)
}

moyenneG(students)


// Top 3 

function top3(classe){
    const sorted = classe.sort((a,b) => b.moyenne - a.moyenne)
    console.log(`${sorted[0].name} & ${sorted[0].moyenne}
        ${sorted[1].name} & ${sorted[1].moyenne}
        ${sorted[2].name} & ${sorted[2].moyenne}`)
}

top3(students)
// calculate the frenquencie of the word 
const phrase = ` Voici Joyce Wischnia, alias l'alésoir.translation: Phyllis, this is Joyce Wischnia, aka "the Reamer".Crédule petite Joyce qui croyait aux sornettes.translation: The small and gullible Joyce tall tales that thought.Colérique petite Joyce avec qui on se battait.translation: The small and temperamental Joyce with which you could fight.Joyce a remarqué ma dépression chez Howard Johnson.translation: Joyce witnessed my nervous breakdown at Howard Johnson's today.Notre invitée spéciale, Joyce Watney.translation: EMCEE: And now, our special guest tonight, Joyce Watney.Les sénateurs Joyce Fairbairn et Marjory LeBreton ont proposé et appuyé la motion.translation: Senators Joyce Fairbairn and Marjory LeBreton moved and secons plus puissant que celui de la morphine.translation: Fentanyl is approximately 100-fold more potent than morphine as an analgesic.De telles formulations permettent une absorption accrue de la morphine ou de sels de celle-ci, acceptables sur le plan pharmacologique.translation: Such formulations provide enhanced absorption of morphine or pharmaceutically acceptable salts thereof.On a développé un paradigme opioïde topique permettant de déterminer les effets périphériques analgésiques de la morphine.translation: A topical opioid paradigm was developed to determine analgesic peripheral effects of morphine.Les antagonistes du récepteur du NMDA ont inversés la tolérance à la morphine préexistante.translation: NMDA receptor antagonists reversed pre-existing morphine tolerance.La morphine a déjà été mentionnée parmi les sédatifs narcotiques.translation: Morphine has already been mentioned among the narcotic sedatives.Il peut aussi comprendre des analgésiques tels que la morphine.translation: The pharmaceutical agent can also include analgesics such as morphine.La présente invention concerne une nouvelle formulation orale à libération prolongée de sulfate de morphine sous forme de microgranules.translation: The invention concerns a novel oral formulation wit `

//First need to clean the sentense

function frenquence(phrase){
    const wordMap = []
    const ignored = [',', '?', '!', '.', ';', "'", ':', '"'];
    let cleanPhrase = phrase.toLowerCase()

    for(let character of ignored){
        cleanPhrase = cleanPhrase.replaceAll(character, "")
    }

    cleanPhrase = cleanPhrase.split(" ");

    for(let word1 of cleanPhrase){
        if(word1.length > 2){
            existing = wordMap.find(item => item.word === word1)
                if(existing){
                    existing.count +=1
                }else{
                    wordMap.push({ word: word1, count: 1})
                }
        }
    }
    console.log(wordMap)

    const sorted = wordMap.sort((a,b)=> b.count - a.count)

    console.log(sorted)
}

frenquence(phrase)

//Anagram Grouping & Top Words

/* Given a phrase, your goal is to:

    Clean the text by removing punctuation and making everything lowercase.

    Split it into words (same as you did before).

    Group words that are anagrams of each other (e.g., "listen" and "silent").

    Count the frequency of each anagram group.

    Return the top 3 most frequent anagram groups.*/

const phrase2 = `Listen to the silent notes.     Enlist your time well.     The stone is not silent, it's a tone.     Tones and notes are often one.     Listen and enlist, again and again.`;

function anagramSolver(phrase){
    const ignored = [',', '?', '!', '.', ';', "'", ':', '"'];
    let cleanPhrase = phrase.toLowerCase()

    for(let character of ignored){
        cleanPhrase = cleanPhrase.replaceAll(character, "")
    }
    cleanPhrase = cleanPhrase.split(" ");

    const arrayMap = new Map()

    for(let word of cleanPhrase){
        const key = word.toLowerCase().split("").sort().join("")

        if(arrayMap.has(key)){
            const entry = arrayMap.get(key)
            entry.count +=1
            if(!entry.words.includes(word)){
                entry.words.push(word)
            }
        }else{
            arrayMap.set(key, {words: [word], count: 1 })
        }
    }

    console.log(arrayMap)
    const result = Array.from(arrayMap.values());
    console.log(result)
    const sorted = result.sort((a,b)=> b.count -a.count)
    console.log(sorted)


}

anagramSolver(phrase2)
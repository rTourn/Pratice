const data = ['kayak', 'SOS', 'Kayak', 'Bonjour'];
//check if it is a plaimdrom
function isPalindrome(word){
    const reverseWOrd = word.toLowerCase().split('').reverse().join('')
    return word.toLowerCase() === reverseWOrd

}
for(let word of data){
    console.log(`${word} is ${isPalindrome(word)}`)
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

function addMoyenne(students){
    for(let student of students){
        const sum = student.notes.reduce((acc,val) => acc + val,0)
        const moyenne = sum / student.notes.length
        student.moyenne = moyenne
    }
    console.log(students)
}
addMoyenne(students)

// moyenne G 

function moyenneG(students){
    const arrayAllMoyenne = Object.values(students).map(eleve => eleve.moyenne)
    console.log(arrayAllMoyenne);
    const sumAllMoyenne = arrayAllMoyenne.reduce((acc, val)=> acc + val, 0);
    console.log(sumAllMoyenne);
    return console.log( sumAllMoyenne / students.length)
}
moyenneG(students)
// Top 3 

function top3(students){
    const sorted = [...students].sort((a,b)=> b.moyenne - a.moyenne);
    const top3 = sorted.slice(0,3);
    return console.log(top3)
}

top3(students)

// calculate the frenquencie of the word 
const phrase = ` Voici Joyce Wischnia, alias l'alésoir.translation: Phyllis, this is Joyce Wischnia, aka "the Reamer".Crédule petite Joyce qui croyait aux sornettes.translation: The small and gullible Joyce tall tales that thought.Colérique petite Joyce avec qui on se battait.translation: The small and temperamental Joyce with which you could fight.Joyce a remarqué ma dépression chez Howard Johnson.translation: Joyce witnessed my nervous breakdown at Howard Johnson's today.Notre invitée spéciale, Joyce Watney.translation: EMCEE: And now, our special guest tonight, Joyce Watney.Les sénateurs Joyce Fairbairn et Marjory LeBreton ont proposé et appuyé la motion.translation: Senators Joyce Fairbairn and Marjory LeBreton moved and secons plus puissant que celui de la morphine.translation: Fentanyl is approximately 100-fold more potent than morphine as an analgesic.De telles formulations permettent une absorption accrue de la morphine ou de sels de celle-ci, acceptables sur le plan pharmacologique.translation: Such formulations provide enhanced absorption of morphine or pharmaceutically acceptable salts thereof.On a développé un paradigme opioïde topique permettant de déterminer les effets périphériques analgésiques de la morphine.translation: A topical opioid paradigm was developed to determine analgesic peripheral effects of morphine.Les antagonistes du récepteur du NMDA ont inversés la tolérance à la morphine préexistante.translation: NMDA receptor antagonists reversed pre-existing morphine tolerance.La morphine a déjà été mentionnée parmi les sédatifs narcotiques.translation: Morphine has already been mentioned among the narcotic sedatives.Il peut aussi comprendre des analgésiques tels que la morphine.translation: The pharmaceutical agent can also include analgesics such as morphine.La présente invention concerne une nouvelle formulation orale à libération prolongée de sulfate de morphine sous forme de microgranules.translation: The invention concerns a novel oral formulation wit `

//First need to clean the sentense

function frenquence(phrase){
    const wordMap = {};
    const wordMapArray = []
    const ignored = [',', '?', '!', '.', ';', "'", ':', '"'];
    let cleansentense = phrase.toLowerCase();

    for(character of ignored){
        cleansentense = cleansentense.replaceAll(character, "");
    
    }
    const splitCleanSentense = cleansentense.split(" ")
    
    for(let word of splitCleanSentense){
        if(wordMap[word] && word.length > 2){
            wordMap[word] += 1;
        }else if(word.length >2){
            wordMap[word] = 1
        }
    }

    for(let i in wordMap){
        wordMapArray.push({
            word : i,
            count : wordMap[i]
        })
    }

    console.log(wordMap)
    console.log(wordMapArray)

    wordMapArray.sort((a,b) => b.count - a.count)
    console.log(wordMapArray)
}

frenquence(phrase)
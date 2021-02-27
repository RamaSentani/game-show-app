var qwerty = document.getElementById('qwerty');
var phrase = document.getElementById('phrase');
var startButton = document.getElementById('overlay');
var startButtonLink = document.getElementsByClassName('btn__reset');
var missed = 0;

var phrases = [
    'application programming interface',
    'cascading style sheets',
    'hypertext markup language',
    'syntactically awesome style sheets',
    'structured query language'
];

// return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    var i = Math.floor(Math.random() * arr.length);
    var letterArray = arr[i].split("");
    return letterArray;
}

// adds the letters of a string to the display
const addPhrasetoDisplay = arr => {
    for (var i = 0; i < arr.length; i++) {
        var li = document.createElement('li');
        var letter = document.createTextNode(arr[i]);
        li.appendChild(letter);
        if (li.innerText.indexOf(' ') >= 0) {
            li.className = 'space';
            document.getElementsByTagName('ul')[0].appendChild(li);
        } else {
            li.className = 'letter';
            document.getElementsByTagName('ul')[0].appendChild(li);
        }
    }
}
const phraseArray = getRandomPhraseAsArray(phrases);
addPhrasetoDisplay(phraseArray);

// check if a letter is in the phrase
const checkLetter = button => {
    var letter = document.getElementsByClassName('letter');
    var letterFound = 0;
    var match = false;
    for (var i = 0; i < letter.length; i++) {
        if (button == letter[i].innerText) {
            letter[i].className += ' show';
            letterFound += 1;
            match = true;
            if (i == letter.length) {
                return match;
            }
        }
        else if (i == letter.length - 1 && match == true) {
            return match;
        }
        else if (i == letter.length - 1 && match == false) {
            return null;
        }
    }
};

// check if the game has been won or lost
const checkWin = () => {
    var show = document.getElementsByClassName('show');
    var letter = document.getElementsByClassName('letter');
    // if player won
    if (show.length == letter.length) {
        startButton.style.display = 'flex';
        startButton.className = 'win';
        startButtonLink[0].innerText = 'You Won!'
    }
    // if player lost 
    else if (missed > 4) {
        startButton.style.display = 'flex';
        startButton.className = 'lose';
        startButtonLink[0].innerText = 'You Lost!';
    }
}

// listen for the start game button to be pressed
startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
});

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e => {
    const target = e.target;
    if (target.nodeName == 'BUTTON') {
        target.className += ' chosen';
        target.disabled = true;
        if (checkLetter(target.innerText) === null) {
            var scoreboard = document.getElementsByTagName('ol');
            var tries = document.getElementsByClassName('tries');
            scoreboard[0].removeChild(tries[0]);
            missed += 1;
            checkWin();
        } else {
            checkWin();
        }
    }
});
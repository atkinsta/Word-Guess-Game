var wins;
var guessesLeft;
var guessList = [];
var chosenWord;
var copiedWord;
var hiddenWord;

var targetWords = ["Taj Mahal", "Everest", "Mt Rushmore", "Yosemite"]


function gameInit() {
    wins = 0;
    guessesLeft = 12;
    guessList = [];
    chosenWord = targetWords[Math.floor(Math.random() * targetWords.length)];
    copiedWord = chosenWord
    hiddenWord = chosenWord.replace(/[^\s]/g, "_");
}

function gameWin() {
    wins++;
    guessList = [];
    guessesLeft = 12;
    chosenWord = targetWords[Math.floor(Math.random() * targetWords.length)];
    copiedWord = chosenWord
    hiddenWord = chosenWord.replace(/[^\s]/g, "_");
    console.log("You Win!");
}


// This function allows us to replace a character in a string at a specific index (Stack Overflow helped a lot with this)
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}


gameInit();
console.log(hiddenWord);
document.onkeydown = function (event) {
    var userGuess = event.key;
    var location = copiedWord.toLowerCase().indexOf(userGuess);
    console.clear();
    if (location == -1) {
        ;
        if (guessList.indexOf(userGuess) !== -1) {
            console.log("Already guessed");
        }
        else {
            guessesLeft--
            guessList.push(userGuess);
        }
    }
    else {
        while (location !== -1) {
            copiedWord = copiedWord.replaceAt(location, "0");
            hiddenWord = hiddenWord.replaceAt(location, userGuess);
            location = copiedWord.toLowerCase().indexOf(userGuess);
        }
        if (hiddenWord == chosenWord.toLowerCase())
            gameWin();
    }
    console.log(hiddenWord);
    console.log(guessList);
    console.log(guessesLeft);
}
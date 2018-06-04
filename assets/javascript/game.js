var wins;
var guessesLeft;
var guessList = [];
var chosenWord;
var copiedWord;
var hiddenWord;
var gameRunning;

var targetWords = ["Taj Mahal", "Everest", "Mt Rushmore", "Yosemite", "The Great Wall of China", "The Pyramids of Giza", "Buckingham Palace "]


function gameInit() {
    wins = 0;
    guessesLeft = 12;
    guessList = [];
    chosenWord = targetWords[Math.floor(Math.random() * targetWords.length)];
    copiedWord = chosenWord
    hiddenWord = chosenWord.replace(/[^\s]/g, "_");
    gameDisplay();
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

function gameLoss() {
    alert("You lost.");
    gameInit();
}

function gameDisplay(wins, guessesLeft, hiddenWord, guessList) {
    $("#wins").text(wins);
    $("#guesses").text(guessesLeft);
    $("#hidden-word").text(hiddenWord);
    $("#guess-list").text(guessList);
}

// This function allows us to replace a character in a string at a specific index (Stack Overflow helped a lot with this)
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

gameDisplay(wins, guessesLeft, hiddenWord, guessList);
gameInit();
console.log(hiddenWord);
document.onkeydown = function (event) {
    var userGuess = event.key;
    if (/^[a-z]{1}/.test(userGuess)) {
        var location = copiedWord.toLowerCase().indexOf(userGuess);
        console.clear();
        if (location == -1) {
            if (guessList.indexOf(userGuess) !== -1) {
                console.log("Already guessed");
            }
            else {
                if (hiddenWord.indexOf(userGuess) == -1) {
                    guessesLeft--;
                    guessList.push(userGuess);
                    if (guessesLeft === 0) {
                        gameLoss();
                    }
                }
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
        gameDisplay(wins, guessesLeft, hiddenWord, guessList);
    }
}
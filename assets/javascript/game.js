//TODO: Add a "hint" function, add more style.

//GLOBAL VARIABLES
var wins;
var guessesLeft;
var guessList = [];
var chosenWord;
var copiedWord;
var hiddenWord;

var targetWords = ["Taj Mahal", "Everest", "Mt Rushmore", "Yosemite", "The Great Wall of China", "The Pyramids of Giza", "Buckingham Palace", "Shanghai", "Rio De Janeiro",
                    "Machu Picchu", "Chichen Itza", "The Colosseum", "Amazon Rainforest", "New York"];

//MAIN GAME FUNCTIONS
function gameInit() {
    wins = 0;
    guessesLeft = 12;
    guessList = [];
    chooseWord();
    gameDisplay(wins, guessesLeft, hiddenWord, guessList);
}

function gameWin() {
    $("#winner").attr("src", "assets/images/" + chosenWord + ".jpg"); //have to put this before a new word is chosen.
    $("#status").text("You Win! The place was " + chosenWord);
    wins++;
    guessList = [];
    guessesLeft = 12;
    chooseWord();
}

function gameLoss() {
    $("#status").text("You lost. :( The place was " + chosenWord);
    gameInit();
}

function gameDisplay(wins, guessesLeft, hiddenWord, guessList) {
    $("#wins").text(wins);
    $("#guesses").text(guessesLeft);
    $("#hidden-word").text(hiddenWord);
    $("#guess-list").text(guessList);
}

function chooseWord() {
    //Removes the words as they're chosen, so you don't get the same word twice.
    if (targetWords.length > 0){
        chosenWord = targetWords[Math.floor(Math.random() * targetWords.length)];
        targetWords.splice(targetWords.indexOf(chosenWord), 1)
        copiedWord = chosenWord;                                    //This must be done because we mutilate the copiedWord and need choseWord to compare with. 
        hiddenWord = chosenWord.replace(/[^\s]/g, "_");             //This uses a regular expression to create a hidden word with only underscores and spaces
    }
    else {
        alert("Wow, you beat the game! I have no words left for you. Refresh to replay!")
    }
}

// This function allows us to replace a character in a string at a specific index (Stack Overflow helped a lot with this)
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

//MAIN GAME LOOP/LOGIC
gameInit();
document.onkeydown = function (event) {
    var userGuess = event.key.toLowerCase();                        //Ensures caps lock doesn't affect input.
    if (/^[a-z]{1}$/.test(userGuess)) {                             //Regular expression checks if the input is a-z and only one character long (avoids tab/backspace/ect being inputed).
        var location = copiedWord.toLowerCase().indexOf(userGuess);
        if (location == -1) {                                       //If userGuess is NOT in the chosenWord
            if (guessList.indexOf(userGuess) !== -1) {              //Checks if userGuess is in the array of already guessed characters
                $("#status").text("Already guessed");
            }
            else {                                                  //If not, minus one guess, add to array, and check to see if player lost.
                if (hiddenWord.indexOf(userGuess) == -1) {          //Ensures we're not putting correct but repeat guesses into the guessList array.
                    guessesLeft--;
                    guessList.push(userGuess);      
                    if (guessesLeft === 0) {
                        gameLoss();
                    }
                }
                else                                                //Pops into status messege
                    $("#status").text("You've already guessed this character correctly!");
            }
        }
        else {                                                      //If userGuess IS in the chosenWord
            while (location !== -1) {                               //Ensures each instance of the userGuess is noted and replaced in hiddenWord. 
                copiedWord = copiedWord.replaceAt(location, "0");   //"Nulls" out the copiedWord so it can check for other occurances of userGuess.
                hiddenWord = hiddenWord.replaceAt(location, userGuess);
                location = copiedWord.toLowerCase().indexOf(userGuess);
            }
            if (hiddenWord == chosenWord.toLowerCase())
                gameWin();
        }
        gameDisplay(wins, guessesLeft, hiddenWord, guessList);
    }
    else {
        $("#status").text("Please use only the keys a-z");
    }
}
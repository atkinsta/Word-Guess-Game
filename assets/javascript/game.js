var wins;
var guessesLeft;
var guessList = [];

var targetWords = ["Taj Mahal", "Everest", "Mt Rushmore", "Yosemite"]
var chosenWord = targetWords[Math.floor(Math.random() * targetWords.length)];
var copiedWord = chosenWord
var hiddenWord = chosenWord.replace(/[^\s]/g, "_");

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
console.log(hiddenWord);
document.onkeydown = function(event) {
    var userGuess = event.key;
    var location = copiedWord.toLowerCase().indexOf(userGuess);
    console.clear();
    if (location == -1){

        if (guessList.indexOf(userGuess) !== -1){
            console.log("Already guessed");
        }
        else {
            guessList.push(userGuess); 
        }
    }
    else {  
        while (location !== -1){
        copiedWord = copiedWord.replaceAt(location, "0");
        hiddenWord = hiddenWord.replaceAt(location, userGuess); 
        location = copiedWord.toLowerCase().indexOf(userGuess);
        }
        if (hiddenWord == chosenWord.toLowerCase())
            alert("You win!");
    }
    console.log(hiddenWord);
    console.log(guessList);
    console.log(copiedWord.indexOf(userGuess))
}
/*jshint esversion: 6 */
const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below :
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);

    if (textEntered == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "green";
            testArea.style.color = "black";
        } else {
            //findUnevenLetters(textEntered,originTextMatch)
            testWrapper.style.borderColor = "red";
            testArea.style.color = "red";
        }
    }

}
//unfinished work for making wrong typed letter only to change color.
// function findUnevenLetters(textEntered,originTextMatch){
//    var textEnteredletter = textEntered.split('');
//    var originTextMatchLetter = originTextMatch.split('');

//    for(var i = 0 ;i < originTextMatchLetter.length;i++){
//        var unevenTextMatch = originTextMatchLetter[i];
//        var unevenTextEntered = textEnteredletter[i];
//        if (unevenTextEntered !== unevenTextMatch){
//            console.log(unevenTextEntered);
//            //var reges = /?<name>unevenTextEntered/
//             textEntered.replace(
//              unevenTextEntered, 
//             ' <span class="selected">' + unevenTextEntered + '</span> ');
//        }
//    }

   


// }


// Start the timer:
function start() {
    let textEnterdLength = testArea.value.length;
    if (textEnterdLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnterdLength);
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);

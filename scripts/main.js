"use strict"

const hangmanModule = (function() {
const wordDisplay = document.querySelector('.display-random-word');
const letterGuess = document.querySelector('.keyboard');
let wordsArray = null;
let userGuesses = [];
let randWord = '';
let guess = "";


  function displayLetterBorders (palabraRandom) {
    for (let i=0; i<palabraRandom; i++) {
      let newLetterDiv = document.createElement('DIV');
      wordDisplay.appendChild(newLetterDiv);
      newLetterDiv.className = `new-letter  a${i}`;
      console.log('running-loop');
    }
  }


  function loadWordsData() {
    let http = new XMLHttpRequest();

    http.onreadystatechange = function() {
      if(http.readyState === 4 && http.status === 200) {
        wordsArray = JSON.parse(http.response);
        // console.log(wordsArray);
        randomWordSelect(wordsArray);

      }
    }

    http.open('GET', './data/words.JSON', true);
    http.send();
  }

  function randomWordSelect(arg1) {
    let randNum = Math.floor(Math.random()*100);
    randWord = arg1[randNum].content;
    let randWordLength = randWord.length;
    displayLetterBorders(randWordLength);
    console.log(randWord);
  }

  function bindKeyboard() {
    letterGuess.addEventListener('click', (event) => {
      if (event.target && event.target.matches ("li.char")) {
        console.log( event.target.textContent + " "  +  "was clicked!");
        guess = event.target.textContent;
        userGuesses.push(guess);
        lookForLetterMatch();
	      }
    });
  }

  function lookForLetterMatch() {
    let randWordArray = randWord.split('');
    let resultsArray = [];
    for (let i = 0; i < randWordArray.length; i++) {
        if (guess === randWordArray[i]) {
          resultsArray.push(guess);
          let guessLocation = randWordArray.indexOf(guess);
          let displayGuess = document.querySelector(`.a${guessLocation}`);
          console.log(randWord, guessLocation, displayGuess);
          displayGuess.innerHTML = guess;
      }
    }
  }


  function countGuessesRemaining(){

  }

  function init() {
    loadWordsData();
    bindKeyboard();
  }

  return {
    init: init
  }


})();

const hangApp = hangmanModule.init();

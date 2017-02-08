"use strict"

const hangmanModule = (function() {
const wordDisplay = document.querySelector('.display-random-word');
const letterGuess = document.querySelector('.keyboard');
let wordsArray = null;


  function displayLetterBorders (palabraRandom) {
    console.log(palabraRandom);
    for (let i=0; i<palabraRandom; i++) {
      let newLetterDiv = document.createElement('DIV');
      wordDisplay.appendChild(newLetterDiv);
      newLetterDiv.className = 'new-letter';
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

  function randomWordSelect(arrayDePalabras) {
    let randNum = Math.floor(Math.random()*100);
    let randWord = arrayDePalabras[randNum].content;
    let randWordLength = randWord.length;
    console.log(randWord);
    displayLetterBorders(randWordLength);
    lookForLetterMatch(randWord);
  }

  function bindKeyboard() {
    letterGuess.addEventListener('click', (event) => {
      if (event.target && event.target.matches ("li.char")) {
        console.log( event.target.textContent + " "  +  "was clicked!");
        let guess = event.target.textContent;
        console.log(guess);
	      }
    });
  }

  function lookForLetterMatch(wordBeenRamdonized) {
    let str = wordBeenRamdonized;
    let count = 0;
    let pos = str.indexOf("a");
    while (pos !== -1) {
      count++;
      pos = str.indexOf("a", pos + 1);
    }
    console.log(pos);
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

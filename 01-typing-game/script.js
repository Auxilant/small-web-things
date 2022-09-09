import {words as wordString} from "./words.js" 

const toggleClass = (el, className) => {
    if (el.classList.contains(className))
        el.classList.remove(className);
    else
        el.classList.add(className);
}

const toggleElement = (el) => {
    toggleClass(el, "hidden")
}

const startGameButton = document.querySelector("#start");
const gameSection = document.querySelector("#game");
const statsSection = document.querySelector("#stats");
const wordForm = document.querySelector("#word-form");
const wordInput = document.querySelector("#word-input");
const wordsContainer = document.querySelector("#words-container");
const wordToType = document.querySelector("#word-to-type");

const words = wordString.split(' ');

const maxTime = 30;
const state = {
    timer: 0,
    score: 0,
}

const startGame = () => {
    toggleElement(startGameButton);
    toggleElement(gameSection);
    toggleElement(statsSection);

    wordInput.focus();

    getRandomWord();
    updateStats();
    const interval = setInterval(() => {
        state.timer += 1;
        updateStats();
        if (state.timer === maxTime) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

const endGame = () => {
    toggleElement(gameSection);
    toggleElement(timeSpan);
}

const getRandomWord = () => {
    const rand = Math.floor(Math.random() * words.length);
    wordToType.textContent = words[rand];
}

const makeWordSpan = (word, className) => {
    const newSpan = document.createElement("span");
    newSpan.textContent = word;
    newSpan.classList.add(className);
    newSpan.classList.add("typed-word");
    wordsContainer.appendChild(newSpan);
}

const addWord = (word, isCorrect) => {
    if (isCorrect)
        makeWordSpan(word, "correct-word");
    else
        makeWordSpan(word, "wrong-word");
}

const wpmSpan = document.querySelector("#wpm");
const scoreSpan = document.querySelector("#score");
const timeSpan = document.querySelector("#time");

const updateStats = () => {
    scoreSpan.textContent = state.score;
    timeSpan.textContent = maxTime - state.timer;
    wpmSpan.textContent = (state.score * 60 / state.timer || 0).toFixed(2);
}

startGameButton.addEventListener("click", () => {
    startGame();
})

wordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (wordInput.value === wordToType.textContent) {
        addWord(wordInput.value, true);
        state.score += 1;
    }
    else {
        addWord(wordInput.value, false);
    }
    wordInput.value = '';

    updateStats();

    getRandomWord();
})
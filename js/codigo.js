const wordContainer = document.getElementById('wordContainer')  // Me traigo al div
const startButton = document.getElementById('startButton')  // Me traigo al boton
const usedLettersElement = document.getElementById('usedLetters')  // Me traigo al otro div

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')  // Lllamo al canvas y asigno el metodo getContext
ctx.canvas.width = 0
ctx.canvas.height = 0

const bodyParts = [
    [4, 2, 1, 1],
    [4, 3, 1, 2],
    [3, 5, 1, 1],
    [5, 5, 1, 1],
    [3, 3, 1, 1],
    [5, 3, 1, 1]

]

let selectedWord;  // Declaramos variables
let usedLetters;
let mistakes;
let hits;

startButton.addEventListener("click", startGame)

function startGame() {  // Seteamos todas las variables en cero
    usedLetters = []
    mistakes = 0
    hits = 0
    wordContainer.innerHTML = ''
    startButton.style.display = 'none'
    drawHangMan()  // Declaramos una funcion
    selectRandomWord()  // Declaramos otra funcion
    drawWord()  // Declaramos otra funcion
    document.addEventListener('keydown', letterEvent)  // Cuando el usuario apriete cualquier tecla, llamamos a la funcion letterEvent
}

function addLetter(letter) {
    const letterElement = document.createElement('span')
    letterElement.innerHTML = letter.toUpperCase()
    usedLettersElement.appendChild(letterElement)
}

function addBoddyPart(bodyPart) {
    ctx.fillStyle = '#fff'
    ctx.fillRect(...bodyPart)
}

function wrongLetter() {
    addBoddyPart(bodyParts[mistakes])
    mistakes++
    if (mistakes === bodyParts.length) endGame()
}

function endGame() {
    document.removeEventListener('keydown', letterEvent)
    startButton.style.display = 'block'
}

function correctLetter(letter) {
    const { children } = wordContainer
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden')
            hits++
        }
    }
    if (hits === selectedWord.length) endGame()
}

function letterInput(letter) {
    if (selectedWord.includes(letter)) {
        correctLetter(letter)
    } else {
        wrongLetter()
    }
        addLetter(letter)
        usedLetters.push(letter)
}


function letterEvent(e) {
    let newLetter = e.key.toUpperCase()  // La letra que apreto la pone en mayusculas
    if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter)  // Si es V, llamamos a la funcion asignada
    }
}

function drawWord() {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span')
        letterElement.innerHTML = letter.toUpperCase()
        letterElement.classList.add('letter') // le agregamos una clase
        letterElement.classList.add('hidden') // le agregamos otra clase
        wordContainer.appendChild(letterElement)  // Ubico el span dentro del div
    })
}

function selectRandomWord() {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase()  // Te da una palabra aleatoria del array de palabras.js 
    selectedWord = word.split('')   // La palabra queda separada
}

function drawHangMan() {  // Funcion para dibujar al ahorcado
    ctx.canvas.width = 120
    ctx.canvas.height = 160
    ctx.scale(20, 20)
    ctx.clearRect(0, 0, canvas.width, canvas.height)  // Borra todo lo que halla
    ctx.fillStyle = '#d95d39'   // Pinta la parte de madera donde cuelga el hombre
    ctx.fillRect(0, 7, 4, 1)
    ctx.fillRect(1, 0, 1, 8)
    ctx.fillRect(2, 0, 3, 1)
    ctx.fillRect(4, 1, 1, 1)
}
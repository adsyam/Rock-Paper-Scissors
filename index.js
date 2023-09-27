const score = JSON.parse( localStorage.getItem( 'score' ) ) || {
  wins: 0,
  losses: 0,
  ties: 0
}

updateScore()

const autoPlayButton = document.querySelector( '.auto-play' )
const resetScoreButton = document.querySelector( '.reset-score' )

let isAutoPlaying = false
let intervalId

const userInput = document.querySelector( '#user' )

userInput.addEventListener( 'keydown', event => {
  const enter = event.key
  if ( enter === 'Enter' ) {
    welcomeSection()
  }
} )

function welcomeSection () {

  if ( userInput.value === '' ) {
    document.querySelector( '.error' ).style.display = 'block'
  } else if ( userInput.value !== '' ) {
    document.querySelector( '#play-area' ).style.display = 'flex'
    document.querySelector( '#welcome' ).classList.add( 'hidden' )
    userInput.value = ''
  }
}

const resultTable = {
  rock: {
    scissors: 'You win',
    paper: 'You lose',
    rock: 'Tie'
  },
  paper: {
    rock: 'You win',
    scissors: 'You lose',
    paper: 'Tie'
  },
  scissors: {
    paper: 'You win',
    rock: 'You lose',
    scissors: 'Tie'
  }
}

function pickComputerMove () {
  const randomNumber = Math.random()
  const computerMove =
  randomNumber < 1 / 3 ?
    'rock' : randomNumber < 2 / 3 ?
      'paper' : 'scissors'
  return computerMove
}

function playGame ( playerMove ) {
  const computerMove = pickComputerMove()

  const result = resultTable[playerMove][computerMove]

  if ( result === 'You win' ) {
    score.wins += 1
  } else if ( result === 'You lose' ) {
    score.losses += 1
  } else if ( result === 'Tie' ) {
    score.ties += 1
  }

  localStorage.setItem( 'score', JSON.stringify( score ) )

  updateScore()

  document.querySelector( '.moves' ).innerHTML = `<div class="flex flex-col" >
      <img src="src/images/${playerMove}-emoji.png" width="100">
      <p class="text-center" >You</p>
    </div>
    <div class="flex flex-col" >
        <img src="src/images/${computerMove}-emoji.png" width="100">
        <p class="text-center" >Computer</p>
    </div>`
}

function updateScore () {
  document.querySelector( '.score' ).innerHTML = `Wins: ${score.wins} 
    Losses: ${score.losses} 
    Ties: ${score.ties}`
}

function resetScore () {
  score.wins = 0
  score.losses = 0
  score.ties = 0
  localStorage.removeItem( 'score' )
  updateScore()
}

function autoPlay () {
  isAutoPlaying = !isAutoPlaying

  if ( isAutoPlaying ) {
    intervalId = setInterval( () => {
      const playerMove = pickComputerMove()
      playGame( playerMove )
    }, 1000 )
  } else {
    clearInterval( intervalId )
  }
}

resetScoreButton.addEventListener( 'click', resetScore )
autoPlayButton.addEventListener( 'click', autoPlay )

document.querySelector( '.rock' )
  .addEventListener( 'click', () => {
    playGame( 'rock' )
  } )

document.querySelector( '.paper' )
  .addEventListener( 'click', () => {
    playGame( 'paper' )
  } )

document.querySelector( '.scissors' )
  .addEventListener( 'click', () => {
    playGame( 'scissors' )
  } )
let playerSelection;
let computerSelection;
let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll('.btn');

buttons.forEach(
	button => {
		button.addEventListener('click', (e) => {
				main(button);
			}
		)
	}
)

function main(button) {
	turnOnScore();
	turnOnInfo();
	playerSelection = button.getAttribute('data-value');
	computerSelection = computerPlay();
	let result = playRound(playerSelection, computerSelection);
	updateScoreVars(result);
	updateScoreTracker();
	resultAlert(result);
	endGame();
}

function endGame() {
	if (playerScore === 5 || computerScore === 5) {
		announceWinner();
		playerSelection = '';
		computerSelection = '';
		playerScore = 0;
		computerScore = 0;
	}
}

function playRound(playerSelection, computerSelection) {
  let logic = {
    rock: {
      win: 'scissors', 
      loss: 'paper'
    },
    paper: {
      win: 'rock',
      loss: 'scissors'
    },
    scissors: {
      win: 'paper',
      loss: 'rock'
    }          
  }

  if (logic[playerSelection].win === computerSelection) {
    return 'win';
  }
  else if (logic[playerSelection].loss === computerSelection) {
    return 'loss';
  }
  else {
    return 'draw';
  }
}

function computerPlay() {
  let choice = getRandomInt(3);
  switch (choice) {
    case 0:
      return 'rock';
    case 1:
      return 'paper';
    case 2:
      return 'scissors';
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function turnOnScore() {
	const h1 = document.querySelector('h1');
	const score = document.querySelector('#score');
	
	if (score.getAttribute('class') == 'off') {
		h1.setAttribute('class', 'off');
		score.removeAttribute('class');
	}
}

function turnOffScore() {
	const h1 = document.querySelector('h1');
	const score = document.querySelector('#score');

	score.setAttribute('class', 'off');
	h1.removeAttribute('class');
}

function updateScoreVars(result) {
  switch (result) {
    case 'win':
      playerScore += 1;
      return;
    case 'loss':
      computerScore += 1;
      return;
  }
  playerScore += 1;
  computerScore += 1;
  return;
}

function updateScoreTracker() {
	const p_score = document.querySelector('#p-score');
	const c_score = document.querySelector('#c-score');

	p_score.textContent = playerScore;
	c_score.textContent = computerScore;
}

function turnOnInfo() {
	const info = document.querySelector('#info')

	if (info.getAttribute('class') === 'off') {
		info.removeAttribute('class');
	}
}

function turnOffInfo() {
	const info = document.querySelector('#info')

	info.setAttribute('class', 'off');
}

function updateInfo(string) {
	const info = document.querySelector('#info')
	info.innerHTML = string;
}

function resultAlert(result) {
	let p_choice = '<span style="color: #ff312e;">'+playerSelection.toUpperCase()+'</span>';
	let c_choice = '<span style="color: #ff312e;">'+computerSelection.toUpperCase()+'</span>';

	switch (result) {
    case 'win':
      updateInfo('You score!'+' '+p_choice+' beats '+c_choice+'!');
      break;
    case 'loss':
      updateInfo('Computer scores!'+' '+c_choice+' beats '+p_choice+'!');
      break;
    case 'draw':
      updateInfo('Draw! The computer chose '+c_choice+'!');
  }
}

function announceWinner() {
  if (playerScore > computerScore) {
    updateInfo('You <span style="color: #ff312e;">win</span> the game!<br>How about another round?');
  }
  else if (playerScore < computerScore) {
    updateInfo('You <span style="color: #ff312e;">lost</span> the game!<br>Want to try again?');
  }
  else {
    updateInfo('The game ended in a <span style="color: #ff312e;">draw</span>!<br>Want to try again?');
  }
}
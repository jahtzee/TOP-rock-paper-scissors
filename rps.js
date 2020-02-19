let playerSelection;
let computerSelection;
let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll('.btn');

buttons.forEach(
	button => {
		button.addEventListener('click', (e) => {
			playerSelection = button.getAttribute('data-value');
			computerSelection = computerPlay();
			let result = playRound(playerSelection, computerSelection);
			scoreTracker(result);
			resultAlert(result);
			if (playerScore === 5 || computerScore === 5) {
				announce();
				playerSelection = '';
				computerSelection = '';
				playerScore = 0;
				computerScore = 0;
			}
		})
	}
)

function playRound(playerSelection, computerSelection) {
  let logic = {
    rock: {
      win: "scissors", 
      loss: "paper"
    },
    paper: {
      win: "rock",
      loss: "scissors"
    },
    scissors: {
      win: "paper",
      loss: "rock"
    }          
  }

  if (logic[playerSelection].win === computerSelection) {
    return "win";
  }
  else if (logic[playerSelection].loss === computerSelection) {
    return "loss";
  }
  else {
    return "draw";
  }
}

function computerPlay() {
  let choice = getRandomInt(3);
  switch (choice) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function announce() {
  if (playerScore > computerScore) {
    alert("You win the game!");
  }
  else if (playerScore < computerScore) {
    alert("You lost the game!");
  }
  else {
    alert("The game ended in a draw!");
  }
}

function scoreTracker(result) {
  switch (result) {
    case "win":
      playerScore += 1;
      return;
    case "loss":
      computerScore += 1;
      return;
  }
  playerScore += 1;
  computerScore += 1;
  return;
}

function resultAlert(result) {
  switch (result) {
    case "win":
      alert("You win!"+" "+playerSelection+" beats "+computerSelection+"!");
      break;
    case "loss":
      alert("You lose!"+" "+computerSelection+" beats "+playerSelection+"!");
      break;
    case "draw":
      alert("Draw! The computer chose "+computerSelection+"!");
  }
  alert("Your current score: "+playerScore+"\nComputer score: "+computerScore);
}
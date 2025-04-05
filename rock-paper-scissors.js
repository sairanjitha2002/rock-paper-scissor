let count = JSON.parse(localStorage.getItem("count")) || {
  win: 0,
  losses: 0,
  tie: 0,
};
updateName();
let isAuto = false;
let intervalId;
updatebutton();

function onAutoPlay() {
  if (!isAuto) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAuto = true;
  } else {
    clearInterval(intervalId);
    isAuto = false;
  }
}


function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    count.win += 1;
  } else if (result === "You lose.") {
    count.losses += 1;
  } else if (result === "Tie.") {
    count.tie += 1;
  }
  localStorage.setItem("count", JSON.stringify(count));

  updatebutton();
  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="${playerMove}-emoji.png" class="move-icon"/>
  Computer <img src="${computerMove}-emoji.png" class="move-icon" />`;
}

function updatebutton() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins:${count.win},Losses:${count.losses},Tie:${count.tie}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

let p1name, p2name;
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let nameDialog = document.getElementById("userNameDialog");
let playerNameForm = document.getElementById("playerNameForm");
let cells = document.querySelectorAll(".cell");
let winnerName = document.getElementById("winnerName");
let drawMessage = document.getElementById("drawMessage");
let winDialog = document.getElementById("winDialog");
let drawDialog = document.getElementById("drawDialog");
let gameBoard = Array(9).fill(null);
let currentPlayer = "O";

const hoverColors = {
  O: "#D99EAF",
  X: "#95CED1",
};

const clickColors = {
  O: "#B93C60",
  X: "#28A1A8",
};

player1.textContent = "Player 1";
player2.textContent = "Player 2";

window.addEventListener("DOMContentLoaded", (event) => {
  if (nameDialog) {
    nameDialog.showModal();
  }
});

if (playerNameForm) {
  playerNameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    p1name = document.getElementById("p1name").value || "Player 1"; //populates default value if no name found
    player1.textContent = p1name;
    p2name = document.getElementById("p2name").value || "Player 2"; //populates default value if no name found
    player2.textContent = p2name;
    nameDialog.close();
  });

  playerNameForm.addEventListener("reset", (event) => {
    if (nameDialog) {
      nameDialog.showModal();
    }
  });
}

cells.forEach((cell, index) => {
  cell.dataset.index = index;

  cell.addEventListener("click", (event) => {
    if (cell.textContent === "" && !checkWinner()) {
      cell.textContent = currentPlayer;
      cell.style.color = clickColors[currentPlayer];      // sets the color based on current player
      gameBoard[cell.dataset.index] = currentPlayer;      // places current players mark in the cell clicked

      if (checkWinner()) {                                // check win and draw conditions
        let currentWinner = currentPlayer === "O" ? p1name : p2name;
        winnerName.textContent = currentWinner;
        winDialog.showModal();
      } else if (gameBoard.every((cell) => cell)) {
        drawMessage.textContent = "It's a Draw!";
        drawDialog.showModal();
      } else {
        currentPlayer = currentPlayer === "O" ? "X" : "O"; // if no condition is met, alternate the player turn
        cells.forEach((c) => {
          if (c.textContent === "") {
            c.dataset.hover = currentPlayer;
          }
        });
      }
    }
  });

  cell.addEventListener("mouseover", (event) => {
    if (cell.textContent === "") {
      cell.style.color = hoverColors[currentPlayer];    // set the hover color when mouse hovers over the cell
    }
  });

  cell.addEventListener("mouseout", (event) => {
    if (cell.textContent === "") {
      cell.style.color = "";                            // reset the color when mouse moves out of the cell
    }
  });
});

function checkWinner() {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let winnerFound = winCombinations.some((pattern) => {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      pattern.forEach((index) => {
        cells[index].classList.add("win");
      });
      return true;
    }
    return false;
  });

  return winnerFound;
}

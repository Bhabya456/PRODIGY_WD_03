const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";

let gameRunning = true;

let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning Patterns
const winningConditions = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

// Initial Status
statusText.classList.add("turn");

// Add Click Events
cells.forEach((cell, index) => {

    cell.addEventListener("click", () => {

        handleCellClick(cell, index);

    });

});

// Handle Cell Click
function handleCellClick(cell, index){

    if(gameState[index] !== "" || !gameRunning){
        return;
    }

    gameState[index] = currentPlayer;

    cell.innerHTML = currentPlayer;

    // Add Color Classes
    if(currentPlayer === "X"){
        cell.classList.add("x");
    }
    else{
        cell.classList.add("o");
    }

    checkWinner();
}

// Check Winner
function checkWinner(){

    let roundWon = false;

    for(let i = 0; i < winningConditions.length; i++){

        const condition = winningConditions[i];

        const a = gameState[condition[0]];
        const b = gameState[condition[1]];
        const c = gameState[condition[2]];

        if(a === "" || b === "" || c === ""){
            continue;
        }

        if(a === b && b === c){

            roundWon = true;
            break;
        }
    }

    // Winner
    if(roundWon){

        statusText.innerHTML =
            `Player ${currentPlayer} Wins!`;

        statusText.classList.remove("turn");

        if(currentPlayer === "X"){
            statusText.classList.add("x-win");
        }
        else{
            statusText.classList.add("o-win");
        }

        gameRunning = false;

        return;
    }

    // Draw
    if(!gameState.includes("")){

        statusText.innerHTML = "Game Draw!";

        statusText.classList.remove("turn");

        statusText.classList.add("draw");

        gameRunning = false;

        return;
    }

    // Switch Player
    currentPlayer =
        currentPlayer === "X" ? "O" : "X";

    statusText.innerHTML =
        `Player ${currentPlayer}'s Turn`;
}

// Restart Game
restartBtn.addEventListener("click", restartGame);

function restartGame(){

    currentPlayer = "X";

    gameRunning = true;

    gameState = ["", "", "", "", "", "", "", "", ""];

    statusText.innerHTML = "Player X's Turn";

    statusText.className = "";

    statusText.classList.add("turn");

    cells.forEach(cell => {

        cell.innerHTML = "";

        cell.classList.remove("x");
        cell.classList.remove("o");

    });
}
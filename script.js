// Gameboard LIFE function object
// - This function stores the current board state

const gameBoard = (function() {
    // board object
    let board = ["", "", "", 
                 "", "", "", 
                 "", "", ""]; 

    function getBoard() {
        return board;  
    }

    function setCell(index, mark) {
        if (board[index] != "X" && board[index] != "O") {
            board[index] = mark; 
            console.log("I have set the cell with " + mark);
        }
        else {
            console.log("this cell already has something!"); 
        }
    }

    function resetBoard() {
        for (let i = 0; i < 9; i++) {
            board[i] = "";
        }
    }

    // Public API 
    return {
        getBoard,
        setCell, 
        resetBoard
    };
})();

// Player factory function 
// -- function accepts the  marks 
function playerInput(index) {
    return {index}; 
}

// Game controller factory function 
// -- handles turn order, win/tie checks, switching players
function gameController(board) { 
    let turnCount = 0;  
    const winConditions = [
        [0,1,2], // row 1
        [3,4,5], // row 2
        [6,7,8], // row 3
        [0,3,6], // col 1
        [1,4,7], // col 2
        [2,5,8], // col 3
        [0,4,8], // diagonal 1
        [2,4,6]  // diagonal 2
    ]

    function playRound(index) {

        board.setCell(index, switchPlayer(turnCount));
        console.log("The mark is currently: " + switchPlayer(turnCount));
        if (checkWinner(board.getBoard())) {
            console.log("You win!"); 
        }

        if(checkTie(board.getBoard())) {
            console.log("It's a tie!")
        }

        turnCount++;

    }

    function checkWinner(board) {
        for (const condition of winConditions) { // Loop through all conditions
            const[a,b,c] = condition; 
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                return true; 
            }
        }
        return false; 
    }

    function checkTie(board) {
        // Check for tie 
        let isFullCounter = 0; 
        for (let i = 0; i < 9; i++) {
            if (board[i] === 'O' || board[i] === 'X') {
                isFullCounter++ 
            }
        }

        if (isFullCounter === 9) {
            return true; 
        }
        isFullCounter = 0; 

        return false;
    }

    function switchPlayer(turnCount) {
        let mark = "";

        if (turnCount % 2 === 0) {
            mark = "O";
        }
        else {
            mark = "X";
        }
        return mark; 

    }

    return {
        playRound
    }
}



//const controller = gameController(gameBoard);

// console.log(gameBoard.getBoard()); 
// console.log(controller.playRound(1));
// console.log(gameBoard.getBoard()); 
// console.log(controller.playRound(4));
// console.log(gameBoard.getBoard()); 
// console.log(controller.playRound(2));
// console.log(gameBoard.getBoard()); 
// console.log(controller.playRound(3));
// console.log(gameBoard.getBoard()); 
// console.log(controller.playRound(0));
// console.log(gameBoard.getBoard()); 


// Display controller IIFE
const displayController = (function() {

    const cells = document.querySelectorAll(".cell");
    
    const board = gameBoard.getBoard(); 
    const controller = gameController(gameBoard);

    // Update board
    function render() {
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        })
    }

    // Listen for player moves
    function bindEvents() { // "bind events" mean event handling
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const index = parseInt(cell.dataset.index); 
                controller.playRound(index); 
                console.log("I am being clicked!")
                render(); 
            })
        })
    }

    return {
        render, 
        bindEvents
    };

})();

displayController.bindEvents();
displayController.render();

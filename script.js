const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameState = Array(9).fill('');
const statusDisplay = document.getElementById('game-status');

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

// Handle cell clicks
function handleClick(event) {
    const index = event.target.getAttribute('data-index');
    
    if (!gameState[index]) { // Only place if the cell is empty
        gameState[index] = currentPlayer;
        event.target.innerText = currentPlayer;

        if (checkWin(currentPlayer)) {
            statusDisplay.innerText = `Player ${currentPlayer} wins!`;
            endGame();
        } else if (gameState.every(cell => cell)) {
            statusDisplay.innerText = 'Game is a draw!';
            endGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
        }
    }
}

// Check if the current player has won
function checkWin(player) {
    return winConditions.some(condition => 
        condition.every(index => gameState[index] === player)
    );
}

// End the game and disable further clicks
function endGame() {
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

// Reset the game
function resetGame() {
    gameState.fill('');
    cells.forEach(cell => {
        cell.innerText = '';
        cell.addEventListener('click', handleClick);
    });
    currentPlayer = 'X';
    statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
}

// Add event listeners to cells
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

// Initial status message
statusDisplay.innerText = `It's ${currentPlayer}'s turn`;

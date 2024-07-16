const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
let score = 0;

// Initialize the game board
const gridSize = 4;
let board = [];
for (let i = 0; i < gridSize; i++) {
    board[i] = [];
    for (let j = 0; j < gridSize; j++) {
        board[i][j] = 0;
    }
}

// Function to create a new tile on the board
function createTile() {
    let emptyCells = [];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (board[i][j] === 0) {
                emptyCells.push([i, j]);
            }
        }
    }
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const [row, col] = emptyCells[randomIndex];
        board[row][col] = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4
        renderBoard();
    }
}

// Function to render the board on the screen
function renderBoard() {
    grid.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add(board[i][j] === 0 ? 'empty' : `value-${board[i][j]}`); // Add value class for styling
            cell.textContent = board[i][j] === 0 ? '' : board[i][j];
            grid.appendChild(cell);
        }
    }
}

// Function to handle movement in a specific direction
function move(direction) {
    let moved = false;
    if (direction === 'up') {
        for (let j = 0; j < gridSize; j++) {
            for (let i = 1; i < gridSize; i++) {
                if (board[i][j] !== 0) {
                    let k = i;
                    while (k > 0 && board[k - 1][j] === 0) {
                        board[k - 1][j] = board[k][j];
                        board[k][j] = 0;
                        k--;
                        moved = true;
                    }
                    if (k > 0 && board[k - 1][j] === board[k][j]) {
                        board[k - 1][j] *= 2;
                        board[k][j] = 0;
                        score += board[k - 1][j];
                        moved = true;
                    }
                }
            }
        }
    } else if (direction === 'down') {
        for (let j = 0; j < gridSize; j++) {
            for (let i = gridSize - 2; i >= 0; i--) {
                if (board[i][j] !== 0) {
                    let k = i;
                    while (k < gridSize - 1 && board[k + 1][j] === 0) {
                        board[k + 1][j] = board[k][j];
                        board[k][j] = 0;
                        k++;
                        moved = true;
                    }
                    if (k < gridSize - 1 && board[k + 1][j] === board[k][j]) {
                        board[k + 1][j] *= 2;
                        board[k][j] = 0;
                        score += board[k + 1][j];
                        moved = true;
                    }
                }
            }
        }
    } else if (direction === 'left') {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 1; j < gridSize; j++) {
                if (board[i][j] !== 0) {
                    let k = j;
                    while (k > 0 && board[i][k - 1] === 0) {
                        board[i][k - 1] = board[i][k];
                        board[i][k] = 0;
                        k--;
                        moved = true;
                    }
                    if (k > 0 && board[i][k - 1] === board[i][k]) {
                        board[i][k - 1] *= 2;
                        board[i][k] = 0;
                        score += board[i][k - 1];
                        moved = true;
                    }
                }
            }
        }
    } else if (direction === 'right') {
        for (let i = 0; i < gridSize; i++) {
            for (let j = gridSize - 2; j >= 0; j--) {
                if (board[i][j] !== 0) {
                    let k = j;
                    while (k < gridSize - 1 && board[i][k + 1] === 0) {
                        board[i][k + 1] = board[i][k];
                        board[i][k] = 0;
                        k++;
                        moved = true;
                    }
                    if (k < gridSize - 1 && board[i][k + 1] === board[i][k]) {
                        board[i][k + 1] *= 2;
                        board[i][k] = 0;
                        score += board[i][k + 1];
                        moved = true;
                    }
                }
            }
        }
    }
    if (moved) {
        createTile();
    }
    scoreDisplay.textContent = score;
}

// Add event listeners for arrow keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        move('up');
    } else if (event.key === 'ArrowDown') {
        move('down');
    } else if (event.key === 'ArrowLeft') {
        move('left');
    } else if (event.key === 'ArrowRight') {
        move('right');
    }
});

// Start the game
createTile();
createTile();
renderBoard();
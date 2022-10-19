const playerXClass = 'x';
const playerOClass = 'circle';
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const resetButton = document.getElementById('resetBtn');
const winningMessageTextElement = document.getElementById('winningMessageText');

let isPlayerOTurn = false;

startGame();
resetButton.addEventListener('click', startGame);

function startGame(){
    isPlayerOTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(playerXClass);
        cell.classList.remove(playerOClass);
        cell.removeEventListener('click', handleCellClick);
        cell.addEventListener('click', handleCellClick, { once : true});
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
};

function handleCellClick(e){
    const cell = e.target;
    const currentClass = isPlayerOTurn ? playerOClass : playerXClass;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)) {
        endGame(false);
    } else if(isDraw()) {
        endGame(true);
    }else {
        swapTurns();
        setBoardHoverClass();
    };
};

function endGame(draw){
    if(draw) {
        winningMessageTextElement.innerText = "It's a draw.";
    } else {
        winningMessageTextElement.innerText = `Player with ${isPlayerOTurn ? "O's" : "X's"} wins!`
    };
    winningMessageElement.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(playerXClass) || cell.classList.contains(playerOClass);
    });
};

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
};

function swapTurns(){
    isPlayerOTurn = !isPlayerOTurn;
};

function setBoardHoverClass(){
    boardElement.classList.remove(playerXClass);
    boardElement.classList.remove(playerOClass);
    if(isPlayerOTurn) {
        boardElement.classList.add(playerOClass);
    } else {
        boardElement.classList.add(playerXClass);
    };
};

function checkWin(currentClass){
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
};
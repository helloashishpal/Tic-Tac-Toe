//HTML Elements!
const statusdiv = document.querySelector('.status');
const resetdiv = document.querySelector('.reset');
const celldivs = document.querySelectorAll('.grid-cell');


//game Constants
const xSymbol = 'X';
const oSymbol = 'O';

//game variables
let gameIsLive = true;
let xIsNext = true;

//funtions
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

//Handle win function
const handleWin = (letter) => {
    gameIsLive = false;
    if (letter === 'x') {
        statusdiv.innerHTML = `${letterToSymbol(letter)} has Won!`;
    } else {
        statusdiv.innerHTML = `<span>${letterToSymbol(letter)} has Won!</span>`;
    }
};





function checkGameStatus() {
    const topLeft = celldivs[0].classList[1];
    const topMiddle = celldivs[1].classList[1];
    const topRight = celldivs[2].classList[1];
    const middleLeft = celldivs[3].classList[1];
    const middleMiddle = celldivs[4].classList[1];
    const middleRight = celldivs[5].classList[1];
    const bottomLeft = celldivs[6].classList[1];
    const bottomMiddle = celldivs[7].classList[1];
    const bottomRight = celldivs[8].classList[1];



    // check winner!
    if (topLeft && topLeft === topMiddle && topLeft === topRight) {
        handleWin(topLeft);
        celldivs[0].classList.add('won');
        celldivs[1].classList.add('won');
        celldivs[2].classList.add('won');
    } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
        handleWin(middleLeft);
        celldivs[3].classList.add('won');
        celldivs[4].classList.add('won');
        celldivs[5].classList.add('won');
    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWin(bottomLeft);
        celldivs[6].classList.add('won');
        celldivs[7].classList.add('won');
        celldivs[8].classList.add('won');
    } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWin(topLeft);
        celldivs[0].classList.add('won');
        celldivs[3].classList.add('won');
        celldivs[6].classList.add('won');
    } else if (topMiddle && topMiddle == middleMiddle && topMiddle == bottomMiddle) {
        handleWin(topMiddle);
        celldivs[1].classList.add('won');
        celldivs[4].classList.add('won');
        celldivs[7].classList.add('won');
    } else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWin(topRight);
        celldivs[2].classList.add('won');
        celldivs[5].classList.add('won');
        celldivs[8].classList.add('won');
    } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        handleWin(topLeft);
        celldivs[0].classList.add('won');
        celldivs[4].classList.add('won');
        celldivs[8].classList.add('won');
    } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
        handleWin(topRight);
        celldivs[2].classList.add('won');
        celldivs[4].classList.add('won');
        celldivs[6].classList.add('won');
    } else if (topLeft && topMiddle && topRight &&
        middleLeft && middleMiddle && middleRight &&
        bottomLeft && bottomMiddle && bottomRight) {
        gameIsLive = false;
        statusdiv.innerHTML = `Cat's Game!(Tied)`;
    } else {
        xIsNext = !xIsNext;
        if (xIsNext) {
            statusdiv.innerHTML = `${xSymbol} is next`;
        } else {
            statusdiv.innerHTML = `<span>${oSymbol} is next</span>`;
        }
    }
}


//event handlers
const handleReset = () => {
    xIsNext = true;
    statusdiv.innerHTML = `${xSymbol} is next.`;
    for (const celldiv of celldivs) {
        celldiv.classList.remove('x');
        celldiv.classList.remove('o');
        celldiv.classList.remove('won');

    }
    gameIsLive = true;
};

const handleCellClick = (e) => {
    const classList = e.target.classList;
    if (!gameIsLive || classList[1] === 'o' || classList[1] === 'x') {
        return;
    }
    if (xIsNext) {
        e.target.classList.add('x');
        checkGameStatus();
    } else {
        e.target.classList.add('o');
        checkGameStatus();
    }
};


//event listeners
resetdiv.addEventListener('click', handleReset);


for (const celldiv of celldivs) {
    celldiv.addEventListener('click', handleCellClick);
};

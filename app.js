// Assigning the html divs to variables through querySelector
const gridDiv = document.querySelector('.grid');
const previewGridDiv = document.querySelector('.preview-grid');
const scoreSpan = document.querySelector('.score');
const startBtn = document.querySelector('.start-button');
const colors = [
    "#EF3953",
    "#F1B04F",
    "#FCB819",
    "#FF6300",
    "#E48EFF",
    "#74C143",
    "#6DCDDD"
]
let random;
let currentPosition;
let currentRotation;
// Randomly choose a Tetromino from the Array 'Tetrominoes' and assign it to the 'currentTetromino' variable
let currentTetromino;


// add functionality to the button
startBtn.addEventListener("click", () => {
    if (TetrisGrid.timerId) {
        clearInterval(TetrisGrid.timerId);
        TetrisGrid.timerId = null;
    } else {
        TetrisGrid.drawTetromino();
        TetrisGrid.timerId = setInterval(moveDown, 1000);
        nextRandom = Math.floor(Math.random()*Tetrominoes.length);
        TetrisGrid.displayShape();
    }
})
//#region Player Object
class Player{
    constructor(){
        this.score = 0;
    }
    initialiseControl(){
        window.addEventListener('keydown', control);
    }
    control(e){
        switch (e.keycode) {
            case 37:
                Tetromino.moveleft();
                break;
            case 38:
                Tetromino.rotate();
                break;
            case 39:
                Tetromino.moveRight();
                break;
            case 40:
                Tetromino.moveDown();
                break;
        
            default:
                break;
        }
    }

    // function add score
    addScore(){
        for (let i = 0; i < 199 ; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if(row.every(index => gridItem[index].classList.contains("taken"))){
                score += 10;
                scoreDisplay.innerHTML = score;
                row.forEach(index => {
                    gridItem[index].classList.remove("taken")
                    gridItem[index].classList.remove("tetromino")
                    gridItem[index].style.backgroundColor = ""
                });
                const gridItemRemoved = gridItem.splice(i, width);
                gridItem = gridItemRemoved.concat(gridItem)
                gridItem.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    // Game over function
    gameOver(){
        if (currentTetromino.some(index => gridItem[currentPosition + index].classList.contains("taken"))) {
            scoreDisplay.innerHTML = 'Game Over'
            alert("Game over ! Your score is " + score);
            clearInterval(TetrisGrid.timerId);
            document.location.reload();
        }
    }
}

//#endregion

//#region Grid Object

/**
    Creation Grid Object
    this.name = Grid name
    this.createGrid = function to create div element
 */
class Grid{
    constructor(name){
        this.name = name;
        this.mainGrid;
        this.mainGridTaken;
        this.previewGrid;
        this.gridCell = [];
        this.size = {
            width : 10,
            height : 20
        }
        this.timerId;
        
    }

    createGrid(appendTo, _class, indexStart, indexEnd)
    {
        for(let i = indexStart; i < indexEnd; i++)
        {
            var div = document.createElement('div');
            div.className = _class;
            appendTo.appendChild(div);
        };
    }

    drawTetromino(){
        currentTetromino.forEach(index =>{
        this.gridCell[currentPosition + index].classList.add("tetromino");
        this.gridCell[currentPosition + index].style.backgroundColor = colors[random];
     })
    };

    // Undraw a Tetromino
    undrawTetromino(){
        currentTetromino.forEach(index => {
            this.gridCell[currentPosition + index].classList.remove("tetromino");
            this.gridCell[currentPosition + index].style.backgroundColor = "";
        });
    }

        // Display the shape in the preview Grid
    displayShape(){
        // remove the tetromino class from the cell
        previewNextTetromino.forEach(item => {
            item.classList.remove("tetromino");
            item.style.backgroundColor = "";
        });

        upNextTetrominoes[nextRandom].forEach(index => {
            previewNextTetromino[displayIndex + index].classList.add("tetromino");
            previewNextTetromino[displayIndex + index].style.backgroundColor = colors[nextRandom];
        });
    }

    // Stops Tetromino when reaches the bottom or collides with another Tetromino
    freezeTetromino(){
        if (currentTetromino.some(index => this.gridCell[currentPosition + index + width].classList.contains("taken"))){
            currentTetromino.forEach(index => { this.gridCell[currentPosition + index].classList.add("taken")
            // new Tetromino
            random = nextRandom;
            nextRandom = Math.floor(Math.random()*Tetrominoes.length);
            currentTetromino = Tetrominoes[random][currentRotation];
            currentPosition = 4;
            this.drawTetromino();
            this.displayShape();
            Player.addScore();
            Player.gameOver();
            });
        }
    }

    /** When Player press key Keycode 37, Tetromino moves Left  */
    moveLeft(){
        this.undrawTetromino();
        const isAtLeftEdge = currentTetromino.some(index => currentPosition + index) % this.size.width === 0;

        if (!isAtLeftEdge) currentPosition -= 1;
        
        if (currentTetromino.some(index => this.gridCell[currentPosition + index].classList.contains("taken"))){
            currentPosition += 1;
        }
        this.drawTetromino();
    }
    /** When Player press key Keycode 38, Tetromino Rotate  */
    rotate(){
        this.undrawTetromino();
        currentPosition ++;
        if (currentRotation === currentTetromino.length){ // if current rotation = 4, make it go back to 0
            currentRotation = 0;
        };
        currentTetromino = Tetrominoes[random][currentRotation]
        this.drawTetromino();
    }
    /** When Player press key Keycode 39, Tetromino moves Right  */
    moveRight(){
        this.undrawTetromino();
        const isAtRightEdge = currentTetromino.some(index => currentPosition + index) % this.size.width === this.size.width - 1;

        if (!isAtRightEdge) currentPosition += 1;
        
        if (currentTetromino.some(index => this.gridCell[currentPosition + index].classList.contains("taken"))){
            currentPosition += 1;
        }
        this.drawTetromino();
    }
    /** When Player press key Keycode 40, Tetromino moves Down  */
    moveDown(){
        this.undrawTetromino();
        currentPosition += this.size.width;
        this.drawTetromino();
        this.freezeTetromino();
    }


}
// Instantiate Grid object
let TetrisGrid = new Grid('Grid');
TetrisGrid.mainGrid = TetrisGrid.createGrid(gridDiv, 'grid-cell', 0, 200);
TetrisGrid.mainGridTaken = TetrisGrid.createGrid(gridDiv, 'grid-cell taken', 200, 210);
TetrisGrid.previewGrid = TetrisGrid.createGrid(previewGridDiv, 'preview-grid-cell', 0, 16);

// Inserting all the newly created divs into an array stored as a property of the Grid object
TetrisGrid.gridCell = Array.from(document.querySelectorAll(".grid-cell"));

//#endregion

//#region Class Tetromino

/**
    Creation Tetromino Object
    this.name = Tetromino name
    this.positionOnGrid = array
    this.currentPosition = starting position
    this.currentRotation = starting rotation
 */

class Tetromino{
    constructor(name, positionOnGrid){
        this.name = name;
        this.positionOnGrid = [];
    }
}
//#region Tetromino instantiation
// Instantiate Tetromino object
const jTetromino = new Tetromino('lTetromino', [
    [1, TetrisGrid.width+1, TetrisGrid.width*2+1, 2],
    [TetrisGrid.width, TetrisGrid.width+1, TetrisGrid.width+2, TetrisGrid.width*2+2],
    [1, TetrisGrid.width+1, TetrisGrid.width*2+1, TetrisGrid.width*2],
    [TetrisGrid.width, TetrisGrid.width*2, TetrisGrid.width*2+1, TetrisGrid.width*2+2]
]);
const lTetromino = new Tetromino('jTetromino', [
    [0, 1, TetrisGrid.width+1, TetrisGrid.width*2+1],
    [TetrisGrid.width, TetrisGrid.width+1, TetrisGrid.width+2, TetrisGrid.width*2],
    [1, TetrisGrid.width+1, TetrisGrid.width*2+1, TetrisGrid.width*2+2],
    [TetrisGrid.width+2, TetrisGrid.width*2, TetrisGrid.width*2+1, TetrisGrid.width*2+2]
]);
const sTetromino = new Tetromino('sTetromino', [
    [TetrisGrid.width+1, TetrisGrid.width+2, TetrisGrid.width*2, TetrisGrid.width*2+1],
    [0, TetrisGrid.width, TetrisGrid.width+1, TetrisGrid.width*2+1],
    [TetrisGrid.width+1, TetrisGrid.width+2, TetrisGrid.width*2, TetrisGrid.width*2+1],
    [0, TetrisGrid.width, TetrisGrid.width+1, TetrisGrid.width*2+1]
]);
const zTetromino = new Tetromino('zTetromino', [
    [TetrisGrid.width, TetrisGrid.width+1, TetrisGrid.width*2+1, TetrisGrid.width*2+2],
    [2, TetrisGrid.width+1, TetrisGrid.width+2, TetrisGrid.width*2+1],
    [TetrisGrid.width, TetrisGrid.width+1, TetrisGrid.width*2+1, TetrisGrid.width*2+2],
    [2, TetrisGrid.width+1, TetrisGrid.width+2, TetrisGrid.width*2+1]
]);
const tTetromino = new Tetromino('tTetromino', [
    [1, TetrisGrid.width, TetrisGrid.width+1, TetrisGrid.width+2],
    [1, TetrisGrid.width+1, TetrisGrid.width+2, TetrisGrid.width*2+1],
    [TetrisGrid.width, TetrisGrid.width+1, TetrisGrid.width+2, TetrisGrid.width*2+1],
    [1, TetrisGrid.width, TetrisGrid.width+1, TetrisGrid.width*2+1]
]);
const oTetromino = new Tetromino('oTetromino', [
    [0, 1, TetrisGrid.width, TetrisGrid.width+1],
    [0, 1, TetrisGrid.width, TetrisGrid.width+1],
    [0, 1, TetrisGrid.width, TetrisGrid.width+1],
    [0, 1, TetrisGrid.width, TetrisGrid.width+1]
]);
const iTetromino = new Tetromino('iTetromino', [
    [1, TetrisGrid.width+1, TetrisGrid.width*2+1, TetrisGrid.width*3+1],
    [TetrisGrid.width, TetrisGrid.width+1, TetrisGrid.width+2, TetrisGrid.width+3],
    [1, TetrisGrid.width+1, TetrisGrid.width*2+1, TetrisGrid.width*3+1],
    [TetrisGrid.width, TetrisGrid.width+1, TetrisGrid.width+2, TetrisGrid.width+3]
]);
//#endregion



// Add each Tetromino to a Tetrominoes array
const Tetrominoes = [jTetromino, lTetromino, sTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

// Assign the Math.random function to the 'random' variable
random = Math.floor(Math.random() * Tetrominoes.length);
currentPosition = 4;
currentRotation = 0;
// Randomly choose a Tetromino from the Array 'Tetrominoes' and assign it to the 'currentTetromino' variable
currentTetromino = Tetrominoes[random][currentRotation];

//#endregion



//#region Show the upcoming Tetromino in the Preview Grid
const previewNextTetromino = document.querySelectorAll(".preview-grid .preview-grid-cell");
const displayWidth = 4;
const displayIndex = 0;

// The Tetrominoes without rotation
const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], // jTetromino
    [0, 1, displayWidth+1, displayWidth*2+1], // lTetromino
    [displayWidth+1, displayWidth+2, displayWidth*2, displayWidth*2+1], // sTetromino
    [displayWidth, displayWidth+1, displayWidth*2+1, displayWidth*2+2], // zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], // tTetromino
    [0, 1, displayWidth, displayWidth+1], // oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] // iTetromino
]
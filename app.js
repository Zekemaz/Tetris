// Assigning the html divs to variables through querySelector
const gridDiv = document.querySelector('.grid');
const previewGridDiv = document.querySelector('.preview-grid');
const scoreSpan = document.querySelector('.score');
const startBtn = document.querySelector('.start-button');

// random function
function selectRandom(obj){
   return Math.floor(Math.random() * obj)
}

//#region 
// function Grid(name)
// {
//     this.name = name;
//     this.createGrid = function(appendTo, _class, indexStart, indexEnd){
//         for(let i = indexStart; i < indexEnd; i++){
//             var div = document.createElement('div');
//             div.className = _class;
//             appendTo.appendChild(div);
//         };
//     }
// }
//#endregion

//#region Grid Object

/**
    Creation Grid Object
    this.name = Grid name
    this.createGrid = function to create div element
 */
class Player{
    constructor(){
        this.score = 0;
    }
}
class Grid{
    constructor(name){
        this.name = name;
        this.mainGrid = [];
        this.mainGridTaken = [];
        this.previewGrid = [];
        this.gridCell = [];
        this.size = {
            width = 10,
            height = 20
        }
        
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
}
// Instantiate Grid object
let grid = new Grid('Grid');
grid.mainGrid = grid.createGrid(gridDiv, 'grid-cell', 0, 200);
grid.mainGridTaken = grid.createGrid(gridDiv, 'grid-cell taken', 200, 210);
grid.previewGrid = grid.createGrid(previewGridDiv, 'preview-grid-cell', 0, 16);

// Inserting all the newly created divs into an array stored as a property of the Grid object
grid.gridCell = Array.from(document.querySelectorAll(".grid-cell"));

//#endregion




//#region Class Tetromino

/**
    Creation Tetromino Object
    this.name = Tetromino name
    this.positionOnGrid = array
 */

class Tetromino{
    constructor(name, positionOnGrid){
        this.name = name;
        this.positionOnGrid = [];
        this.currentPosition = 4;
        this.currentRotation = 0;
    }
}
// Instantiate Tetromino object
const jTetromino = new Tetromino('lTetromino', [
    [1, grid.width+1, grid.width*2+1, 2],
    [grid.width, grid.width+1, grid.width+2, grid.width*2+2],
    [1, grid.width+1, grid.width*2+1, grid.width*2],
    [grid.width, grid.width*2, grid.width*2+1, grid.width*2+2]
]);
const lTetromino = new Tetromino('jTetromino', [
    [0, 1, grid.width+1, grid.width*2+1],
    [grid.width, grid.width+1, grid.width+2, grid.width*2],
    [1, grid.width+1, grid.width*2+1, grid.width*2+2],
    [grid.width+2, grid.width*2, grid.width*2+1, grid.width*2+2]
]);
const sTetromino = new Tetromino('sTetromino', [
    [grid.width+1, grid.width+2, grid.width*2, grid.width*2+1],
    [0, grid.width, grid.width+1, grid.width*2+1],
    [grid.width+1, grid.width+2, grid.width*2, grid.width*2+1],
    [0, grid.width, grid.width+1, grid.width*2+1]
]);
const zTetromino = new Tetromino('zTetromino', [
    [grid.width, grid.width+1, grid.width*2+1, grid.width*2+2],
    [2, grid.width+1, grid.width+2, grid.width*2+1],
    [grid.width, grid.width+1, grid.width*2+1, grid.width*2+2],
    [2, grid.width+1, grid.width+2, grid.width*2+1]
]);
const tTetromino = new Tetromino('tTetromino', [
    [1, grid.width, grid.width+1, grid.width+2],
    [1, grid.width+1, grid.width+2, grid.width*2+1],
    [grid.width, grid.width+1, grid.width+2, grid.width*2+1],
    [1, grid.width, grid.width+1, grid.width*2+1]
]);
const oTetromino = new Tetromino('oTetromino', [
    [0, 1, grid.width, grid.width+1],
    [0, 1, grid.width, grid.width+1],
    [0, 1, grid.width, grid.width+1],
    [0, 1, grid.width, grid.width+1]
]);
const iTetromino = new Tetromino('iTetromino', [
    [1, grid.width+1, grid.width*2+1, grid.width*3+1],
    [grid.width, grid.width+1, grid.width+2, grid.width+3],
    [1, grid.width+1, grid.width*2+1, grid.width*3+1],
    [grid.width, grid.width+1, grid.width+2, grid.width+3]
]);

// Add each Tetromino to a Tetrominoes array
const Tetrominoes = [jTetromino, lTetromino, sTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

//#endregion
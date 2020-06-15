// Assigning the html divs to variables through querySelector
const gridDiv = document.querySelector('.grid');
const previewGridDiv = document.querySelector('.preview-grid');
const scoreSpan = document.querySelector('.score');
const startBtn = document.querySelector('.start-button');



function Grid(name)
{
    this.name = name;
    this.createGrid = function(appendTo, _class, indexStart, indexEnd){
        for(let i = indexStart; i < indexEnd; i++){
            var div = document.createElement('div');
            div.className = _class;
            appendTo.appendChild(div);
        };
    }
}
// Instanciate Grid object
Grid = new Grid('Grid');
Grid.mainGrid = Grid.createGrid(gridDiv, 'grid-cell', 0, 200);
Grid.mainGridTaken = Grid.createGrid(gridDiv, 'grid-cell taken', 200, 210);
Grid.PreviewGrid = Grid.createGrid(previewGridDiv, 'preview-grid-cell', 0, 16);


Grid.gridCell = Array.from(document.querySelectorAll(".grid-cell"));

const width = 10;
let nextRandom = 0;
let timerId;
let score = 0;
const colors = [
    "#EF3953",
    "#F1B04F",
    "#FCB819",
    "#FF6300",
    "#E48EFF",
    "#74C143",
    "#6DCDDD"
]


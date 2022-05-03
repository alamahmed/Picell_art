
import Save from "./firebase.js";
//Getting Buttons and canvas from html
let Color = document.getElementById("Color");
let button = document.getElementById("button");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let draw_board = document.getElementById("draw_board");
let image = document.getElementById("image");
let Back_Button = document.getElementById("back");
let save_btn = document.getElementById("save");

//Getting Offset of the canvas
let BB = canvas.getBoundingClientRect();
let offsetX = BB.left;
let offsetY = BB.top + window.scrollY;
let paint = false;

//Variables for canvas properties
let no_of_Boxes = 50;
canvas.width = innerWidth / 2;
let box_Size = canvas.width / no_of_Boxes;
canvas.height = canvas.width;

//To Store Data in MultiDimensional Array
// let imageData = new Array(no_of_Boxes);
// for(let i =0;i<no_of_Boxes;++i){
//     imageData[i] = new Array(no_of_Boxes).fill("#ffffff")
// }

let imageData = {};


//drawing canvas Visibility hidden and main page visiblility to visible
draw_board.style.visibility = "hidden";
image.style.visibility = "visible";

//Function to get into the drawing canvas
function Display(event) {
    
    image.style.visibility = "hidden";
    draw_board.style.visibility = "visible";

}

//Function for back button
function back(event) {
    
    image.style.visibility = "visible";
    draw_board.style.visibility = "hidden";
    clean();
}

//Function to start paint
function startpos(e) {
    paint = true;
}

//Function to stop paint
function endpos() {
    paint = false;
}

//Main function for paint
function hoverEffect(event) {
    if (!paint) return;
    
    let mouseX = event.clientX - offsetX;
    let mouseY = (event.clientY + window.scrollY) - offsetY;
    
    let index = convertMousePositionToCellIndex(mouseX, mouseY, box_Size);
    imageData[index.row + "_" + index.col] = Color.value;
    ctx.fillStyle = Color.value;
    ctx.fillRect(index.row * box_Size, index.col * box_Size, box_Size, box_Size);
    ctx.strokeRect(index.row * box_Size, index.col * box_Size, box_Size, box_Size);

}

//Converting Mouse Position into index of grid
function convertMousePositionToCellIndex(mouseX, mouseY, box_Size) {
    return {
        row: Math.trunc(mouseX / box_Size),
        col: Math.trunc(mouseY / box_Size)
    };
}
//TO Draw Grid / Canvas
function drawBoard(event) {
    for (var x = 0; x <= canvas.width; x += box_Size) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }

    for (var x = 0; x <= canvas.height; x += box_Size) {
        ctx.moveTo(0, x);
        ctx.lineTo(canvas.width, x);
    }

    ctx.lineWidth = 2;
    ctx.strokeStyle = "lightgray";
    ctx.stroke();
}

//To clean the canvas
function clean(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
}

//Eevnt Listneres
button.addEventListener('click', clean);
save_btn.addEventListener('click', ()=>{
    console.log(imageData)    
    Save(imageData)}
);
Back_Button.addEventListener("click", back);
firstCanvas.addEventListener("click", Display);

canvas.addEventListener("mousedown", startpos);
canvas.addEventListener("mouseup", endpos);
canvas.addEventListener("mousemove", hoverEffect);
window.addEventListener('load', drawBoard);



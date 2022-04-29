let color = document.getElementById("Color");
let size = document.getElementById("Size");
let status = document.getElementById("button");
let canvas = document.getElementById("canvas");
let zoomed = document.getElementById("canvas-zoomed")


let ctx = canvas.getContext("2d");

let no_of_Boxes = 50;
canvas.width = innerWidth / 2;
let box_Size = canvas.width / no_of_Boxes;
canvas.height = canvas.width;


let BB = canvas.getBoundingClientRect();
let offsetX = BB.left;
let offsetY = BB.top + window.scrollY;

let paint = false;


function hoverEffect(event){

    let mouseX = event.clientX - offsetX;
    let mouseY = (event.clientY + window.scrollY) - offsetY;

    let indexX = Math.trunc(mouseX/box_Size);
    let indexY = Math.trunc(mouseY/box_Size);

    ctx.fillStyle = color.value;
    ctx.fillRect(indexX * box_Size, indexY * box_Size, box_Size, box_Size);
    
}

canvas.addEventListener("mousemove", hoverEffect);


function drawBoard(event){
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

window.addEventListener('load', drawBoard);

//Functions For Drawing
// function startpos(e){
//     paint = true;
//     Draw(e);
// }

// function endpos(){
//     paint = false;
// }


// function Draw(e){
//     if(!paint) return;
//     ctx.lineWidth = size.value;
//     ctx.strokeStyle = color.value;
//     ctx.lineCap = "round";

    
//     ctx.beginPath();
    
//     ctx.lineTo(e.clientX - offsetX, e.clientY - offsetY);
//     ctx.stroke()
    

//     ctx.moveTo(e.clientX - offsetX, e.clientY - offsetY);
//     ctx.closePath();
// }

//Event Listeners TO DRAW

// canvas.addEventListener("mousedown", startpos);
// canvas.addEventListener("mouseup", endpos);
// canvas.addEventListener("mousemove", Draw);



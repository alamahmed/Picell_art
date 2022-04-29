var color = document.getElementById("Color");
var size = document.getElementById("Size");
var status = document.getElementById("button");
var canvas = document.getElementById("canvas");
var zoomed = document.getElementById("canvas-zoomed")

var BB = canvas.getBoundingClientRect();
var offsetX = BB.left;
var offsetY = BB.top;  

let paint = false;

var ctx = canvas.getContext("2d");

var no_of_Boxes = 8;
var box_Size = 80;
canvas.width = box_Size * no_of_Boxes;
canvas.height = box_Size * no_of_Boxes / 2;


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
    ctx.strokeStyle = "black";
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



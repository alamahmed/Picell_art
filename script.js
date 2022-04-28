var color = document.getElementById("color");
var Size = document.getElementById("size");
var status = document.getElementById("button");
var canvas = document.getElementById("canvas");


var box_Size = 80;
var box_Width = box_Size * 8;
var box_Height = box_Size * 4;
canvas.width = box_Width;
canvas.height = box_Height;


var ctx = canvas.getContext("2d");

function drawBoard(){
    for (var x = 0; x <= box_Width; x += box_Size) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, box_Height);
    }

    for (var x = 0; x <= box_Height; x += box_Size) {
        ctx.moveTo(0, x);
        ctx.lineTo(box_Width, x);
    }

    ctx.strokeStyle = "black";
    ctx.stroke();
}

drawBoard();

import { Save, Canvas_DATA, updateDATA } from "./firebase.js";

//Getting Buttons and canvas from html
let Color = document.getElementById("Color");
let button = document.getElementById("button");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let draw_board = document.getElementById("draw_board");
let image = document.getElementById("image");
let Back_Button = document.getElementById("back");
let save_btn = document.getElementById("save");

let Canvas1 = document.getElementById("firstCanvas");
//ScreenShot
let ScreenShot = canvas.toDataURL('image/png');

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
let imageData = {};


//Function to clear Data in the imageData
function clearData(){
    
    for(let x = 0; x < no_of_Boxes; x++){
        for(let y = 0; y < no_of_Boxes; y++){
            imageData[y + "_" + x] = "#FFFFFF"; 
        }
    }

}
//drawing canvas Visibility hidden and main page visiblility to visible
draw_board.style.visibility = "hidden";
image.style.visibility = "visible";
//Funtion to paint on the canvas using firebase data

function redraw_canvas(){
    
    for(let x = 0; x < no_of_Boxes; x++){
        for(let y = 0; y < no_of_Boxes; y++){
            if (Canvas_DATA.key.DATA[y + "_" + x] != null){
                
                ctx.fillStyle = Canvas_DATA.key.DATA[y + "_" + x];

            }
            else{

                ctx.fillStyle = "#FFFFFF";
            }
            ctx.fillRect(x * box_Size, y * box_Size, box_Size, box_Size);
            ctx.strokeRect(x * box_Size, y * box_Size, box_Size, box_Size);
        }
    }

}

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
    imageData[index.col + "_" + index.row] = Color.value;
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
    // clean();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "lightgray";
    ctx.stroke();
}

//To clean the canvas
function clean(event) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    for(let x = 0; x < no_of_Boxes; x++){
        for(let y = 0; y < no_of_Boxes; y++){
            imageData[y + "_" + x] = "#FFFFFF"
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(x * box_Size, y * box_Size, box_Size, box_Size);
            ctx.strokeRect(x * box_Size, y * box_Size, box_Size, box_Size);
        }
    }
}

//Eevnt Listneres
button.addEventListener('click', clean);
save_btn.addEventListener('click', ()=>{  
    let count = 0;
    for (let x = 0; x < no_of_Boxes; x++){
        for (let y = 0; y < no_of_Boxes; y++) {
            if (imageData[y + "_" + x] == "FFFFFF") {
                count = 1;
            }
            else {
                break;
            }
        }
    }
    if (count == 1){
        clearData();
    }
    updateDATA(imageData);
    ScreenShot = canvas.toDataURL('image/png');
    Canvas1.src = ScreenShot;
});

Back_Button.addEventListener("click", ()=>{
    back();
});
firstCanvas.addEventListener("click", ()=>{
    Display();
    drawBoard();
    redraw_canvas();
});

canvas.addEventListener("mousedown", startpos);
canvas.addEventListener("mouseup", endpos);
canvas.addEventListener("mousemove", hoverEffect);
// window.addEventListener('click', ()=>{

//     ScreenShot = canvas.toDataURL('image/png');
//     Canvas1.src = ScreenShot;
//     drawBoard();
// });
function ONLOAD(event) {
    // drawBoard();   
    clean();
    ScreenShot = canvas.toDataURL('image/png');
    Canvas1.src = ScreenShot
}
window.addEventListener("load", ONLOAD());


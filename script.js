import { getAllData, getDataById, updateData, updateImg } from "./firebase.js";


const totalNoOfCanvas = 10;
let backgroundColor = "#FFFFFF";
//Getting Buttons and canvas from html
let color = document.getElementById("Color");
let cleanBtn = document.getElementById("button");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let canvasPage = document.getElementById("canvasPage");
let mainPage = document.getElementById("mainPage");
let backButton = document.getElementById("back");
let saveBtn = document.getElementById("save");
let fillbtn = document.getElementById("fill");

//Getting Offset of the canvas
let BB = canvas.getBoundingClientRect();
let offsetX = BB.left;
let offsetY = BB.top + window.scrollY;
let paint = false;

//Variables for canvas properties
let noOfBoxes = 50;
canvas.width = innerWidth / 2;
let boxSize = canvas.width / noOfBoxes;
canvas.height = canvas.width;

//To Store Data in MultiDimensional Array
let currentCanvasData = {},  canvasNo = [];
function onFetchDataById(data){
    redrawCanvas(data.data);
}

function onFetchAllData(data, id){
    for (let i = 0; i < totalNoOfCanvas; i++) {
        canvasNo[i] = document.getElementById('canvas' + i)
        canvasNo[i].src = data[i].img
    }
    for (let i = 0; i < totalNoOfCanvas; i++) {
        canvasNo[i].addEventListener('click', ()=>{
            onLoad(i, id[i], data[i]);
        });
    }
}

getAllData(onFetchAllData);
function onLoad(i, id) {
    display();
    drawGrid();
    getDataById(id, onFetchDataById)
    drawing();
    cleanData();
    tofill();
    goBack();
    saveData(i, id);
}

//drawing canvas Visibility hidden and main page visiblility to visible
canvasPage.style.visibility = "hidden";
mainPage.style.visibility = "visible";

//Funtion to paint on the canvas using data from firebase database
function redrawCanvas(data){
    for(let x = 0; x < noOfBoxes; x++){
        for(let y = 0; y < noOfBoxes; y++){
            if (data[x + "_" + y] != null){
                ctx.fillStyle = data[x + "_" + y];
            }

            else{
                // currentCanvasData[x + "_" + y] = backgroundColor;
                ctx.fillStyle = backgroundColor;
            }
            ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
            ctx.strokeRect(x * boxSize, y * boxSize, boxSize, boxSize);
        }
    }

}

//Function to get to the main canvas
function display(event) {
    
    mainPage.style.visibility = "hidden";
    canvasPage.style.visibility = "visible";

}


//Function for fill selected color
function fill(){
    for(let x = 0; x < noOfBoxes; x++){
        for(let y = 0; y < noOfBoxes; y++){
            currentCanvasData[x + "_" + y] = color.value
            ctx.fillStyle = color.value;
            ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
            ctx.strokeRect(x * boxSize, y * boxSize, boxSize, boxSize);
        }
    }
}

//back function
function back(event) {
    
    mainPage.style.visibility = "visible";
    canvasPage.style.visibility = "hidden";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

function drawing(){

    //Function to start paint
    function startDraw(e) {
        paint = true;
    }
    
    //Function to stop paint
    function endDraw() {
        paint = false;
    }
    
    //Main function for paint
    function draw(event) {
        if (!paint) return;
        
        let mouseX = event.clientX - offsetX;
        let mouseY = (event.clientY + window.scrollY) - offsetY;
        
        let index = convertMousePositionToCellIndex(mouseX, mouseY, boxSize);
        currentCanvasData[index.row + "_" + index.col] = color.value;
        ctx.fillStyle = color.value;
        ctx.fillRect(index.row * boxSize, index.col * boxSize, boxSize, boxSize);
        ctx.strokeRect(index.row * boxSize, index.col * boxSize, boxSize, boxSize);
        
    }
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mouseup", endDraw);
    canvas.addEventListener("mousemove", draw);
}

//Converting Mouse Position into index of grid
function convertMousePositionToCellIndex(mouseX, mouseY, boxSize) {
    return {
        row: Math.trunc(mouseX / boxSize),
        col: Math.trunc(mouseY / boxSize)
    };
}

//TO Draw Grid / Canvas
function drawGrid(event) {
    for (var x = 0; x <= canvas.width; x += boxSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }

    for (var x = 0; x <= canvas.height; x += boxSize) {
        ctx.moveTo(0, x);
        ctx.lineTo(canvas.width, x);
    }
    ctx.lineWidth = 2;
    ctx.strokeStyle = "lightgray";
    ctx.stroke();
}

//To clean the canvas
function clean(event) {
    for(let x = 0; x < noOfBoxes; x++){
        for(let y = 0; y < noOfBoxes; y++){
            currentCanvasData[x + "_" + y] = backgroundColor
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
            ctx.strokeRect(x * boxSize, y * boxSize, boxSize, boxSize);
        }
    }
}

//Eevnt Listneres
function cleanData(){
    cleanBtn.addEventListener('click', ()=>{
        clean();
        console.log('cleared canvas');
    });
}

function goBack(){
    backButton.addEventListener("click", ()=>{
        back();
    })
}

function tofill(){
    fillbtn.addEventListener('click', ()=>{
        fill();
    })
}

function saveData(i, id){

    saveBtn.addEventListener('click', ()=>{

        let screenShot = canvas.toDataURL('image/png');
        canvasNo[i].src = screenShot;
        console.log("id =>", id);
        console.log("i =>", i);
        updateData(currentCanvasData, id, screenShot);
        // updateImg(screenShot, id)
        currentCanvasData = {};
    });
    
}


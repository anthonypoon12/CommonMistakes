"use strict"
const params = new URLSearchParams(window.location.search);
const DICTIONARY = params.get('dict');
var listOfResponses = localStorage.getItem(DICTIONARY).split(",");
populateBodies();
function populateBodies(){
    for (let i = 0; i < listOfResponses.length;i=i+2){
        let rightorwrong = listOfResponses[i]%2==0? "wrong" : "right";
        let choice = listOfResponses[i+1]=="false" ? "incorrect" : "correct";
        let bodyToAppend;
        let userCorrect;
        if ((rightorwrong=="wrong"&&choice=="incorrect") || (rightorwrong=="right" && choice=="correct")){
            bodyToAppend = "#correctbody";
            userCorrect = true;
        }
        else{
            bodyToAppend = "#incorrectbody";
            userCorrect = false;
        }
        $(bodyToAppend).append(createGrid(i,rightorwrong, choice, userCorrect));
    }
}
function createGrid(i, rightorwrong, choice, userCorrect){//number that represents sentence (right and wrong are different numbers)
    let correction="";
    let notes = "";
    if (!userCorrect){
        notes = `<div class="row fs-3 border border-2 rounded"><h1>Notes:</h1></div>`;
    }
    if(rightorwrong=="wrong"&&choice=="correct"){
        correction = `<div class="col-12 fs-3 border border-2 rounded text-success">${sentences[$(".btn-convert").text()][DICTIONARY][Math.floor(listOfResponses[i]/2)]["right"]}</div>`
    }
    let grid = `${notes}
    <div class="row my-2 rounded border border-2 p-1">
    <div class="col-sm border border-2 ${userCorrect?"text-success":"text-danger"}">
    ${sentences[$(".btn-convert").text()][DICTIONARY][Math.floor(listOfResponses[i]/2)][rightorwrong]}
    </div>
    <div class="col-sm border border-2">
    ${choice}
    </div>
    ${correction}
    </div>`;
  return grid;
}
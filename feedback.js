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
        if ((rightorwrong=="wrong"&&choice=="incorrect") || (rightorwrong=="right" && choice=="correct"))
            bodyToAppend = "#correctbody";
        else
            bodyToAppend = "#incorrectbody";
        $(bodyToAppend).append(createGrid(i,rightorwrong, choice));
        $(bodyToAppend).append("<br>");
    }
}
function createGrid(i, rightorwrong, choice){//number that represents sentence (right and wrong are different numbers)
    let grid = `<div class="row">
    <div class="col-sm">
    ${sentences[$(".btn-convert").text()][DICTIONARY][Math.floor(listOfResponses[i]/2)][rightorwrong]}
    </div>
    <div class="col-sm">
    ${choice}
    </div>
    </div>`;
  return grid;
}
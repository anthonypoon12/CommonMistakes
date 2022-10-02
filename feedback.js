"use strict"
const params = new URLSearchParams(window.location.search);
const DICTIONARY = params.get('dict');
var listOfResponses = localStorage.getItem(DICTIONARY).split(",");
for (let i = 0; i < listOfResponses.length;i=i+2){
    $("#correctbody").append(createGrid(i));
    $("#correctbody").append("<br>");
}
function createGrid(i){//number that represents sentence (right and wrong are different numbers)
    let rightorwrong = listOfResponses[i]%2==0? "wrong" : "right";
    let grid = `<div class="row">
    <div class="col-sm">
      ${sentences[$(".btn-convert").text()][DICTIONARY][Math.floor(listOfResponses[i]/2)][rightorwrong]}
    </div>
    <div class="col-sm">
      ${listOfResponses[i+1]}
    </div>
  </div>`
  return grid;
}
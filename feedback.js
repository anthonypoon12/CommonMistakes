"use strict"
const params = new URLSearchParams(window.location.search);
const DICTIONARY = params.get('dict');
var listOfResponses = localStorage.getItem(DICTIONARY).split(",");
for (let i = 0; i < listOfResponses.length;i=i+2){
    let rightorwrong = listOfResponses[i]%2==0? "wrong" : "right";
    $("#correctbody").append(sentences[$(".btn-convert").text()][DICTIONARY][Math.floor(listOfResponses[i]/2)][rightorwrong]);
    $("#correctbody").append("<br>");
    console.log("hey")
}
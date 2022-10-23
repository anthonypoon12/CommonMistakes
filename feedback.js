"use strict"
const params = new URLSearchParams(window.location.search);
const DICTIONARY = params.get('dict');
//this means they backarrowed into the page
if (localStorage.getItem(DICTIONARY)==null){
    window.location.href = `index.html`;
}
var listOfResponses = localStorage.getItem(DICTIONARY).split(",");
populateBodies();
function populateBodies(){
    for (let i = 0; i < listOfResponses.length;i=i+2){
        let rightorwrong = listOfResponses[i]%2==0? "wrong" : "right";
        let choice;
        if (listOfResponses[i+1]=="N/A")
            choice = "N/A";
        else
            choice = listOfResponses[i+1]=="false" ? "incorrect" : "correct";
        $("#listOfSentences").append(`<li class="list-group-item">${sentences[$(".btn-convert").text()][DICTIONARY][Math.floor(listOfResponses[i]/2)][rightorwrong]}</li>`);
    }
}
function reloadSentence(){//this is the same function name as app.js to reload that specific sentence, simpTrad uses this function to switch scripts
    location.reload();
}
function restart(){
    localStorage.removeItem(DICTIONARY);
    window.location.href = `main.html?dict=${DICTIONARY}`;
}
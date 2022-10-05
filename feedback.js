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
    let lang = localStorage.getItem("Simplified")=="true"?"Traditional":"Simplified";
    if (!userCorrect){
        let notestext="";
        Object.keys(sentences[lang][DICTIONARY]["Notes"]).forEach(function(item){
            if (sentences[lang][DICTIONARY]["Notes"][item][1].includes(Math.floor(listOfResponses[i]/2))){
                notestext+=(`<li class="list-group-item p-1 rounded">` + sentences[lang][DICTIONARY]["Notes"][item][0] + "</li>");}
        });
        notes = `<div class="col-12 fs-4 border border-2 rounded my-1"><h2>Notes: </h2><span class="font-weight-normal"><ul class="list-group-flush"> ${notestext}</ul></span></div>`;
    }
    if(rightorwrong=="wrong"&&choice=="correct"){
        correction = `<div class="col-12 fs-3 border border-2 rounded text-success">${sentences[lang][DICTIONARY][Math.floor(listOfResponses[i]/2)]["right"]}</div>`
    }
    let grid = `
    <div class="row my-2 rounded border border-2 p-1" id="${i}">${notes}
    <div class="col-sm border border-2 ${userCorrect?"text-success":"text-danger"}">
    ${sentences[lang][DICTIONARY][Math.floor(listOfResponses[i]/2)][rightorwrong]}
    </div>
    <div class="col-sm border border-2">
    ${choice}
    </div>
    ${correction}
    </div>`;
  return grid;
}
function reloadSentence(){//this is the same function name as app.js to reload that specific sentence, simpTrad uses this function to switch scripts
    location.reload();
}
"use strict"
const params = new URLSearchParams(window.location.search);
const DICTIONARY = params.get('dict');
//this means they backarrowed into the page
if (localStorage.getItem(DICTIONARY)==null){
    window.location.href = `index.html`;
}
if (sessionStorage.getItem("fromMain")==null){
    var myModal = new bootstrap.Modal($("#beenHereModal"));
    myModal.show();
}
var listOfResponses = localStorage.getItem(DICTIONARY).split(",");
populateBodies();
sessionStorage.removeItem("fromMain");
function populateBodies(){
    for (let i = 0; i < listOfResponses.length;i=i+2){
        let rightorwrong = listOfResponses[i]%2==0? "wrong" : "right";
        let choice;
        if (listOfResponses[i+1]=="N/A")
            choice = "N/A";
        else
            choice = listOfResponses[i+1]=="false" ? "No" : "Yes";
        let bodyToAppend;
        let userCorrect;
        if ((rightorwrong=="wrong"&&choice=="No") || (rightorwrong=="right" && choice=="Yes")){
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
        let notestext="";
        Object.keys(sentences[simpOrTrad()][DICTIONARY]["Notes"]).forEach(function(item){
            if (sentences[simpOrTrad()][DICTIONARY]["Notes"][item][1].includes(Math.floor(listOfResponses[i]/2))){
                notestext+=(`<li class="list-group-item p-1 rounded">` + sentences[simpOrTrad()][DICTIONARY]["Notes"][item][0] + "</li>");}
        });
        notes = `<div class="col-12 fs-4 border border-2 rounded my-1"><h2>Notes: </h2><span class="font-weight-normal"><ul class="list-group-flush"> ${notestext}</ul></span></div>`;
    }
    if(rightorwrong=="wrong"&&choice=="Yes"){
        correction = `<div class="col-12 fs-3 border border-2 rounded text-success">The correct sentence is: ${sentences[simpOrTrad()][DICTIONARY][Math.floor(listOfResponses[i]/2)]["right"]}</div>`
    }
    let grid = `
    <div class="row my-2 rounded border border-2 p-1" id="${i}">
    <div class="col-sm border border-2 ${userCorrect?"text-success":"text-danger"}">
    ${sentences[simpOrTrad()][DICTIONARY][Math.floor(listOfResponses[i]/2)][rightorwrong]}
    </div>
    ${notes}
    ${correction}
    </div>`;
  return grid;
}
function reloadSentence(){//this is the same function name as app.js to reload that specific sentence, simpTrad uses this function to switch scripts
    sessionStorage.setItem("fromMain","true");
    location.reload();
}
function restart(){
    localStorage.removeItem(DICTIONARY);
    window.location.href = `main.html?dict=${DICTIONARY}`;
}
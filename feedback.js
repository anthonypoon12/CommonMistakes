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
        $("#accordion").append(
            `<div class="accordion-item">
            <h2 class="accordion-header" id="heading${i}">
              <button class="accordion-button fs-2 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
              <span id="sentence${i}">${sentences[localStorage.getItem("Simplified")=="false" ? "Traditional" : "Simplified"][DICTIONARY][Math.floor(listOfResponses[i]/2)][rightorwrong]}</span>
              </button>
            </h2>
            <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#accordion">
              <div class="accordion-body fs-5">
                You chose ${listOfResponses[i+1]}.
              </div>
            </div>`
            );
    }
}

function reloadSentence(){//this is the same function name as app.js to reload that specific sentence, simpTrad uses this function to switch scripts
    for (let i = 0; i < listOfResponses.length;i=i+2){
        let rightorwrong = listOfResponses[i]%2==0? "wrong" : "right";
        let choice;
        if (listOfResponses[i+1]=="N/A")
            choice = "N/A";
        else
            choice = listOfResponses[i+1]=="false" ? "incorrect" : "correct";
        $(`#sentence${i}`).text(sentences[localStorage.getItem("Simplified")=="false" ? "Traditional" : "Simplified"][DICTIONARY][Math.floor(listOfResponses[i]/2)][rightorwrong]);
    }
}

function restart(){
    localStorage.removeItem(DICTIONARY);
    window.location.href = `main.html?dict=${DICTIONARY}`;
}
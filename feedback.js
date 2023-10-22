"use strict"
const params = new URLSearchParams(window.location.search);
const DICTIONARY = params.get('dict');

// If there is wrong URL, return to index and do alert
if(!Object.keys(sentences[simpOrTrad()]).includes(DICTIONARY)){
    localStorage.setItem("wrongURL","true");
    window.location.href = `index.html`;
}

//this means they backarrowed into the page
if (localStorage.getItem(DICTIONARY)==null){
    window.location.href = `index.html`;
}
var listOfResponses = $.parseJSON(localStorage.getItem(DICTIONARY));
populateBodies();

function populateBodies(){
    for (let i = 0; i < listOfResponses.length;i++){
        let rightorwrong = listOfResponses[i][2] ? "right": "wrong";// is the sentence right or wrong
        let choice;
        let checkorx = "✗";
        if (listOfResponses[i][1]=="N/A")
            choice = "N/A";
        else
            choice = listOfResponses[i][1] == false ? "incorrect" : "correct";
        let notes = "";
        if (choice=="N/A" || (rightorwrong=="wrong" && choice=="correct") || (rightorwrong=="right" && choice=="incorrect"))
            notes = getNotes(listOfResponses[i][0]);
            let userRightorWrong = "";
        if (choice!="N/A"){
            userRightorWrong = "<br>";
            if ((rightorwrong=="wrong" && choice=="correct") || (rightorwrong=="right" && choice=="incorrect"))
                userRightorWrong += `You got it wrong 😔.  This is actually ${rightorwrong=="wrong" ? "an incorrect" : "a correct"} statement.`;
            else{
                userRightorWrong = "Good Job! 😎";
                checkorx = "✓";
            }
        }

        checkorx = `<div style="color:${checkorx=="✗" ? "red" : "green"}" class="h-100 d-inline-block">${checkorx}</div>`;
        $("#accordion").append(
            `<div class="accordion-item">
            <h2 class="accordion-header" id="heading${i}">
              <button class="accordion-button fs-2 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
              <span id="sentence${i}">${checkorx} ${i+1}. ${sentences[simpOrTrad()][DICTIONARY][listOfResponses[i][0]][rightorwrong]}</span>
              </button>
            </h2>
            <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#accordion">
              <div class="accordion-body fs-5">
                You chose ${listOfResponses[i][1]}.
                ${userRightorWrong}
                ${notes}
              </div>
            </div>`
            );
    }
}

function reloadSentence(){//this is the same function name as app.js to reload that specific sentence, simpTrad uses this function to switch scripts
    for (let i = 0; i < listOfResponses.length;i++){
        let rightorwrong = listOfResponses[i][2]? "wrong" : "right";
        let choice;
        if (listOfResponses[i][1]=="N/A")
            choice = "N/A";
        else
            choice = listOfResponses[i][1] == false ? "incorrect" : "correct";
        $(`#sentence${i}`).text(sentences[simpOrTrad()][DICTIONARY][listOfResponses[i]][rightorwrong]);
    }
}

function restart(){
    localStorage.removeItem(DICTIONARY);
    window.location.href = `main.html?dict=${DICTIONARY}`;
}

function getNotes(specialnumber){ //same as app.,js
    const allDictionaryNotes = sentences[simpOrTrad()][DICTIONARY]["Notes"];

    const notes = Object.keys(allDictionaryNotes)
    .filter(item => allDictionaryNotes[item][1].includes(specialnumber))
    .map(item => allDictionaryNotes[item][0])
    .join("\n");

    return notes;

}

$("#redo").click(function(){
    window.location.href = `main.html?dict=${DICTIONARY}`;
});
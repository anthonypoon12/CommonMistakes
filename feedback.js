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
        let correctAnswer = listOfResponses[i][2];// is the sentence right or wrong
        let userChoice;
        let checkorx = "✗";

        if (listOfResponses[i][1]=="N/A")
            userChoice = null;
        else
            userChoice = listOfResponses[i][1];

        let notes = "";
        if (userChoice==null || (correctAnswer != userChoice))
            notes = getNotes(listOfResponses[i][0]);
            
        let userCorrectnessMessage = "";
        if (userChoice!=null){
            userCorrectnessMessage = "<br>";
            if ((correctAnswer != userChoice))
                userCorrectnessMessage += `You got it wrong 😔.  This is actually ${correctAnswer ? "a correct" : "an incorrect"} statement.`;
            else{
                userCorrectnessMessage = "Good Job! 😎";
                checkorx = "✓";
            }
        }

        let color = "gray";
        if (userChoice != null){
            if (checkorx=="✗")
                color = "red";
            else
                color = "green";
        }

        checkorx = `<div style="color:${color}" class="h-100 d-inline-block">${checkorx}</div>`;
        $("#accordion").append(
            `<div class="accordion-item">
            <h2 class="accordion-header" id="heading${i}">
              <button class="accordion-button fs-2 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
              ${checkorx} ${i+1}. <span id='sentence${i}' class='mx-2'>${sentences[simpOrTrad()][DICTIONARY][listOfResponses[i][0]][correctAnswer ? "right" : "wrong"]}</span>
              </button>
            </h2>
            <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#accordion">
              <div class="accordion-body fs-5">
              ${userChoice==null ? "You skipped this question." :
                `You chose ${listOfResponses[i][1]}.
                ${userCorrectnessMessage}`
                }
                ${notes}
              </div>
            </div>`
            );
    }
}

function reloadSentence(){//this is the same function name as app.js to reload that specific sentence, simpTrad uses this function to switch scripts
    for (let i = 0; i < listOfResponses.length;i++){
        let rightorwrong = listOfResponses[i][2]? "right" : "wrong";
        $(`#sentence${i}`).text(sentences[simpOrTrad()][DICTIONARY][listOfResponses[i][0]][rightorwrong]);

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
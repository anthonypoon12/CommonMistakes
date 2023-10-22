"use strict"
const params = new URLSearchParams(window.location.search);
const DICTIONARY = params.get('dict');
let numberCorrectlyAnswered = 0; //number of questions user got correct
let currentQuestionIsTrue; //whether question is true or false
let currentChoice;
let questionIndex; // which number sentence (this is not iterated in order)
let currentChosenButton; // used for the check function
let currentQuestionCount = 0;//starts at 0;
const listOfResponses = []; //stored in local storage for final screen
const setOfSentences = [];
//Makes array of indexes for sentences

// If there is wrong URL, return to index and do alert
if(!Object.keys(sentences[simpOrTrad()]).includes(DICTIONARY)){
    localStorage.setItem("wrongURL","true");
    window.location.href = `index.html`;
}

const dictlength = Object.keys(sentences[simpOrTrad()][DICTIONARY]).length - 1; //number of right and wrong sentences
const problemContainer = document.getElementById("problemContainer");
for (let i = 0 ; i < dictlength; i++){
    setOfSentences.push(i);
}
loadSentence();
$("#score").text("Score: " + numberCorrectlyAnswered.toString() + "/" + dictlength);

function loadSentence(){ 
    $("#questions").text("Question: " + (dictlength-(setOfSentences.length) + 1).toString() + "/" + dictlength);
    $(problemContainer).html("");

    let index = Math.floor(Math.random()*setOfSentences.length);
    questionIndex = setOfSentences.pop(index);

    currentQuestionIsTrue = !!Math.round(Math.random());
    let rightOrWrong = currentQuestionIsTrue ? "right": "wrong";

    let sentence = sentences[simpOrTrad()][DICTIONARY][questionIndex];
    let meaning = sentence.meaning;
    let sentencetoDisplay=sentence[rightOrWrong];

    $('#problemContainer').prepend(createProblemDiv(sentencetoDisplay, meaning, questionIndex));
}

function createProblemDiv(sentencetoDisplay, meaning, specialnumber){
    let note = getNotes(specialnumber);
    $("#notes").text(note);
    let problemDiv = $("<div>")
    .attr('id', 'problem')
    .addClass('english border-bottom')
    .append(
        $("<h1>")
        .attr('id', 'sentenceInChinese')
        .attr('tabindex', '0')
        .text(sentencetoDisplay)
    )
    .append("<br>")
    .append(createMeaningSpan(meaning));
    return problemDiv;
}

function getNotes(specialnumber){
    const allDictionaryNotes = sentences[simpOrTrad()][DICTIONARY]["Notes"];

    const notes = Object.keys(allDictionaryNotes)
    .filter(item => allDictionaryNotes[item][1].includes(specialnumber))
    .map(item => allDictionaryNotes[item][0])
    .join("\n");

    return notes;

}
function createMeaningSpan(meaning){
    return $('<h1>').attr('id', 'meaning').html(meaning);
}

$( "#correct" ).click(function() {
    $(this).addClass("chosen");
    $( "#next" ).html("<h2>Next</h2>");
    currentChosenButton="#correct";
    if (currentQuestionIsTrue){
        numberCorrectlyAnswered++;
    }
    currentChoice=true;
    $('#incorrect').prop('disabled', true);
    $("#score").text("Score: " + numberCorrectlyAnswered.toString() + "/" + dictlength);
    check();
    if (currentQuestionCount+1>=dictlength)
        gameOverfunc();
});

$( "#incorrect" ).click(function() {
    $(this).addClass("chosen");
    $( "#next" ).html("<h2>Next</h2>");
    currentChosenButton="#incorrect";
    if (!currentQuestionIsTrue){
        numberCorrectlyAnswered++;
    }
    currentChoice=false;
    $('#correct').prop('disabled', true);
    $("#score").text("Score: " + numberCorrectlyAnswered.toString() + "/" + dictlength);
    check();
    if (currentQuestionCount+1>=dictlength)
        gameOverfunc();
});

$( "#next" ).click(function() {
    if ($("#next").text().trim()=="Skip")
        listOfResponses.push([questionIndex,"N/A", currentQuestionIsTrue]);
    else
        $( "#next" ).html("<h2>Skip</h2>");
    if(currentQuestionCount<dictlength){
        $('#correct').prop('disabled', false);
        $('#incorrect').prop('disabled', false);
        $('#correct').html(`<span id="incorrectsign" style="color: red;" class:"fs-4">&#10008;</span>Yes<span id="correctsign" style="color: green;" class:"fs-4">&#10004;</span>`);
        $('#incorrect').html(`<span id="incorrectsign" style="color: red;" class:"fs-4">&#10008;</span>No<span id="correctsign" style="color: green;" class:"fs-4">&#10004;</span>`);
        $("#correct").removeClass("chosen");
        $("#incorrect").removeClass("chosen");
        currentQuestionCount++;
    }
    if (currentQuestionCount>=dictlength){
        gameOverfunc();
        $('#correct').prop('disabled', true);
        $('#incorrect').prop('disabled', true);
    }
    else{
        $("#hint").removeClass("show");
        $("#notesdiv").removeClass("show");
        $("#hint").attr("aria-expanded","false");
        loadSentence();
    }
});
function check(){
    if (currentQuestionIsTrue==currentChoice)
        $(currentChosenButton).find("#correctsign").css("visibility","visible");
    else
        $(currentChosenButton).find("#incorrectsign").css("visibility","visible");
// stores question and response to list, will send to local storage
    currentChosenButton = undefined;
    listOfResponses.push([questionIndex,currentChoice, currentQuestionIsTrue]);
}
// GAMEOVER MODAL
function gameOverfunc(){
    clearTimer();
    // sends list of responses to local storage
    localStorage.setItem(DICTIONARY,JSON.stringify(listOfResponses));
    openFeedback();
  }
function modalGameOver() {
    let myModal = new bootstrap.Modal($("#gameOverModal"));
    myModal.show();
    $("#modalseconds").text($("#seconds").text());
    $("#modalminutes").text($("#minutes").text());
}
function reloadSentence(){
    let sentence = sentences[simpOrTrad()][DICTIONARY][questionIndex];
    let meaning=sentence.meaning;
    let sentencetoDisplay="";
    if (currentQuestionIsTrue)
        sentencetoDisplay=sentence.right;
    else
        sentencetoDisplay=sentence.wrong;
    $('#problemContainer').html(createProblemDiv(sentencetoDisplay, meaning, questionIndex));
}
function restart(){
    localStorage.removeItem(DICTIONARY);
    location.reload();
}
function openFeedback(){
    window.location.href = `feedback.html?dict=${DICTIONARY}`;
}
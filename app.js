"use strict"
const params = new URLSearchParams(window.location.search);
const DICTIONARY = params.get('dict');
var correct = 0; //number of questions user got correct
var trueOrFalse = false; //whether question is true or false
var problemDiv;
var currentchoice=false;
var specialnumber; //which number sentence (right and wrong are different numbers)
var currentbutton="";
var currentquestion;//which question is this (right and wrong yield same number)
var currentquestioncount = 0;//starts at 0;
var listOfResponses = []; //stored in local storage for final screen
//Makes array of indexes for sentences
const setOfSentences = [];
const dictlength = Object.keys(sentences[simpOrTrad()][DICTIONARY]).length - 1; //number of right and wrong sentences
var problemContainer = document.getElementById("problemContainer");
for (let i = 0 ; i < dictlength * 2; i++){
    setOfSentences.push(i);
}
// sent to feedback page for modal
if (localStorage.getItem(DICTIONARY)!=null){
    var myModal = new bootstrap.Modal($("#gameOverModal"));
    myModal.show();
    $("#gameOverModalLabel").text("You've tried this exercise before!");
    $("#gameOverModalLabel").text("You've tried this exercise before!");
    $("#time").html("");
}
loadSentence();
$("#score").text("Score: " + correct.toString() + "/" + dictlength);

function loadSentence(){ 
    $("#questions").text("Question: " + (dictlength-(setOfSentences.length/2) + 1).toString() + "/" + dictlength);
    problemContainer.innerHTML="";
    let index = Math.floor(Math.random()*setOfSentences.length);
    specialnumber = setOfSentences[index];
    currentquestion = Math.floor(specialnumber/2)
    let indexToRemoveFromSet=index;
    if(index%2==1)
        indexToRemoveFromSet--;
    if (indexToRemoveFromSet !== -1) {
        setOfSentences.splice(indexToRemoveFromSet, 2);
    }
    let sentence = sentences[simpOrTrad()][DICTIONARY][currentquestion];
    let meaning=sentence.meaning;
    let sentencetoDisplay="";
    if (specialnumber%2==0){
        sentencetoDisplay=sentence.wrong;
        trueOrFalse = false;
    }
    else{
        sentencetoDisplay=sentence.right;
        trueOrFalse = true;
    }
    $('#problemContainer').prepend(createProblemDiv(sentencetoDisplay, meaning, specialnumber));
    $(function () { // initizalizes tooltips
        $('[data-toggle="tooltip"]').tooltip(); 
      })
}
function createProblemDiv(sentencetoDisplay, meaning, specialnumber){
    let note = getNotes(specialnumber);
    problemDiv = document.createElement('div');
    problemDiv.id = ('problem');
    problemDiv.classList.add('english');
    problemDiv.classList.add('border-bottom');
    problemDiv.innerHTML = `<h1 id="sentenceInChinese" tabindex="0" data-toggle="tooltip" title="${note}">` + sentencetoDisplay + "</h1>";
    problemDiv.innerHTML = problemDiv.innerHTML + "<br>";
    problemDiv.appendChild(createMeaningSpan(meaning));
    return problemDiv;
}
function getNotes(specialnumber){;
    let notes = "";
    Object.keys(sentences[simpOrTrad()][DICTIONARY]["Notes"]).forEach(function(item){
        if (sentences[simpOrTrad()][DICTIONARY]["Notes"][item][1].includes(Math.floor(specialnumber/2))){
            notes+=(sentences[simpOrTrad()][DICTIONARY]["Notes"][item][0] + "\n");
        }
    });
    return notes;
}
function createMeaningSpan(meaning){
    let meaningSpan = document.createElement('h1');
    meaningSpan.id = 'meaning';
    meaningSpan.innerHTML = meaning;
    return meaningSpan;
}
$( "#correct" ).click(function() {
    $(this).addClass("chosen");
    $( "#next" ).html("<h2>Next</h2>");
    currentbutton="#correct";
    if (true==trueOrFalse){
        correct++;
    }
    currentchoice=true;
    $('#incorrect').prop('disabled', true);
    $("#score").text("Score: " + correct.toString() + "/" + dictlength);
    check();
    if (currentquestioncount+1>=dictlength)
    gameOverfunc();
});
$( "#incorrect" ).click(function() {
    $(this).addClass("chosen");
    $( "#next" ).html("<h2>Next</h2>");
    currentbutton="#incorrect";
    if (false==trueOrFalse){
        correct++;
    }
    currentchoice=false;
    $('#correct').prop('disabled', true);
    $("#score").text("Score: " + correct.toString() + "/" + dictlength);
    check();
    if (currentquestioncount+1>=dictlength)
        gameOverfunc();
});
$( "#next" ).click(function() {
    $( "#next" ).html("<h2>Skip</h2>");
    if(currentquestioncount<dictlength){
        $('#correct').prop('disabled', false);
        $('#incorrect').prop('disabled', false);
        $('#correct').html(`<span id="incorrectsign" style="color: red;" class:"fs-4">&#10008;</span>Yes<span id="correctsign" style="color: green;" class:"fs-4">&#10004;</span>`);
        $('#incorrect').html(`<span id="incorrectsign" style="color: red;" class:"fs-4">&#10008;</span>No<span id="correctsign" style="color: green;" class:"fs-4">&#10004;</span>`);
        $("#correct").removeClass("chosen");
        $("#incorrect").removeClass("chosen");
        currentquestioncount++;
    }
    if (currentquestioncount>=dictlength){
        gameOverfunc();
        $('#correct').prop('disabled', true);
        $('#incorrect').prop('disabled', true);
    }
    else{
        loadSentence();
        listOfResponses.push([specialnumber,"N/A"]);
    }
});
function check(){
    if (trueOrFalse==currentchoice)
        $(currentbutton).find("#correctsign").css("visibility","visible");
    else
        $(currentbutton).find("#incorrectsign").css("visibility","visible");
    // stores question and response to list, will send to local storage
    listOfResponses.push([specialnumber,currentchoice]);
}
// GAMEOVER MODAL
function gameOverfunc(){
    clearTimer();
    modalGameOver();
    // sends list of responses to local storage
    localStorage.setItem(DICTIONARY,listOfResponses);
  }
function modalGameOver() {
    var myModal = new bootstrap.Modal($("#gameOverModal"));
    myModal.show();
    $("#modalseconds").text($("#seconds").text());
    $("#modalminutes").text($("#minutes").text());
}
function reloadSentence(){
    let sentence = sentences[simpOrTrad()][DICTIONARY][currentquestion];
    let meaning=sentence.meaning;
    let sentencetoDisplay="";
    if (trueOrFalse)
        sentencetoDisplay=sentence.right;
    else
        sentencetoDisplay=sentence.wrong;
    $('#problemContainer').text("");
    $('#problemContainer').prepend(createProblemDiv(sentencetoDisplay, meaning, specialnumber));
    $(function () { // initizalizes tooltips
        $('[data-toggle="tooltip"]').tooltip(); 
      })
}
function restart(){
    localStorage.removeItem(DICTIONARY);
    location.reload();
}
function openFeedback(){
    sessionStorage.setItem("fromMain","true");
    window.location.href = `feedback.html?dict=${DICTIONARY}`;
}
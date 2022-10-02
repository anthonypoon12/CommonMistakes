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
const dictlength = Object.keys(sentences[$(".btn-convert").text()][DICTIONARY]).length - 1; //number of right and wrong sentences
var problemContainer = document.getElementById("problemContainer");
for (let i = 0 ; i < dictlength * 2; i++){
    setOfSentences.push(i);
}
// if user has already done exercise, skip to game over
if (localStorage.getItem(DICTIONARY)!=null){
    gameOverfunc();
}
else
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
    let sentence = sentences[$(".btn-convert").text()][DICTIONARY][currentquestion];
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
    $('#problemContainer').prepend(createProblemDiv(sentencetoDisplay, meaning));
}
function createProblemDiv(sentencetoDisplay, meaning){
    problemDiv = document.createElement('div');
    problemDiv.id = ('problem');
    problemDiv.classList.add('english');
    problemDiv.classList.add('border-bottom');
    problemDiv.innerHTML = `<h1 id="sentenceInChinese">` + sentencetoDisplay + "</h1>";
    problemDiv.innerHTML = problemDiv.innerHTML + "<br>";
    problemDiv.appendChild(createMeaningSpan(meaning));
    return problemDiv;
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
        $('#correct').html(`<span id="incorrectsign" style="color: red;" class:"fs-4">&#10008;</span>Correct<span id="correctsign" style="color: green;" class:"fs-4">&#10004;</span>`);
        $('#incorrect').html(`<span id="incorrectsign" style="color: red;" class:"fs-4">&#10008;</span>Incorrect<span id="correctsign" style="color: green;" class:"fs-4">&#10004;</span>`);
        $("#correct").removeClass("chosen");
        $("#incorrect").removeClass("chosen");
        currentquestioncount++;
    }
    if (currentquestioncount>=dictlength){
        gameOverfunc();
        $('#correct').prop('disabled', true);
        $('#incorrect').prop('disabled', true);
    }
    else
    loadSentence();
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
    let message = "Game Over";
    if (correct==dictlength){
        message = "You won!";
    }
    $("#modalending").html(`
    <h1> ${message} </h2>
    <h2> Score: ${correct}/${dictlength} </h2>
    <h2> Time: ${$("#minutes").text()}:${$("#seconds").text()} </h2>
    <button id="Restart" class="my-2 btn-modal">
    <a onclick="localStorage.removeItem(DICTIONARY);location.reload()">
    <h3>Restart</h3>
    </a>
    </button>
    <button id="Continue" class="my-2 btn-modal">
    <a href="feedback.html?dict=${DICTIONARY}">
    <h3>See your stats!</h3>
    </a>
    </button>
    <button id="Menu" class="my-2 btn-modal">
    <a href="index.html">
    <h3>Back to menu</h3>
    </a>
    </button>
    `);
}
function reloadSentence(){
    let sentence = sentences[$(".btn-convert").text()][DICTIONARY][currentquestion];
    console.log($(".btn-convert").text());
    let meaning=sentence.meaning;
    let sentencetoDisplay="";
    if (trueOrFalse)
    sentencetoDisplay=sentence.right;
    else
    sentencetoDisplay=sentence.wrong;
    $('#problemContainer').text("");
    $('#problemContainer').prepend(createProblemDiv(sentencetoDisplay, meaning));
}
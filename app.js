"use strict"
const params = new URLSearchParams(window.location.search);
const DICTIONARY = params.get('dict');
var correct = 0;
var trueOrFalse = false;
var problemDiv;
var currentchoice=false;
var currentbutton="";
var currentquestion = 0;//starts at 0
//Makes array of indexes for sentences
const setOfSentences = [];
const dictlength = Object.keys(sentences[DICTIONARY]).length;
var problemContainer = document.getElementById("problemContainer");
for (let i = 0 ; i < dictlength * 2; i++){
    setOfSentences.push(i);
}
//loads the first sentence
window.addEventListener('load', loadSentence);
$("#score").text("Score: " + correct.toString() + "/" + dictlength);
function loadSentence(){ 
    $("#questions").text("Question: " + (dictlength-(setOfSentences.length/2) + 1).toString() + "/" + dictlength);
    problemContainer.innerHTML="";
    let index = Math.floor(Math.random()*setOfSentences.length);
    let specialnumber = setOfSentences[index];
    let indexToRemoveFromSet=index;
    if(index%2==1)
        indexToRemoveFromSet--;
    if (indexToRemoveFromSet !== -1) {
        setOfSentences.splice(indexToRemoveFromSet, 2);
    }
    let sentence = sentences[DICTIONARY][Math.floor(specialnumber/2)];
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
    problemDiv.innerHTML = "<h1>" + sentencetoDisplay + "</h1>";
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
    $( "#next" ).text("Next");
    currentbutton="#correct";
    if (true==trueOrFalse){
        correct++;
    }
    currentchoice=true;
    $('#incorrect').prop('disabled', true);
    $("#score").text("Score: " + correct.toString() + "/" + dictlength);
    check();
    if (currentquestion+1>=dictlength)
        gameOverfunc();
});
$( "#incorrect" ).click(function() {
    $(this).addClass("chosen");
    $( "#next" ).text("Next");
    currentbutton="#incorrect";
    if (false==trueOrFalse){
        correct++;
    }
    currentchoice=false;
    $('#correct').prop('disabled', true);
    $("#score").text("Score: " + correct.toString() + "/" + dictlength);
    check();
    if (currentquestion+1>=dictlength)
        gameOverfunc();
    });
    $( "#next" ).click(function() {
        $( "#next" ).text("Skip");
        if(currentquestion<dictlength){
            $('#correct').prop('disabled', false);
            $('#incorrect').prop('disabled', false);
            $('#correct').html("Correct");
            $('#incorrect').html("Incorrect");
            $("#correct").removeClass("chosen");
            $("#incorrect").removeClass("chosen");
            currentquestion++;
        }
        if (currentquestion>=dictlength){
            gameOverfunc();
            $('#correct').prop('disabled', true);
            $('#incorrect').prop('disabled', true);
        }
        else
            loadSentence();
});
function check(){
    if (trueOrFalse==currentchoice)
    $(currentbutton).append(`<span id="correct" style="color: green; font-size:3rem; ">&#10004;</span> `);
    else
    $(currentbutton).append(`<span id="correct" style="color: red; font-size:3rem; ">&#10008;</span> `);
}
// GAMEOVER MODAL
function gameOverfunc(){
    clearTimer();
    modalGameOver();
  }
function modalGameOver() {
    console.log("Hi");
    let message = "Game Over";
    if (correct==dictlength){
      message = "You won!";
    }
    $("#modalending").html(`
        <h1> ${message} </h2>
        <h2> Score: ${correct}/${dictlength} </h2>
        <h2> Time: ${$("#minutes").text()}:${$("#seconds").text()} </h2>
        <button id="Restart" class="my-2 btn-modal">
          <a onclick="location.reload()">
            <h6>Restart</h6>
          </a>
        </button>
        <button id="Menu" class="my-2 btn-modal">
          <a href="index.html">
            <h6>Back to menu</h6>
          </a>
        </button>
    `);
  }
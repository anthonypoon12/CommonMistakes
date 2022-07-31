"use strict"
const params = new URLSearchParams(window.location.search);
const DICTIONARY = params.get('dict');
var correct = 0;
var trueOrFalse = false;
var problemDiv;
var currentchoice=false;
var currentbutton="";
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
    console.log(sentence);
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
    problemDiv.innerHTML = sentencetoDisplay;
    problemDiv.innerHTML = problemDiv.innerHTML + "<br>";
    problemDiv.appendChild(createMeaningSpan(meaning));
    return problemDiv;
}
function createMeaningSpan(meaning){
    let meaningSpan = document.createElement('span');
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
    if (setOfSentences.length<=0)
        clearTimer();
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
    if (setOfSentences.length<=0)
        clearTimer();
});
$( "#next" ).click(function() {
    $( "#next" ).text("Skip");
    if(setOfSentences.length>0){
        loadSentence();
        $('#correct').prop('disabled', false);
        $('#incorrect').prop('disabled', false);
        $('#correct').html("Correct");
        $('#incorrect').html("Incorrect");
        $("#correct").removeClass("chosen");
        $("#incorrect").removeClass("chosen");
    }
});
function check(){
    if (trueOrFalse==currentchoice)
    $(currentbutton).append(`<span id="correct" style="color: green; font-size:1.5rem; ">&#10004;</span> `);
    else
    $(currentbutton).append(`<span id="correct" style="color: red; font-size:1.5rem; ">&#10008;</span> `);
}


"use strict"
var correct = 0;
var trueOrFalse = false;
var problemDiv;
//Makes array of indexes for sentences
const setOfSentences = [];
var problemContainer = document.getElementById("problemContainer");
for (let i = 0 ; i < 18; i++){
    setOfSentences.push(i);
}
//loads the first sentence
window.addEventListener('load', loadSentence);
$("#score").text("Score: " + correct.toString() + "/9");
function loadSentence(){ 
    $("#questions").text("Question: " + (10-(setOfSentences.length/2)).toString() + "/9");
    problemContainer.innerHTML="";
    let index = Math.floor(Math.random()*setOfSentences.length);
    let specialnumber = setOfSentences[index];
    let indexToRemoveFromSet=index;
    if(index%2==1)
        indexToRemoveFromSet--;
    if (indexToRemoveFromSet !== -1) {
        setOfSentences.splice(indexToRemoveFromSet, 2);
    }
    let sentence = sentences[Math.floor(specialnumber/2)];
    let sentencePart1=sentence.partOne;
    let sentencePart2=sentence.partTwo;
    let meaning=sentence.meaning;
    let specialword="";
    if (specialnumber%2==0){
        specialword=sentence.wrong;
        trueOrFalse = false;
    }
    else{
        specialword=sentence.right;
        trueOrFalse = true;
    }
    $('#problemContainer').prepend(createProblemDiv(sentencePart1, sentencePart2, specialword, meaning));
}
function createProblemDiv(sentencePart1, sentencePart2, specialword, meaning){
    problemDiv = document.createElement('div');
    problemDiv.id = ('problem');
    problemDiv.classList.add('english');
    problemDiv.classList.add('border-bottom');
    problemDiv.innerHTML = sentencePart1;
    problemDiv.appendChild(createTargetWordSpan(specialword));
    problemDiv.innerHTML = problemDiv.innerHTML + sentencePart2;
    problemDiv.innerHTML = problemDiv.innerHTML + "<br>";
    // problemDiv.innerHTML =`<span id="correct" style="color: blue; font-size:1.5rem; ">&#10004;</span>` + problemDiv.innerHTML;
    problemDiv.appendChild(createMeaningSpan(meaning));
    return problemDiv;
}
function createTargetWordSpan(specialword){
    let targetWordSpan = document.createElement('span');
    targetWordSpan.id = 'specialword';
    targetWordSpan.innerHTML = specialword;
    return targetWordSpan;
}
function createMeaningSpan(meaning){
    let meaningSpan = document.createElement('span');
    meaningSpan.id = 'meaning';
    meaningSpan.innerHTML = meaning;
    return meaningSpan;
}
$( "#correct" ).click(function() {
    if (true==trueOrFalse){
        correct++;
    }
    $(this).css("border", "3px solid black");
    $('#incorrect').prop('disabled', true);
    $("#score").text("Score: " + correct.toString() + "/9");
    check();
    if (setOfSentences.length<=0)
        clearTimer();
    });
    $( "#incorrect" ).click(function() {
    if (false==trueOrFalse){
        correct++;
    }
    $(this).css("border", "3px solid black");
    $('#correct').prop('disabled', true);
    $("#score").text("Score: " + correct.toString() + "/9");
    check();
    if (setOfSentences.length<=0)
        clearTimer();
});
$( "#next" ).click(function() {
    if(setOfSentences.length>0){
        loadSentence();
        $('#correct').prop('disabled', false);
        $('#incorrect').prop('disabled', false);
    }
});
function check(){
    if (trueOrFalse)
        problemDiv.innerHTML = `<span id="correct" style="color: green; font-size:1.5rem; ">&#10004;</span> ` + problemDiv.innerHTML;
    else
        problemDiv.innerHTML = `<span id="correct" style="color: red; font-size:1.5rem; ">&#10008;</span> ` + problemDiv.innerHTML;
}
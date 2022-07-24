"use strict"
var correct = 0;
var trueOrFalse = false;
//Makes array of indexes for sentences
const setOfSentences = [];
var problemContainer = document.getElementById("problemContainer");
for (let i = 0 ; i < 18; i++){
    setOfSentences.push(i);
}
//loads the first sentence
window.addEventListener('load', loadSentence);
function loadSentence(){ 
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
    let problemDiv = document.createElement('div');
    problemDiv.id = ('problem');
    problemDiv.classList.add('english');
    problemDiv.classList.add('border-bottom');
    problemDiv.innerHTML = sentencePart1;
    problemDiv.appendChild(createTargetWordSpan(specialword));
    problemDiv.innerHTML = problemDiv.innerHTML + sentencePart2;
    problemDiv.innerHTML = problemDiv.innerHTML + "<br>";
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
    alert(true===trueOrFalse);
});
$( "#incorrect" ).click(function() {
    alert(false===trueOrFalse);
});
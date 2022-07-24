"use strict"
const setOfSentences = [];
for (let i = 0 ; i < 18; i++){
    setOfSentences.push(i);
}
let specialnumber = Math.floor(Math.random()*18);
let indexToRemoveFromSet;
indexToRemoveFromSet = setOfSentences.indexOf(specialnumber);
if(specialnumber%2==1)
indexToRemoveFromSet--;
if (indexToRemoveFromSet !== -1) {
    setOfSentences.splice(indexToRemoveFromSet, 2);
}
let sentence = sentences[Math.floor(specialnumber/2)];
let sentencePart1=sentence.partOne;
let sentencePart2=sentence.partTwo;
let meaning=sentence.meaning;
console.log(sentencePart1);
console.log(sentencePart2);
let specialword="";
if (specialnumber%2==0)
    specialword=sentence.wrong;
else
    specialword=sentence.right;
function createProblemDiv(sentencePart1, sentencePart2){
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
let problemContainer = document.getElementById("problemContainer");
$('#problemContainer').prepend(createProblemDiv(sentencePart1, sentencePart2));
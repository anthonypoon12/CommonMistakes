let specialnumber = Math.floor(Math.random()*18);
let sentence = sentences[specialnumber/2];
let sentencePart1=sentence.part1;
let sentencePart2=sentence.part2;
let specialword="";
if (specialnumber%2==0)
    specialword=sentence.wrong;
else
    specialword=sentence.right;
function createProblemDiv(sentencePart1, sentencePart2){
    problemDiv = document.createElement('div');
    problemDiv.id = ('problem');
    problemDiv.classList.add('english');
    problemDiv.classList.add('border-bottom');
    problemDiv.innerHTML = sentencePart1;
    problemDiv.appendChild(createTargetWordSpan(specialword));
    problemDiv.innerHTML = problemDiv.innerHTML + sentencePart2;
    return problemDiv;
}
function createTargetWordSpan(specialword){
    targetWordSpan = document.createElement('span');
    targetWordSpan.id = 'specialword';
    targetWordSpan.innerHTML = specialword;
    return targetWordSpan;
}
problemContainer = document.getElementById("problemContainer");
$('#problemContainer').prepend(createProblemDiv(sentencePart1, sentencePart2));
"use strict"
const params = new URLSearchParams(window.location.search);
const DICTIONARY = params.get('dict');
//this means they backarrowed into the page
if (localStorage.getItem(DICTIONARY)==null){
    window.location.href = `index.html`;
}
var listOfResponses = localStorage.getItem(DICTIONARY).split(",");
function reloadSentence(){//this is the same function name as app.js to reload that specific sentence, simpTrad uses this function to switch scripts
    location.reload();
}
function restart(){
    localStorage.removeItem(DICTIONARY);
    window.location.href = `main.html?dict=${DICTIONARY}`;
}
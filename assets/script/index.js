'use strict';
import { Score } from "./score.js";
import { onEvent, select, selectAll, selectById, create} from "./utilites.js";

const words = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
    'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
    'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
    'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
    'philosophy', 'database', 'periodic', 'capitalism', 'abominable',
    'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
    'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'promise',
    'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
    'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
    'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess',
    'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library',
    'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy',
    'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous','league', 
    'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window', 'beans', 'truck', 'sheep', 'band', 'level', 'hope',
    'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil', 'mask',
    'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
    'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort', 'escape'
   ];
   //localStorage.clear();
const clone = words;
//console.log(clone);
const load = select('.load');
const wordsObj = select('.words');
const input = selectById('input');
const score = selectById('score');
const fill = selectById('fill');
const restart = selectById('restart');
const restart2 = selectById('restart2');
const count = select('.count');
const scoreboard = select('.scoreboard');
const rowPress = select('.row-press');
const container = select('.container');
const model = document.getElementById('model');
const modalContainer = document.querySelector('.modal-container');

const backgroudAudio = new Audio('./assets/audio/background.mp3');

backgroudAudio.load();

var hits = parseInt(score.innerText);


let wordsInitLen = words.length;
let perCount = wordsInitLen / 100;


onEvent('keyup', input, function(event){
    
    if (event.target.value == wordsObj.innerHTML){
        let leftLen = randomWord(wordsInitLen);
        hits++;
        score.innerText = hits;
        console.log(count.innerText);
        if(leftLen <= 0 || count.innerText == '00' || count.innerText == '-  -'){
            //initial();
            displayEnd();
        }
    }
});

onEvent('click', restart, function(){
    if(restart.value == 'Restart'){
        hits = 0;
        fill.style.width = '0%';
        count.innerText = '-  -'
        score.innerHTML = 0;
        wordsObj.innerHTML = '';
        input.disabled = true;
        input.value = '';
        clock.stop();
    }
    appearStart();
    restart.value = 'Restart';
    rowPress.style.display = 'none';
    input.disabled = false;
    scoreboard.style.display = 'none';
    container.style.width = '100%';

});
onEvent('click', restart2, function(){
   // initial()
  
   rowPress.style.display = 'none';
   input.disabled = false;
   restart.value = 'Restart';
   scoreboard.style.display = 'none';
   container.style.width = '100%';
    hits = 0;
    fill.style.width = '0%';
    count.innerText = '-  -'
    score.innerHTML = 0;
     wordsObj.innerHTML = '';
    input.value = '';
        
    appearStart();

    const modalContainer = select('.modal-container');
    modalContainer.classList.remove('model_show');
    model.classList.remove('modal-transform');
    
});


let interal = setInterval(function(){
    if(count.innerText == '00' || count.innerText == '-  -'){
        //initial();
        displayEnd();
    }
},1000);

function initial(){
    hits = 0;
    fill.style.width = '0%';
    count.innerText = '-  -'
    score.innerHTML = 0;
    restart.value = 'START';
    rowPress.style.display = 'block';
    wordsObj.innerHTML = '';
    input.disabled = true;
    input.value = '';
    clock.stop();

}

function displayEnd(){
    count.innerText = '-  -'
    const model = selectById('model');
    const modalContainer = select('.modal-container');
    const userinfo = select('.userinfo');
    const score = selectById('score');
    const today = new Date();
    let formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(today);
    const scoreOjb = [
        parseInt(score.innerHTML),
        formattedDate,
        fill.style.width
    ];
    storingLocal(scoreOjb);
    initial();
    modalContainer.classList.add('model_show');
    model.classList.add('modal-transform');
    
    userinfo.innerHTML = `<p><span>Date</span>: ${scoreOjb[1]}</p>`;
    userinfo.innerHTML += `<p><span>Hits</span>: ${scoreOjb[0]}</p>`;
    userinfo.innerHTML += `<p><span>Percentage</span>: ${scoreOjb[2]}</p>`;
    showBoard();
    
}

function storingLocal(scoreOjb){
    let storageLen = localStorage.length;
    let scores = [];
    if(storageLen > 0) {  
        scores = JSON.parse(localStorage.getItem('scores'));
        scores.push(scoreOjb);
    }else{
        scores.push(scoreOjb);
    }

    //console.log(scores);
    scores.sort((a, b)=>{
        return b[0] - a[0];
    });
    scores.splice(10);
    localStorage.clear();
    localStorage.setItem('scores', JSON.stringify(scores));

    
    
}

function showBoard(){
    const board = [];
    const scoreboard = select('.scoreboard');
    console.log(localStorage);
    let list = JSON.parse(localStorage.getItem('scores'));
    
    
    for (let item in list) {

        scoreboard.innerHTML += `<p>`;
        scoreboard.innerHTML += `<span class='score-show'> ${parseInt(item)+1} # </span>`;
        scoreboard.innerHTML += `<span class='score-show'> ${list[item][0]} words</span>`;
        scoreboard.innerHTML += `<span class='score-show'> ${list[item][2]} </span>`;
        scoreboard.innerHTML += `<span class='score-show'> ${list[item][1]} </span>`; 
        scoreboard.innerHTML += `</p>`;
    }
    
    scoreboard.style.display = 'block';
    container.style.width = 'calc( 100% - 250px)';
}


function appearStart(){

    hits = 0;
    score.innerHTML = '0';
    backgroudAudio.play().catch(error => {
        console.error('Failed to play audio:', error);
      });;
    
    clock.init();
    randomWord();
    
    
}

function randomWord(wordsInitLen){
    let wordsLength = words.length;
    let randomNum = (Math.random() * (wordsLength - 1)).toFixed(0);
    let word = words[randomNum];
    input.value = '';
    words.splice(randomNum,1);
    wordsObj.innerHTML = word;
    fill.style.width = `${((hits + 1) / wordsInitLen).toFixed(4) * 100}%`;
    return words.length;


}

onEvent('click',window , function(event){
    if(event.target == modalContainer){
        modalContainer.classList.remove('model_show');
        model.classList.remove('modal-transform');
    }
});
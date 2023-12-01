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



const load = select('.load');
const wordsObj = select('.words');
const input = selectById('input');
const score = selectById('score');
const fill = selectById('fill');
const restart = selectById('restart');
const restart2 = selectById('restart2');
const count = select('.count');
const startContainer = select('.start-container');
const backgroudAudio = new Audio('../assets/audio/background.mp3');


let wordsInitLen = words.length;
let perCount = wordsInitLen / 100;
let hits = 0;
//console.log(perCount);


appearStart();

onEvent('keyup', input, function(event){
    
    if (event.target.value == wordsObj.innerHTML){
        let leftLen = randomWord(wordsInitLen);
        hits++;
        score.innerText = hits;
        if(leftLen <= 0){
            
            displayEnd();
        }
    }
});

onEvent('click', restart, function(){
    fill.style.width = '0%';
    score.style.value = 0;
    appearStart();
});
onEvent('click', restart2, function(){
    fill.style.width = '0%';
    score.style.value = 0;
    const model = selectById('model');
    const modalContainer = select('.modal-container');
    modalContainer.classList.remove('model_show');
    model.classList.remove('modal-transform');
    appearStart();
});

let interal = setInterval(function(){
    if(count.innerText == '00'  && startContainer.style.visibility == 'hidden')
        displayEnd();
},1000);

function displayEnd(){
    const model = selectById('model');
    const modalContainer = select('.modal-container');
    const userinfo = select('.userinfo');
    const score = selectById('score');
    const today = new Date();
    const scoreOjb = new Score(today.toDateString(), parseInt(score.innerHTML), `${fill.style.width}`);
    //console.log(scoreOjb.getScore());
    modalContainer.classList.add('model_show');
    model.classList.add('modal-transform');
    
    userinfo.innerHTML = `<p><span>Date</span>: ${scoreOjb.date}</p>`;
    userinfo.innerHTML += `<p><span>Hits</span>: ${scoreOjb.hits}</p>`;
    userinfo.innerHTML += `<p><span>Percentage</span>: ${scoreOjb.percentage}</p>`;
}

    
function disappearStart(){
    const startContainer = select('.start-container');
    
    backgroudAudio.play();
    startContainer.style.visibility = 'hidden';
    const numberF = select('.cd-number-five');
    numberF.innerHTML = '3';
    //setTimeout(displayEnd, 14000);
    clock.init();
    randomWord();

}

function appearStart(){
    const startContainer = select('.start-container');
    const numberF = select('.cd-number-five');
    const alarmSong = new Audio('../assets/audio/start.wav');

    alarmSong.play();
    backgroudAudio.pause();
    backgroudAudio.load();
    startContainer.style.visibility = 'visible';
    clock.stop();
    let time = 4;
    let interal = setInterval(function(){
        //console.log(time);
        if(time > 0){
            numberF.innerText = time - 1;
            time--;
        } else
            clearInterval(interal);
    },1000);
    setTimeout(disappearStart, 4000);

    //progressbar.init();
}

function randomWord(wordsInitLen){
    let wordsLength = words.length;
    let randomNum = (Math.random() * wordsLength).toFixed(0);
    let word = words[randomNum];
    input.value = '';
    words.splice(randomNum,1);
    wordsObj.innerHTML = word;
    fill.style.width = `${((wordsInitLen - words.length) / wordsInitLen).toFixed(4) * 100}%`;
    return words.length;

    //console.log(fill.style.width);
    //console.log(words);
}
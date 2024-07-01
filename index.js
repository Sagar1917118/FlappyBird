var bar=document.querySelector(".bar");
var bird=document.querySelector(".bird");
var wrapper=document.querySelector(".wrapper");
//----------bars-----------
let b1U=document.querySelector("#b1U");
let b1D=document.querySelector("#b1D");
let b2U=document.querySelector("#b2U");
let b2D=document.querySelector("#b2D");
let b3U=document.querySelector("#b3U");
let b3D=document.querySelector("#b3D");
let b4U=document.querySelector("#b4U");
let b4D=document.querySelector("#b4D");
let b5U=document.querySelector("#b5U");
let b5D=document.querySelector("#b5D");
let b6U=document.querySelector("#b6U");
let b6D=document.querySelector("#b6D");
let b7U=document.querySelector("#b7U");
let b7D=document.querySelector("#b7D");
let b8U=document.querySelector("#b8U");
let b8D=document.querySelector("#b8D");
let b9U=document.querySelector("#b9U");
let b9D=document.querySelector("#b9D");
let b10U=document.querySelector("#b10U");
let b10D=document.querySelector("#b10D");
let displayScore=document.querySelector(".displayScore");
let overlay=document.querySelector(".overlay");
let subOverlayBottom=document.querySelector(".subOverlay");
let finalScore=document.querySelector(".finalScore");
let parentFinalScore=document.querySelector("#parentFinalScore");
var displayCount=0;
let arr1=[b1U,b1D];
let arr2=[b2U,b2D];
let arr3=[b3U,b3D];
let arr4=[b4U,b4D];
let arr5=[b5U,b5D];
let arr6=[b6U,b6D];
let arr7=[b7U,b7D];
let arr8=[b8U,b8D];
let arr9=[b9U,b9D];
let arr10=[b10U,b10D];
const ARRAY=[arr1,arr2,arr3,arr4,arr5,arr6,arr7,arr8,arr9,arr10];
var helpArr=[];
// ARRAY[9][0].style.display="block";
// ARRAY[9][1].style.display="block";
// ARRAY[9][0].classList.add("animate");
// ARRAY[9][1].classList.add("animate");
// -checking iverlapping-----\
// ----------
//timerFucntions
// ----------
var postionTimer;
var reCall;
var unUsed;
var  gravity;
var Bird;
// ----------------
var x1=5;
var x2=10;
var flagToStop;
var checkArray=[];
// --setting bird image--
var birdImage=document.querySelector("#birdImage");
flagBird=true;
// var bird1=bird.getBoundingClientRect();
function checkOverlapps(bar){
    // console.log("RAJPUT");
    // console.log("barOffset",bar.offsetLeft);
    if(bar.classList.contains("y")&&bar.offsetLeft==121){
        displayCount +=1;
        displayScore.innerText=displayCount;
    }
    var bird1=bird.getBoundingClientRect();
    var hurdle=bar.getBoundingClientRect();
    alpha=!(
        bird1.top > hurdle.bottom ||
        bird1.right < hurdle.left ||
        bird1.bottom < hurdle.top ||
        bird1.left > hurdle.right
    );
    if(alpha||bird.offsetTop<0||bird.offsetTop>265){
        bird.classList.add("dropBird");
        setTimeout(()=>{
            bird.style.top="260px";
            bird.style.transform="rotate(75deg)";
        },1000);
        stopGame();
    }
    // if(alpha){
    //     bird.style.backgroundColor="yellow";
    // }
    // setTimeout(()=>{
    //     bird.style.backgroundColor="white";
    //     x1=5;
    // },x1);
    if(flagToStop){
        postionTimer=setTimeout(()=>{
            console.log("KUMAR1");
        checkOverlapps(bar);
        x2=10;
        },x2);
    }
}
function constructObject(subArray){
    const obj={
        first:subArray[0].cloneNode(true),
        second:subArray[1].cloneNode(true)
    }
    return obj;
}
var flag=true;
function play(){
    flagToStop=true;
    var idx=Math.floor(Math.random()*(9-1)+1);
    helpArr.push(constructObject(ARRAY[idx]));
    console.log(helpArr.length);
    helpArr[helpArr.length-1].first.style.display="block";
    helpArr[helpArr.length-1].first.classList.add("animate");
    helpArr[helpArr.length-1].second.style.display="block";
    helpArr[helpArr.length-1].second.classList.add("animate");
    wrapper.appendChild(helpArr[helpArr.length-1].first);
    wrapper.appendChild(helpArr[helpArr.length-1].second);
    //-----
    checkArray.push(helpArr[helpArr.length-1].first);
    checkArray.push(helpArr[helpArr.length-1].second);
    //---
    if(flag){
    checkOverlapps(checkArray[0]);
    checkOverlapps(checkArray[1]);
    flag=false;
    }
    //---
    //----Updating Score display------
    // setDisplay=setTimeout(()=>{
    //     displayCount +=1;
    //     displayScore.innerText=displayCount;
    // },4200)
     // delete the child
    unUsed=setTimeout(()=>{
        console.log("KUMAR2");
        //---
        clearTimeout(postionTimer);
        console.log("checkarray-length",checkArray.length);
        checkArray.shift();
        checkArray.shift();
        checkOverlapps(checkArray[0]);
        checkOverlapps(checkArray[1]);
        console.log("checkarray-length",checkArray.length);
        console.log("object added");
    //---


    wrapper.removeChild(helpArr[0].first);
    wrapper.removeChild(helpArr[0].second);
    delete helpArr[0];
    console.log("objectDeleted");
    helpArr.shift();
    console.log(helpArr.length);
    },4500)
    //----
    // -for repaeative Calling------------
    reCall=setTimeout(()=>{
        console.log("KUMAR5");
      play();
    },2500)
}
function playGame(){
    overlay.style.display="none";
    gravity=setInterval(()=>{
        console.log("KUMAR3");
        bird.style.top=`${bird.offsetTop+(10)}px`;
    },200)
    Bird=setInterval(()=>{
        if(flagBird==true){
           birdImage.setAttribute("src","bird1.png");
           flagBird=false; 
        }
        else{
            birdImage.setAttribute("src","bird2.png");
            flagBird=true;
        }
    },300);
    play();
}
//-----------------moving bird fucntion--------------
function moveBird(){
    bird.style.top=`${bird.offsetTop-15}px`;
}
function stopGame(){
    flagToStop=false;
    clearTimeout(postionTimer);
    clearInterval(reCall);
    clearInterval(unUsed);
    clearInterval(gravity);
    clearInterval(Bird);
    // clearTimeout(setDisplay);
    var list=wrapper.querySelectorAll(".animate");
    list.forEach(element => {
        element.style.animationPlayState='paused';
    });
    setTimeout(()=>{
        overlay.style.display="flex";
        parentFinalScore.style.display="block";
    },1000);
    finalScore.innerText=displayCount;
}
//========================
playGame();
//========================

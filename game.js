let selectedBet = null;
const betTai = document.getElementById("bet-tai");
const betXiu = document.getElementById("bet-xiu");
const placeBetBtn = document.getElementById("place-bet");
const cup = document.getElementById("cup");
const dice = document.getElementById("dice");
const shakeBtn = document.getElementById("shakeBtn");
const autoOpen = document.getElementById("autoOpen");
const timerSpan = document.getElementById("timer");
const historyCircles = document.getElementById("history-circles");
const chatBox = document.getElementById("chat-box");
const viewerCount = document.getElementById("viewer-count");

let countdown = 40;
let countdownInterval;
let history = [];

function selectBet(bet){
  selectedBet = bet;
  betTai.classList.toggle("selected", bet==="tai");
  betXiu.classList.toggle("selected", bet==="xiu");
}
betTai.onclick = ()=>selectBet("tai");
betXiu.onclick = ()=>selectBet("xiu");

function randomDice(){
  return Math.floor(Math.random()*6)+1;
}

function shakeCup(){
  const d1=randomDice(),d2=randomDice(),d3=randomDice();
  dice.style.opacity=1;
  dice.children[0].src=`assets/dice${d1}.png`;
  dice.children[1].src=`assets/dice${d2}.png`;
  dice.children[2].src=`assets/dice${d3}.png`;
  const sum=d1+d2+d3;
  const result=sum>=11?"tai":"xiu";
  history.push(result);
  if(history.length>20) history.shift();
  renderHistory();
  addFakeChat(result);
}

shakeBtn.onclick=shakeCup;

function renderHistory(){
  historyCircles.innerHTML="";
  history.forEach(r=>{
    const c=document.createElement("div");
    c.classList.add("history-circle",r);
    historyCircles.appendChild(c);
  });
}

function startCountdown(){
  countdown=40;
  timerSpan.textContent=countdown;
  clearInterval(countdownInterval);
  countdownInterval=setInterval(()=>{
    countdown--;
    timerSpan.textContent=countdown;
    if(countdown<=0){
      clearInterval(countdownInterval);
      if(autoOpen.checked) shakeCup();
    }
  },1000);
}
startCountdown();

function addFakeChat(result){
  const messages=[
    `T tất tay ${result} nè ae`,
    `Ông kia vừa ăn 20tr kìa`,
    `Chúc mừng ae thắng ${result}`
  ];
  chatBox.innerHTML+=`<div>${messages[Math.floor(Math.random()*messages.length)]}</div>`;
  chatBox.scrollTop=chatBox.scrollHeight;
  viewerCount.textContent=Math.floor(Math.random()*500+100);
}

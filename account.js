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
5️⃣ account.js
javascript
Sao chép mã
const loginBtn=document.getElementById("loginBtn");
const logoutBtn=document.getElementById("logoutBtn");
const usernameInput=document.getElementById("username");
const passwordInput=document.getElementById("password");
const accountInfo=document.getElementById("account-info");
const accName=document.getElementById("acc-name");
const accXu=document.getElementById("acc-xu");
const topupBtn=document.getElementById("topupBtn");
const withdrawBtn=document.getElementById("withdrawBtn");
const topupAmount=document.getElementById("topup-amount");
const withdrawAmount=document.getElementById("withdraw-amount");
const historyLog=document.getElementById("history-log");
const redeemBtn=document.getElementById("redeemKeyBtn");
const keyInput=document.getElementById("key-input");

const validKey="SUNWIN50000";

function loadAccount(){
  let acc=JSON.parse(localStorage.getItem("account"));
  if(acc){
    accName.textContent=acc.username;
    accXu.textContent=acc.xu;
    accountInfo.style.display="block";
    document.getElementById("login-form").style.display="none";
    renderHistory(acc.history);
  }
}

loginBtn.onclick=()=>{
  const user=usernameInput.value.trim();
  const pass=passwordInput.value.trim();
  if(!user||!pass){alert("Nhập đầy đủ");return;}
  let acc=JSON.parse(localStorage.getItem("account"))||{};
  acc.username=user;
  acc.xu=acc.xu||0;
  acc.history=acc.history||[];
  localStorage.setItem("account",JSON.stringify(acc));
  loadAccount();
}

logoutBtn.onclick=()=>{
  document.getElementById("login-form").style.display="block";
  accountInfo.style.display="none";
}

topupBtn.onclick=()=>{
  let val=parseInt(topupAmount.value)||0;
  if(val<=0){alert("Nhập số hợp lệ");return;}
  let acc=JSON.parse(localStorage.getItem("account"));
  acc.xu+=val;
  acc.history.push(`Nạp ${val} xu`);
  localStorage.setItem("account",JSON.stringify(acc));
  accXu.textContent=acc.xu;
  renderHistory(acc.history);
}

withdrawBtn.onclick=()=>{
  let val=parseInt(withdrawAmount.value)||0;
  let acc=JSON.parse(localStorage.getItem("account"));
  if(val<=0||val>acc.xu){alert("Số tiền không hợp lệ");return;}
  acc.xu-=val;
  acc.history.push(`Rút ${val} xu`);
  localStorage.setItem("account",JSON.stringify(acc));
  accXu.textContent=acc.xu;
  renderHistory(acc.history);
}

redeemBtn.onclick=()=>{
  const key=keyInput.value.trim();
  if(key===validKey){
    let acc=JSON.parse(localStorage.getItem("account"));
    acc.xu+=50000;
    acc.history.push(`Nhận 50000 xu từ key`);
    localStorage.setItem("account",JSON.stringify(acc));
    accXu.textContent=acc.xu;
    renderHistory(acc.history);
    alert("Nhận 50000 xu thành công!");
    keyInput.value="";
  }else alert("Key không hợp lệ!");
}

function renderHistory(hist){
  historyLog.innerHTML="";
  hist.forEach(h=>{
    const div=document.createElement("div");
    div.textContent=h;
    historyLog.appendChild(div);
  });
}

loadAccount();

let coin = 1000;
const coinEl = document.getElementById('coin');
const diceEls = ['d1','d2','d3'].map(id=>document.getElementById(id));
const road = document.getElementById('road');
const chat = document.getElementById('chat');
let betChoice = null, betAmount = 0;
let timer = 40, interval = null;

function rand(){return Math.floor(Math.random()*6)+1;}

function roll(){
  const vals = [rand(), rand(), rand()];
  diceEls.forEach((el,i)=>{
    el.src = `assets/dice/${vals[i]}.png`;
    el.classList.add('roll');
    setTimeout(()=>el.classList.remove('roll'),400);
  });
  const sum = vals.reduce((a,b)=>a+b,0);
  return sum >= 11 ? 'tai' : 'xiu';
}

function updateRoad(res){
  const dot = document.createElement('div');
  dot.className = 'dot '+res;
  road.appendChild(dot);
  if(road.children.length>100) road.removeChild(road.children[0]);
}

function bet(choice){
  const amount = parseInt(document.getElementById('betAmount').value);
  if(isNaN(amount)||amount<1||amount>coin){alert('Số xu không hợp lệ');return;}
  betChoice = choice;
  betAmount = amount;
  alert('Đặt '+amount+' xu vào '+choice);
}

function napXu(){
  const n = prompt('Nhập số xu nạp (demo)');
  if(!n||isNaN(n)) return;
  coin += parseInt(n);
  coinEl.innerText = coin;
}

function startTimer(){
  timer=40;
  document.getElementById('timer').innerText = timer;
  if(interval) clearInterval(interval);
  interval = setInterval(()=>{
    timer--;
    document.getElementById('timer').innerText = timer;
    if(timer<=0){
      clearInterval(interval);
      if(document.getElementById('autoOpen').checked){
        openCup();
      }
    }
  },1000);
}

function openCup(){
  if(!betChoice){alert('Chưa đặt cược!');return;}
  const res = roll();
  updateRoad(res);
  if(res===betChoice){coin+=betAmount}else{coin-=betAmount;}
  coinEl.innerText = coin;
  betChoice = null;
  document.getElementById('betAmount').value='';
  startTimer(); // bắt đầu ván mới
}

document.getElementById('openCupBtn').onclick=openCup;

startTimer();

// Fake chat
const msgs = ['🔥 Tài mạnh','Xỉu đều','All in','Cầu đẹp','Gãy cầu'];
setInterval(()=>{
  const p=document.createElement('div');
  p.innerText = msgs[Math.floor(Math.random()*msgs.length)];
  chat.appendChild(p);
  if(chat.children.length>20) chat.removeChild(chat.children[0]);
},2000);

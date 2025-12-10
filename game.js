let coin=1000;
const coinEl=document.getElementById('coin');
const diceEls=['d1','d2','d3'].map(id=>document.getElementById(id));
const road=document.getElementById('road');
const chat=document.getElementById('chat');

function rand(){return Math.floor(Math.random()*6)+1}

function roll(){
 const vals=[rand(),rand(),rand()];
 diceEls.forEach((el,i)=>{
   el.src=`assets/dice/${vals[i]}.png`;
   el.classList.add('roll');
   setTimeout(()=>el.classList.remove('roll'),400);
 });
 const sum=vals.reduce((a,b)=>a+b,0);
 const res=sum>=11?'tai':'xiu';
 const dot=document.createElement('div');
 dot.className='dot '+res;road.appendChild(dot);
}

document.getElementById('rollBtn').onclick=roll;

function napXu(){
 const n=prompt('Nhập số xu nạp (DEMO)');
 if(!n||isNaN(n))return;
 coin+=parseInt(n);
 coinEl.innerText=coin;
}

const msgs=['🔥 Tài mạnh','Xỉu đều','All in','Cầu đẹp','Gãy cầu'];
setInterval(()=>{
 const p=document.createElement('div');
 p.innerText=msgs[Math.floor(Math.random()*msgs.length)];
 chat.appendChild(p);
 if(chat.children.length>20)chat.removeChild(chat.children[0]);
},2000);
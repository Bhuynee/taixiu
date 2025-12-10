const t=document.getElementById('toggleAuto'),r=document.getElementById('rollBtn'),
chat=document.getElementById('chat');
t.onclick=()=>{autoOpen=!autoOpen;t.innerText='Tự mở: '+(autoOpen?'ON':'OFF')}
r.onclick=()=>{toggleCup();playRound();}
const msgs=['🔥 Tài mạnh','Xỉu đều','All in','Cầu đẹp','Gãy cầu'];
setInterval(()=>{const p=document.createElement('div');
p.innerText=msgs[Math.floor(Math.random()*msgs.length)];
chat.appendChild(p);if(chat.children.length>20)chat.removeChild(chat.children[0]);
},2000);
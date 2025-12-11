let betChoice=null;
let countdown=40;
let countdownInterval;

function getCurrentUser(){ return window.currentUser; }
function getXu(){ return window.xu; }
function setXu(value){ window.xu=value; document.getElementById('xu-balance-account').innerText=value; }

function addHistory(text){ let li=document.createElement('li'); li.textContent=text; document.getElementById('history-list').prepend(li); }

document.querySelectorAll('.choice-circle').forEach(el=>{
    el.addEventListener('click',()=>{ betChoice=el.id; alert('Bạn chọn '+betChoice.toUpperCase()); });
});

function startCountdown(){ countdown=40; document.getElementById('countdown').innerText=countdown;
countdownInterval=setInterval(()=>{ countdown--; document.getElementById('countdown').innerText=countdown; if(countdown<=0){ clearInterval(countdownInterval); openCup(); }},1000); }

document.getElementById('btn-bet').addEventListener('click',async()=>{
    let betAmount=parseInt(document.getElementById('bet-input').value);
    if(!getCurrentUser()) return alert('Đăng nhập trước!');
    if(!betChoice) return alert('Chọn TÀI/XỈU trước!');
    if(betAmount>getXu()) return alert('Không đủ xu để đặt cược!');
    if(betAmount>0){
        let res=await fetch('/bet',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:getCurrentUser(),bet:betAmount,choice:betChoice})});
        let data=await res.json();
        if(data.success){ setXu(data.xu); updateHistory(data.history); startCountdown(); }
    }
});

function openCup(){
    const diceImgs=document.querySelectorAll('#dice-result .dice');
    let total=0;
    for(let i=0;i<3;i++){
        let n=Math.floor(Math.random()*6)+1;
        diceImgs[i].src=`assets/dice${n}.png`;
        total+=n;
    }
    let result=total>10?'TÀI':'XỈU';
    alert('Kết quả: '+result);
}

// Fake chat
let chatMessages=["T tất tay Xỉu nè ae","Ông kia vừa ăn 20tr kìa","Tài thắng liền ae!","Ai all-in rồi?"];
let chatBox=document.getElementById('chat-box');
let viewerCount=document.getElementById('viewer-count');

setInterval(()=>{
    viewerCount.innerText=50+Math.floor(Math.random()*50);
    let msg=chatMessages[Math.floor(Math.random()*chatMessages.length)];
    let p=document.createElement('p'); p.innerText=msg;
    chatBox.appendChild(p);
    if(chatBox.childElementCount>10) chatBox.removeChild(chatBox.firstChild);
    chatBox.scrollTop=chatBox.scrollHeight;
},3000);

window.addEventListener('DOMContentLoaded', ()=>{
    let betChoice=null;
    let countdown=40;
    let countdownInterval;

    function getCurrentUserData(){
        let users = JSON.parse(localStorage.getItem('users')) || {};
        let currentUser = localStorage.getItem('currentUser');
        let xu = currentUser && users[currentUser]? users[currentUser].xu : 0;
        return {currentUser, xu, users};
    }

    function updateBalance(xu){
        document.getElementById('xu-balance-account').innerText = xu;
    }

    function addHistory(text){
        let li = document.createElement('li');
        li.textContent = text;
        document.getElementById('history-list').prepend(li);
    }

    // Chọn TÀI/XỈU
    document.querySelectorAll('.choice-circle').forEach(el=>{
        el.addEventListener('click', ()=>{ betChoice=el.id; alert('Bạn chọn '+betChoice.toUpperCase()); });
    });

    // Countdown
    function startCountdown(){
        countdown=40;
        document.getElementById('countdown').innerText=countdown;
        countdownInterval=setInterval(()=>{
            countdown--;
            document.getElementById('countdown').innerText=countdown;
            if(countdown<=0){ clearInterval(countdownInterval); openCup(); }
        },1000);
    }

    // Đặt cược
    document.getElementById('btn-bet').addEventListener('click', ()=>{
        let {currentUser,xu,users}=getCurrentUserData();
        let betAmount=parseInt(document.getElementById('bet-input').value);
        if(!currentUser){ alert('Đăng nhập trước!'); return; }
        if(!betChoice){ alert('Chọn TÀI/XỈU trước!'); return; }
        if(betAmount>xu){ alert('Không đủ xu để đặt cược!'); return; }
        if(betAmount>0){
            xu-=betAmount;
            users[currentUser].xu=xu;
            users[currentUser].history.push(`Đặt cược ${betAmount} xu vào ${betChoice}`);
            localStorage.setItem('users',JSON.stringify(users));
            updateBalance(xu);
            addHistory(`Đặt cược ${betAmount} xu vào ${betChoice}`);
            startCountdown();
        }
    });

    // Mở chén
    function openCup(){
        let dice=[];
        for(let i=0;i<3;i++) dice.push(Math.floor(Math.random()*6)+1);
        document.getElementById('dice-result').innerText='Xúc xắc: '+dice.join(' - ');
        let total=dice.reduce((s,n)=>s+n,0);
        let result=total>10?'TÀI':'XỈU';
        alert('Kết quả: '+result);
    }
    document.getElementById('btn-open-cup').addEventListener('click', openCup);

    // Fake chat
    let chatMessages = ["T tất tay Xỉu nè ae","Ông kia vừa ăn 20tr kìa","Tài thắng liền ae!","Ai all-in rồi?"];
    let chatBox = document.getElementById('chat-box');
    let viewerCount = document.getElementById('viewer-count');

    setInterval(()=>{
        viewerCount.innerText = 50+Math.floor(Math.random()*50);
        let msg = chatMessages[Math.floor(Math.random()*chatMessages.length)];
        let p = document.createElement('p'); p.innerText=msg;
        chatBox.appendChild(p);
        if(chatBox.childElementCount>10) chatBox.removeChild(chatBox.firstChild);
        chatBox.scrollTop=chatBox.scrollHeight;
    },3000);
});

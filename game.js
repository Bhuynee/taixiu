window.addEventListener('DOMContentLoaded', ()=>{
    let countdown=40;
    let countdownInterval;
    let betChoice=null;

    // Lấy currentUser, xu từ account.js
    let users = JSON.parse(localStorage.getItem('users')) || {};
    let currentUser = localStorage.getItem('currentUser') || null;
    let xu = currentUser && users[currentUser]?users[currentUser].xu:0;

    function updateBalanceUI(){
        document.getElementById('xu-balance').innerText = xu;
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

    function startCountdown(){
        countdown=40;
        document.getElementById('countdown').innerText=countdown;
        countdownInterval=setInterval(()=>{
            countdown--;
            document.getElementById('countdown').innerText=countdown;
            if(countdown<=0){ clearInterval(countdownInterval); openCup(); }
        },1000);
    }

    document.getElementById('btn-bet').addEventListener('click', ()=>{
        let betAmount=parseInt(document.getElementById('bet-input').value);
        if(!currentUser){ alert('Đăng nhập trước!'); return; }
        if(!betChoice){ alert('Chọn TÀI/XỈU trước!'); return; }
        if(betAmount>xu){ alert('Không đủ xu để đặt cược!'); return; }
        if(betAmount>0){
            xu-=betAmount;
            users[currentUser].xu=xu;
            users[currentUser].history.push(`Đặt cược ${betAmount} xu vào ${betChoice}`);
            localStorage.setItem('users',JSON.stringify(users));
            updateBalanceUI();
            addHistory(`Đặt cược ${betAmount} xu vào ${betChoice}`);
            startCountdown();
        }
    });

    // Mở chén
    document.getElementById('btn-open-cup').addEventListener('click', openCup);

    function openCup(){
        let diceResultDiv = document.getElementById('dice-result');
        diceResultDiv.innerHTML = '';
        let dice = [];
        for(let i=0;i<3;i++){
            let num = Math.floor(Math.random()*6)+1;
            dice.push(num);
        }
        diceResultDiv.innerText = `Xúc xắc: ${dice.join(' - ')}`;

        let total = dice.reduce((s,n)=>s+n,0);
        let result = total>10?'TÀI':'XỈU';
        alert(`Kết quả: ${result}`);
    }

    // Fake chat + viewer
    let chatMessages = [
        "T tất tay Xỉu nè ae",
        "Ông kia vừa ăn 20tr kìa",
        "Tài thắng liền ae!",
        "Ai all-in rồi?"
    ];
    let chatBox = document.getElementById('chat-box');
    let viewerCount = document.getElementById('viewer-count');

    setInterval(()=>{
        // Fake viewer
        viewerCount.innerText = 50+Math.floor(Math.random()*50);

        // Fake chat
        let msg = chatMessages[Math.floor(Math.random()*chatMessages.length)];
        let p = document.createElement('p'); p.innerText = msg;
        chatBox.appendChild(p);
        if(chatBox.childElementCount>10) chatBox.removeChild(chatBox.firstChild);
        chatBox.scrollTop = chatBox.scrollHeight;
    },3000);

});

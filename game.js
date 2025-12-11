let countdown = 40;
let countdownInterval;
let autoOpen = false;
let betChoice = null;

document.querySelectorAll('.choice-circle').forEach(el => {
    el.addEventListener('click', ()=> {
        betChoice = el.id;
        alert('Bạn chọn: ' + betChoice.toUpperCase());
    });
});

document.getElementById('btn-auto-open').addEventListener('click', () => {
    autoOpen = !autoOpen;
    alert('Tự mở chén: ' + (autoOpen ? 'Bật' : 'Tắt'));
});

// Fake chat
let chatBox = document.getElementById('chat-box');
let viewers = document.getElementById('viewer-count');

function fakeChat(){
    let msgs = [
        "T tất tay Xỉu nè ae",
        "Ăn 20tr rồi kìa",
        "Ông kia vừa thắng lớn",
        "Cược 1000 xu thôi"
    ];
    let msg = msgs[Math.floor(Math.random()*msgs.length)];
    chatBox.innerHTML += "<div>"+msg+"</div>";
    chatBox.scrollTop = chatBox.scrollHeight;
    viewers.innerText = Math.floor(Math.random()*1000);
}
setInterval(fakeChat, 2000);

// Countdown
function startCountdown(){
    countdown = 40;
    document.getElementById('countdown').innerText = countdown;
    countdownInterval = setInterval(()=>{
        countdown--;
        document.getElementById('countdown').innerText = countdown;
        if(countdown <=0){
            clearInterval(countdownInterval);
            openCup();
        }
    },1000);
}

// Đặt cược
document.getElementById('btn-bet').addEventListener('click', () => {
    let betAmount = parseInt(document.getElementById('bet-input').value);
    if(!currentUser){ alert('Đăng nhập trước!'); return; }
    if(!betChoice){ alert('Chọn TÀI hoặc XỈU trước!'); return; }
    if(betAmount > xu){ alert("Không đủ xu để đặt cược!"); return; }
    if(betAmount>0){
        xu -= betAmount;
        users[currentUser].xu = xu;
        users[currentUser].history.push(`Đặt cược ${betAmount} xu vào ${betChoice}`);
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('xu-balance').innerText = xu;
        document.getElementById('xu-balance-account').innerText = xu;
        addHistory(`Đặt cược ${betAmount} xu vào ${betChoice}`);
        startCountdown();
    }
});

// Mở chén
function openCup(){
    let diceArea = document.getElementById('dice-area');
    diceArea.innerHTML = '';
    for(let i=0;i<3;i++){
        let dice = Math.floor(Math.random()*6)+1;
        let img = document.createElement('img');
        img.src = `assets/dice${dice}.png`;
        diceArea.appendChild(img);
    }
    // Tính tổng để ra Tài/Xỉu
    let total = Array.from(diceArea.children).reduce((sum,img)=>{
        return sum + parseInt(img.src.match(/\d(?=\.png)/)[0]);
    },0);
    let result = total>10?'tai':'xiu';
    alert('Kết quả: '+result.toUpperCase());
}


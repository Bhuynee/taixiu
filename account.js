// USERS
let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = localStorage.getItem('currentUser') || null;
let xu = 0;

// Load current user
if(currentUser && users[currentUser]){
    xu = users[currentUser].xu;
    document.getElementById('xu-balance').innerText = xu;
    document.getElementById('xu-balance-account').innerText = xu;
}

// Đăng ký
document.getElementById('btn-register').addEventListener('click', () => {
    let u = document.getElementById('username').value.trim();
    let p = document.getElementById('password').value.trim();
    if(!u || !p){ alert('Nhập đầy đủ'); return; }
    if(users[u]){ alert('Username đã tồn tại'); return; }
    users[u] = { password: p, xu: 0, history: [] };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Đăng ký thành công!');
});

// Đăng nhập
document.getElementById('btn-login').addEventListener('click', () => {
    let u = document.getElementById('username').value.trim();
    let p = document.getElementById('password').value.trim();
    if(users[u] && users[u].password === p){
        currentUser = u;
        localStorage.setItem('currentUser', currentUser);
        xu = users[u].xu;
        document.getElementById('xu-balance').innerText = xu;
        document.getElementById('xu-balance-account').innerText = xu;
        alert('Đăng nhập thành công!');
    } else { alert('Sai username hoặc password'); }
});

// Nhập key nhận 50.000 xu
document.getElementById('btn-key').addEventListener('click', () => {
    const key = document.getElementById('key-input').value.trim();
    if(!currentUser){ alert('Đăng nhập trước!'); return; }
    if(key === "BHUYVIP50000"){
        xu += 50000;
        users[currentUser].xu = xu;
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('xu-balance').innerText = xu;
        document.getElementById('xu-balance-account').innerText = xu;
        alert('Bạn đã nhận 50.000 xu!');
    } else { alert('Key không hợp lệ'); }
});

// Nạp xu
document.getElementById('btn-nap').addEventListener('click', () => {
    if(!currentUser){ alert('Đăng nhập trước!'); return; }
    let nap = parseInt(document.getElementById('xu-nap').value);
    if(nap>0){
        xu += nap;
        users[currentUser].xu = xu;
        users[currentUser].history.push(`Nạp ${nap} xu`);
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('xu-balance').innerText = xu;
        document.getElementById('xu-balance-account').innerText = xu;
        addHistory(`Nạp ${nap} xu`);
        document.getElementById('xu-nap').value='';
    }
});

// Rút xu
document.getElementById('btn-rut').addEventListener('click', () => {
    if(!currentUser){ alert('Đăng nhập trước!'); return; }
    let rut = parseInt(document.getElementById('xu-rut').value);
    if(rut > xu){ alert("Không đủ xu để rút!"); return; }
    if(rut>0){
        xu -= rut;
        users[currentUser].xu = xu;
        users[currentUser].history.push(`Rút ${rut} xu`);
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('xu-balance').innerText = xu;
        document.getElementById('xu-balance-account').innerText = xu;
        addHistory(`Rút ${rut} xu`);
        document.getElementById('xu-rut').value='';
    }
});

// Thêm lịch sử
function addHistory(text){
    let li = document.createElement('li');
    li.textContent = text;
    document.getElementById('history-list').prepend(li);
}

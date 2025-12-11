window.addEventListener('DOMContentLoaded', ()=>{
    let users = JSON.parse(localStorage.getItem('users')) || {};
    let currentUser = localStorage.getItem('currentUser') || null;
    let xu = 0;

    function updateBalanceUI(){
        document.getElementById('xu-balance').innerText = xu;
        document.getElementById('xu-balance-account').innerText = xu;
    }

    function addHistory(text){
        let li = document.createElement('li');
        li.textContent = text;
        document.getElementById('history-list').prepend(li);
    }

    if(currentUser && users[currentUser]){
        xu = users[currentUser].xu;
        updateBalanceUI();
        users[currentUser].history.forEach(h => addHistory(h));
    }

    document.getElementById('btn-register').addEventListener('click', ()=>{
        let u=document.getElementById('username').value.trim();
        let p=document.getElementById('password').value.trim();
        if(!u||!p){ alert('Nhập đầy đủ'); return; }
        if(users[u]){ alert('Username đã tồn tại'); return; }
        users[u]={password:p,xu:0,history:[]};
        localStorage.setItem('users',JSON.stringify(users));
        alert('Đăng ký thành công! Đăng nhập ngay.');
    });

    document.getElementById('btn-login').addEventListener('click', ()=>{
        let u=document.getElementById('username').value.trim();
        let p=document.getElementById('password').value.trim();
        if(users[u] && users[u].password===p){
            currentUser=u;
            localStorage.setItem('currentUser',currentUser);
            xu=users[u].xu;
            updateBalanceUI();
            alert('Đăng nhập thành công!');
            users[u].history.forEach(h=>addHistory(h));
        } else alert('Sai username hoặc password');
    });

    document.getElementById('btn-key').addEventListener('click', ()=>{
        if(!currentUser){ alert('Đăng nhập trước!'); return; }
        let key=document.getElementById('key-input').value.trim();
        if(key==="BHUYVIP50000"){
            xu+=50000;
            users[currentUser].xu=xu;
            localStorage.setItem('users',JSON.stringify(users));
            updateBalanceUI();
            alert('Bạn đã nhận 50.000 xu!');
        } else alert('Key không hợp lệ');
    });

    document.getElementById('btn-nap').addEventListener('click', ()=>{
        if(!currentUser){ alert('Đăng nhập trước!'); return; }
        let nap=parseInt(document.getElementById('xu-nap').value);
        if(nap>0){
            xu+=nap;
            users[currentUser].xu=xu;
            localStorage.setItem('users',JSON.stringify(users));
            updateBalanceUI();
            document.getElementById('xu-nap').value='';
        }
    });

    document.getElementById('btn-rut').addEventListener('click', ()=>{
        if(!currentUser){ alert('Đăng nhập trước!'); return; }
        let rut=parseInt(document.getElementById('xu-rut').value);
        if(rut>xu){ alert('Không đủ xu để rút!'); return; }
        if(rut>0){
            xu-=rut;
            users[currentUser].xu=xu;
            localStorage.setItem('users',JSON.stringify(users));
            updateBalanceUI();
            document.getElementById('xu-rut').value='';
        }
    });

    // Tab switch
    document.querySelectorAll('.tab-btn').forEach(btn=>{
        btn.addEventListener('click', ()=>{
            let target = btn.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(tab=>{
                tab.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
        });
    });
});

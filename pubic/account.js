let currentUser=null;
let xu=0;

function updateBalanceUI(){ document.getElementById('xu-balance-account').innerText = xu; }
function updateHistory(history){
    const list = document.getElementById('history-list'); list.innerHTML='';
    history.slice().reverse().forEach(h=>{
        let li=document.createElement('li'); li.textContent=`[${h.time}] ${h.text}`; list.appendChild(li);
    });
}
function showAfterLogin(){ document.getElementById('game-section').style.display='block'; }

document.getElementById('btn-register').addEventListener('click',async()=>{
    let username=document.getElementById('username').value.trim();
    let password=document.getElementById('password').value.trim();
    if(!username||!password){ alert('Nhập đầy đủ'); return; }
    let res=await fetch('/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})});
    let data=await res.json();
    if(data.success){ currentUser=username; xu=data.xu; updateBalanceUI(); showAfterLogin(); updateHistory(data.history); alert('Đăng ký thành công + nhận 50.000 xu'); }
    else alert(data.message);
});

document.getElementById('btn-login').addEventListener('click',async()=>{
    let username=document.getElementById('username').value.trim();
    let password=document.getElementById('password').value.trim();
    let res=await fetch('/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})});
    let data=await res.json();
    if(data.success){ currentUser=username; xu=data.xu; updateBalanceUI(); showAfterLogin(); updateHistory(data.history); }
    else alert(data.message);
});

document.getElementById('btn-key').addEventListener('click',async()=>{
    if(!currentUser) return alert('Đăng nhập trước');
    let key=document.getElementById('key-input').value.trim();
    let res=await fetch('/key',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:currentUser,key})});
    let data=await res.json();
    if(data.success){ xu=data.xu; updateBalanceUI(); updateHistory(data.history); alert('Nhận 50.000 xu thành công'); }
    else alert(data.message);
});

document.getElementById('btn-nap').addEventListener('click',async()=>{
    if(!currentUser) return alert('Đăng nhập trước');
    let amount=parseInt(document.getElementById('xu-nap').value);
    let res=await fetch('/nap',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:currentUser,amount})});
    let data=await res.json();
    if(data.success){ xu=data.xu; updateBalanceUI(); updateHistory(data.history); document.getElementById('xu-nap').value=''; }
});

document.getElementById('btn-rut').addEventListener('click',async()=>{
    if(!currentUser) return alert('Đăng nhập trước');
    let amount=parseInt(document.getElementById('xu-rut').value);
    let res=await fetch('/rut',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:currentUser,amount})});
    let data=await res.json();
    if(data.success){ xu=data.xu; updateBalanceUI(); updateHistory(data.history); document.getElementById('xu-rut').value=''; }
    else alert(data.message);
});

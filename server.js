const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

function readUsers(){
    if(!fs.existsSync('users.json')) fs.writeFileSync('users.json','{}');
    return JSON.parse(fs.readFileSync('users.json'));
}

function writeUsers(users){
    fs.writeFileSync('users.json',JSON.stringify(users,null,2));
}

// Đăng ký
app.post('/register', (req,res)=>{
    const {username,password} = req.body;
    let users = readUsers();
    if(users[username]) return res.json({success:false,message:'Username đã tồn tại'});
    users[username] = {password, xu:0, history:[]};
    writeUsers(users);
    res.json({success:true});
});

// Đăng nhập
app.post('/login', (req,res)=>{
    const {username,password} = req.body;
    let users = readUsers();
    if(users[username] && users[username].password===password){
        res.json({success:true,xu:users[username].xu,history:users[username].history});
    } else res.json({success:false,message:'Sai username hoặc password'});
});

// Nhận key
app.post('/key', (req,res)=>{
    const {username,key} = req.body;
    if(key !== "BHUYVIP50000") return res.json({success:false,message:'Key không hợp lệ'});
    let users = readUsers();
    if(!users[username]) return res.json({success:false,message:'User không tồn tại'});
    users[username].xu += 50000;
    writeUsers(users);
    res.json({success:true,xu:users[username].xu});
});

// Nạp xu
app.post('/nap', (req,res)=>{
    const {username,amount} = req.body;
    let users = readUsers();
    if(!users[username]) return res.json({success:false,message:'User không tồn tại'});
    users[username].xu += parseInt(amount);
    writeUsers(users);
    res.json({success:true,xu:users[username].xu});
});

// Rút xu
app.post('/rut', (req,res)=>{
    const {username,amount} = req.body;
    let users = readUsers();
    if(!users[username]) return res.json({success:false,message:'User không tồn tại'});
    if(users[username].xu < amount) return res.json({success:false,message:'Không đủ xu'});
    users[username].xu -= parseInt(amount);
    writeUsers(users);
    res.json({success:true,xu:users[username].xu});
});

// Cập nhật lịch sử cược
app.post('/bet', (req,res)=>{
    const {username,bet,choice} = req.body;
    let users = readUsers();
    if(!users[username]) return res.json({success:false});
    users[username].xu -= parseInt(bet);
    users[username].history.push(`Đặt cược ${bet} xu vào ${choice}`);
    writeUsers(users);
    res.json({success:true,xu:users[username].xu,history:users[username].history});
});

app.listen(PORT, ()=> console.log(`Server chạy http://localhost:${PORT}`));

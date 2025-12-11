const express = require("express");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const app = express();
const PORT = 3000;

// Discord webhook URL (thay bằng URL của bạn)
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1448729294317686855/JseBA8Xm0F9VK7R6kp1puaLO9o4pW-MnY-y0_CEbbI9vRgmwAjNHZgzh5A7MhzWZEe4";

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

function readUsers(){
    if(!fs.existsSync("users.json")) fs.writeFileSync("users.json","{}");
    return JSON.parse(fs.readFileSync("users.json"));
}

function writeUsers(users){
    fs.writeFileSync("users.json",JSON.stringify(users,null,2));
}

async function sendDiscord(message){
    try{
        await axios.post(DISCORD_WEBHOOK, {content: message});
    }catch(err){ console.log("Discord webhook error:",err.message); }
}

function addHistory(username,type,text){
    let users=readUsers();
    if(!users[username]) return;
    if(!users[username].history) users[username].history=[];
    users[username].history.push({type,text,time:new Date().toLocaleString()});
    writeUsers(users);
}

// ——— Routes ———

// Đăng ký
app.post("/register",(req,res)=>{
    const {username,password}=req.body;
    let users=readUsers();
    if(users[username]) return res.json({success:false,message:"Username đã tồn tại"});
    users[username]={password,xu:50000,history:[{type:"nap",text:"Nhận 50.000 xu khi đăng ký",time:new Date().toLocaleString()}]};
    writeUsers(users);
    res.json({success:true,xu:50000,history:users[username].history});
});

// Đăng nhập
app.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    let users=readUsers();
    if(users[username] && users[username].password===password){
        res.json({success:true,xu:users[username].xu,history:users[username].history});
        await sendDiscord(`📥 **${username}** vừa đăng nhập vào Tài Xỉu Web!`);
    }else res.json({success:false,message:"Sai username hoặc password"});
});

// Nhận key
app.post("/key",(req,res)=>{
    const {username,key}=req.body;
    if(key!=="BHUYVIP50000") return res.json({success:false,message:"Key không hợp lệ"});
    let users=readUsers();
    if(!users[username]) return res.json({success:false,message:"User không tồn tại"});
    users[username].xu+=50000;
    addHistory(username,"nap","Nhận 50.000 xu từ key");
    res.json({success:true,xu:users[username].xu,history:users[username].history});
});

// Nạp
app.post("/nap",(req,res)=>{
    const {username,amount}=req.body;
    let users=readUsers();
    if(!users[username]) return res.json({success:false,message:"User không tồn tại"});
    users[username].xu+=parseInt(amount);
    addHistory(username,"nap",`Nạp ${amount} xu`);
    res.json({success:true,xu:users[username].xu,history:users[username].history});
});

// Rút
app.post("/rut",(req,res)=>{
    const {username,amount}=req.body;
    let users=readUsers();
    if(!users[username]) return res.json({success:false,message:"User không tồn tại"});
    if(users[username].xu<amount) return res.json({success:false,message:"Không đủ xu"});
    users[username].xu-=parseInt(amount);
    addHistory(username,"rut",`Rút ${amount} xu`);
    res.json({success:true,xu:users[username].xu,history:users[username].history});
});

// Cược
app.post("/bet",(req,res)=>{
    const {username,bet,choice}=req.body;
    let users=readUsers();
    if(!users[username]) return res.json({success:false});
    if(users[username].xu<bet) return res.json({success:false,message:"Không đủ xu"});
    users[username].xu-=parseInt(bet);
    addHistory(username,"bet",`Đặt cược ${bet} xu vào ${choice}`);
    res.json({success:true,xu:users[username].xu,history:users[username].history});
});

app.listen(PORT,()=>console.log(`🚀 Server chạy: http://localhost:${PORT}`));

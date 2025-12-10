let autoOpen=false;
const road=document.getElementById('road');
function addRoad(r){const d=document.createElement('div');d.className='dot '+r;road.appendChild(d);}
function playRound(){
 rollDice();
 setTimeout(()=>{if(autoOpen)toggleCup();
 addRoad(Math.random()>0.5?'tai':'xiu');},1200);
}
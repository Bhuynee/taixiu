const dice=[],loader=new THREE.TextureLoader();
function createDice(x){
 const mats=[];
 for(let i=1;i<=6;i++)mats.push(new THREE.MeshStandardMaterial({map:loader.load(`assets/dice/${i}.png`)}));
 const d=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),mats);
 d.position.set(x,1,0);scene.add(d);dice.push(d);
}
createDice(-1.5);createDice(0);createDice(1.5);
function rollDice(){
 dice.forEach(d=>d.rotation.set(Math.random()*6,Math.random()*6,Math.random()*6));
 playSound('roll');
}
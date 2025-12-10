const cup=new THREE.Mesh(
new THREE.CylinderGeometry(2,2.2,2,32,1,true),
new THREE.MeshStandardMaterial({color:0x444,side:THREE.DoubleSide})
);
cup.position.y=2;scene.add(cup);
let cupOpen=false;
function toggleCup(){cup.position.y=cupOpen?2:5;cupOpen=!cupOpen;playSound('open');}
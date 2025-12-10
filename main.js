const canvas=document.getElementById('game');
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,0.1,100);
camera.position.set(0,6,10);
const renderer=new THREE.WebGLRenderer({canvas});
renderer.setSize(innerWidth,innerHeight);
scene.add(new THREE.AmbientLight(0xffffff,.8));
const light=new THREE.DirectionalLight(0xffffff,1);light.position.set(5,10,5);scene.add(light);
const table=new THREE.Mesh(new THREE.CircleGeometry(6,64),
new THREE.MeshStandardMaterial({color:0x222222}));
table.rotation.x=-Math.PI/2;scene.add(table);
function animate(){requestAnimationFrame(animate);renderer.render(scene,camera)}animate();
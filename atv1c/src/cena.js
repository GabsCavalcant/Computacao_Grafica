import * as THREE from '../node_modules/three/build/three.module.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';


//criando a cena
const cena = new THREE.Scene();
cena.background = new THREE.Color(0xbfd1e5)

//criando a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 10); 
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//controle de orbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//add luzDirecional

const luz = new THREE.DirectionalLight(0xffffff, 1);
luz.position.set(10,1,5);
cena.add(luz)

//luz ambiente
const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.5); // Luz branca, 50% de intensidade
cena.add(luzAmbiente);

//piso

const pisoGeometira = new THREE.PlaneGeometry(20,20);
const pisoMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x888888, // Cinza
    side: THREE.DoubleSide
});

const piso = new THREE.Mesh(pisoGeometira,pisoMaterial);
piso.rotation.x = -Math.PI / 2;
piso.receiveShadow = true;
cena.add(piso);

//carrgando o chão e instanciando o loade

const loader = new GLTFLoader();

loader.load(
    'model/kenney_blocky-characters_20/Models/GLB format/character-a.glb',

    function (glb) {
        
        
        const personagem = glb.scene;

        cena.add(personagem)
    },
);

loader.load(
    'model/kenney_blocky-characters_20/Models/GLB format/character-c.glb',

    function(glb){
    const personagem2 = glb.scene;
    cena.add(personagem2);
    personagem2.position.set(5,0,5)
}
);

loader.load(
    'model/kenney_blocky-characters_20/Models/GLB format/character-n.glb',

    function(glb){
        const personagem3 = glb.scene;
        cena.add(personagem3)
        personagem3.position.set(-5,0,-5)
    }
);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(cena, camera);
}
animate();
  

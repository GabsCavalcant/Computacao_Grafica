import { EXRLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { texture } from "three/tsl";



// 1. criar uma cena básica
const cena = new THREE.Scene();
cena.backgroundColor = 0xffffff;

// 2. criar e configurar câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = -3;
camera.position.y = 8;
camera.position.z = 2;

// 4. configurar renderizador e anexar câmera
const renderizador = new THREE.WebGLRenderer({ antialias: true });
// configura espaço de cores
renderizador.outputColorSpace = THREE.SRGBColorSpace;
// habilita sombras
renderizador.shadowMap.enabled = true;
renderizador.shadowMap.type = THREE.VSMShadowMap;
// define tamanho, cor e anexa no DOM
renderizador.setSize(window.innerWidth, window.innerHeight);
renderizador.setClearColor(0xffffff);
document.body.appendChild(renderizador.domElement);

// 5. adicionar iluminação
cena.add(new THREE.AmbientLight(0xaaaaaa));
const luzDirecional = new THREE.DirectionalLight(0xffffff);
luzDirecional.position.set(5, 12, 8);
luzDirecional.castShadow = true;
luzDirecional.shadow.bias = -0.0005;
cena.add(luzDirecional);

// add orbitcontrols
const controlador = new OrbitControls(camera, renderizador.domElement);
controlador.maxPolarAngle = 90 * (Math.PI / 180);


//Carregar o "mundo"
const exrloader = new EXRLoader ();
exrloader.load("../assets/lugarLegal/boma_4k.exr", (textura) =>{
    textura.mapping = THREE.EquirectangularReflectionMapping;
    creatSkybox(textura);
});

function creatSkybox(textura ){
    const esferaGeometria = new THREE.SphereGeometry(500,60,50);
    const esferaMaterial = new THREE.MeshDepthMaterial({
        map: textura,
        side: THREE.BackSide
    });
    const skyBox = new THREE.Mesh(esferaGeometria, esferaMaterial);
    cena.add(skyBox);
};




// 7. renderizar a cena
// percorrer o array de objetos para rotacioná-los
function renderizar() {
    requestAnimationFrame(renderizar);
  
    
    renderizador.render(cena, camera);
    controlador.update();
  };
  renderizar();


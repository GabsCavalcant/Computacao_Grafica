/*
* A estrutura básica do arquivo é:
* 1) Importar bibliotecas; 2) Criar a cena; 3) Criar e configurar a câmera;
* 4) Configurar renderizador e anexar câmera; 5) adicionar iluminação;
* 6) criar objetos e montar a cena; 7) renderizar a cena
*/
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


// 1. criar uma cena básica
const cena = new THREE.Scene();
cena.backgroundColor = 0xffffff;
// habilita névoa na cena
cena.fog = new THREE.Fog(0xffffff, 0.0025, 50);

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
cena.add(new THREE.AmbientLight(0x0000ff));
const luzDirecional = new THREE.DirectionalLight(0xffffff);
luzDirecional.position.set(5, 12, 8);
luzDirecional.castShadow = true;
luzDirecional.shadow.bias = -0.0005;
cena.add(luzDirecional);

// add orbitcontrols
const controlador = new OrbitControls(camera, renderizador.domElement);
controlador.maxPolarAngle = 90 * (Math.PI / 180);

// 6. criar objetos e montar a cena

//1 Criar array de inicio
const objetos = [];
//2. criar uma funcao para adicionar elementos em posições aleatorias
//3.programar o evento click
const linkarBotao = document.getElementById("CriarEstrutura");
linkarBotao.addEventListener('click', adicionarGeometria);

const remove = document.getElementById("Remover");
remove.addEventListener('click', remover);

//Carregar um objt
const objLoeader = new OBJLoader();
objLoeader.load("assets/cat/cat.obj",(objeto) =>(
  cena.add(objeto)));




const geometria = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });

const geometria1 = new THREE.SphereGeometry(0.72, 10, 12);
const material1 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

const geometria3 = new THREE.BoxGeometry(0.9, 8, 0.9);


const geometria4 = new THREE.ConeGeometry(3, 6, 3);



const cubo = new THREE.Mesh(geometria3, material);
const esfera = new THREE.Mesh(geometria1, material1);
const esfera1 = new THREE.Mesh(geometria1, material1);
const cone = new THREE.Mesh(geometria4, material1);





cubo.position.x = -1;
cubo.castShadow = true;
cena.add(cubo);

esfera.position.x = -2;
esfera.castShadow = true;
cena.add(esfera);

esfera1.position.x = 0;
esfera1.castShadow = true;
cena.add(esfera1);

cone.position.x = -1;
cone.position.y = 4;
cone.castShadow = true;
cena.add(cone);






// criar um plano
const chaoGeometria = new THREE.PlaneGeometry(10, 10);
const chaoMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const chao = new THREE.Mesh(chaoGeometria, chaoMaterial);
chao.position.set(0, -2, 0);
chao.rotation.set(-Math.PI / 2, 0, 0);
chao.receiveShadow = true;
cena.add(chao);

// 7. renderizar a cena
function renderizar() {
  requestAnimationFrame(renderizar);
  renderizador.render(cena, camera);
  controlador.update();
  
}



//pecorrer o array de objetos para rotacionar
function animacao() {
  requestAnimationFrame(animacao);
  //cubo.rotation.x += 0.01;
  cubo.rotation.y -= 0.2;
  cubo.rotation.y += 0.5;

  cone.rotation.y -= 0.2;
  //cone.rotation.y += 0.5;



  // renderiza a cena
  renderizador.render(cena, camera);
}

animacao();


function adicionarGeometria() {
    const geometra5 = new THREE.TorusGeometry(20, 2, 9, 154);
    const torus = new THREE.Mesh(geometra5, material);

    torus.position.set(

      Math.random() * 10 -5,
      Math.random() * 10,
      Math.random() * 10 - 5
  );
    torus.castShadow = true;
    cena.add(torus);
    objetos.push(torus);


  };

  function remover (){
    if(objetos.length > 0 ){
     const obj = objetos.pop();
      //remover objeto
      cena.remove(obj);
    }
  }

  function addGato(){}
 
renderizar();
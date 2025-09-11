import * as THREE from 'three';
import { color } from 'three/tsl';

import { OrbitControls } from 'three/examples/jsm/Addons.js';


class App{
    //atributos privados
    #renderizador = null;
    #cena = null;
    #camera = null;
    #controles = null;

    constructor(){
        window.addEventListener('resize', this.#redimencionar);
    }

    initialize(){
        //configurações iniciais
this.#renderizador = new THREE.WebGLRenderer();
this.#renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(this.#renderizador.domElement);

const aspect = window.innerWidth / window.innerHeight;
this.#camera = new THREE.PerspectiveCamera(
    50,aspect,0.1,2000
);
this.#camera.position.z = 5;

this.#controles = new OrbitControls(
    this.#camera,
    this.#renderizador.domElement);

    this.#controles.update();
    this.#controles.enableDamping = true;
    this.#controles.dampingFactor = 0.1;
    //controles.target.set(0,0,1);
    this.#cena = new THREE.Scene();

//objeto
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    })
);



this.#cena.add(mesh);

}
    run(){
        const render = () => {requestAnimationFrame(render)
        this.#renderizador.render(this.#cena,this.#camera)    
        }
        render();

    }

    #redimencionar(){
        const w = window.innerWidth;
        const h = window.innerHeight;
        const aspect = w/h;

        this.#renderizador.setSize(w,h);
        this.#camera.aspect = aspect

        this.#renderizador.setSize(w,h);
    }

}

const app = new App();
app.initialize();
app.run();
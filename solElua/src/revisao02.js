import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { color } from 'three/tsl';
import { Group } from 'three/webgpu';

class App{
    // atributos privados
    #renderizador = null;
    #cena = null;
    #camera = null;
    #controles = null;
    #grupoLua = null;
    #grupoTerra = null
    #terra = null;

    constructor(){
        window.addEventListener('resize', () => {this.#redimensionar();});
    }

    initialize(){
        // configuracoes iniciais
        this.#renderizador = new THREE.WebGLRenderer();
        this.#renderizador.setClearColor(0xdddddd);
        this.#renderizador.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.#renderizador.domElement);

        const aspect = window.innerWidth / window.innerHeight;
        this.#camera = new THREE.PerspectiveCamera(
            50, aspect, 0.1, 2000);
        this.#camera.position.z = 5;

        this.#cena = new THREE.Scene();

        this.#controles = new OrbitControls(this.#camera,
            this.#renderizador.domElement);
        this.#controles.enableDamping = true;
        this.#controles.dampingFactor = 0.1;

        // objeto
 
        const sol = new THREE.Mesh(
            new THREE.SphereGeometry(),
            new THREE.MeshBasicMaterial({
                color: 0xFFFF00
                
            })
        );
              
        
        const lua = new THREE.Mesh(
            new THREE.SphereGeometry(0.5,32,32),
            new THREE.MeshBasicMaterial({
                color: 0xAAAAAA
                
            })


        )
       
        lua.position.x = 5;

        const terra = new THREE.Mesh(
            new THREE.SphereGeometry(0.5,64,64),
            new THREE.MeshBasicMaterial({
                color: 0x2233FF 

            })

        )
       
        terra.position.x = 3

        this.#grupoLua = new Group();
        this.#grupoLua.add(lua)
       
        this.#cena.add(this.#grupoLua)

        this.#grupoTerra = new Group();
        this.#grupoTerra.add(terra)
        this.#cena.add(this.#grupoTerra)
        
        terra.add(grupoLua)
        sol.add(this.#grupoTerra)

        this.#cena.add(sol)

        animate()

    }
    
        

    run(){
        const render = () => {
            requestAnimationFrame(render);
            this.#renderizador.render(this.#cena, this.#camera);
        }
        render();
    }

    #redimensionar(){
       const w = window.innerWidth;
       const h = window.innerHeight;
       const aspect = w / h;
       this.#camera.aspect = aspect;       
       this.#renderizador.setSize(w, h);
       // atualiza a matriz de projeção da camera
       this.#camera.updateProjectionMatrix();

    }

};

const app = new App();
app.initialize();
app.run();


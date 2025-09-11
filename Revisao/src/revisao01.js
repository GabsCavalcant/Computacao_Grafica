import * as THREE from 'three';
import { color } from 'three/tsl';

import { OrbitControls } from 'three/examples/jsm/Addons.js';





//Rendereziar a cena pos adicinar o objeto

function animate(){

requestAnimationFrame(animate);
controles.update();
renderizador.render(cena,camera);

}

animate();
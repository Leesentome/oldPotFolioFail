
import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z += 30;

const geo = new THREE.TorusGeometry(10, 3, 16, 100);
const mat = new THREE.MeshStandardMaterial({color: 0xFF6347});

const torus = new THREE.Mesh(geo, mat);

scene.add(torus);

const pLight = new THREE.PointLight(0xFFFFFF);
pLight.position.set(0, 0, 0);
scene.add(pLight)

const aLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(aLight);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

console.log(window)

animate();

import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 2, 16, 100);

const material = new THREE.TextureLoader().load('textures/gold.jpeg');
const torus = new THREE.Mesh(
  geometry,
  new THREE.MeshStandardMaterial({
    map: material,
  })
);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.3, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(400));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().forEach(addStar);

// Background

const museum = new THREE.TextureLoader().load('textures/museum-bg.png');
scene.background = museum;

// Avatar

const nogaTexture = new THREE.TextureLoader().load('textures/noga.jpg');

const noga = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: nogaTexture }));

scene.add(noga);

// Ball

const ballTexture = new THREE.TextureLoader().load('textures/disco-ball_.jpeg');
const normalTexture = new THREE.TextureLoader().load('textures/normal.jpg');

const ball = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: ballTexture,
    normalMap: normalTexture,
  })
);

scene.add(ball);

ball.position.z = 30;
ball.position.setX(-10);

noga.position.z = -5;
noga.position.x = 3;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  ball.rotation.x += 0.05;
  ball.rotation.y += 0.075;
  ball.rotation.z += 0.05;

  noga.rotation.y += 0.01;
  // noga.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  ball.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

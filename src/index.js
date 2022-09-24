import './style/main.css'
import * as THREE from 'three'
// import { FlatShading } from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"

const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight
console.log("Changes in git");

window.addEventListener('resize', () =>
{
    // Save sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)


function makePlane(color, xpos, ypos, zpos, xrot, yrot,zrot, hasShadow,scene)
{
const plane = new THREE.Mesh(new THREE.PlaneGeometry(10,10,10,10), new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide}));
plane.rotation.set(xrot,yrot,zrot);
plane.position.set(xpos,ypos,zpos);
plane.receiveShadow = hasShadow
plane.material.side = THREE.DoubleSide;
scene.add(plane);
return plane;
}
const ground = makePlane('grey',0,0,0, -Math.PI/2,0,0,true,scene);
const wall1 = makePlane('green',5,5,0,0,-Math.PI/2,0,true,scene);
const wall2 = makePlane('orange',-5,5,0,0,-Math.PI/2,0,true,scene);
const wall3 = makePlane('white',0,5,-5,0,0,0,true,scene);
const roof = makePlane('grey',0,10,0, -Math.PI/2,0,0,true,scene);


var refCar;
const loader = new GLTFLoader().setPath("models/");
loader.load('CarModel.glb' , function OnLoad(car){
console.log("adding");
car.scene.scale.set(0.1,0.1,0.1);
car.scene.position.set(0,0,0);
car.castShadow = true;
refCar = car.scene;
console.log(refCar)
scene.add(car.scene);
// return gltf;
});
//console.log(refCar)


// loader.load('table.glb' , function OnLoad(gltf){
//     console.log("adding");
//     // gltf.scene.scale.set(0.1,0.1,0.1);
//     gltf.scene.position.set(0,0,4);
//     gltf.scene.rotation.set(0,Math.PI/2,0);
//     gltf.castShadow = true;
//     scene.add(gltf.scene);
//     });

var table;
loader.load('table.glb', function(gltf){

    scene.add(gltf.scene);
   // gltf.scene.scale.set(0.1,0.1,0.1);
    gltf.scene.position.set(0,0,4);
    table = gltf.scene;
    gltf.scene.rotation.set(0,Math.PI/2,0);
    gltf.castShadow = true;
})


const lightColor = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(lightColor , intensity);
light.position.set(-1, 10, 4);
scene.add(light);
light.castShadow = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.content')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;
// controls
const controls = new OrbitControls(camera, renderer.domElement);



const animate = () =>
{
    if(refCar)
    {
        refCar.rotation.y +=0.01;
    }
    if(table)
    {
      //  table.rotation.y += 0.1;
    }
    // Update
    controls.update();
    // cube.rotation.y += 0.01
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}
animate()
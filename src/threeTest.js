import * as THREE from "/src/Three.js";

function main()
{
const fov = 75;
const aspectRatio = window.innerWidth/ window.innerHeight;
const nearPlane = 0.1;
const farPlane = 1000;

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);
const renderer = new THREE.WebGLRenderer();

const lightColor = 0xFFFFFF;
const intensity = 1;

camera.position.z = 2;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

// const material1 = new THREE.MeshPhongMaterial({color: 0xDE3163});
// const material2 = new THREE.MeshPhongMaterial({color: 0xF2B124});
// const material3 = new THREE.MeshPhongMaterial({color: 0x2364E8});

// const cube1 = new THREE.Mesh(geometry,material2);
// const cube2 = new THREE.Mesh(geometry,material1);
// const cube3 = new THREE.Mesh(geometry,material3);




// cube1.position.z = -5;
// cube2.position.z = -5;
// cube3.position.z = -5;
// cube1.rotation.z = -60;
// cube1.rotation.x = -60;
// cube1.rotation.y = -60;
// cube2.position.x = -2;
// cube3.position.x = 2;

// scene.add(cube1);
// scene.add(cube2);
// scene.add(cube3);

const cube1 = makeCube(geometry,0x1FF5F4, 0, -5, scene);
const cube2 = makeCube(geometry,0x492BF4, -2, -5, scene);
const cube3 = makeCube(geometry,0x24F243, 2, -5, scene);
const cube4 = makeCube(geometry,0xF26124, 4, -5, scene);



const light = new THREE.DirectionalLight(lightColor, intensity);
light.position.set(1,2,4);
scene.add(light);
function animate() {
    requestAnimationFrame( animate );

    cube1.rotation.x += 0.01;
    cube1.rotation.y += 0.01;

    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;

    cube3.rotation.x += 0.01;
    cube3.rotation.y += 0.01;

    cube4.rotation.x += 0.01;
    cube4.rotation.y += 0.01;

    

    renderer.render( scene, camera );
};

animate();
//renderer.render(scene, camera);
}

function makeCube(geometry, color, xPosition, zPosition, scene)
{
const boxColor = new THREE.Color(color);   
const material = new THREE.MeshPhongMaterial({color: boxColor});
const cube = new THREE.Mesh(geometry,material);
cube.position.x = xPosition;
cube.position.z = zPosition;
scene.add(cube);
return cube;
}
main();

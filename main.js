import * as THREE from 'three';
import "./style.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { gsap } from 'gsap';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"


//scene
const scene = new THREE.Scene();



//gltf loader
const t2 = new THREE.Object3D()  
const loaders = new GLTFLoader()
loaders.load('./image/temple.glb', function(gltf){
const t1 = gltf.scene
const pointLight = new THREE.PointLight('black');
pointLight.position.set(0, 50, 0);
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);
t2.add(t1)
})

scene.add(t2)
t2.position.x = 0
t2.position.y = -3
t2.position.z = 0

//const spaceTexture = new THREE.TextureLoader().load('./Texture/smokey.gif');
//scene.background = spaceTexture;



//sizes
const sizes = { 
  width: window.innerWidth,
  height: window.innerHeight
}

//light
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(10, 30, 10)
light.intensity = 1.25
scene.add(light)

//camera
//0.1 is the closest view & 100 is far set limit view beyond you cant see
const camera = new THREE.PerspectiveCamera(45, sizes.width/ sizes.height, 0.1, 100)
camera.position.z = 50
scene.add(camera)


//renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(devicePixelRatio)
renderer.render(scene, camera)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

//resize
window.addEventListener('resize', ()=>{
  //update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //update camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width , sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//timeline magicc
const tl = gsap.timeline({ defaults: {duration: 1} })
tl.fromTo(t2.scale, {x:0, y:0, z:0}, {x:1, y:1, z:1})
tl.fromTo('nav', {y: '-100%'}, {y: '0%'})
tl.fromTo('.title', {opacity: 0}, {opacity: 1})


//Mouse Animation 
let mouseDown = false
let rgb = []
window.addEventListener('mousedown', () => (mouseDown = true))
window.addEventListener('mouseup', () => (mouseDown = false))

window.addEventListener('mousemove' , (e) =>{
     if(mouseDown){
        rgb = [
          Math.round((e.pageX / sizes.width) * 255),
          Math.round((e.pageY / sizes.height) * 255),
          150,
        ]
     }
})
import './style.css'
import * as THREE from 'three'

// init
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)
const renderer = new THREE.WebGLRenderer()

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

let objects = []

// torus
const torusKnotGeometry = new THREE.TorusKnotGeometry(7, 2, 100, 16)
const torusKnotMaterial = new THREE.MeshNormalMaterial({
	wireframe: true,
})
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
objects.push(torusKnot)
scene.add(torusKnot)

torusKnot.position.x = 0
torusKnot.position.y = 0
torusKnot.position.z = 0

// cone
const coneGeometry = new THREE.ConeGeometry(5, 10, 32, 16, false, 0, 6.3)
const coneMaterial = new THREE.MeshBasicMaterial({
	color: 0xffff00,
	wireframe: true,
})
const cone = new THREE.Mesh(coneGeometry, coneMaterial)
objects.push(cone)
scene.add(cone)

cone.position.x = 20
cone.position.y = -10
cone.position.z = 50

// cube
const cubeGeometry = new THREE.BoxGeometry(7, 7, 7)
const cubeMaterial = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	wireframe: true,
})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
objects.push(cube)
scene.add(cube)

cube.position.x = -20
cube.position.y = 10
cube.position.z = 100

// sphere
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32)
const sphereMaterial = new THREE.MeshStandardMaterial({
	wireframe: true,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
objects.push(sphere)
scene.add(sphere)

sphere.position.x = 25
sphere.position.y = 0
sphere.position.z = 150

// cylinder
const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 20, 32)
const cylinderMaterial = new THREE.MeshBasicMaterial({
	color: 0x0000ff,
	wireframe: true,
})
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
objects.push(cylinder)
scene.add(cylinder)

cylinder.position.x = -25
cylinder.position.y = -20
cylinder.position.z = 200

// icosahedron
const icosahedronGeometry = new THREE.IcosahedronGeometry(5, 0)
const icosahedronMaterial = new THREE.MeshBasicMaterial({
	color: 0xff00ff,
	wireframe: true,
})
const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial)
objects.push(icosahedron)
scene.add(icosahedron)

icosahedron.position.x = 25
icosahedron.position.y = 20
icosahedron.position.z = 250

// torus
const torusGeometry = new THREE.TorusGeometry(5, 2, 16, 64)
const torusMaterial = new THREE.MeshBasicMaterial({
	color: 0xff0000,
	wireframe: true,
})
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
objects.push(torus)
scene.add(torus)

torus.position.x = -25
torus.position.y = 0
torus.position.z = 300

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 2)
scene.add(ambientLight)

// stars
function addStar() {
	const geometry = new THREE.SphereGeometry(0.5, 24, 24)
	const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
	const star = new THREE.Mesh(geometry, material)

	const x = THREE.MathUtils.randFloatSpread(1800)
	const y = THREE.MathUtils.randFloatSpread(1000)
	const z = THREE.MathUtils.randFloatSpread(1000)

	star.position.set(x, y, z)
	scene.add(star)
}

Array(2000).fill().forEach(addStar)

// earth
const earthTexture = new THREE.TextureLoader().load('img/2k_earth_nightmap.jpg')
const earthNormal = new THREE.TextureLoader().load(
	'img/2k_earth_normal_map.tif'
)
const earth = new THREE.Mesh(
	new THREE.SphereGeometry(3, 32, 32),
	new THREE.MeshStandardMaterial({
		map: earthTexture,
		normalMap: earthNormal,
	})
)

scene.add(earth)

earth.position.x = -40
earth.position.x = -15

// camera movement on scroll
function moveCamera() {
	const t = document.body.getBoundingClientRect().top
	earth.rotation.x += 0.05
	earth.rotation.y += 0.075
	earth.rotation.z += 0.05

	camera.position.z = t * -0.1
}

document.body.onscroll = moveCamera

// assing a random spin amount to each object
objects.forEach((object) => {
	object.spinAmount = Math.random() * 0.1
	console.log(object.spinAmount, object.geometry)
})

// main loop
function animate() {
	requestAnimationFrame(animate)

	// rotate every object in the array by a random amount
	objects.forEach((object) => {
		object.rotation.x += object.spinAmount
		object.rotation.y += object.spinAmount
		object.rotation.z += object.spinAmount
	})

	// earth.rotation.y += 0.01

	renderer.render(scene, camera)
}

animate()

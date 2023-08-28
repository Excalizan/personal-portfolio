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

torusKnot.isCenter = true

// cone
const coneGeometry = new THREE.ConeGeometry(5, 10, 32, 16, false, 0, 6.3)
const coneMaterial = new THREE.MeshBasicMaterial({
	color: 0xffff00,
	wireframe: true,
})
const cone = new THREE.Mesh(coneGeometry, coneMaterial)
objects.push(cone)
scene.add(cone)

// cube
const cubeGeometry = new THREE.BoxGeometry(7, 7, 7)
const cubeMaterial = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	wireframe: true,
})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
objects.push(cube)
scene.add(cube)

// sphere
const sphereGeometry = new THREE.SphereGeometry(7, 25, 25)
const sphereMaterial = new THREE.MeshStandardMaterial({
	wireframe: true,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
objects.push(sphere)
scene.add(sphere)

// cylinder
const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 20, 32)
const cylinderMaterial = new THREE.MeshBasicMaterial({
	color: 0x0000ff,
	wireframe: true,
})
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
objects.push(cylinder)
scene.add(cylinder)

// icosahedron
const icosahedronGeometry = new THREE.IcosahedronGeometry(5, 0)
const icosahedronMaterial = new THREE.MeshBasicMaterial({
	color: 0xff00ff,
	wireframe: true,
})
const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial)
objects.push(icosahedron)
scene.add(icosahedron)

// torus
const torusGeometry = new THREE.TorusGeometry(5, 2, 16, 64)
const torusMaterial = new THREE.MeshBasicMaterial({
	color: 0xff0000,
	wireframe: true,
})
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
objects.push(torus)
scene.add(torus)

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

// camera movement on scroll
function moveCamera() {
	const t = document.body.getBoundingClientRect().top

	camera.position.z = t * -0.1
}

document.body.onscroll = moveCamera

// assing a random spin amount to each object
objects.forEach((object) => {
	object.spinAmount = Math.random() * 0.1
})

const speedXRadiusMap = {
	0.01: 100,
	0.015: 150,
	0.02: 200,
	0.025: 250,
	0.03: 300,
	0.035: 350,
}
let possibleSpeeds = [0.01, 0.015, 0.02, 0.025, 0.03, 0.035]

// assing the orbit values
objects.forEach((object) => {
	if (!object.isCenter) {
		// get a random grade and remove it from the array
		let grade = Math.floor(Math.random() * possibleSpeeds.length)
		object.orbit = {
			orbit_c: new THREE.Vector3(0, 0, 0), //orbit center
			orbit_a: Math.random() * 360, //orbit angle
			orbit_s: possibleSpeeds[grade], //orbit speed
			orbit_r: speedXRadiusMap[possibleSpeeds[grade]], //orbit radius
		}
		possibleSpeeds.splice(grade, 1)
	}
	console.log(object.geometry.type, object.orbit)
})

// orbit function
function orbit(object) {
	object.orbit.orbit_a += object.orbit.orbit_s
	object.position.x =
		object.orbit.orbit_c.x +
		Math.cos(object.orbit.orbit_a) * object.orbit.orbit_r
	object.position.z =
		object.orbit.orbit_c.z +
		Math.sin(object.orbit.orbit_a) * object.orbit.orbit_r
}
// main loop
function animate() {
	requestAnimationFrame(animate)

	// rotate every object in the array by a random amount
	objects.forEach((object) => {
		object.rotation.x += object.spinAmount
		object.rotation.y += object.spinAmount
		object.rotation.z += object.spinAmount
	})

	// orbit every object in the array
	objects.forEach((object) => {
		if (!object.isCenter) {
			orbit(object)
		}
	})

	renderer.render(scene, camera)
}

animate()

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

// torus
const torusKnotGeometry = new THREE.TorusKnotGeometry(7, 2, 100, 16)
const torusKnotMaterial = new THREE.MeshNormalMaterial({
	wireframe: true,
})
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
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
scene.add(cone)

cone.position.x = 20
cone.position.y = -10
cone.position.z = 50

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

// scene.add(earth)

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

// main loop
function animate() {
	requestAnimationFrame(animate)

	torusKnot.rotation.x += 0.01
	torusKnot.rotation.y += 0.005
	torusKnot.rotation.z += 0.01

	cone.rotation.y += 0.05
	cone.rotation.z += 0.1

	// earth.rotation.y += 0.01

	renderer.render(scene, camera)
}

animate()

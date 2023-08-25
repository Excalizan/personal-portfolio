import './style.css'
import * as THREE from 'three'

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

const torusKnotGeometry = new THREE.TorusKnotGeometry(7, 2, 100, 16)
const torusKnotMaterial = new THREE.MeshBasicMaterial({
	color: 0xffff00,
	wireframe: true,
})
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
scene.add(torusKnot)

torusKnot.position.z = -20
torusKnot.position.x = -2
torusKnot.position.y = 2

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

function addstar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24)
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
	const star = new THREE.Mesh(geometry, material)

	const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(200))

	star.position.set(x, y, z)
	scene.add(star)
}

Array(300).fill().forEach(addstar)

const earthTexture = new THREE.TextureLoader().load(
	'assets/2k_earth_nightmap.jpg'
)
const earthNormal = new THREE.TextureLoader().load(
	'assets/2k_earth_normal_map.tif'
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

function moveCamera() {
	const t = document.body.getBoundingClientRect().top
	earth.rotation.x += 0.05
	earth.rotation.y += 0.075
	earth.rotation.z += 0.05

	camera.position.z = t * -0.01
	camera.position.x = t * -0.0002
	camera.position.y = t * -0.0002
}

document.body.onscroll = moveCamera

function animate() {
	requestAnimationFrame(animate)

	torusKnot.rotation.x += 0.01
	torusKnot.rotation.y += 0.005
	torusKnot.rotation.z += 0.01

	// earth.rotation.y += 0.01

	renderer.render(scene, camera)
}

animate()

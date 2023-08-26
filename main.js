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
const torusKnotMaterial = new THREE.MeshNormalMaterial({
	wireframe: true,
})
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
scene.add(torusKnot)

torusKnot.position.z = -20
torusKnot.position.x = -2
torusKnot.position.y = 2


const ambientLight = new THREE.AmbientLight(0xffffff, 2)
scene.add(ambientLight)

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

function moveCamera() {
	const t = document.body.getBoundingClientRect().top
	earth.rotation.x += 0.05
	earth.rotation.y += 0.075
	earth.rotation.z += 0.05

	camera.position.z = t * -0.1

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

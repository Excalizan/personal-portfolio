import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

camera.position.setZ(30)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 })
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)

const controls = new OrbitControls(camera, renderer.domElement)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(10, 10, 10)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const grigHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, grigHelper)

function addstar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24)
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
	const star = new THREE.Mesh(geometry, material)

	const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(100))

	star.position.set(x, y, z)
	scene.add(star)
}

Array(200).fill().forEach(addstar)

// const spaceTexture = new THREE.TextureLoader().load('space.jpg')

function animate() {
	requestAnimationFrame(animate)

	torus.rotation.x += 0.01
	torus.rotation.y += 0.005
	torus.rotation.z += 0.01

	controls.update()

	renderer.render(scene, camera)
}

animate()

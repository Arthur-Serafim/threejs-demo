let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 5

let renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setClearColor('#e5e5e5')
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight

  camera.updateProjectionMatrix()
})

let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()

let geometry = new THREE.BoxGeometry(1, 1, 1)
let material = new THREE.MeshLambertMaterial({ color: 0xe8b8ff })
let mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

let light = new THREE.PointLight(0xffffff, 1, 500)
light.position.set(10, 0, 25)

scene.add(light)

function render() {
  requestAnimationFrame(render)

  renderer.render(scene, camera)
}

function onMouseMove(event) {
  event.preventDefault()

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  mesh.rotation.y = mouse.x * 1.5
  mesh.rotation.x = mouse.y * -1.5

  raycaster.setFromCamera(mouse, camera)
}

render()

window.addEventListener('mousemove', onMouseMove)

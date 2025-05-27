import { SphereGeometry , Mesh, MeshStandardMaterial } from '/node_modules/three/build/three.module.js'
import { update } from '/src/js/calc.js'

export function createPlanet() {
	const spec = {
		color: 'purple'
	}

	const geometry = new SphereGeometry(2, 32, 16)
	const material = new MeshStandardMaterial(spec)
	const planet = new Mesh(geometry, material)

  const radiansPerSecond = Math.PI / 10

  planet.tick = (delta) => {
    planet.rotation.x += radiansPerSecond * delta
    planet.rotation.y += radiansPerSecond * delta
    planet.rotation.z += radiansPerSecond * delta
  }
	
	return planet
}


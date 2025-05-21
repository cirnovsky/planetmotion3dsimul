import { BoxGeometry , Mesh, MeshStandardMaterial } from '/node_modules/three/build/three.module.js'

export function createCube() {
	const spec = {
		color: 'purple'
	}

	const geometry = new BoxGeometry(2, 2, 2)
	const material = new MeshStandardMaterial(spec)
	const cube = new Mesh(geometry, material)

	cube.rotation.set(-0.5, -0.1, 0.8)
	
	return cube
}


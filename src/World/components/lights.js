import { DirectionalLight, PointLight, SpotLight, RectAreaLight } from '/node_modules/three/build/three.module.js'

export function createLights() {
	const light = new DirectionalLight('white', 8)

	light.position.set(10, 10, 10)

	return light
}

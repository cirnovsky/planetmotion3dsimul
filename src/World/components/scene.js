import { Color, Scene } from '/node_modules/three/build/three.module.js'

export function createScene() {
	const scene = new Scene()
	
	scene.background = new Color('skyblue')

	return scene
}

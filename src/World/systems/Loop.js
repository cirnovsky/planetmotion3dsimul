import { Clock } from '/node_modules/three/build/three.module.js'

export class Loop {
	constructor(camera, scene, renderer) {
		this.camera = camera
		this.scene = scene
		this.renderer = renderer
	}

	start() {}

	stop() {}
}

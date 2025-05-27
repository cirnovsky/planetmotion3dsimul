import { createCamera } from './components/camera.js'
import { createPlanet } from './components/planet.js'
import { createScene } from './components/scene.js'
import { createLights } from './components/lights.js'

import { createRenderer } from './systems/renderer.js'
import { Resizer } from './systems/Resizer.js'
import { Loop } from './systems/Loop.js'

let camera, renderer, scene, loop

export class World {
	constructor(container) {
		camera = createCamera()
		scene = createScene()
		renderer = createRenderer()
		loop = new Loop(camera, scene, renderer)
		container.append(renderer.domElement)

		const planet = createPlanet()
		const light = createLights()

    loop.updatables.push(planet)

		scene.add(planet, light)

		const resizer = new Resizer(container, camera, renderer)
		resizer.onResize = () => {
			this.render()
		} // no need because it refreshes 60 times per sec
	}
	
	render() {
		renderer.render(scene, camera)
	}

	start() {
		loop.start()
	}

	stop() {
		loop.stop()
	}
}

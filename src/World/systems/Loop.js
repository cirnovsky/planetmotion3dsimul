import { Clock } from '/node_modules/three/build/three.module.js'

const clock = new Clock()

export class Loop {
	constructor(camera, scene, renderer) {
		this.camera = camera
		this.scene = scene
		this.renderer = renderer
    this.updatables = []
	}

	start() {
    this.renderer.setAnimationLoop(() => {
      this.tick()

      this.renderer.render(this.scene, this.camera)
    })
  }

	stop() {
    this.renderer.setAnimationLoop(null)
  }

  tick() {
    const delta = clock.getDelta()

    for (const object of this.updatables)
      object.tick(delta)
  }
}

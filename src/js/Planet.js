export class Planet {
	constructor(mass, vel, coor) {
		this.mass = mass, this.vel = vel, this.coor = coor
	}

	/**
	 * @frm: Planet
	 * Returns: Vector3 | Calculate acceleration on @this exerted by @frm.
	 * Explain: Based on equation
			g = G * m1 * (r1 - r2) / |r1 - r2|^3, where r1, r2 are position vectors of two planets
	*/
	calcAcc(frm) {
		r = this.sub(frm.coor)
		return r.times(G * frm.mass * (r.dot(r) ** -2/3))
	}
}

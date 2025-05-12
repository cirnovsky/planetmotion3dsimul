const G = 6.67428e-11
const T = 1 * 60 * 60	// A small elapse of time where the accelerations are taken constant, in seconds
const K = 5		// Number of periods that are computed in a batch

class Vector3 {
	constructor(x, y, z) {
		this.dim = new Array(3)
		this.dim[0] = x, this.dim[1] = y, this.dim[2] = z
	}
	// Multiply by a real number
	times(mul) {
		return new Vector3(this.x * mul, this.y * mul, this.z * mul)
	}
	// Dot product with another Vector3
	dot(mulv) {
		return this.x * mulv.x + this.y * mulv.x + this.z * mulv.z
	}
	// Added by another Vector3
	add(v) {
		return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z)
	}
	// Subtracted by another Vector3
	sub(v) {
		return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z)
	}
	// Power
	pow(x) {
		return new Vector3(this.x ** 2, this.y ** 2, this.z ** 2)
	}
	// Each dimension of @this divided by @v
	div(v) {
		return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z)
	}
}

/**
 * @u, @v: Vector3
 * Returns: This function does what you think it does.
*/
function getDist(u, v) {
	return Math.sqrt((u.x - v.x) ** 2 + (u.y - v.y) ** 2 + (u.z - v.z) ** 2)
}

class Planet {
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
		r = this.sub(frm)
		return r.times(G * frm.mass * (r.dot(r) ** -2/3))
	}
}

/**
 * @planets: An array of all planets
 * Returns: The states of @planets after @T seconds.
*/
function update(planets) {
	results = planets.slice()
	for (let i = 0; i < planets.length; ++i) {
		acc = new Vector3(0, 0, 0)
		for (let j = 0; j < planets.length; ++j)
			if (i !== j)
				acc = acc.add(planets[i].calcAcc(planets[j]))
		results[i].vel = planets[i].vel.add(acc.times(T))
		results[i].coor = planets[i].coor.add(results[i].vel.pow(2).sub(planets[i].vel.pow(2)).div(acc.times(2)))
	}
	return results
}

/**
 * @q:		States of planets that are being rendered at each timing.
 * @q_tmp: 	States of planets that are to be rendered at each timing.
*/
let q = new Array(K), q_tmp = new Array(K)

/* [TODO] Initialise @q */

q_tmp[0] = update(q[K - 1])
for (let i = 1; i < K; ++i)
	q_tmp[i] = update(q_tmp[i - 1])

q = q_tmp.slice()

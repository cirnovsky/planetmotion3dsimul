import { Vector3 } from './Vector3.js'
import { Planet } from './Planet.js'

const G = 6.67428e-11
const T = 1 * 60 * 60	// A small elapse of time where the accelerations are taken constant, in seconds
const K = 5		// Number of periods that are computed in a batch


/**
 * @u, @v: Vector3
 * Returns: This function does what you think it does.
*/
function getDist(u, v) {
	return Math.sqrt((u.x - v.x) ** 2 + (u.y - v.y) ** 2 + (u.z - v.z) ** 2)
}


/**
 * @planets: An array of all planets
 * Returns: The states of @planets after @T seconds.
*/
export function update(planets) {
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

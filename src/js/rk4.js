import { Constants } from "./Constants.js";

/**
 * dv/dt = a
 * 
*/
export function rungeKutta4(bodies, dt) {
  const constants = new Constants();

  for (let body of bodies) {
    let k1 = body.acc.clone().multiplyScalar(dt).add(body.vel)
    let k2 = body.acc.clone().add(k1 / 2).multiplyScalar(dt).add(body.vel)
    let k3 = body.acc.clone().add(k2 / 2).multiplyScalar(dt).add(body.vel)
    let k4 = body.acc.clone().add(k3).multiplyScalar(dt).add(body.vel)
    let avg = k1.clone().add(k2).add(k3).add(k4).divideScalar(6)
  }
}

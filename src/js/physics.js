import { Constants } from "./Constants.js";

const constants = new Constants()

// update physics. for more document refer to src/js/calc.js
export function tick(dt, bodies) {
    for (let i = 0; i < bodies.length; ++i) {
        let now = bodies[i];
        now.acc.set(0, 0, 0);

        for (let j = 0; j < bodies.length; ++j) {
            if (i == j) continue;

            let other = bodies[j];
            let rVec = now.pos.clone().sub(other.pos);
            let dist = rVec.length();
            let accMag = (constants.G * other.mass) / dist ** 2;
            let accVec = rVec
                .clone()
                .normalize()
                .multiplyScalar(accMag);

            now.acc.sub(accVec);
        }
    }

    for (let body of bodies) {
        let initvel = body.vel.clone();
        body.vel.add(body.acc.clone().multiplyScalar(dt));

        let displacement = body.vel.clone().multiplyScalar(dt);
        body.pos.add(displacement);

        if (Math.abs(initvel.clone().dot(body.acc)) < 1e-16) {
            console.log("fuck you");
            console.log(initvel, body.acc, dt, body.vel, displacement);
        }

        body.mesh.position.copy(body.pos);

        // body.trailPositions.push(body.pos.clone());
        // if (body.trailPositions.length > maxTrailLength)
        //     body.trailPositions.shift();
        // body.trailGeometry.setFromPoints(body.trailPositions);
    }

    for (let i = 0; i < bodies.length; ++i) {
        for (let j = i + 1; j < bodies.length; ++j) {
            let dist = bodies[i].pos.distanceTo(bodies[j].pos);
            let collisionDistance =
                bodies[i].mesh.geometry.parameters.radius +
                bodies[j].mesh.geometry.parameters.radius;

            if (dist < collisionDistance)
                alert(
                    `💥Collision between ${bodies[i].name} and ${bodies[j].name}`,
                );
        }
    }
}

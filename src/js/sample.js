import * as THREE from "three"
import { Constants } from "./Constants.js"

const constants = new Constants();

function coord(rad)
{
    return new THREE.Vector3(Math.cos(rad), Math.sin(rad), 0);
}

function veloc(rad, mag)
{
    return new THREE.Vector3(-Math.sin(rad), Math.cos(rad), 0).multiplyScalar(mag);
}

export function loadThreeBodies(crt, bd)
{
    let mass = 0.05;
    let mag = Math.sqrt(constants.G * mass / 2);
    crt(
        "1",
        mass,
        coord(Math.PI / 2),
        veloc(Math.PI / 2, mag),
        0.2,
        0xff0000
    )
    crt(
        "2",
        mass,
        coord(-Math.PI / 6),
        veloc(-Math.PI / 6, mag),
        0.2,
        0xff0000
    )
    crt(
        "3",
        mass,
        coord(-Math.PI * 5 / 6),
        veloc(-Math.PI * 5 / 6, mag),
        0.2,
        0xff0000
    )
}

export function loadEarthSun(createBody, bodies) {
    createBody(
        "Sun",
        0.03,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
        1,
        0xff0000
    );

    createBody(
        "Earth",
        3.0027e-6,
        new THREE.Vector3(1.5, 0, 0),
        new THREE.Vector3(0, 0.3, 0),
        0.3,
        0x3399ff
    );
        
    let rVec = bodies[0].pos.clone().sub(bodies[1].pos);
    let rMag = rVec.length();
    let velMag = Math.sqrt((constants.G * bodies[0].mass) / rMag);
    let velVec = new THREE.Vector3(0, 0, 1)
        .cross(rVec)
        .normalize()
        .multiplyScalar(velMag);
    bodies[1].vel = velVec.clone();
}


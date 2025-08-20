import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Clock } from "three/src/core/Clock.js";
import { Constants } from "/src/js/Constants.js";
import { loadEarthSun, loadThreeBodies } from "./sample.js";
import { tick } from "./physics.js"

(function() {
    /**
     * Units:
     *   - Distance: Astronomical Unit (AU)
     *   - Time: Year
     *   - Mass: Solar Mass (SM)
     *
     * Scaling:
     *   - 1 AU = 1 simulation distance unit
     *   - 1 year = 1 simulation time second
     *
     * Gravitational Constant:
     *   - G * SM / AU^2 = (2π / year)^2 * AU^2
     *   - Therefore, G = 4π^2 (in simulation units)
     *
     * Notes:
     *   - 1 simulation second represents 1 year in real time
     *   - Approximations apply
     */

    const constants = new Constants();
    let maxTrailLength = 300;

    const scene = new THREE.Scene();
    const loader = new THREE.TextureLoader();
    // TODO: Background texture
    loader.load("/assets/img/background.png", function (texture) {
        scene.background = texture;
    });

    const camera = new THREE.PerspectiveCamera(
        60, // fov
        window.innerWidth / window.innerHeight, // aspect
        0.01, // near plane
        1000, // far plane
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 1;
    controls.maxDistance = 50;

    const light = new THREE.PointLight(0xffffff, 2);
    light.position.set(0, 0, 5);
    light.intensity = 20;
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.05); // soft white light with low intensity
    scene.add(ambientLight);

    const bodies = [];

    /**
     * @lhs, @rhs: THREE.Vector3
     * Returns: Whether @lhs and @rhs are at the same position, which is a collision.
     */

    let createBody = (name, mass, position, velocity, size, color) => {
        const geometry = new THREE.SphereGeometry(size, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        scene.add(mesh);

        const trailGeometry = new THREE.BufferGeometry().setFromPoints([
            position.clone(),
        ]);
        const trailMaterial = new THREE.LineBasicMaterial({ color });
        const trailLine = new THREE.Line(trailGeometry, trailMaterial);

        scene.add(trailLine);

        bodies.push({
            name,
            mass,
            size,
            pos: position.clone(),
            vel: velocity.clone(),
            acc: new THREE.Vector3(),
            mesh,
            trailPositions: [position.clone()],
            trailGeometry,
            trailLine,
        });
    };

    loadThreeBodies(createBody, bodies);

    const settings = {
        timeScale: 1,
        trailLength: maxTrailLength,
    };

    const gui = new dat.GUI();
    gui.add(settings, "timeScale", 0.01, 100).step(0.01).name("Time Scale");
    gui.add(settings, "trailLength", 10, 1000)
        .step(10)
        .name("Trail Length")
        .onChange((val) => (maxTrailLength = val));

    THREE.Vector3.prototype.square = function () {
        return new THREE.Vector3(this.x ** 2, this.y ** 2, this.z ** 2);
    };


    const clock = new Clock();

    function animate() {
        requestAnimationFrame(animate);
        tick(clock.getDelta() * settings.timeScale, bodies);
        renderer.render(scene, camera);
    }

    clock.start();
    animate();

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})()

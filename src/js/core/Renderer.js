var THREE = require('../vendor/three');

function Renderer() {
    'use strict';
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Camera guff
    this.camera = new THREE.PerspectiveCamera(45, (window.innerWidth / window.innerHeight), 1, 3000);
    this.camera.position = new THREE.Vector3(0, 0, 100);
    this.cameraLight = new THREE.PointLight(0xffffff);
    this.cameraLight.position = this.camera.position;

    this.scene = new THREE.Scene();

    // Basic ambient light
    var light = new THREE.AmbientLight(0x444444);
    this.scene.add(light);
    var light = new THREE.DirectionalLight(0x444444);
    light.position.set(55, 3, 405);
    this.scene.add(light);

    // Starfield
    var geometry = new THREE.SphereGeometry(1000, 32, 32);
    var material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('img/starfield.jpg'),
        side: THREE.BackSide
    });
    var starfield = new THREE.Mesh(geometry, material);
    starfield.position = new THREE.Vector3(0, 0, 0);
    this.scene.add(starfield);

    var count = 2500;
    var particles = new THREE.Geometry();
    var pmat = new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 2,
        map: THREE.ImageUtils.loadTexture('img/particle-star.png'),
        transparent: true,
        blending: THREE.AdditiveBlending
    });

    for (var i = 0; i < count; i++) {
        var px = Math.random() * 1500 - 500;
        var py = Math.random() * 1500 - 500;
        var pz = Math.random() * 300 - 150;
        var particle = new THREE.Vector3(px, py, pz);
        particles.vertices.push(particle);
    }

    var particleSystem = new THREE.ParticleSystem(particles, pmat);

    this.scene.add(particleSystem);
}

Renderer.prototype.update = function () {
    'use strict';
    this.cameraLightPosition = this.camera.position;
};

Renderer.prototype.render = function () {
    'use strict';
    this.renderer.render(this.scene, this.camera);
};

module.exports = Renderer;

var THREE = require('../vendor/three');

function Renderer() {
    'use strict';
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(1280, 720);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, (1280 / 720), 1, 1000);
    this.camera.position = new THREE.Vector3(0, 0, 100);
    this.scene = new THREE.Scene();
    var light = new THREE.AmbientLight( 0x888888 );
    this.scene.add(light);

    // Testing area
    var geometry = new THREE.SphereGeometry(400, 32, 32);
    var material = new THREE.MeshBasicMaterial();
    material.map = THREE.ImageUtils.loadTexture('img/starfield.jpg');
    material.side = THREE.BackSide;
    var starfield = new THREE.Mesh(geometry, material);
    starfield.position = new THREE.Vector3(0, 0, 0);
    this.scene.add(starfield);
}

Renderer.prototype.update = function () {
    'use strict';
};

Renderer.prototype.render = function () {
    'use strict';
    this.renderer.render(this.scene, this.camera);
};

module.exports = Renderer;

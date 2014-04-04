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
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position = new THREE.Vector3(0, 0, 0);
    this.scene.add(mesh);

    var g = new THREE.SphereGeometry(50, 32, 32);
    var m = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/earthmap1k.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('img/earthbump1k.jpg'),
        bumpScale: 0.05,
        specularMap: THREE.ImageUtils.loadTexture('img/earthspec1k.jpg'),
        specular: new THREE.Color('grey')
    });
    this.pMesh = new THREE.Mesh(g, m);
    this.pMesh.position = new THREE.Vector3(-40, 20, 0);
    var cg = new THREE.SphereGeometry(50.5, 32, 32);
    var cm = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/earthcloudmap.jpg'),
        side: THREE.DoubleSide,
        opacity: 0.8,
        transparent: true,
        depthWrite: false
    });
    this.cloudMesh = new THREE.Mesh(cg, cm);
    this.pMesh.add(this.cloudMesh);
    this.scene.add(this.pMesh);
}

Renderer.prototype.update = function () {
    'use strict';
    this.pMesh.rotation.y += 0.0001;
    this.pMesh.rotation.x += 0.0001;
    this.cloudMesh.rotation.y += 0.001;
    this.cloudMesh.rotation.z += 0.0001;
    this.cloudMesh.rotation.x += 0.0001;
};

Renderer.prototype.render = function () {
    'use strict';

    this.renderer.render(this.scene, this.camera);
};

module.exports = Renderer;

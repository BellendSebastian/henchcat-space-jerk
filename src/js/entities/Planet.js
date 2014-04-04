var BaseEntity = require('./BaseEntity');
var THREE = require('../vendor/three');

Planet.prototype = new BaseEntity();
Planet.prototype.constructor = Planet;

function Planet() {
    'use strict';
    BaseEntity.call(this);

    var geometry = new THREE.SphereGeometry(50, 32, 32);
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/earthmap1k.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('img/earthbump1k.jpg'),
        bumpScale: 0.05,
        specularMap: THREE.ImageUtils.loadTexture('img/earthspec1k.jpg'),
        specular: new THREE.Color('grey')
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position = new THREE.Vector3(-40, 20, 0);

    var cloudGeometry = new THREE.SphereGeometry(50.5, 32, 32);
    var cloudMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/earthcloudmap.jpg'),
        side: THREE.DoubleSide,
        opacity: 0.8,
        transparent: true,
        depthWrite: false
    });

    this.cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    this.mesh.add(this.cloudMesh);
}

Planet.prototype.update = function () {
    'use strict';
    this.cloudMesh.rotation.y += 0.001;
    this.mesh.rotation.y += 0.0001;
};

module.exports = Planet;

var BaseEntity = require('./BaseEntity');

Planet.prototype = new BaseEntity();
Planet.prototype.constructor = Planet;

function Planet() {
    'use strict';
    BaseEntity.call(this);

    var geometry = new THREE.SphereGeometry(50, 32, 32);
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/marsmap1k.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('img/marsbump1k.jpg'),
        bumpScale: 0.5,
        specularMap: THREE.ImageUtils.loadTexture('img/earthspec1k.jpg'),
        specular: new THREE.Color('grey')
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position = new THREE.Vector3(-40, 20, -45);
}

Planet.prototype.update = function () {
    'use strict';
    this.mesh.rotation.y += 0.0002;
};

module.exports = Planet;

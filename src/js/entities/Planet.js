var BaseEntity = require('./BaseEntity');

Planet.prototype = new BaseEntity();
Planet.prototype.constructor = Planet;

/**
 * Test planet class.
 *
 * @class
 * @augments {BaseEntity}
 */
function Planet(rotSpeed) {
    'use strict';
    BaseEntity.call(this);

    this.speed = rotSpeed;

    var geometry = new THREE.SphereGeometry(50, 32, 32);
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/marsmap1k.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('img/marsbump1k.jpg'),
        bumpScale: 0.5,
        specularMap: THREE.ImageUtils.loadTexture('img/earthspec1k.jpg'),
        specular: new THREE.Color('grey')
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position = new THREE.Vector3(-40, 20, -45);
}

/**
 * Update the planet's properties each tick.
 *
 * @func
 */
Planet.prototype.update = function () {
    'use strict';
    this.mesh.rotation.y += this.rotSpeed;
};

module.exports = Planet;

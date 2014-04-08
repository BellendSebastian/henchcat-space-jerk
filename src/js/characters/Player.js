var BaseCharacter = require('./BaseCharacter');

Player.prototype = new BaseCharacter();
Player.prototype.contstructor = Player;

function Player () {
    'use strict';
    BaseCharacter.call(this);

    var geometry = new THREE.CubeGeometry(10, 10, 10);
    var material = new THREE.MeshPhongMaterial();
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.currentVelocity = new THREE.Vector3(0, 0, 30);
    this.position = new THREE.Vector3(0, 0, 30);
    this.maxThrust = 5;
    this.minThrust = -5;
    this.thrustDecay = 0.2;
}

Player.prototype.update = function () {
    'use strict';
    this.mesh.position = this.position;
};

module.exports = Player;

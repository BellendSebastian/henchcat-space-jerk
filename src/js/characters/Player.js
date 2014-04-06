var BaseCharacter = require('./BaseCharacter');

Player.prototype = new BaseCharacter();
Player.prototype.contstructor = Player;

function Player () {
    'use strict';
    BaseCharacter.call(this);

    var geometry = new THREE.CubeGeometry(10, 10, 10);
    var material = new THREE.MeshPhongMaterial();
    this.mesh = new THREE.Mesh(geometry, material);
    this.currentVelocity = new THREE.Vector2(0, 0);
    this.position = new THREE.Vector2(0, 0);
    this.maxThrust = 5;
    this.minThrust = -5;
    this.thrustDecay = 0.2;
}

Player.prototype.addThrust = function (x, y) {
    'use strict';
    this.currentVelocity.x += x;
    this.currentVelocity.y += y;
};

Player.prototype.update = function () {
    'use strict';
    this.currentVelocity.x = (this.currentVelocity > 0)
        ? this.currentVelocity.x - this.thrustDecay
        : this.currentVelocity.x + this.thrustDecay;
    this.currentVelocity.y = (this.currentVelocity > 0)
        ? this.currentVelocity.y - this.trustDecay
        : this.currentVelocity.y + this.thrustDecay;
    this.position.x += this.currentVelocity;
    this.position.y += this.currentVelocity;
    this.mesh.position = this.position;
};

module.exports = Player;

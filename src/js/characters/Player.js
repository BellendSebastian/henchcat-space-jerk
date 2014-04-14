var BaseCharacter = require('./BaseCharacter');

Player.prototype = new BaseCharacter();
Player.prototype.contstructor = Player;

/**
 * Default player class.
 *
 * @class
 * @augments BaseCharacter
 * @param   {THREE.Scene} targetScene - The target scene where to send the mesh on load
 */
function Player (targetScene) {
    'use strict';
    BaseCharacter.call(this);

    this.hasLoaded = false;

    var texture = THREE.ImageUtils.loadTexture('obj/cat/cat_diff.png');

    var loader = new THREE.OBJLoader();
    var _this = this;
    loader.load('obj/cat/cat.obj', function (object) {

        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material.map = texture;
            }
        });

        object.scale = new THREE.Vector3(10, 10, 10);
        object.rotation.y = 90;
        object.castShadow = true;
        object.receiveShadow = true;
        _this.mesh = object;
        _this.hasLoaded = true;
        targetScene.add(_this.mesh);
    });
    this.position = new THREE.Vector3(0, 0, 30);
}

/**
 * Called each tick from the main game class
 *
 * @func
 */
Player.prototype.update = function () {
    'use strict';
    if (this.hasLoaded) {
        this.mesh.position = this.position;
    }
};

module.exports = Player;

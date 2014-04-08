var BaseCharacter = require('./BaseCharacter');

Player.prototype = new BaseCharacter();
Player.prototype.contstructor = Player;

function Player (targetScene) {
    'use strict';
    BaseCharacter.call(this);

    this.hasLoaded = false;

    /*
    var geometry = new THREE.CubeGeometry(10, 10, 10);
    var material = new THREE.MeshPhongMaterial();
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    */
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader();
    loader.load('obj/cat/cat_diff.tga', function (image) {
        texture.image = image;
        texture.needsUpdate = true;
    });

    var loader = new THREE.OBJLoader();
    var _this = this;
    loader.load('obj/cat/cat.obj', function (object) {
        /*
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material.map = texture;
            }
        });
        */
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

Player.prototype.update = function () {
    'use strict';
    if (this.hasLoaded) {
        this.mesh.position = this.position;
    }
};

module.exports = Player;

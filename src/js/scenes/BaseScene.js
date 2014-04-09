var Input = require('../core/Input');
var Player = require('../characters/Player');

function BaseScene() {
    'use strict';
    this.scene = new THREE.Scene();
    this.entities = [];
    this.input = new Input();
    this.player = new Player(this.scene);

    this.entities.push(this.player);

    // Basic ambient light
    var light = new THREE.AmbientLight(0x444444);
    this.scene.add(light);

    var diLight = new THREE.DirectionalLight(0x444444);
    diLight.position.set(55, 3, 405);
    this.scene.add(diLight);
}

BaseScene.prototype.getScene = function () {
    'use strict';
    return this.scene;
};

BaseScene.prototype.getEntities = function () {
    'use strict';
    return this.entities;
};

BaseScene.prototype.getInput = function () {
    'use strict';
    return this.input;
};

BaseScene.prototype.getPlayer = function () {
    'use strict';
    return this.player;
};

module.exports = BaseScene;

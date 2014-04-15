var Input = require('../core/Input');
var NavMesh = require('../navigation/NavMesh');

/**
 * Basic scene class with all the necessary guff.
 *
 * @class
 */
function BaseScene() {
    'use strict';
    this.scene = new THREE.Scene();
    this.entities = [];
    this.input = new Input();
    this.navMesh = new NavMesh();

    // Basic ambient light
    var light = new THREE.AmbientLight(0x444444);
    this.scene.add(light);

    var diLight = new THREE.DirectionalLight(0x444444);
    diLight.position.set(55, 3, 405);
    this.scene.add(diLight);
}

/**
 * Returns child scene.
 *
 * @return {THREE.Scene} scene
 */
BaseScene.prototype.getScene = function () {
    'use strict';
    return this.scene;
};

/**
 * Returns this scene's entities.
 *
 * @return {Array}
 */
BaseScene.prototype.getEntities = function () {
    'use strict';
    return this.entities;
};

/**
 * Returns this scene's input handler.
 *
 * @return {Input}
 */
BaseScene.prototype.getInput = function () {
    'use strict';
    return this.input;
};

/**
 * Returns this scene's player
 *
 * @return {Player}
 */
BaseScene.prototype.getPlayer = function () {
    'use strict';
    return this.player;
};

module.exports = BaseScene;

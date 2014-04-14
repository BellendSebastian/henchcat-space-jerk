var Renderer = require('./Renderer');
var Input = require('./Input');
var TestScene = require('../scenes/TestScene');
var Player = require('../characters/Player');
var BaseUILayer = require('../ui/BaseUILayer');

/**
 * Main game class, handles the looping and doing
 * of stuff. p much everything, really.
 *
 * @class
 */
function HCSJerk() {
    'use strict';

    // requestAnimationFrame polyfill
    window.requestAnimFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };

    this.currentScene = this.initScene(new TestScene());
    this.ui = new BaseUILayer();

    // Create the player so it persists through screens
    this.player = new Player(this.currentScene.getScene());
    this.currentScene.entities.push(this.player);

    this.listeners();
    this.loop();
}

/**
 * Initialise the current scene by grabbing it's
 * THREE.Scene, entity array and input handler,
 * then returns itself.
 *
 * @param {BaseScene} scene
 * @return {BaseScene}
 * @func
 */
HCSJerk.prototype.initScene = function (scene) {
    'use strict';
    this.input = scene.getInput();
    this.renderer = new Renderer(scene.getScene());
    this.entities = scene.getEntities();
    return scene;
};

/**
 * Initialise event listeners
 *
 * @func
 */
HCSJerk.prototype.listeners = function () {
    'use strict';

    document.addEventListener('keydown', this.input.keyDown.bind(this.input), false);
    document.addEventListener('keyup', this.input.keyUp.bind(this.input), false);
};

/**
 * The main game loop. Will loop back over itself using
 * requestAnimationFrame.
 *
 * @func
 */
HCSJerk.prototype.loop = function () {
    'use strict';
    this.update();
    this.render();
    window.requestAnimFrame(this.loop.bind(this));
};

/**
 * Update child entities and items each loop.
 *
 * @func
 */
HCSJerk.prototype.update = function () {
    'use strict';
    this.renderer.update();
    this.entities.forEach(function (item) {
        item.update();
    });
    this.input.handleInput(this.renderer.camera, this.currentScene.getPlayer());
};

/**
 * Render the current scene.
 *
 * @func
 */
HCSJerk.prototype.render = function () {
    'use strict';
    this.renderer.render();
    this.entities.forEach(function (item) {
        item.render();
    });
};

module.exports = HCSJerk;

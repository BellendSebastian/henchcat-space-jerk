var Renderer = require('./Renderer');
var Input = require('./Input');
var TestScene = require('../scenes/TestScene');
var Player = require('../characters/Player');
var BaseUILayer = require('../ui/BaseUILayer');
var Universe = require('../universe/Universe');

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

    this.universe = new Universe();

    this.currentScene = this.universe.getCurrentScene();
    this.renderer = new Renderer(this.currentScene.getScene());
    this.ui = new BaseUILayer();

    // Create the player so it persists through screens
    this.player = new Player(this.currentScene.getScene());
    this.currentScene.entities.push(this.player);

    this.listeners();
    this.loop();
}

/**
 * Initialise event listeners
 *
 * @func
 */
HCSJerk.prototype.listeners = function () {
    'use strict';

    document.addEventListener('keydown', this.currentScene.input.keyDown.bind(this.currentScene.input), false);
    document.addEventListener('keyup', this.currentScene.input.keyUp.bind(this.currentScene.input), false);
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
    this.currentScene.entities.forEach(function (item) {
        item.update();
    });
    this.currentScene.input.handleInput(this.renderer.camera, this.player);
};

/**
 * Render the current scene.
 *
 * @func
 */
HCSJerk.prototype.render = function () {
    'use strict';
    this.renderer.render();
    this.currentScene.entities.forEach(function (item) {
        item.render();
    });
};

module.exports = HCSJerk;

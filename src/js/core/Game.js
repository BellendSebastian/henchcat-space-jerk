var Renderer = require('./Renderer');
var Input = require('./Input');
var Planet = require('../entities/Planet');
var Player = require('../characters/Player');

function Game() {
    'use strict';

    // requestAnimationFrame polyfill
    window.requestAnimFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };

    this.renderer = new Renderer();
    this.input = new Input();
    this.entities = [];

    var testPlanet = new Planet();
    this.entities.push(testPlanet);
    this.renderer.scene.add(testPlanet.getMesh());

    this.player = new Player();
    this.entities.push(this.player);
    this.renderer.scene.add(this.player.getMesh());

    this.listeners();
    this.loop();
}

Game.prototype.listeners = function () {
    'use strict';

    document.addEventListener('keydown', this.input.keyDown.bind(this.input), false);
    document.addEventListener('keyup', this.input.keyUp.bind(this.input), false);
};

Game.prototype.loop = function () {
    'use strict';
    this.update();
    this.render();
    window.requestAnimFrame(this.loop.bind(this));
};

Game.prototype.update = function () {
    'use strict';
    this.renderer.update();
    this.entities.forEach(function (item) {
        item.update();
    });
    this.handleInput();
};

Game.prototype.render = function () {
    'use strict';
    this.renderer.render();
    this.entities.forEach(function (item) {
        item.render();
    });
};

Game.prototype.handleInput = function () {
    'use strict';
    if (this.input.isKeyPressed(39)) { // right arrow
        this.renderer.camera.position.x += 1;
    }
    if (this.input.isKeyPressed(37)) {
        this.renderer.camera.position.x -= 1;
    }
    if (this.input.isKeyPressed(38)) {
        this.renderer.camera.position.y += 1;
    }
    if (this.input.isKeyPressed(40)) {
        this.renderer.camera.position.y -= 1;
    }
};

module.exports = Game;

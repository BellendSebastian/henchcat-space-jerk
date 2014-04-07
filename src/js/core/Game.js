var Renderer = require('./Renderer');
var Input = require('./Input');
var Planet = require('../entities/Planet');
var Player = require('../characters/Player');
var Utils = require('../utils/Utils');

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

    var sound = new Audio('audio/engine.mp3');
    sound.volume = 0.4;
    sound.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    sound.play();

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
        console.log(Utils.distanceFromCentre(this.renderer.camera.position));
        if (Utils.distanceFromCentre(this.renderer.camera.position) < 100) {
            this.renderer.camera.position.x += 1;
        }
    }
    if (this.input.isKeyPressed(37)) {
        if (Utils.distanceFromCentre(this.renderer.camera.position) < 100) {
            this.renderer.camera.position.x -= 1;
        }
    }
    if (this.input.isKeyPressed(38)) {
        if (Utils.distanceFromCentre(this.renderer.camera.position) < 100) {
            this.renderer.camera.position.y += 1;
        }
    }
    if (this.input.isKeyPressed(40)) {
        if (Utils.distanceFromCentre(this.renderer.camera.position) < 100) {
            this.renderer.camera.position.y -= 1;
        }
    }
    if (this.input.isKeyPressed(187)) {
        if (this.renderer.camera.position.z > 50) {
            this.renderer.camera.position.z -= 1;
        }
    }
    if (this.input.isKeyPressed(189)) {
        if (this.renderer.camera.position.z < 400) {
            this.renderer.camera.position.z += 1;
        }
    }

    if (this.input.isKeyPressed(87)) {
        this.player.position.y += 1;
    }
    if (this.input.isKeyPressed(83)) {
        this.player.position.y -= 1;
    }
    if (this.input.isKeyPressed(65)) {
        this.player.position.x -= 1;
    }
    if (this.input.isKeyPressed(68)) {
        this.player.position.x += 1;
    }
};

module.exports = Game;

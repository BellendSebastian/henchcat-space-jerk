var BaseScene = require('./BaseScene');
var Planet = require('../entities/Planet');
var Player = require('../characters/Player');
var EnvironmentFactory = require('../utils/EnvironmentFactory');

TestScene.prototype = new BaseScene();
TestScene.prototype.constructor = TestScene;

function TestScene() {
    'use strict';
    BaseScene.call(this);

    this.scene = new THREE.Scene();
    this.entities = [];

    var testPlanet = new Planet();
    this.entities.push(testPlanet);
    this.scene.add(testPlanet.getMesh());

    this.player = new Player();
    this.entities.push(this.player);
    this.scene.add(this.player.getMesh());

    var sound = new Audio('audio/engine.mp3');
    sound.volume = 0.4;
    sound.addEventListener('ended', function () {
        sound.currentTime = 0;
        sound.play();
    }, false);
    sound.play();

    // Basic ambient light
    var light = new THREE.AmbientLight(0x444444);
    this.scene.add(light);
    var delight = new THREE.DirectionalLight(0x444444);
    delight.position.set(55, 3, 405);
    this.scene.add(delight);

    // Starfield
    this.scene.add(EnvironmentFactory.generateSkybox('img/starfield.jpg'));
    this.scene.add(EnvironmentFactory.generateStars(5000));
}

module.exports = TestScene;

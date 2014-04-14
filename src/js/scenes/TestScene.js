var BaseScene = require('./BaseScene');
var Planet = require('../entities/Planet');
var EnvironmentFactory = require('../utils/EnvironmentFactory');

TestScene.prototype = new BaseScene();
TestScene.prototype.constructor = TestScene;

/**
 * Test scene for playing around with mood
 * and stuff like that.
 *
 * @class
 * @augments BaseScene
 */
function TestScene() {
    'use strict';
    BaseScene.call(this);

    var testPlanet = new Planet(0.0004);
    this.entities.push(testPlanet);
    this.scene.add(testPlanet.getMesh());

    var sound = new Audio('audio/engine.mp3');
    sound.volume = 0.4;
    sound.addEventListener('ended', function () {
        sound.currentTime = 0;
        sound.play();
    }, false);
    sound.play();

    // Starfield
    this.scene.add(EnvironmentFactory.generateSkybox('img/starfield.jpg'));
    this.scene.add(EnvironmentFactory.generateStars(5000));
}

module.exports = TestScene;

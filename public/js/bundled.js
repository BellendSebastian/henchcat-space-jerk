(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function BaseCharacter() {
    this.mesh = null;
}

BaseCharacter.prototype.update = function () {

};

BaseCharacter.prototype.render = function () {

};

BaseCharacter.prototype.getMesh = function () {
    return this.mesh;
};

module.exports = BaseCharacter;

},{}],2:[function(require,module,exports){
var BaseCharacter = require('./BaseCharacter');

Player.prototype = new BaseCharacter();
Player.prototype.contstructor = Player;

function Player () {
    'use strict';
    BaseCharacter.call(this);

    var geometry = new THREE.CubeGeometry(10, 10, 10);
    var material = new THREE.MeshPhongMaterial();
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.currentVelocity = new THREE.Vector3(0, 0, 30);
    this.position = new THREE.Vector3(0, 0, 30);
    this.maxThrust = 5;
    this.minThrust = -5;
    this.thrustDecay = 0.2;
}

Player.prototype.addThrust = function (x, y) {
    'use strict';
    this.currentVelocity.x += x;
    this.currentVelocity.y += y;
};

Player.prototype.update = function () {
    'use strict';
    this.mesh.position = this.position;
    /*
    this.currentVelocity.x = (this.currentVelocity > 0)
        ? this.currentVelocity.x - this.thrustDecay
        : this.currentVelocity.x + this.thrustDecay;
    this.currentVelocity.y = (this.currentVelocity > 0)
        ? this.currentVelocity.y - this.trustDecay
        : this.currentVelocity.y + this.thrustDecay;
    this.position.x += this.currentVelocity;
    this.position.y += this.currentVelocity;
    this.mesh.position = this.position;
    */
};

module.exports = Player;

},{"./BaseCharacter":1}],3:[function(require,module,exports){
module.exports = {
    width: window.innerWidth,
    height: window.innerHeight
};

},{}],4:[function(require,module,exports){
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
        sound.currentTime = 0;
        sound.play();
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

},{"../characters/Player":2,"../entities/Planet":8,"../utils/Utils":10,"./Input":5,"./Renderer":6}],5:[function(require,module,exports){
function Input() {
    'use strict';
    this._keysDown = {};
}

Input.prototype.keyDown = function (event) {
    'use strict';
    this._keysDown[event.keyCode] = (new Date()).getTime();
};

Input.prototype.keyUp = function (event) {
    'use strict';
    this._keysDown[event.keyCode] = undefined;
};

Input.prototype.isKeyPressed = function (keyCode) {
    'use strict';
    return this._keysDown[keyCode] !== undefined;
};

module.exports = Input;

},{}],6:[function(require,module,exports){
var CONFIG = require('../config');

function Renderer() {
    'use strict';
    this.renderer = new THREE.WebGLRenderer({
        antialiasing: true,
        shadowMapEnabled: true,
        shadowMapSoft: true
    });
    this.renderer.setSize(CONFIG.width, CONFIG.height);
    document.body.appendChild(this.renderer.domElement);

    // Camera guff
    this.camera = new THREE.PerspectiveCamera(45, (CONFIG.width / CONFIG.height), 1, 3000);
    this.camera.position = new THREE.Vector3(0, 0, 100);
    this.cameraLight = new THREE.SpotLight(0xffffff);
    this.cameraLight.castShadow = true;
    this.cameraLight.position = this.camera.position;

    this.scene = new THREE.Scene();

    // Basic ambient light
    var light = new THREE.AmbientLight(0x444444);
    this.scene.add(light);
    var delight = new THREE.DirectionalLight(0x444444);
    delight.position.set(55, 3, 405);
    this.scene.add(delight);

    // Starfield
    var geometry = new THREE.CubeGeometry(2000, 2000, 2000);
    var material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('img/starfield.jpg'),
        side: THREE.BackSide
    });
    var starfield = new THREE.Mesh(geometry, material);
    starfield.position = new THREE.Vector3(0, 0, 0);
    this.camera.add(starfield);
    this.scene.add(starfield);

    var count = 5000;
    var particles = new THREE.Geometry();
    var pmat = new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 2,
        map: THREE.ImageUtils.loadTexture('img/particle-star.png'),
        transparent: true,
        blending: THREE.AdditiveBlending
    });

    for (var i = 0; i < count; i++) {
        var px = Math.random() * 1500 - 500;
        var py = Math.random() * 1500 - 500;
        var pz = Math.random() * 300 - 150;
        var particle = new THREE.Vector3(px, py, pz);
        particles.vertices.push(particle);
    }

    var particleSystem = new THREE.ParticleSystem(particles, pmat);

    this.scene.add(particleSystem);

    // Post processing
    this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));

    var rgbShader = new THREE.ShaderPass(THREE.RGBShiftShader);
    rgbShader.uniforms.amount.value = 0.0038;
    rgbShader.uniforms.angle.value = 4;
    this.composer.addPass(rgbShader);

    var filmShader = new THREE.ShaderPass(THREE.FilmShader);
    filmShader.uniforms.grayscale.value = 0;
    filmShader.uniforms.sCount.value = 1024;
    filmShader.uniforms.sIntensity.value = 0.2;
    this.composer.addPass(filmShader);

    var vignette = new THREE.ShaderPass(THREE.VignetteShader);
    vignette.uniforms.offset.value = 0.7;
    vignette.uniforms.darkness.value = 2.1;
    vignette.renderToScreen = true;
    this.composer.addPass(vignette);
}

Renderer.prototype.update = function () {
    'use strict';
    this.cameraLightPosition = this.camera.position;
};

Renderer.prototype.render = function () {
    'use strict';
    this.composer.render();
};

module.exports = Renderer;

},{"../config":3}],7:[function(require,module,exports){
function BaseEntity() {}

BaseEntity.prototype.update = function () {
    'use strict';
    this.mesh = null;
};

BaseEntity.prototype.render = function () {
    'use strict';
};

BaseEntity.prototype.getMesh = function () {
    'use strict';
    return this.mesh;
};

module.exports = BaseEntity;

},{}],8:[function(require,module,exports){
var BaseEntity = require('./BaseEntity');

Planet.prototype = new BaseEntity();
Planet.prototype.constructor = Planet;

function Planet() {
    'use strict';
    BaseEntity.call(this);

    var geometry = new THREE.SphereGeometry(50, 32, 32);
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/marsmap1k.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('img/marsbump1k.jpg'),
        bumpScale: 0.5,
        specularMap: THREE.ImageUtils.loadTexture('img/earthspec1k.jpg'),
        specular: new THREE.Color('grey')
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position = new THREE.Vector3(-40, 20, -45);
}

Planet.prototype.update = function () {
    'use strict';
    this.mesh.rotation.y += 0.0002;
};

module.exports = Planet;

},{"./BaseEntity":7}],9:[function(require,module,exports){
var Game = require('./core/Game');
window.g = new Game();

},{"./core/Game":4}],10:[function(require,module,exports){
module.exports = {
    'distanceFromCentre': function (vector) {
        'use strict';
        return Math.sqrt(Math.pow(0 - vector.x, 2) + Math.pow(0 - vector.y, 2));
    }
};

},{}]},{},[9])
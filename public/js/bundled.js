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
    this.currentVelocity = new THREE.Vector2(0, 0);
    this.position = new THREE.Vector2(0, 0);
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
    this.currentVelocity.x = (this.currentVelocity > 0)
        ? this.currentVelocity.x - this.thrustDecay
        : this.currentVelocity.x + this.thrustDecay;
    this.currentVelocity.y = (this.currentVelocity > 0)
        ? this.currentVelocity.y - this.trustDecay
        : this.currentVelocity.y + this.thrustDecay;
    this.position.x += this.currentVelocity;
    this.position.y += this.currentVelocity;
    this.mesh.position = this.position;
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

},{"../characters/Player":2,"../entities/Planet":8,"./Input":5,"./Renderer":6}],5:[function(require,module,exports){
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
        antialiasing: true
    });
    this.renderer.setSize(CONFIG.width, CONFIG.height);
    document.body.appendChild(this.renderer.domElement);

    // Camera guff
    this.camera = new THREE.PerspectiveCamera(45, (CONFIG.width / CONFIG.height), 1, 3000);
    this.camera.position = new THREE.Vector3(0, 0, 100);
    this.cameraLight = new THREE.PointLight(0xffffff);
    this.cameraLight.position = this.camera.position;

    this.scene = new THREE.Scene();

    // Basic ambient light
    var light = new THREE.AmbientLight(0x444444);
    this.scene.add(light);
    var delight = new THREE.DirectionalLight(0x444444);
    delight.position.set(55, 3, 405);
    this.scene.add(delight);

    // Starfield
    var geometry = new THREE.SphereGeometry(1000, 32, 32);
    var material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('img/starfield.jpg'),
        side: THREE.BackSide
    });
    var starfield = new THREE.Mesh(geometry, material);
    starfield.position = new THREE.Vector3(0, 0, 0);
    this.scene.add(starfield);

    var count = 2500;
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

    var effect = new THREE.ShaderPass(THREE.VignetteShader);
    effect.uniforms['offset'].value = 0.7;
    effect.uniforms['darkness'].value = 2.1;
    effect.renderToScreen = true;

    this.composer.addPass(effect);
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
    this.mesh.position = new THREE.Vector3(-40, 20, -45);

    var cloudGeometry = new THREE.SphereGeometry(54.5, 32, 32);
    var cloudMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/earthcloudmap.jpg'),
        side: THREE.DoubleSide,
        opacity: 0.8,
        transparent: true,
        depthWrite: false
    });

    this.cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    //this.mesh.add(this.cloudMesh);
}

Planet.prototype.update = function () {
    'use strict';
    this.cloudMesh.rotation.y += 0.001;
    this.mesh.rotation.y += 0.0001;
};

module.exports = Planet;

},{"./BaseEntity":7}],9:[function(require,module,exports){
var Game = require('./core/Game');
window.g = new Game();

},{"./core/Game":4}]},{},[9])
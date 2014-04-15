(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Base character class for extension
 * with other character classes.
 *
 * @class
 */
function BaseCharacter() {
    'use strict';
    this.mesh = null;
}

/**
 * Updates the character each tick
 *
 * @func
 */
BaseCharacter.prototype.update = function () {

};

/**
 * Other things to do on render.
 *
 * Most of the rendering happens in the renderer
 * as opposed to each of the scene's children,
 * but this is just incase you need to do more
 * guff.
 *
 * @func
 */
BaseCharacter.prototype.render = function () {

};

/**
 * Returns the character's mesh
 *
 * @return  {THREE.Mesh} mesh
 */
BaseCharacter.prototype.getMesh = function () {
    'use strict';
    return this.mesh;
};

module.exports = BaseCharacter;

},{}],2:[function(require,module,exports){
var BaseCharacter = require('./BaseCharacter');
var ShipFactory = require('../utils/ShipFactory');

Player.prototype = new BaseCharacter();
Player.prototype.contstructor = Player;

/**
 * Default player class.
 *
 * @class
 * @augments BaseCharacter
 * @param   {THREE.Scene} targetScene - The target scene where to send the mesh on load
 */
function Player (targetScene) {
    'use strict';
    BaseCharacter.call(this);

    this.ship = ShipFactory.generateTestShip();

    this.hasLoaded = false;

    var texture = THREE.ImageUtils.loadTexture('obj/cat/cat_diff.png');

    var loader = new THREE.OBJLoader();
    var _this = this;
    loader.load('obj/cat/cat.obj', function (object) {

        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material.map = texture;
            }
        });

        object.scale = new THREE.Vector3(10, 10, 10);
        object.rotation.y = 90;
        object.castShadow = true;
        object.receiveShadow = true;
        _this.mesh = object;
        _this.hasLoaded = true;
        targetScene.add(_this.mesh);
    });
    this.location = new THREE.Vector2(0, 0);
    this.position = new THREE.Vector3(0, 0, 30);
}

/**
 * Change the location coordinates of the player;
 *
 * @param {THREE.Vector2} vector
 * @return {Player}
 */
Player.prototype.changeLocation = function (vector) {
    'use strict';
    this.location = vector;
    return this;
};

/**
 * Called each tick from the main game class
 *
 * @func
 */
Player.prototype.update = function () {
    'use strict';
    if (this.hasLoaded) {
        this.mesh.position = this.position;
    }
};

module.exports = Player;

},{"../utils/ShipFactory":22,"./BaseCharacter":1}],3:[function(require,module,exports){
module.exports = {
    width: window.innerWidth,
    height: window.innerHeight,
    sectorWidth: 750,
    sectorHeight: 750
};

},{}],4:[function(require,module,exports){
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
    this.ui.update(this.player, this.renderer.camera);
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
    this.ui.render(this.player);
};

module.exports = HCSJerk;

},{"../characters/Player":2,"../scenes/TestScene":12,"../ui/BaseUILayer":18,"../universe/Universe":20,"./Input":5,"./Renderer":6}],5:[function(require,module,exports){
var CONFIG = require('../config');

/**
 * Input handler. Stored on a per scene / screen
 * basis so you can easily override the rules and
 * have different behaviour for each screen.
 *
 * @class
 */
function Input() {
    'use strict';
    this._keysDown = {};
}

/**
 * Adds the pressed key to the _keysDown
 * object for lookup using IsKeysPressed.
 *
 * @param {Event} event
 * @return
 */
Input.prototype.keyDown = function (event) {
    'use strict';
    this._keysDown[event.keyCode] = (new Date()).getTime();
};

/**
 * Clears the released key from the _keysDown object.
 *
 * @param {Event} event
 * @func
 */
Input.prototype.keyUp = function (event) {
    'use strict';
    this._keysDown[event.keyCode] = undefined;
};

/**
 * Returns a boolean whether the supplied keyCode
 * is pressed or not.
 *
 * @param {Number} keyCode
 * @return {Boolean}
 */
Input.prototype.isKeyPressed = function (keyCode) {
    'use strict';
    return this._keysDown[keyCode] !== undefined;
};

/**
 * Hardcoded input handling for test scene,
 * should be overridden, really.
 *
 * @param {THREE.PerspectiveCamera} camera
 * @param {Player} player
 */
Input.prototype.handleInput = function (camera, player) {
    'use strict';
    if (this.isKeyPressed(39)) { // right arrow
        if (camera.position.x < CONFIG.sectorWidth) {
            camera.position.x += 1;
        }
    }
    if (this.isKeyPressed(37)) {
        if (camera.position.x > -CONFIG.sectorWidth) {
            camera.position.x -= 1;
        }
    }
    if (this.isKeyPressed(38)) {
        if (camera.position.y < CONFIG.sectorHeight) {
            camera.position.y += 1;
        }
    }
    if (this.isKeyPressed(40)) {
        if (camera.position.y > -CONFIG.sectorHeight) {
            camera.position.y -= 1;
        }
    }
    if (this.isKeyPressed(187)) {
        if (camera.position.z > 50) {
            camera.position.z -= 2;
        }
    }
    if (this.isKeyPressed(189)) {
        if (camera.position.z < 400) {
            camera.position.z += 2;
        }
    }

    if (this.isKeyPressed(87)) {
        player.position.y += 1;
    }
    if (this.isKeyPressed(83)) {
        player.position.y -= 1;
    }
    if (this.isKeyPressed(65)) {
        player.position.x -= 1;
    }
    if (this.isKeyPressed(68)) {
        player.position.x += 1;
    }
};

module.exports = Input;

},{"../config":3}],6:[function(require,module,exports){
var CONFIG = require('../config');

/**
 * Renderer class. Accepts a THREE.Scene (optional)
 * and handles creating generic lights and cameras.
 *
 * No scene data will be played with here, however,
 * that should be stored in separate scene classes
 * and provided to the Renderer on instantiation or
 * using the changeScene method.
 *
 * @class
 * @param {THREE.Scene} scene
 */
function Renderer(scene) {
    'use strict';
    this.renderer = new THREE.WebGLRenderer({
        antialiasing: true,
        shadowMapEnabled: true,
        shadowMapSoft: true
    });
    this.renderer.setSize(CONFIG.width, CONFIG.height);
    document.body.appendChild(this.renderer.domElement);
    this.renderer.domElement.id = 'hcsj-viewport';

    // Camera guff
    this.camera = new THREE.PerspectiveCamera(45, (CONFIG.width / CONFIG.height), 1, 20000);
    this.camera.position = new THREE.Vector3(0, 0, 100);
    this.cameraLight = new THREE.SpotLight(0xffffff);
    this.cameraLight.castShadow = true;
    this.cameraLight.position = this.camera.position;
    this.scene = scene !== undefined ? scene : new THREE.Scene();

    // Post processing
    this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));

    this.addShaders();
}

/**
 * Changes the current scene to the one supplied.
 *
 * @param {THREE.Scene} scene - The scene to change to
 */
Renderer.prototype.changeScene = function (scene) {
    'use strict';
    this.scene = scene;
};

/**
 * Applies post-processing shaders to the composer.
 *
 * @func
 */
Renderer.prototype.addShaders = function () {
    'use strict';

    // RGB Offset shader
    var rgbShader = new THREE.ShaderPass(THREE.RGBShiftShader);
    rgbShader.uniforms.amount.value = 0.004;
    rgbShader.uniforms.angle.value = 4;
    this.composer.addPass(rgbShader);

    // Film scanlines shader
    var filmShader = new THREE.ShaderPass(THREE.FilmShader);
    filmShader.uniforms.grayscale.value = 0;
    filmShader.uniforms.sCount.value = 1024;
    filmShader.uniforms.sIntensity.value = 0.2;
    this.composer.addPass(filmShader);

    // Vignette shader, leave til last
    var vignette = new THREE.ShaderPass(THREE.VignetteShader);
    vignette.uniforms.offset.value = 0.7;
    vignette.uniforms.darkness.value = 2.1;
    vignette.renderToScreen = true;
    this.composer.addPass(vignette);
};

/**
 * Updates the class each tick
 *
 * @func
 */
Renderer.prototype.update = function () {
    'use strict';
    this.cameraLightPosition = this.camera.position;
};

/**
 * On next animation frame, calls for the composer
 * to render.
 *
 * @func
 */
Renderer.prototype.render = function () {
    'use strict';
    this.composer.render();
};

module.exports = Renderer;

},{"../config":3}],7:[function(require,module,exports){
/**
 * Basic entity class for extension.
 *
 * @class
 */
function BaseEntity() {
    'use strict';
    this.mesh = null;
    this.resources = [];
}

/**
 * Update the object each tick.
 *
 * @func
 */
BaseEntity.prototype.update = function () {
    'use strict';
};

/**
 * Anything necessary in the render pass.
 *
 * @func
 */
BaseEntity.prototype.render = function () {
    'use strict';
};

/**
 * Returns the current entity's mesh.
 *
 * @return {THREE.Mesh} mesh
 */
BaseEntity.prototype.getMesh = function () {
    'use strict';
    return this.mesh;
};

module.exports = BaseEntity;

},{}],8:[function(require,module,exports){
var BaseEntity = require('./BaseEntity');
var MacGuffinite = require('../tradables/MacGuffinite');

Planet.prototype = new BaseEntity();
Planet.prototype.constructor = Planet;

/**
 * Test planet class.
 *
 * @class
 * @augments {BaseEntity}
 */
function Planet(rotSpeed) {
    'use strict';
    BaseEntity.call(this);

    //this.resources.push(new MacGuffinite(300));

    this.speed = rotSpeed;

    var geometry = new THREE.SphereGeometry(50, 32, 32);
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/marsmap1k.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('img/marsbump1k.jpg'),
        bumpScale: 1,
        specularMap: THREE.ImageUtils.loadTexture('img/earthspec1k.jpg'),
        specular: new THREE.Color('grey')
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position = new THREE.Vector3(-40, 20, -45);
}

/**
 * Update the planet's properties each tick.
 *
 * @func
 */
Planet.prototype.update = function () {
    'use strict';
    this.mesh.rotation.y += this.speed;
};

module.exports = Planet;

},{"../tradables/MacGuffinite":17,"./BaseEntity":7}],9:[function(require,module,exports){
var HCSJerk = require('./core/HCSJerk');
window.HCSJerk = new HCSJerk();

},{"./core/HCSJerk":4}],10:[function(require,module,exports){
var CONFIG = require('../config');

function NavMesh() {
    'use strict';
    this.grid = [];
    for (var y = 0; y < CONFIG.sectorHeight / 10; y++) {
        this.grid[y] = [];
        for (var x = 0; x < CONFIG.sectorWidth / 10; x++) {
            this.grid[y][x] = y * x;
        }
    }
}

module.exports = NavMesh;

},{"../config":3}],11:[function(require,module,exports){
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

},{"../core/Input":5,"../navigation/NavMesh":10}],12:[function(require,module,exports){
var BaseScene = require('./BaseScene');
var Planet = require('../entities/Planet');
var EnvironmentFactory = require('../utils/EnvironmentFactory');
var Input = require('../core/Input');

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
    this.input = new Input();

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

},{"../core/Input":5,"../entities/Planet":8,"../utils/EnvironmentFactory":21,"./BaseScene":11}],13:[function(require,module,exports){
function Hull() {
    'use strict';
    this.strength = 100;
    this.maxStrength = 100;
}

module.exports = Hull;

},{}],14:[function(require,module,exports){
function Shield() {
    'use strict';
    this.strength = 200;
    this.maxStrength = 200;
}

module.exports = Shield;

},{}],15:[function(require,module,exports){
function Ship(name, hull, shield) {
    'use strict';
    this.name = name;
    this.hull = hull;
    this.shield = shield;
}

module.exports = Ship;

},{}],16:[function(require,module,exports){
function BaseTradable() {
    'use strict';
    this.quantity = 0;
}

BaseTradable.prototype.setQuantity = function (amount) {
    'use strict';
    this.quantity = amount;
    return this;
};

BaseTradable.prototype.getQuantity = function () {
    'use strict';
    return this.quantity;
};

module.exports = BaseTradable;

},{}],17:[function(require,module,exports){
var BaseTradable = require('./BaseTradable');

MacGuffinite.prototype = new BaseTradable();
MacGuffinite.prototype.constructor = MacGuffinite;

function MacGuffinite(quantity) {
    'use strict';
    BaseTradable.call(this);
    this.quantity = quantity;
}

module.exports = MacGuffinite;

},{"./BaseTradable":16}],18:[function(require,module,exports){
var CONFIG = require('../config');

/**
 * The base UI layer. Can be extended
 * to create extra layers ontop.
 *
 * @class
 */
function BaseUILayer() {
    'use strict';
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.canvas.width = CONFIG.width;
    this.canvas.height = CONFIG.height;
    this.canvas.id = 'hcsj-ui';
    this.context = this.canvas.getContext('2d');
    this.debugText = [];
}

BaseUILayer.prototype.update = function (player, camera) {
    'use strict';
    this.debugText = [];
    this.debugText.push('Debug');
    this.debugText.push('=====');
    this.debugText.push('Ship: ' + player.ship.name);
    this.debugText.push('- Hull: ' + player.ship.hull.strength + ' / ' + player.ship.hull.maxStrength);
    this.debugText.push('- Shield: ' + player.ship.shield.strength + ' / ' + player.ship.shield.maxStrength);
    this.debugText.push('- x: ' + player.position.x + ' y: ' + player.position.y);
    this.debugText.push('Camera:');
    this.debugText.push('- x: ' + camera.position.x + ' y: ' + camera.position.y + ' z: ' + camera.position.z);
};

BaseUILayer.prototype.render = function (player) {
    'use strict';
    this.canvas.width = this.canvas.width;
    this.context.fillStyle = '#ffffff';

    var currentPos = 21;
    var _this = this;
    this.debugText.forEach(function (line) {
        _this.context.fillText(line, 11, currentPos);
        currentPos += 20;
    });
};

module.exports = BaseUILayer;

},{"../config":3}],19:[function(require,module,exports){
var TestScene = require('../scenes/TestScene');

/**
 * A sector of space, can contain multiple planets
 * or what have you, all contained in it's child scene.
 *
 * @class
 */
function Sector() {
    'use strict';
    this.scene = new TestScene();
}

/**
 * Returns the sector's scene;
 *
 * @return {BaseScene}
 */
Sector.prototype.getScene = function () {
    'use strict';
    return this.scene;
};

module.exports = Sector;

},{"../scenes/TestScene":12}],20:[function(require,module,exports){
var UniverseFactory = require('../utils/UniverseFactory');

/**
 * Universe contains multiple sectors and will
 * handle the map of all of the sectors;
 *
 * @class
 */
function Universe() {
    'use strict';
    this.sectors = UniverseFactory.generateSectors(1);
    // TODO: Obviously this is just the first sector
    // in a normal array, this needs to change.
    this.currentSector = this.sectors[0];
}

/**
 * Returns the scene from the current sector.
 *
 * @return  {BaseScene}
 */
Universe.prototype.getCurrentScene = function () {
    'use strict';
    return this.currentSector.getScene();
};

module.exports = Universe;

},{"../utils/UniverseFactory":23}],21:[function(require,module,exports){
/**
 * Singleton factory class
 *
 * @name EnvironmentFactory
 * @class
 */
module.exports = {
    /**
     * Generates a skybox with lighting.
     *
     * @func
     * @param {String} texturePath
     * @return {THREE.Mesh}
     */
    'generateSkybox': function (texturePath) {
        'use strict';
        var geometry = new THREE.CubeGeometry(2000, 2000, 2000);

        var material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(texturePath),
            side: THREE.BackSide
        });

        var starfield = new THREE.Mesh(geometry, material);
        starfield.position = new THREE.Vector3(0, 0, 0);
        return starfield;
    },

    /**
     * Generates a particle system for stars / debris
     *
     * @func
     * @param {Number} count - How many particles to generate
     * @return {THREE.ParticleSystem}
     */
    'generateStars': function (count) {
        'use strict';
        var particles = new THREE.Geometry();
        var pmat = new THREE.ParticleBasicMaterial({
            color: 0xFFFFFF,
            size: 2,
            map: THREE.ImageUtils.loadTexture('img/particle-star.png'),
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        for (var i = 0; i < count; i++) {
            var px = Math.random() * 1500 - 750;
            var py = Math.random() * 1500 - 750;
            var pz = Math.random() * 300 - 150;
            var particle = new THREE.Vector3(px, py, pz);
            particles.vertices.push(particle);
        }

        return new THREE.ParticleSystem(particles, pmat);
    }
};

},{}],22:[function(require,module,exports){
var Ship = require('../ship/Ship');
var Hull = require('../ship/Hull');
var Shield = require('../ship/Shield');

module.exports = {
    'generateTestShip': function () {
        'use strict';
        return new Ship('Test Ship', new Hull(), new Shield());
    }
};

},{"../ship/Hull":13,"../ship/Shield":14,"../ship/Ship":15}],23:[function(require,module,exports){
var Sector = require('../universe/Sector');

/**
 * Factory class to generate sectors or
 * child areas for the universe.
 *
 * @class
 * @name UniverseFactory
 */
module.exports = {
    /**
     * Generates random sectors, at the moment
     * just one of them.
     *
     * @func
     * @return {Sector|Array}
     */
    'generateSectors': function () {
        'use strict';
        var sectors = [];
        for (var i = 0; i < 1; i++) {
            sectors.push(new Sector());
        }
        return sectors;
    }
};

},{"../universe/Sector":19}]},{},[9])
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

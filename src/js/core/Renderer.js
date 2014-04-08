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

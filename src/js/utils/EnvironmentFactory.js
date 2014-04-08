module.exports = {
    'generateSkybox': function () {
        'use strict';
        var geometry = new THREE.CubeGeometry(2000, 2000, 2000);
        var material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('img/starfield.jpg'),
            side: THREE.BackSide
        });
        var starfield = new THREE.Mesh(geometry, material);
        starfield.position = new THREE.Vector3(0, 0, 0);
        return starfield;
    },
    'generateStars': function () {
        'use strict';
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

        return new THREE.ParticleSystem(particles, pmat);
    }
}

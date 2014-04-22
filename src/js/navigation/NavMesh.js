var CONFIG = require('../config');

function NavMesh(renderer) {
    'use strict';
    this.grid = [];
    this.meshSize = 75;
    for (var y = 0; y < CONFIG.sectorHeight / this.meshSize * 2; y++) {
        this.grid[y] = [];
        for (var x = 0; x < CONFIG.sectorWidth / this.meshSize * 2; x++) {
            this.grid[y][x] = y * x;
        }
    }
    this.projector = new THREE.Projector();
    this.renderer = renderer;
    document.addEventListener('mousedown', this.mouseDown.bind(this), false);
    this.initGrid();
}

NavMesh.prototype.mouseDown = function (e) {
    'use strict';
    e.preventDefault();
    var vector = new THREE.Vector3((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1, 0.5);
    this.projector.unprojectVector(vector, this.renderer.camera);
    var caster = new THREE.Raycaster(this.renderer.camera.position, vector.sub(this.renderer.camera.position).normalize());
    var intersects = caster.intersectObjects(this.renderer.scene.children);
    if (intersects.length > 0) {
        intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
    }
};

NavMesh.prototype.initGrid = function () {
    'use strict';
    for (var y = 0; y < this.grid.length; y++) {
        for (var x = 0; x < this.grid[0].length; x++) {
            var plane = new THREE.Mesh(new THREE.PlaneGeometry(this.meshSize, this.meshSize), new THREE.MeshBasicMaterial());
            plane.position = new THREE.Vector3((x * this.meshSize) - CONFIG.sectorWidth, (y * this.meshSize) - CONFIG.sectorHeight, -20);
            this.renderer.scene.add(plane);
        }
    }
};

module.exports = NavMesh;

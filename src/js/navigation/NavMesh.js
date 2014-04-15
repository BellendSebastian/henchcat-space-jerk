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

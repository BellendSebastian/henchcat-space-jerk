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
}

module.exports = BaseUILayer;

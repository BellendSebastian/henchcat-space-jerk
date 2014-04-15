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

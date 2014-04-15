var TestScene = require('../scenes/TestScene');

/**
 * A sector of space, can contain multiple planets
 * or what have you, all contained in it's child scene.
 *
 * @class
 */
function Sector () {
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

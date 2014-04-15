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

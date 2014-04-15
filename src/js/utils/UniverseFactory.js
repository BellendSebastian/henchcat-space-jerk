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

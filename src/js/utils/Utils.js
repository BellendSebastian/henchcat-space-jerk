/**
 * Utils - general utility stuff.
 *
 * @class
 * @name Utils
 */
module.exports = {
    /**
     * Calculates the distance of a vector from 0.0
     *
     * @param {THREE.Vector2} vector
     * @return {Number} distance
     */
    'distanceFromCentre': function (vector) {
        'use strict';
        return Math.sqrt(Math.pow(0 - vector.x, 2) + Math.pow(0 - vector.y, 2));
    }
};

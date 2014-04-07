module.exports = {
    'distanceFromCentre': function (vector) {
        'use strict';
        return Math.sqrt(Math.pow(0 - vector.x, 2) + Math.pow(0 - vector.y, 2));
    }
};

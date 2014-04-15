var Ship = require('../ship/Ship');
var Hull = require('../ship/Hull');
var Shield = require('../ship/Shield');

module.exports = {
    'generateTestShip': function () {
        'use strict';
        return new Ship('Test Ship', new Hull(), new Shield());
    }
};

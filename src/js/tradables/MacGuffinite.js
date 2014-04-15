var BaseTradable = require('./BaseTradable');

MacGuffinite.prototype = new BaseTradable();
MacGuffinite.prototype.constructor = MacGuffinite;

function MacGuffinite(quantity) {
    'use strict';
    BaseTradable.call(this);
    this.quantity = quantity;
}

module.exports = MacGuffinite;

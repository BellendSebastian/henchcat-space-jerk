function BaseTradable () {
    'use strict';
    this.quantity = 0;
}

BaseTradable.prototype.setQuantity = function (amount) {
    'use strict';
    this.quantity = amount;
    return this;
};

BaseTradable.prototype.getQuantity = function () {
    'use strict';
    return this.quantity;
};

module.exports = BaseTradable;

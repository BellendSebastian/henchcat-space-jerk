function BaseEntity() {}

BaseEntity.prototype.update = function () {
    'use strict';
    this.mesh = null;
};

BaseEntity.prototype.render = function () {
    'use strict';
};

BaseEntity.prototype.getMesh = function () {
    'use strict';
    return this.mesh;
};

module.exports = BaseEntity;

/**
 * Basic entity class for extension.
 *
 * @class
 */
function BaseEntity() {
    'use strict';
    this.mesh = null;
    this.resources = [];
}

/**
 * Update the object each tick.
 *
 * @func
 */
BaseEntity.prototype.update = function () {
    'use strict';
};

/**
 * Anything necessary in the render pass.
 *
 * @func
 */
BaseEntity.prototype.render = function () {
    'use strict';
};

/**
 * Returns the current entity's mesh.
 *
 * @return {THREE.Mesh} mesh
 */
BaseEntity.prototype.getMesh = function () {
    'use strict';
    return this.mesh;
};

module.exports = BaseEntity;

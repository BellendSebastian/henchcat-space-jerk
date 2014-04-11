/**
 * Base character class for extension
 * with other character classes.
 *
 * @class
 */
function BaseCharacter() {
    'use strict';
    this.mesh = null;
}

/**
 * Updates the character each tick
 *
 * @func
 */
BaseCharacter.prototype.update = function () {

};

/**
 * Other things to do on render.
 *
 * Most of the rendering happens in the renderer
 * as opposed to each of the scene's children,
 * but this is just incase you need to do more
 * guff.
 *
 * @func
 */
BaseCharacter.prototype.render = function () {

};

/**
 * Returns the character's mesh
 *
 * @return  {THREE.Mesh} mesh
 */
BaseCharacter.prototype.getMesh = function () {
    'use strict';
    return this.mesh;
};

module.exports = BaseCharacter;

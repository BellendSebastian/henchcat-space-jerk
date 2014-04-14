/**
 * Input handler. Stored on a per scene / screen
 * basis so you can easily override the rules and
 * have different behaviour for each screen.
 *
 * @class
 */
function Input() {
    'use strict';
    this._keysDown = {};
}

/**
 * Adds the pressed key to the _keysDown
 * object for lookup using IsKeysPressed.
 *
 * @param {Event} event
 * @return
 */
Input.prototype.keyDown = function (event) {
    'use strict';
    this._keysDown[event.keyCode] = (new Date()).getTime();
};

/**
 * Clears the released key from the _keysDown object.
 *
 * @param {Event} event
 * @func
 */
Input.prototype.keyUp = function (event) {
    'use strict';
    this._keysDown[event.keyCode] = undefined;
};

/**
 * Returns a boolean whether the supplied keyCode
 * is pressed or not.
 *
 * @param {Number} keyCode
 * @return {Boolean}
 */
Input.prototype.isKeyPressed = function (keyCode) {
    'use strict';
    return this._keysDown[keyCode] !== undefined;
};

/**
 * Hardcoded input handling for test scene,
 * should be overridden, really.
 *
 * @param {THREE.PerspectiveCamera} camera
 * @param {Player} player
 */
Input.prototype.handleInput = function (camera, player) {
    'use strict';
    if (this.isKeyPressed(39)) { // right arrow
        if (camera.position.x < 750) {
            camera.position.x += 1;
        }
    }
    if (this.isKeyPressed(37)) {
        if (camera.position.x > -750) {
            camera.position.x -= 1;
        }
    }
    if (this.isKeyPressed(38)) {
        if (camera.position.y < 750) {
            camera.position.y += 1;
        }
    }
    if (this.isKeyPressed(40)) {
        if (camera.position.y > -750) {
            camera.position.y -= 1;
        }
    }
    if (this.isKeyPressed(187)) {
        if (camera.position.z > 50) {
            camera.position.z -= 2;
        }
    }
    if (this.isKeyPressed(189)) {
        if (camera.position.z < 400) {
            camera.position.z += 2;
        }
    }

    if (this.isKeyPressed(87)) {
        player.position.y += 1;
    }
    if (this.isKeyPressed(83)) {
        player.position.y -= 1;
    }
    if (this.isKeyPressed(65)) {
        player.position.x -= 1;
    }
    if (this.isKeyPressed(68)) {
        player.position.x += 1;
    }
};

module.exports = Input;

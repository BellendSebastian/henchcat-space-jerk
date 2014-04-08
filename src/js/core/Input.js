function Input() {
    'use strict';
    this._keysDown = {};
}

Input.prototype.keyDown = function (event) {
    'use strict';
    this._keysDown[event.keyCode] = (new Date()).getTime();
};

Input.prototype.keyUp = function (event) {
    'use strict';
    this._keysDown[event.keyCode] = undefined;
};

Input.prototype.isKeyPressed = function (keyCode) {
    'use strict';
    return this._keysDown[keyCode] !== undefined;
};

// Hardcoded stuff for testing,
// can be overridden to do custom
// inputs for menus or whatnot.
Input.prototype.handleInput = function (camera, player) {
    'use strict';
    if (this.isKeyPressed(39)) { // right arrow
        camera.position.x += 1;
    }
    if (this.isKeyPressed(37)) {
        camera.position.x -= 1;
    }
    if (this.isKeyPressed(38)) {
        camera.position.y += 1;
    }
    if (this.isKeyPressed(40)) {
        camera.position.y -= 1;
    }
    if (this.isKeyPressed(187)) {
        if (camera.position.z > 50) {
            camera.position.z -= 1;
        }
    }
    if (this.isKeyPressed(189)) {
        if (camera.position.z < 400) {
            camera.position.z += 1;
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

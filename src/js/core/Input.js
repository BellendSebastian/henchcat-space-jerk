function Input() {
    'use strict';
    this._keysDown = {};
}

Input.prototype.keyDown = function (event) {
    'use strict';
    console.log(event);
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

module.exports = Input;

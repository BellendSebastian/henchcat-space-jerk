function Input() {
    'use strict';
    this.keysDown = [];
}

Input.prototype.keyDown = function (event) {
    'use strict';
    console.log(event);
    this.keysDown[event.keyCode] = true;
};

Input.prototype.keyUp = function (event) {
    'use strict';
    this.keysDown[event.keyCode] = false;
};

Input.prototype.isKeyPressed = function (keyCode) {
    'use strict';
    return this.keysDown[keyCode] === true;
};

module.exports = Input;

var Input = require('../core/Input');

function BaseScene() {
    'use strict';
    this.scene = new THREE.Scene();
    this.entities = [];
    this.input = new Input();
    this.player = null;
}

BaseScene.prototype.getScene = function () {
    'use strict';
    return this.scene;
};

BaseScene.prototype.getEntities = function () {
    'use strict';
    return this.entities;
};

BaseScene.prototype.getInput = function () {
    'use strict';
    return this.input;
};

BaseScene.prototype.getPlayer = function () {
    'use strict';
    return this.player;
};

module.exports = BaseScene;

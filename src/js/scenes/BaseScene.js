function BaseScene() {
    'use strict';
    this.scene = new THREE.Scene();
    this.entities = [];
}

BaseScene.prototype.getScene = function () {
    'use strict';
    return this.scene;
};

BaseScene.prototype.getEntities = function () {
    'use strict';
    return this.entities;
};

module.exports = BaseScene;

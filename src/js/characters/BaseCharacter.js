function BaseCharacter() {
    this.mesh = null;
}

BaseCharacter.prototype.update = function () {

};

BaseCharacter.prototype.render = function () {

};

BaseCharacter.prototype.getMesh = function () {
    return this.mesh;
};

module.exports = BaseCharacter;

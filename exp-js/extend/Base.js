function Base(opt) {
    this.name = opt.name || 'yc';
    this.age = opt.age || '26';
    if (this.constructor === Base) {
        return;
    }
    this.init();
    console.log(this.getAge());
}
Base.prototype.init = function() {
    console.log('init');
}

Base.prototype.getName = function() {
    return this.name;
}

Base.prototype.getAge = function() {
    return this.age;
}

Base.prototype.setAge = function(age) {
    this.age = age
}

Base.prototype.setname = function(name) {
    this.name = name
}

Base.extend = function(opts) {
    var F = function(opts) {
        for (var key in opts) {
            this[key] = opts[key];
        }
        Base.call(this, opts);
    };
    F.prototype = new Base(opts);
    F.prototype.constructor = F;
    return F;
}

module.exports = Base;
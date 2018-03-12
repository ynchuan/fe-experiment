function extend(Base, obj) {
    var RetFun = function(opt) {
        Base.call(this, opt);
    };
    RetFun.prototype = Object.assign(Object.create(Base.prototype), obj);
    return RetFun;

}

var BaseFn = function(opt) {
    this.opt = opt;
    this.p = 'base p';
};

BaseFn.prototype.bha = function(p) {
    console.log('bha', this.p);
};

BaseFn.extend = extend;

var SubFn = extend(BaseFn, {
    p: 'sub p',
    fha: function() {
        console.log('fha', this.p);
    }
});

var subFn = new SubFn({});
subFn.bha();
subFn.fha();
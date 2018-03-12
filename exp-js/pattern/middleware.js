var MidWare = function() {
    this.cache = [];
    this.options = {}
}

MidWare.prototype.use = function(fn) {
    if (typeof fn !== 'function') {
        console.log('need a function');
        return false;
    }
    this.cache.push(fn);
    return this;
}

MidWare.prototype.next = function(argument) {
    if (this.midwares && this.midwares.length > 0) {
        var ware = this.midwares.shift();
        ware.call(this, this.options || {}, this.next.bind(this))
    }
};

MidWare.prototype.handleRequest = function(options) {
    this.midwares = this.cache.map(function(fn) {
        return fn;
    });
    this.options = options; //缓存数据
    this.next();
}

var submitForm = new MidWare();

//验证
submitForm.use(function(options, next) {
    console.log('验证数据');
    next();
})

//上报
submitForm.use(function(options, next) {
    setTimeout(function() {
        console.log('上报数据');
        next();
    }, 3000)

})

//提交数据
submitForm.use(function(options, next) {
    console.log('提交数据');
    next();
})

//返回首页
submitForm.use(function(options, next) {
    console.log('返回首页');
})

submitForm.handleRequest();
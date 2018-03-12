/**
 * 1、未来对象要触发成功|失败
 * 2、未来对象可以添加成功|失败的回调
 */
function Promise(cbk) {
    this.succCbks = [];
    this.failCbks = [];
    this.allCbks = [];
    this.status = null;
    var resolve = this.resolve();
    var reject = this.reject();
    cbk.call(this, resolve, reject);
}
Promise.prototype.then = function(s, f, a) {
    this.succCbks.push(s);
    this.failCbks.push(f);
    this.allCbks.push(a);
};
Promise.prototype.resolve = function() {
    var self = this;
    return function(data) {
        self.status = true;
        for (var i = 0; i < self.succCbks.length; i++) {
            var tmp =self.succCbks[i].call(null, data);
            if(tmp){
                data = tmp;
            }
        }
        self.all(data);
    }
};
Promise.prototype.reject = function() {
    var self = this;
    return function(data) {
        self.status = false;
        for (var i = 0; i < self.failCbks.length; i++) {
            self.succCbks[i].call(null, data);
        }
        self.all(data);
    }
};
Promise.prototype.all = function(data) {
    var self = this;
    for (var i = 0; i < self.allCbks.length; i++) {
        self.allCbks[i].call(null, data);
    }
};

new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('hh');
    })
}).then(function(d) {
    console.log('succ=' + d);
}, function(d) {
    console.log('fail=' + d);
}, function(d) {
    console.log('all=' + d);
});
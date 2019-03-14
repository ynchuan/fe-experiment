function Observer() {
    this.eventCache = {};
}
Observer.prototype.subscribe = function (event, fn) {
    var cache = this.eventCache;
    if (!cache[event]) {
        cache[event] = [];
    }
    cache[event].push(fn);
};
Observer.prototype.emit = function (event, args) {
    var cache = this.eventCache;
    var list = cache[event] || [];
    list.forEach(function (fn) {
        fn(args);
    });
};
Observer.prototype.hasEvent = function (event) {
    return !!this.eventCache[event];
};

function Delegate() {
    this.cache = {};
};

Delegate.prototype.on = function (node, event, filter, fn) {
    this.bindEvnet(node, event); // 绑定事件

    var ob = this.getObserver(node);
    var self = this;
    ob.subscribe(event, function (e) {
        var target = e.target;
        if (self.isMatchSelect(target, node, filter)) {
            fn.call(self, e);
        }
    });
};
Delegate.prototype.bindEvnet = function (node, event) {
    var cache = this.cache;
    var uid = node.uid;
    var ob = cache[uid];

    if (!ob || (ob && !ob.hasEvent(event))) {
        node.addEventListener(event, function (e) {
            cache[node.uid].emit(event, e);
        });
    }
};

Delegate.prototype.isMatchSelect = function (target, node, filter) {
    var ret = false;
    while (target !== node) {
        var parent = target.parentNode;
        if (!target.matches(filter)) {
            target = parent;
        }
        else {
            ret = true;
            break
        }
    }
    return ret;
};

Delegate.prototype.getObserver = function (node) {
    var uid = node.uid;
    if (!uid) {
        uid = 'u' + Date.now();
        node.uid = uid;
    }
    var ob = this.cache[uid];
    if (!ob) {
        this.cache[uid] = ob = new Observer();
    }
    return ob;
};

/**
 * @descripe 每个[节点]的每个不同[事件]只原生绑定一次
 * @invoke
 */

var delegate = new Delegate();
var dom1 = document.getElementById('test1');
var dom2 = document.getElementById('test2');
delegate.on(dom1, 'click', '.item', function (e) {
    console.log(e.target.nodeName);
});
delegate.on(dom1, 'click', '.item1', function (e) {
    console.log(e.target.nodeName);
});
delegate.on(dom1, 'mouseup', '.item', function (e) {
    console.log(e.target.nodeName);
});
delegate.on(dom2, 'click', '.item', function (e) {
    console.log(e.target.nodeName);
});

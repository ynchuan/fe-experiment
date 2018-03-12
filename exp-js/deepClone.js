var toString = function(obj) {
    return Object.prototype.toString.call(obj);
}

function deepClone(obj) {
    var ret;
    if (toString(obj) === '[object Object]') {
        ret = {};
        for (var key in obj) {
            ret[key] = deepClone(obj[key]);
        }
    } else if (toString(obj) === '[object Array]') {
        ret = [];
        for (var i = 0; i < obj.length; i++) {
            ret[i] = deepClone(obj[i]);
        }
    } else {
        ret = obj;
    }
    return ret;
}

var testObj = {
    a: 1,
    b: [2, 3],
    c: {
        d: ['4', '5'],
        e: {
            f: 'f',
            g: [78]
        }
    }
};
var ret = deepClone(testObj);

console.log(ret.c.e.g === testObj.c.e.g);
console.log(ret.c.d === testObj.c.d);
console.log(ret.b === testObj.b);
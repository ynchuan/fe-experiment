function deepClone(obj) {
    var ret = {};
    var toString = Object.prototype.toString;
    for (var key in obj) {
        var tmp = obj[key];
        var retTmp;
        if (toString.call(tmp) === '[object Array]') {
            retTmp = [];
            for (var i = 0; i < tmp.length; i++) {
                retTmp.push(deepClone(tmp[i]));
            }
        } else if (toString.call(tmp) === '[object Object]') {
            retTmp = deepClone(tmp);
        } else {
            retTmp = obj[key];
        }
        ret[key] = retTmp;
    }
    return ret;
}

var obj = {
    'a': [{
        'a-1': {
            'a-1-1': 'a11',
            'a-1-2': 'a12'
        }
    }, {
        'a-2': 'a2'
    }, {
        'a-3': [{
            'a-3-1': 'a31'
        }],
        'a-4': [3, 4, 4]
    }],
    'b': 21,
    'c': {
        'c1': 3,
        'c2': 4
    },
    d: 'd'
};
var ret = deepClone(obj);

function deepcheck(ret, obj) {

    for (var key in ret) {

    }
}
(function() {
    var url = 'http://v.baidu.com/v?word=袁弘张歆艺大婚&ct=301989888&rn=20&pn=0&db=0&s=0&fbl=800&ie=utf-8#pn=60&order=1&pd=1';
    var splitUri = function(uri) {
        var reg = /([^?&#=]+)=([^?&#=]+)/g;
        var ret = {};
        uri.replace(reg, function(u, $1, $2) {
            ret[$1] = $2;
        });
        return ret;
    };
    var rst = splitUri(url);
    console.log(rst.word, rst.id); //袁弘张歆艺大婚   utf-8
})()

(function() {
    function splitThousand(data) {
        var data = new String(data);
        data.replace(/\d{3}\./g, function(a, $1, $2) {

        })
    }
    splitThousand(999); // 结果 999
    splitThousand(1023999); // 结果 1,023,999
    splitThousand(20210239.9999); // 结果 20,210,239.9999

})();

(function() {
    (function() {
        // 声名变量a,b
        var a = b = 5;
    })();
    console.log(a); // 结果________
    console.log(b); // 结果________
    console.log(fun1()); // 结果________
    console.log(fun2()); // 结果________
    var a = 10;

    function fun1() {
        return 1
    };
    var fun2 = function() {
        return 2;
    }
})();

(function() {
    var obj = {
        a: 1,
        b: 'b'
    };
    var c = 3;
    var fun = function(o, c) {
        o.a && (o.a++);
        o.b && (o.b = o.b + '_fun');
        c = 3;
    }
    fun(obj, c);
    console.log(obj.a); // 结果________
    console.log(obj.b); // 结果________
    console.log(c); // 结果________   
})();
(function() {
    var a = 1;

    function Fn1() {
        var a = 2;
        alert(this.a + a);
    }
    Fn1(); // 结果__________

    var Fn2 = function() {
        this.a = 3;
    }
    Fn2.prototype = {
        a: 4
    }
    var fn2 = new Fn2;
    Fn1.call(fn2); //结果_________

})();
(function() {
    var name = 'Video';

    function sayName() {
        return 'my name is ' + this.name;
    }
    // 相关信息
    var info = {
        name: 'Ma ming',
        age: 25
    }
    sayName() // 结果 ________
    function proxy(fn, obj) {
        console.log(fn.call(obj));
    };
    proxy(sayName, info) // 结果 my name is Ma ming
})();

(function() {
    var i = 3
    while (i--) {
        setTimeout(function() {
            console.log(i) //问题：输出什么？
        }, 0)
    }
})();



(function() {
    var m = [1, 3, 4, 6, 4, 5, 6, 7, 8, 1, 2, 3, 5, 6];

    function unique(m) {
        var ret = [];
        var tmp = {};
        for (var i = 0; i < m.length; i++) {
            if (!tmp[m[i]]) {
                ret.push(m[i]);
                tmp[m[i]] = true;
            }
        }
        return ret;
    }
    var ret = unique(m);
    console.log(ret); // [1, 3, 4, 6, 5, 7, 8, 2]
})();
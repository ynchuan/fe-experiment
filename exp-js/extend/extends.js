var __extends = (this && this.__extends) || (function() {
    var extendStatics =
        ({
                __proto__: []
            }
            instanceof Array && function(d, b) {
                d.__proto__ = b;
            }) ||
        function(d, b) {

            for (var p in b)
                if (b.hasOwnProperty(p)) d[p] = b[p];
        };
    return function(d, b) {
        extendStatics(d, b);

        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Shape = (function() {
    function Shape(name, width, height) {
        this.area = width * height;
        this.color = 'pink';
    };
    Shape.prototype.shoutout = function() {
        var ret = "i am $(this.name) $(this.name) with an area of $(this.area) cm squared.";
        console.log(ret);
        return ret;
    };
    return Shape;
}());

var Shape3D = (function(_super) {
    __extends(Shape3D, _super);

    function Shape3D(name, width, height, length) {
        var _this = _super.call(this, name, width, height) || this;
        _this.name = name;
        _this.volume = length * _this.area;
        return _this;
    };
    Shape3D.prototype.shoutout = function() {
        return "I'm " + this.name + " with a volume of " + this.volume + " cm cube.";
    };
    Shape3D.prototype.superShout = function() {
        return _super.prototype.shoutout.call(this);
    };
    return Shape3D;
}(Shape));

var cube = new Shape3D("cube", 30, 30, 30);
console.log(cube.shoutout());
console.log(cube.superShout());



function extend(sub, parent) {
    var tmp = function() {
        parent.call(this);
        this.constructor = parent;
    };
    tmp.prototype = parent.prototype;
    sub.prototype = new tmp; //  没有直接new parent 防止parent的constructor被破坏
    sub.__proto__ = parent;
}

var B = function() {
    this.fun = 'B func';
};

B.prototype.sayFun = function() {
    console.log(this.fun);
}

var A = function() {

    this.fun = 'a func';
};

extend(A, B);

var a = new A;
a.sayFun();
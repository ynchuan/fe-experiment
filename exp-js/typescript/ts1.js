// // 类型批注
// function area(shape: string, width: number, height: number) {
//     var area = width * height;
//     console.log("I'm a " + shape + " with an area of " + area + " cm squared.");
// }
// area("rectangle", 30, 15);

// // 接口
// interface Shape {
//     name: string;
//     width: number;
//     height: number;
//     color?:string;
// };
// function area1(shape: Shape) {
//     var area = shape.width * shape.height;
//     console.log('i am a ' + shape.name + ' with area ' + area + ' cm!');
// };
// area1({
//     name: "rectangle1",
//     width: 30,
//     height: 15
// });
// var shape = {
//     name: "rectangle",
//     popup: function() {
//         console.log('This inside popup(): ' + this.name);
//         setTimeout(() => {
//             console.log('This inside setTimeout(): ' + this.name);
//             console.log("I'm a " + this.name + "!");
//         }, 3000);
//     }
// };
// shape.popup();
var Shape = /** @class */ (function() {
    function Shape(name, width, height) {
        this.area = width * height;
        this.color = 'pink';
    };
    Shape.prototype.shoutout = function() {
        var ret = "i am $(this.name) $(this.name) with an area of $(this.area) cm squared.";
        console.log(ret);
        return ret;
    };;
    return Shape;
}());
var square = new Shape('ynchuan', 40, 20);
console.log(square.shoutout());
console.log('Area of Shape: ' + square.area);
console.log('Name of Shape: ' + square.name);
console.log('Color of Shape: ' + square.color);
console.log('Width of Shape: ' + square.width);
console.log('Height of Shape: ' + square.height);
var Shape3D = /** @class */ (function(_super) {
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
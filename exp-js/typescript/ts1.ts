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


class Shape {
    area: number;
    private color: string;
    constructor(name: string, width: number, height: number) {
        this.area = width * height;
        this.color = 'pink'
    };
    shoutout() {
        var ret = `i am $(this.name) $(this.name) with an area of $(this.area) cm squared.`;
        console.log(ret);
        return ret;
    };
}
var square = new Shape('ynchuan', 40, 20);

console.log( square.shoutout() );
console.log( 'Area of Shape: ' + square.area );
console.log( 'Name of Shape: ' + square.name );
console.log( 'Color of Shape: ' + square.color );
console.log( 'Width of Shape: ' + square.width );
console.log( 'Height of Shape: ' + square.height );




class Shape3D extends Shape {
 
    volume: number;
 
    constructor ( public name: string, width: number, height: number, length: number ) {
        super( name, width, height );
        this.volume = length * this.area;
    };
 
    shoutout() {
        return "I'm " + this.name +  " with a volume of " + this.volume + " cm cube.";
    }
 
    superShout() {
        return super.shoutout();
    }
}
 
var cube = new Shape3D("cube", 30, 30, 30);
console.log( cube.shoutout() );
console.log( cube.superShout() );

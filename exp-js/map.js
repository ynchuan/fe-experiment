/**
 * 由于map具有有序性和一一映射的特性，所以map可以转换为数组和对象
 * map<->array 二维数组形式
 * map<->object 键值对形式
 */


let mapToObj = (map) => {
    let obj = Object.create(null);
    for ([key, value] of map.entries()) {
        obj[key] = value;
    }
    return obj;
}

let map = new Map();
map.set('a', 'a').set('c', 1).set({}, {}).set([1, 2], [3, 4]);
console.log("map to object test:");
console.log(mapToObj(map));


let objToMap = (obj) => {
    let ret = new Map;
    for (let key in obj) {
        ret.set(key, obj[key]);
    }
    return ret;
};

let obj = { 'a': 1, '2': 'b' };
console.log("object to map test:");
console.log(objToMap(obj));


let arrToMap = (arr) => {
    return new Map(arr);
};
let arr = [
    [1, 'a'],
    [2, 'b'],
    [4, 'd']
];
console.log("array to Map test:");
console.log(arrToMap(arr));


let mapToArr = (map) => {
    return [...map];
};
console.log("map to array test:");
console.log(mapToArr(new Map().set('a', 'a').set('c', 1).set({}, {}).set([1, 2], [3, 4])));



let jsonToMap1 = (json) => {
    return objToMap(JSON.parse(json));
};
let jsonToMap2 = (json) => {
    return new Map(JSON.parse(json));
};
let json1 = '{"a":"a","b":"b"}';
console.log("json to map test 1:");
console.log(jsonToMap1(json1));

let json2 = '[["a","1"],["b"],[3,"c"]]';
console.log("json to map test 2:");
console.log(jsonToMap2(json2));




let mapToJson = (map) => {
    return JSON.stringify(mapToObj(map));
};
console.log("map to array json:");
console.log(mapToJson(new Map().set('a', 'a').set('c', 1).set({}, {}).set([1, 2], [3, 4])));


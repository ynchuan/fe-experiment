var obj = {
    a: 'obja',
    b: 'objb',
    c: 'objc',
    d: 'objd',
};
var arr = ['arr1', 'arr2', 'arr3', 'arr4'];

for (var key in obj) {
    console.log(key);
    console.log("====" + obj[key]);
}

for (var key in arr) {
    console.log(key);
    console.log("====" + arr[key]);
}

for (var key of arr) {
    console.log(key);
}

for (var key of obj) {
    console.log(key);
}
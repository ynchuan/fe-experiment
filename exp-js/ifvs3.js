var t = 30;
var ret = 1;

var start1 = Date.now();
var count1 = 0;
while (count1 < 200000000) {
    count1++;
    if (t > 30) {
        ret = 0;
    } else {
        ret = 1;
    }
}
var end1 = Date.now();

console.log('1:' + (end1 - start1));


var start2 = Date.now();
var count2 = 0;
while (count2 < 200000000) {
    count2++;
    ret = t > 30 ? 0 : 1;
}
var end2 = Date.now();

console.log('2:' + (end2 - start2));
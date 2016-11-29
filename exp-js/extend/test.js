var Base = require('./Base');
var opts = {
    event: [
        ele: '',
        on: 'click',
        dele: '.i-icon',
        fun: function() {}
    ],
    ele: ''
};
var Test = Base.extend(opts);
var test = new Test;
console.log(test.getName());
console.log(test.getAge())
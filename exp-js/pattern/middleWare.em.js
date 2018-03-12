var MiddleWare = function() {
    this.cache = [];
    this.index = 0;
    this.input;
    this.output;
};

MiddleWare.prototype.use = function(fn) {
    this.cache.push(fn);
    return this;
};

MiddleWare.prototype.next = function() {
    this.index++;
    this.start(this.input, this.output);
};

MiddleWare.prototype.start = function(inp, out) {
    if (!this.input) {
        this.input = inp;
    }
    if (!this.output) {
        this.output = out;
    }
    if (this.index < this.cache.length) {
        this.cache[this.index](inp, out, this.next.bind(this));
    }
};

var mw = new MiddleWare();
mw.use(function(input, output, next) {
    console.log('use middleware 1');
    next();
});
mw.use(function(input, output, next) {
    console.log('use middleware 2');
    next();
});

mw.use(function(input, output, next) {
    console.log('use middleware 4');
});

mw.use(function(input, output, next) {
    console.log('use middleware 3');
});
var input = {};
var output = {};
mw.start(input, output);
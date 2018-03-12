var ChainNode = function(processNode) {
    this.processNode = processNode;
    this.nextChainNode;
};
ChainNode.prototype.start = function() {
    var rst = this.processNode && this.processNode(arguments);
    if (rst) {
        this.nextChainNode && this.nextChainNode.start(rst);
    }
};
ChainNode.prototype.setNextNode = function(nextChainNode) {
    this.nextChainNode = nextChainNode;
    return nextChainNode;
};

var fn1 = function() {
    console.log('111');
    return true;
};
var fn2 = function() {
    console.log('222');
    return true;
};
var fn3 = function() {
    console.log('333');
    return false;
};
var fn4 = function() {
    console.log('444');
    return true;
};

var chain1 = new ChainNode(fn1);
var chain2 = new ChainNode(fn2);
var chain3 = new ChainNode(fn3);
var chain4 = new ChainNode(fn4);
chain1.setNextNode(chain2).setNextNode(chain4).setNextNode(chain3);
chain1.start(1);
/* 
  原生js模拟promise
*/
const PromisePolyfill = (() => {
    //状态管理
    const promiseStatusSymbol = Symbol('PromiseStatus');
    const promiseValueSymbol = Symbol('PromiseValue');
    const STATUS = {
        PENDING: 'PENDING',
        FULFILLED: 'FULFILLED',
        REJECTED: 'REJECTED'
    };
    //resolve操作设置值和状态
    function resolve() {
        this[promiseValueSymbol] = arguments[0];
        this[promiseStatusSymbol] = STATUS['FULFILLED'];
    }
    //reject操作设置值和状态
    function reject() {
        this[promiseValueSymbol] = arguments[0];
        this[promiseStatusSymbol] = STATUS['REJECTED'];
    }
 
    class myPromise {
        constructor(resolver) {
            if (typeof resolver !== 'function') {
                throw new TypeError(`parameter 1 must be a function, but get a ${typeof func}`);
            }
            this[promiseStatusSymbol] = STATUS['PENDING'];//初始状态为pending
            resolver(
                resolve.bind(this),//绑定promise实例对象
                reject.bind(this)
            );
        }
        then(callback) {
            //开一个定时器监听状态变化，如果有变化则执行callback
            const interval = setInterval(() => {
                if (this[promiseStatusSymbol] === 'FULFILLED' || this[promiseStatusSymbol] === 'REJECTED') {
                    clearInterval(interval);
                    callback(this[promiseValueSymbol], resolve.bind(this), reject.bind(this));
                    this[promiseStatusSymbol] = 'PENDING';//执行完后把状态改回，方便下一个then方法进行定时轮询
                }
            });
            return this;
        }
    }
    return myPromise;
})();

//测试，下面会先打印出111，再打印出222，333
new PromisePolyfill(function (resolve, reject) {
    setTimeout(() => {
        resolve(222);
        console.log(111)
    }, 1000);
}).then(function (res, resolve, reject) {
    setTimeout(() => {
        resolve(333);
        console.log(res)
    }, 3000);
}).then(function (res, resolve, reject) {
    console.log(res);
});
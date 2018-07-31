/**
 * 函数节流（throttle）：某个动作规定的时间内只执行第一次
 */

const throttle = (action, idle) => {
    let last = 0;
    return (...prop) => {
        let curr = +new Date;
        if (curr - last > idle) {
            action.apply(this, prop);
            last = curr;
        }
    }
};

const throttleAction = throttle((...prop) => {
    console.log(prop);
}, 1000);

throttleAction('throttle1');
throttleAction('throttle2');
throttleAction('throttle3'); // 输出 throttle1

setTimeout(() => {
    throttleAction('throttle4');
    throttleAction('throttle5');
    throttleAction('throttle6'); // 输出 throttle4
}, 2000);


/**
 * 函数防抖 （debounce）：某个动作规定的时间内只执行最后一次
 */

const debounce = (action, idle) => {
    let handler;
    return (...prop) => {
        handler && clearTimeout(handler);
        handler = setTimeout(() => {
            action.apply(this, prop);
        }, idle);
    }
};

const debounceAction = debounce((...prop) => {
    console.log(prop);
}, 1000);

debounceAction('debounce1');
debounceAction('debounce2');
debounceAction('debounce3'); // 输出 debounce3

setTimeout(() => {
    debounceAction('debounce4');
    debounceAction('debounce5');
    debounceAction('debounce6'); // 输出 debounce6
}, 2000);
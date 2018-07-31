/**
 * 部署遍历器属性，实现for-of循环遍历
 */

class Obj {
    constructor(value) {
        this.value = value;
        this.next = null;
    }

    [Symbol.iterator]() {
        let current = this;
        return {
            next: () => {
                let ret = {};
                if (current) {
                    ret.value = current.value;
                    current = current.next;
                } else {
                    ret.done = true;
                }
                return ret;
            }
        }
    }
}

let one = new Obj(1);
let two = new Obj(2);
let three = new Obj(3);

one.next = two;
two.next = three;

for (let i of one) {
    console.log(i); // 1, 2, 3
}
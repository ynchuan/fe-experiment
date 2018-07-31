Object.create = Object.create || function m(p) {
    let ret = new(function() {});
    Object.setPrototypeOf ? Object.setPrototypeOf(ret, p) : ret.__proto__ = p;
    return ret;
}
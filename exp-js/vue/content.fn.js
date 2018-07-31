define('asp:app/views/common/content/index.vue', function(require, exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        computed: {
            key: function() {
                var ret = 'path';
                if (this.$route.path === '/ssp/ottDeal') {
                    ret = this.$route.path;
                }
                return ret;
            }
        }
    };
    //# sourceMappingURL=/static/asp/app/views/common/content/index.js.map

    var __vue__options__;
    if (exports && exports.__esModule && exports.default) {
        __vue__options__ = exports.default;
    } else {
        __vue__options__ = module.exports;
    }
    __vue__options__.render = function render() {
        var _vm = this;
        var _h = _vm.$createElement;
        var _c = _vm._self._c || _h;
        return _c('div', {
                staticClass: "content-wrap"
            }, [_c('router-view', {
                key: _vm.key
            })],
            1)
    }
    __vue__options__.staticRenderFns = []

});
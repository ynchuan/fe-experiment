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
    __vue__options__.template = "\n<div class=\"content-wrap\">\n    <router-view :key='key'></router-view>\n</div>\n"
});
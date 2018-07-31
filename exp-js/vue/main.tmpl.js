define('asp:app/entry/ssp.es', function(require, exports, module) {

  /**
   * @file 入口文件
   * @author wangxunxun
   * @require asp:node_modules/element-ui/lib/theme-chalk/index.css
   */
  "use strict";
  var __assign = (this && this.__assign) || Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
      }
      return t;
  };
  var Vue = require("asp:node_modules/vue/dist/vue.common.js");
  var VueRouter = require("asp:node_modules/vue-router/dist/vue-router.common.js");
  var index_vue_1 = require("asp:app/views/common/main/index.vue");
  var index_vue_2 = require("asp:app/views/common/layer/index.vue");
  var ssp_es_1 = require("asp:app/routes/ssp.es");
  var element_ui_1 = require("asp:node_modules/element-ui/lib/element-ui.common.js");
  '';
  Vue.use(VueRouter);
  Vue.use(element_ui_1.default);
  // Vue.use(Vuex);
  module.exports = function (data) {
      var routes = ssp_es_1.default(data);
      var router = new VueRouter({
          mode: 'history',
          base: '/asp',
          routes: routes
      });
      router.beforeEach(function (to, from, next) {
          try {
              var path = to.path;
              var menu = data.menus.menu;
              var cycleFind_1 = function (menu, path) {
                  var ret;
                  for (var i = 0; i < menu.length; i++) {
                      var m = menu[i];
                      if (m.url === path) {
                          ret = m;
                          break;
                      }
                      else if (m.menu) {
                          ret = cycleFind_1(m.menu, path);
                          if (ret) {
                              break;
                          }
                      }
                  }
                  return ret;
              };
              var meta = cycleFind_1(menu, path);
              if (meta) {
                  document.title = meta.title;
              }
          }
          catch (e) {
          }
          next();
      });
      new Vue(__assign({ el: '#app', router: router, data: {
              data: data
          } }, index_vue_1.default));
      // 并列弹窗
      window.layer = new Vue(__assign({ el: '#layer' }, index_vue_2.default));
  };
  //# sourceMappingURL=/static/asp/app/entry/ssp.js.map
  

});

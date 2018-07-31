define('asp:app/views/common/ottDeal/detail.vue', function(require, exports, module) {

    "use strict";
    var index_es_1 = require("asp:app/utils/index.es");
    var detail_es_1 = require("asp:app/views/common/mixin/detail.es");
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        mixins: [detail_es_1.default],
        props: ['option', 'isAudit'],
        data: function() {
            var userInfo = this.option.user.userInfo;
            return {
                url: !this.isAudit ? '/asp/dsp/ottDeal' : '/asp/ssp/ottDeal',
                superPageID: 'ottDeal',
                edit: {
                    item: {
                        name: '',
                        target_city: '',
                        target_material_type: '',
                        target_material_duration: '',
                        target_make: '',
                        start_time: '',
                        end_time: '',
                        user_freq_limit: '',
                        total_freq_limit: '',
                        type: 5,
                        impids: '',
                        sellerid: '',
                        buyerid: userInfo.accountid,
                        opuserid: userInfo.accountid,
                        status: 0,
                    }
                },
                meta: {
                    radioCtrl: [{
                        name: '不限',
                        value: 0
                    }, {
                        name: '选择',
                        value: 1
                    }],
                    radioInput: [{
                        name: '不限',
                        value: 0
                    }, {
                        name: '设置',
                        value: 1
                    }],
                    target_city: [],
                    material_format: [],
                    target_make: [],
                },
                verifyFields: {
                    sellerid: {
                        isRequired: true,
                        verityFn: 'notNull'
                    }
                },
                specFields: {
                    target_city: [],
                    material_format: '',
                    target_make: [],
                    user_freq_limit: {},
                    total_freq_limit: {},
                },
                table: {
                    list: [],
                },
                ctrl: {
                    loading: false,
                    btnText: '查找',
                    isAudit: this.isAudit
                }
            };
        },
        computed: {
            getCity: function() {
                return this.specFields.target_city.join(',') || '不限';
            },
            getMake: function() {
                return this.specFields.target_make.join(',') || '不限';
            },
            getMF: function() {
                var mfs = this.meta.material_format;
                var mf = this.specFields.material_format;
                var tmp = mfs.find(function(t) {
                    return mf === t.value;
                }) || {};
                var ret = tmp.name || mf || '不限';
                return ret;
            },
        },
        created: function() {
            var _this = this;
            this.fetchSellers();
            this.$on('dictionary', function(dictionary) {
                _this.meta.target_city = _this.meta.dictionary.group.target_city;
                _this.meta.material_format = _this.getMaterialFormat(_this.meta.dictionary.ottRule.material_format);
                _this.meta.target_make = _this.meta.dictionary.ottRule.make;
            });
        },
        methods: {
            getMaterialFormat: function(items) {
                var ret = [{
                    value: '',
                    name: '不限'
                }];
                items.forEach(function(t) {
                    var sub = t.children;
                    var text = t.text;
                    sub.forEach(function(s) {
                        ret.push({
                            value: s.id,
                            name: text + s.text,
                        });
                    });
                });
                return ret;
            },
            fetchSellers: function() {
                var _this = this;
                var data = {
                    action: 'get',
                    format: 'json',
                    conds: {
                        status: -1,
                        ps: -1
                    }
                };
                var cbk = function(res) {
                    if (res.errno === 0) {
                        (_a = _this.meta.sellers).push.apply(_a, res.data.data.list);
                        _this.transfromTableDict();
                    }
                    var _a;
                };
                this.accessUtil(data, cbk, null, this.isAudit ? '/asp/ssp/info' : '/asp/dsp/info');
            },
            doFilterOtt: function() {
                var _this = this;
                var specFields = this.specFields;
                var data = {
                    action: 'get',
                    format: 'json',
                    conds: {
                        status: -1,
                        ps: -1,
                        handler: 'filterOtt',
                        like: {
                            city: specFields.target_city,
                            material_format: [specFields.material_format],
                            make: specFields.target_make
                        }
                    }
                };
                var cbk = function(res) {
                    if (res.errno === 0) {
                        _this.table.list = res.data.data.list;
                        _this.transfromTableDict();
                        setTimeout(function() {
                            _this.ctrl.loading = false;
                            _this.ctrl.btnText = '查找';
                        }, 2000);
                    }
                };
                this.edit.item.name = '';
                this.edit.item.sellerid = '';
                this.edit.item.impids = '';
                this.ctrl.loading = true;
                this.ctrl.btnText = '加载中...';
                this.accessUtil(data, cbk);
            },
            transfromTableDict: function() {
                var dict = this.meta.sellers;
                var rfield = 'sellerid';
                var sfield = 'id';
                this.table.list.forEach(function(item) {
                    var tmp = dict.find(function(it) {
                        return item[rfield] === it[sfield];
                    });
                    item['_' + rfield] = item[rfield];
                    item[rfield] = tmp ? tmp.name : '';
                });
            },
            decombinData: function(data) {
                var list = data.data.data.list;
                this.table.list = list;
                data = list[0];
                var specFields = this.specFields;
                specFields.target_city = this.split(data.target_city);
                specFields.target_make = this.split(data.target_make);
                specFields.material_format = this.deParseFormat(data);
                specFields.user_freq_limit = this.parse(data.user_freq_limit);
                specFields.total_freq_limit = this.parse(data.total_freq_limit);
            },
            combinData: function(item) {
                var specFields = this.specFields;
                var mtfm = this.parseFormat(specFields.material_format);
                item.target_material_type = mtfm.type;
                item.target_material_duration = mtfm.duration;
                item.target_city = specFields.target_city.join(',');
                item.target_make = specFields.target_make.join(',');
                item.user_freq_limit = this.stringify(specFields.user_freq_limit);
                item.total_freq_limit = this.stringify(specFields.total_freq_limit);
            },
            selectSellers: function(select) {
                var userInfo = this.option.user.userInfo;
                var company = userInfo.company || '未知公司';
                var name = userInfo.name || '未知姓名';
                this.edit.item.name = 'OTT订单-' + company + '-' + name + '-' + select.sellerid;
                this.edit.item.sellerid = select._sellerid;
                this.edit.item.impids = select.impid;
            },
            stringify: function(obj) {
                var ret = '';
                if (Object.keys(obj).length > 0) {
                    ret = JSON.stringify(obj);
                } else {
                    ret = '';
                }
                return ret;
            },
            parse: function(str) {
                var ret = {};
                if (str && index_es_1.default.isString(str)) {
                    ret = JSON.parse(str);
                }
                return ret;
            },
            split: function(str) {
                var ret = [];
                if (str && index_es_1.default.isString(str)) {
                    ret = str.split(',');
                }
                return ret;
            },
            deParseFormat: function(item) {
                var type = item.target_material_type;
                var duration = item.target_material_duration;
                var ret = '';
                if (type && duration) {
                    ret = type + '_' + duration;
                }
                return ret;
            },
            parseFormat: function(fmt) {
                var ret = {
                    type: '',
                    duration: ''
                };
                if (fmt) {
                    var tmp = fmt.split('_');
                    ret.type = tmp[0] || '';
                    ret.duration = tmp[1] || '';
                }
                return ret;
            }
        }
    };
    //# sourceMappingURL=/static/asp/app/views/common/ottDeal/detail.js.map

    var __vue__options__;
    if (exports && exports.__esModule && exports.default) {
        __vue__options__ = exports.default;
    } else {
        __vue__options__ = module.exports;
    }
    __vue__options__.render = function render() { var _vm = this; var _h = _vm.$createElement; var _c = _vm._self._c || _h; return _c('div', { staticClass: "ssp-mask common-ottDeal-detail-wrap" }, [_c('div', { staticClass: "edit-wrap" }, [_c('h4', { staticClass: "h4-edit-head" }, [(_vm.ctrl.isNew) ? _c('span', { staticClass: "sp-edit-hd" }, [_vm._v("新建OTT规则")]) : (_vm.ctrl.isAudit) ? _c('span', { staticClass: "sp-edit-hd" }, [_vm._v("查看OTT规则")]) : _c('span', { staticClass: "sp-edit-hd" }, [_vm._v("修改OTT规则")]), _vm._v(" "), _c('i', { staticClass: "icon-close", on: { "click": _vm.doCancelNew } }, [_c('svg', { staticClass: "svg_icon", attrs: { "width": "16", "height": "16" } }, [_c('use', { attrs: { "xlink:href": "#close" } })])])]), _vm._v(" "), _c('div', { staticClass: "d-edit-body" }, [(!_vm.ctrl.isAudit) ? [_c('ul', { staticClass: "ul-edit-items" }, [_c('field-radio-tree-plain', { attrs: { "title": "地区", "radiolist": _vm.meta.radioCtrl, "treelist": _vm.meta.target_city, "refName": "target_city" }, model: { value: (_vm.specFields.target_city), callback: function($$v) { _vm.specFields.target_city = $$v }, expression: "specFields.target_city" } }), _vm._v(" "), _c('field-radio', { attrs: { "list": _vm.meta.material_format, "title": "格式", "refName": "material_format" }, model: { value: (_vm.specFields.material_format), callback: function($$v) { _vm.specFields.material_format = $$v }, expression: "specFields.material_format" } }), _vm._v(" "), _c('field-radio-tree-plain', { attrs: { "title": "机型", "radiolist": _vm.meta.radioCtrl, "treelist": _vm.meta.target_make, "refName": "target_make", "kMod": 1, "nodeKey": "id" }, model: { value: (_vm.specFields.target_make), callback: function($$v) { _vm.specFields.target_make = $$v }, expression: "specFields.target_make" } })], 1), _vm._v(" "), _c('div', { staticClass: "d-search-seller" }, [_c('el-button', { attrs: { "icon": "el-icon-search", "type": "primary", "loading": _vm.ctrl.loading, "disabled": _vm.ctrl.loading, "size": "small" }, on: { "click": _vm.doFilterOtt } }, [_vm._v("\n                        " + _vm._s(_vm.ctrl.btnText) + "\n                    ")])], 1)] : _vm._e(), _vm._v(" "), _c('div', { staticClass: "d-result-seller" }, [_c('ul', { staticClass: "ul-select-items" }, [_c('li', { staticClass: "li-select-item h3-r-filter" }, [_vm._v("\n                        筛选条件\n                    ")]), _vm._v(" "), _c('li', { staticClass: "li-select-item" }, [_c('span', { staticClass: "s-sp-i" }, [_vm._v("地区:")]), _vm._v(" " + _vm._s(_vm.getCity) + "\n                    ")]), _vm._v(" "), _c('li', { staticClass: "li-select-item" }, [_c('span', { staticClass: "s-sp-i" }, [_vm._v("格式:")]), _vm._v(" " + _vm._s(_vm.getMF) + "\n                    ")]), _vm._v(" "), _c('li', { staticClass: "li-select-item" }, [_c('span', { staticClass: "s-sp-i" }, [_vm._v("机型:")]), _vm._v(" " + _vm._s(_vm.getMake) + "\n                    ")])]), _vm._v(" "), (_vm.table.list.length) ? [_vm._m(0), _vm._v(" "), _c('el-table', { ref: "selectSellers", attrs: { "data": _vm.table.list, "border": "", "tooltip-effect": "dark", "size": "small", "highlight-current-row": "" }, on: { "current-change": _vm.selectSellers } }, [_c('el-table-column', { attrs: { "label": "ID", "width": "70", "align": "center", "prop": "id" } }), _vm._v(" "), _c('el-table-column', { attrs: { "label": "流量售卖方", "width": "150", "align": "center", "show-overflow-tooltip": "" }, scopedSlots: _vm._u([{ key: "default", fn: function(scope) { return [_c('a', { staticClass: "a-cell-name", domProps: { "textContent": _vm._s(scope.row.sellerid) }, on: { "click": function($event) { _vm.doEditItem(scope.row) } } })] } }]) }), _vm._v(" "), _c('el-table-column', { attrs: { "label": "更新时间", "width": "150", "align": "center", "prop": "update_time" } }), _vm._v(" "), (_vm.$route.query.__debug__) ? [_c('el-table-column', { attrs: { "label": "城市", "width": "150", "align": "center", "prop": "city" } }), _vm._v(" "), _c('el-table-column', { attrs: { "label": "格式", "width": "150", "align": "center", "prop": "material_format" } }), _vm._v(" "), _c('el-table-column', { attrs: { "label": "机型", "width": "150", "align": "center", "prop": "make" } })] : _vm._e()], 2), _vm._v(" "), _c('ul', { staticClass: "ul-append-items" }, [_c('field-date', { attrs: { "title": "开始时间", "disabled": _vm.isAudit, "size": "small" }, model: { value: (_vm.edit.item.start_time), callback: function($$v) { _vm.edit.item.start_time = $$v }, expression: "edit.item.start_time" } }), _vm._v(" "), _c('field-date', { attrs: { "title": "结束时间", "disabled": _vm.isAudit, "size": "small" }, model: { value: (_vm.edit.item.end_time), callback: function($$v) { _vm.edit.item.end_time = $$v }, expression: "edit.item.end_time" } }), _vm._v(" "), _c('field-freq-limit', { attrs: { "title": "频控", "disabled": _vm.isAudit, "radiolist": _vm.meta.radioInput }, model: { value: (_vm.specFields.user_freq_limit), callback: function($$v) { _vm.specFields.user_freq_limit = $$v }, expression: "specFields.user_freq_limit" } }), _vm._v(" "), _c('field-freq-limit', { attrs: { "title": "量级", "disabled": _vm.isAudit, "radiolist": _vm.meta.radioInput }, model: { value: (_vm.specFields.total_freq_limit), callback: function($$v) { _vm.specFields.total_freq_limit = $$v }, expression: "specFields.total_freq_limit" } })], 1)] : [_c('div', { staticClass: "d-rst-none" }, [_vm._v("\n                        未找到匹配流量方，请重新筛选\n                    ")])]], 2)], 2), _vm._v(" "), _c('div', { staticClass: "d-edit-operator" }, [(!_vm.isAudit) ? [_c('div', { staticClass: "ssp-edit-btns" }, [_c('span', { staticClass: "sp-op-btn sp-ok", attrs: { "disabled": !_vm.verify.isPass }, on: { "click": function($event) { _vm.doAddSure() } } }, [_vm._v("确认")]), _vm._v(" "), _c('span', { staticClass: "sp-op-btn sp-cancel", on: { "click": _vm.doAddCancel } }, [_vm._v("取消")])]), _vm._v(" "), (_vm.ctrl.isShowCancleTip) ? _c('div', { staticClass: "ssp-edit-canceltip" }, [_c('p', { staticClass: "p-cancel-tip" }, [_vm._v("取消编辑将不保留已经填写的数据，确定取消？")]), _vm._v(" "), _c('span', { staticClass: "sp-op-btn", on: { "click": _vm.doContinueNew } }, [_vm._v("否")]), _vm._v(" "), _c('span', { staticClass: "sp-op-btn", on: { "click": _vm.doCancelNew } }, [_vm._v("是")])]) : _vm._e()] : _c('div', { staticClass: "ssp-edit-btns" }, [_c('span', { staticClass: "sp-op-btn sp-cancel", on: { "click": _vm.doCancelNew } }, [_vm._v("关闭")]), _vm._v(" "), _c('span', [_c('el-button', { attrs: { "size": "small", "plain": true, "type": "success", "disabled": _vm.edit.item.status === 1 }, on: { "click": function($event) { $event.preventDefault();
                    _vm.modState(_vm.edit.item, 1) } } }, [_vm._v("\n                        通过\n                    ")]), _vm._v(" "), _c('el-button', { attrs: { "size": "small", "plain": true, "type": "warning", "disabled": _vm.edit.item.status === 5 }, on: { "click": function($event) { $event.preventDefault();
                    _vm.modState(_vm.edit.item, 5) } } }, [_vm._v("\n                        拒绝\n                    ")])], 1)])], 2)])]) }
    __vue__options__.staticRenderFns = [function render() { var _vm = this; var _h = _vm.$createElement; var _c = _vm._self._c || _h; return _c('h3', { staticClass: "h3-r-seller" }, [_vm._v("流量提供方 "), _c('span', { staticClass: "s-r-t" }, [_vm._v("(点击单选，必填)")])]) }]


});
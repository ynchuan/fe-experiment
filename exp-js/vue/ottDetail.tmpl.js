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
    __vue__options__.template = "\n<div class=\"ssp-mask common-ottDeal-detail-wrap\">\n    <div class='edit-wrap'>\n        <h4 class=\"h4-edit-head\">\n            <span class=\"sp-edit-hd\" v-if='ctrl.isNew'>新建OTT规则</span> \n            <span class=\"sp-edit-hd\" v-else-if='ctrl.isAudit' >查看OTT规则</span>\n            <span class=\"sp-edit-hd\" v-else >修改OTT规则</span>\n            <i class=\"icon-close\" @click='doCancelNew'>\n                <svg class=\"svg_icon\" width=\"16\" height=\"16\">\n                    <use xlink:href=\"#close\"></use>\n                </svg>\n            </i>\n        </h4>\n        <div class=\"d-edit-body\">\n            <template v-if='!ctrl.isAudit'>\n                <ul class=\"ul-edit-items\">\n                    <field-radio-tree-plain title='地区' :radiolist='meta.radioCtrl' :treelist='meta.target_city' v-model='specFields.target_city' refName='target_city'>\n                    </field-radio-tree-plain>\n                    <field-radio :list='meta.material_format' title='格式' v-model='specFields.material_format' refName='material_format'>\n                    </field-radio>\n                    <field-radio-tree-plain title='机型' :radiolist='meta.radioCtrl' :treelist='meta.target_make' v-model='specFields.target_make' refName='target_make' :kMod='1' nodeKey='id'>\n                    </field-radio-tree-plain>\n                </ul>\n                <div class=\"d-search-seller\">\n                    <el-button icon=\"el-icon-search\" type=\"primary\" :loading=\"ctrl.loading\" :disabled='ctrl.loading' size='small' @click='doFilterOtt'>\n                        {{ctrl.btnText}}\n                    </el-button>\n                </div>\n            </template>\n            <div class=\"d-result-seller\">\n                <ul class=\"ul-select-items\">\n                    <li class=\"li-select-item h3-r-filter\">\n                        筛选条件\n                    </li>\n                    <li class=\"li-select-item\">\n                        <span class='s-sp-i'>地区:</span> {{getCity}}\n                    </li>\n                    <li class=\"li-select-item\">\n                        <span class='s-sp-i'>格式:</span> {{getMF}}\n                    </li>\n                    <li class=\"li-select-item\">\n                        <span class='s-sp-i'>机型:</span> {{getMake}}\n                    </li>\n                </ul>\n                <template v-if='table.list.length'>\n                    <h3 class='h3-r-seller'>流量提供方 <span class=\"s-r-t\">(点击单选，必填)</span></h3>\n                    <el-table ref=\"selectSellers\" :data=\"table.list\" border tooltip-effect=\"dark\" size='small' highlight-current-row @current-change=\"selectSellers\">\n                        <el-table-column label=\"ID\" width=\"70\" align=\"center\" prop='id'>\n                        </el-table-column>\n                        <el-table-column label=\"流量售卖方\" width=\"150\" align=\"center\" show-overflow-tooltip>\n                            <template scope=\"scope\">\n                                <a class=\"a-cell-name\" @click=\"doEditItem(scope.row)\" v-text=\"scope.row.sellerid\"></a>\n                            </template>\n                        </el-table-column>\n                        <el-table-column label=\"更新时间\" width=\"150\" align=\"center\" prop='update_time'>\n                        </el-table-column>\n                        <template v-if='$route.query.__debug__'>\n                            <el-table-column label=\"城市\" width=\"150\" align=\"center\" prop='city'>\n                            </el-table-column>\n                            <el-table-column label=\"格式\" width=\"150\" align=\"center\" prop='material_format'>\n                            </el-table-column>\n                            <el-table-column label=\"机型\" width=\"150\" align=\"center\" prop='make'>\n                            </el-table-column>\n                        </template>\n                    </el-table>\n                    <ul class=\"ul-append-items\">\n                        <field-date title='开始时间' :disabled='isAudit' v-model=\"edit.item.start_time\" size='small'>\n                        </field-date>\n                        <field-date title='结束时间' :disabled='isAudit' v-model=\"edit.item.end_time\" size='small'>\n                        </field-date>\n                        <field-freq-limit title='频控' :disabled='isAudit' v-model='specFields.user_freq_limit' :radiolist='meta.radioInput'>\n                        </field-freq-limit>\n                        <field-freq-limit title='量级' :disabled='isAudit' v-model='specFields.total_freq_limit' :radiolist='meta.radioInput'>\n                        </field-freq-limit>\n                    </ul>\n                </template>\n                <template v-else>\n                    <div class=\"d-rst-none\">\n                        未找到匹配流量方，请重新筛选\n                    </div>\n                </template>\n            </div>\n        </div>\n        <div class=\"d-edit-operator\">\n            <template v-if='!isAudit'>\n                <div class=\"ssp-edit-btns\">\n                    <span class=\"sp-op-btn sp-ok\" @click='doAddSure()' :disabled='!verify.isPass'>确认</span>\n                    <span class=\"sp-op-btn sp-cancel\" @click='doAddCancel'>取消</span>\n                </div>\n                <div class=\"ssp-edit-canceltip\" v-if='ctrl.isShowCancleTip'>\n                    <p class=\"p-cancel-tip\">取消编辑将不保留已经填写的数据，确定取消？</p>\n                    <span class=\"sp-op-btn\" @click='doContinueNew'>否</span>\n                    <span class=\"sp-op-btn\" @click='doCancelNew'>是</span>\n                </div>\n            </template>\n            <div class=\"ssp-edit-btns\" v-else>\n                <span class=\"sp-op-btn sp-cancel\" @click='doCancelNew'>关闭</span>\n                <span>\n                    <el-button size=\"small\" :plain=\"true\" type=\"success\" :disabled='edit.item.status===1' @click.prevent=\"modState(edit.item,1)\">\n                        通过\n                    </el-button>\n                    <el-button size=\"small\" :plain=\"true\" type=\"warning\" :disabled='edit.item.status===5' @click.prevent=\"modState(edit.item,5)\">\n                        拒绝\n                    </el-button>\n                </span>\n            </div>\n        </div>\n    </div>\n</div>\n"


});
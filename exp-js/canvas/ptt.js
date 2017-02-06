 function Portrait(opt) {
     this.opt = opt;
     this.netLayers = 5;
     this.radius = 150;
     this.netBtw = this.radius / this.netLayers;
     this.width = 300;
     this.height = 300;
     this.dnas = [{
         '吐槽': '毒舌'
     }, {
         '游戏': '善战'
     }, {
         '社会': '忧国忧民'
     }, {
         '历史': '博学'
     }, {
         '少儿': '卖萌'
     }, {
         '综艺': '逗逼'
     }, {
         '娱乐': '八卦'
     }, {
         '动漫': '二次元'
     }];
     this.len = this.dnas.length;
     this.dashLen = 5;
     this.preImgUrl = 'http://d.hiphotos.baidu.com/fex/pic/item/';
     this.images = {
         '逗逼+八卦': ['曾小贤', '3bf33a87e950352a5500d3765a43fbf2b2118b6f.jpg'],
         '逗逼+二次元': ['毛利小五郎', '279759ee3d6d55fbdbad805864224f4a20a4dd61.jpg'],
         '逗逼+毒舌': ['包龙星', 'ac345982b2b7d0a2a884f2e3c2ef76094b369a7b.jpg'],
         '逗逼+善战': ['李逍遥', '43a7d933c895d143b2ee125d7af082025aaf0737.jpg'],
         '逗逼+忧国忧民': ['柳大尉', '2934349b033b5bb5434ed6803fd3d539b600bc37.jpg'],
         '逗逼+博学': ['唐伯虎', 'cc11728b4710b912345a0080cafdfc0392452231.jpg'],
         '逗逼+卖萌': ['小黄人', 'ac4bd11373f0820279df674142fbfbedab641b7a.jpg'],
         '八卦+二次元': ['太子妃', '0824ab18972bd40720a6258372899e510fb3096e.jpg'],
         '八卦+毒舌': ['闲人马大姐', '902397dda144ad34f8ec71f9d9a20cf431ad8579.jpg'],
         '八卦+善战': ['容嬷嬷', 'd62a6059252dd42aae6ef7d50a3b5bb5c9eab86d.jpg'],
         '八卦+忧国忧民': ['闲人马大姐', '902397dda144ad34f8ec71f9d9a20cf431ad8579.jpg'],
         '八卦+博学': ['唐伯虎', 'cc11728b4710b912345a0080cafdfc0392452231.jpg'],
         '八卦+卖萌': ['太子妃', '0824ab18972bd40720a6258372899e510fb3096e.jpg'],
         '二次元+毒舌': ['太子妃', '0824ab18972bd40720a6258372899e510fb3096e.jpg'],
         '二次元+善战': ['路飞', 'a044ad345982b2b77390cfba38adcbef76099b45.jpg'],
         '二次元+忧国忧民': ['邓布利多', 'b151f8198618367a9b1689a327738bd4b31ce535.jpg'],
         '二次元+博学': ['柯南', '4d086e061d950a7b57abb8ba03d162d9f2d3c936.jpg'],
         '二次元+卖萌': ['蜡笔小新', '95eef01f3a292df52bb25a6bb5315c6034a8735f.jpg'],
         '毒舌+善战': ['齐天大圣', '4610b912c8fcc3ce3d583f4d9b45d688d43f2030.jpg'],
         '毒舌+忧国忧民': ['济公', 'd53f8794a4c27d1ed42acdba12d5ad6eddc438bb.jpg'],
         '毒舌+博学': ['林黛玉', 'ac345982b2b7d0a2a8b9f2e3c2ef76094b369a58.jpg'],
         '毒舌+卖萌': ['金叹', 'd62a6059252dd42aae63f7d50a3b5bb5c9eab862.jpg'],
         '善战+忧国忧民': ['梅长苏', '58ee3d6d55fbb2fb294fae6c464a20a44623dc6c.jpg'],
         '善战+博学': ['东方不败', '6a600c338744ebf865079241d0f9d72a6059a75e.jpg'],
         '善战+卖萌': ['樱木花道', 'd439b6003af33a877820f664cf5c10385343b57b.jpg'],
         '忧国忧民+博学': ['狄仁杰', '58ee3d6d55fbb2fb2941ae6c464a20a44623dc62.jpg'],
         '忧国忧民+卖萌': ['辛巴', 'b64543a98226cffc2a7849ccb0014a90f603ea7a.jpg'],
         '博学+卖萌': ['柯南', '4d086e061d950a7b57abb8ba03d162d9f2d3c936.jpg']
     };
     this.tips = [
         'a2cc7cd98d1001e99704e571b10e7bec54e79790.jpg',
         '3801213fb80e7bece6e2f29f262eb9389b506b90.jpg',
         'faedab64034f78f0de186b8d70310a55b3191cb8.jpg',
         'dc54564e9258d1096bb558ccd858ccbf6c814d7e.jpg',
         '8cb1cb1349540923095192009b58d109b3de4990.jpg'
     ];

     this.init();
 }

 Portrait.prototype.init = function() {
     this.table = Portrait.table(this.dnas);
     this.ctx = this.createPannel();
     this.drawNetBG();
     this.drawNetUser(this.dealUserData);
     this.initBtnView();
     this.initListen();
     this.fixLastPicSlide();
 }
 Portrait.prototype.createPannel = function() {
     var cvs = document.createElement('canvas');
     var ctx = cvs.getContext('2d');
     var dom;
     if (this.opt.isSharePlatform) {
         dom = this.opt.canvasPannel2 || document.body;
         this.radius = 120;
         this.width = 240;
         this.height = 240;
         this.netBtw = this.radius / this.netLayers;
     } else {
         dom = this.opt.canvasPannel || document.body;
     }
     var r = this.radius;
     dom.appendChild(cvs);
     cvs.width = this.width;
     cvs.height = this.height;
     ctx.translate(r, r);
     ctx.rotate(8 * Math.PI / 180);
     ctx.scale(0.98, 0.98);
     return ctx;
 }
 Portrait.prototype.drawNetBG = function() {
     var ctx = this.ctx;
     var layers = this.netLayers;
     var dnas = this.dnas;
     var btw = this.netBtw;
     ctx.beginPath();
     ctx.arc(0, 0, 5, 0, 2 * Math.PI);
     ctx.fillStyle = '#F6F8FF';
     ctx.fill();
     ctx.beginPath();
     ctx.strokeStyle = '#F6F8FF';
     for (var j = 0; j < layers; j++) {
         for (var i = 0, l = this.len; i < l; i++) {
             var x = Math.cos(2 * Math.PI / l * i);
             var x1 = Math.cos(2 * Math.PI / l * (i + 1));
             var y = -Math.sin(2 * Math.PI / l * i);
             var y1 = -Math.sin(2 * Math.PI / l * (i + 1));
             ctx.moveTo(btw * j * x, btw * j * y);
             this.drawDashLine(ctx,
                 btw * j * x,
                 btw * j * y,
                 btw * (j + 1) * x,
                 btw * (j + 1) * y,
                 this.dashLen
             );
             this.drawDashLine(ctx,
                 btw * (j + 1) * x,
                 btw * (j + 1) * y,
                 btw * (j + 1) * x1,
                 btw * (j + 1) * y1,
                 this.dashLen
             );
             ctx.stroke();
         }
     }
 }

 Portrait.prototype.drawNetText = function() {
     var ctx = this.ctx;
     var gradient = ctx.createLinearGradient(0, 0, this.width, 0);
     var r = this.radius;
     var dnas = this.dnas;
     gradient.addColorStop('0', 'magenta');
     gradient.addColorStop('0.5', 'blue');
     gradient.addColorStop('1.0', 'red');
     for (var i = 0, l = this.len; i < l; i++) {
         var x = Math.cos(2 * Math.PI / l * i);
         var y = -Math.sin(2 * Math.PI / l * i);
         ctx.fillStyle = gradient;
         ctx.fillText(Portrait.getKey(dnas[i]), (r + 5) * x, (r + 5) * y);
     }
 }

 Portrait.prototype.drawNetUser = function(cbk) {
     var self = this;
     var ctx = this.ctx;
     var r = this.radius;
     var dnas = this.dnas;
     var srcPointList = this.srcPointList = [];
     Portrait.getData(this.opt.uid, function(data) {
         var udna = data.tag;
         var ldata = Portrait.orderList(udna);
         if (!ldata.length || (ldata[ldata.length - 1].point === ldata[0].point && ldata[0].point === 0)) {
             self.user = {};
             self.user.transparent = true;
             cbk.call(self);
             return;
         }
         self.user = {
             'leval': data['star-level'],
             'word': ldata[0].image,
             'image1': self.table[ldata[1].image] + '+' + self.table[ldata[2].image],
             'image2': self.table[ldata[2].image] + '+' + self.table[ldata[1].image],
             'tips': ldata
                 // ,'esp': data.played
         };
         ctx.beginPath();
         for (var i = 0, l = self.len; i < l; i++) {
             var dna = dnas[i];
             var value = udna[Portrait.getKey(dna)] || 0;
             var x = Math.cos(2 * Math.PI / l * i);
             var x1 = Math.cos(2 * Math.PI / l * (i + 1));
             var y = -Math.sin(2 * Math.PI / l * i);
             var y1 = -Math.sin(2 * Math.PI / l * (i + 1));
             var rx = x * r * value / 100;
             var ry = y * r * value / 100;
             if (!i) {
                 ctx.moveTo(rx, ry);
             } else {
                 ctx.lineTo(rx, ry);
             }
             srcPointList.push([rx, ry]);
         }
         ctx.closePath();
         ctx.fillStyle = 'rgba(253,215,0,.8)';
         ctx.fill();
         ctx.strokeStyle = '#E30225';
         ctx.stroke();
         self.drawNetUserPoint();
         cbk.call(self);
     });
 }

 Portrait.prototype.drawNetUserPoint = function() {
     srcPointList = this.srcPointList;
     var ctx = this.ctx;
     for (var j = 0; j < srcPointList.length; j++) {
         ctx.beginPath();
         ctx.arc(srcPointList[j][0], srcPointList[j][1], 4, 0, 2 * Math.PI);
         ctx.fillStyle = '#E60029';
         ctx.fill();
     }
 }

 Portrait.prototype.drawDashLine = function(ctx, x1, y1, x2, y2, dashLen) {
     var dashLen = dashLen || 5;
     var getBeveling = function(x, y) {
         return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
     }
     var beveling = getBeveling(x2 - x1, y2 - y1);
     var num = Math.floor(beveling / dashLen);
     for (var i = 0; i < num; i++) {
         ctx[i % 2 === 0 ? 'moveTo' : 'lineTo'](x1 + (x2 - x1) / num * i, y1 + (y2 - y1) / num * i);
     }
 }

 Portrait.prototype.dealUserData = function() {
     if (this.opt.isSharePlatform) {
         return;
     }
     // 渲染3屏文字数据
     var self = this;
     if (self.user.transparent) {
         var page1 = legend.getData().pages;
         var page2 = legend.render.slider.data;
         page1.splice(2, 1);
         page2.splice(2, 1);
         return;
     }
     var l_tmp = parseInt(this.user.leval) - 1 || 0;
     var leval = (l_tmp < 0) ? 0 : (l_tmp > 4 ? 4 : l_tmp);
     var word = this.table[this.user.word];
     var image = this.images[this.user.image1] || this.images[this.user.image2];
     $(this.opt.protraitImg).find('img').attr('src', this.preImgUrl + image[1]);
     $(this.opt.portraitTip).find('img').attr('src', this.preImgUrl + this.tips[leval]);
     this.opt.portraitTransparent.hide();
     setTimeout(function() {
         var tmp = $(self.opt.protraitWord).find('b').html(image[0]);
         if (image[0].length > 4) {
             tmp.css('font-size', '20px');
         }
         $(self.opt.protraitDesc).find('b').html(word);
         $.each(self.opt.tips, function(i, tip) {
             $(tip).find('b').html(self.user.tips[i].image);
         });
         // $.each(self.opt.esp, function(i, esp) {
         //     var etmp = self.user.esp[i];
         //     if (etmp) {
         //         $(esp).find('b').html('《' + etmp + '》');
         //     } else {
         //         $(esp).remove();
         //     }
         // });
     }, 3000);
 }

 Portrait.prototype.initBtnView = function() {
     var self = this;
     if (this.opt.isSharePlatform || this.opt.isOuterBrowser) {
         this.opt.btnShowOff.hide();
         this.opt.btnRetry.hide();
         this.opt.btnOpenApp.forEach(function(item) {
             item.show();
         });
     }
 }

 Portrait.prototype.initListen = function() {
     var self = this;
     $(self.opt.maskShare.trailerElement).on('tap', function() {
         self.opt.maskShare.hide();
     });
     self.opt.maskOpenByoutBrowser.forEach(function(item) {
         $(item.trailerElement).on('tap', function() {
             item.hide();
         });
     });
     self.opt.btnOpenApp.forEach(function(item, i) {
         $(item.trailerElement).on('tap', function() {
             if (self.opt.isSharePlatform) {
                 self.opt.maskOpenByoutBrowser[i].show();
             } else {
                 window.location.href = self.opt.openAppUrl;
             }
         });
     });
     $(self.opt.btnInvokeApp.trailerElement).on('tap', function() {
         if (self.opt.isSharePlatform) {
             self.opt.maskOpenByoutBrowser1[0].show();
         } else {
             window.location.href = self.opt.openAppUrl;
         }
     });
     $(self.opt.maskOpenByoutBrowser1[0].trailerElement).on('tap', function() {
         self.opt.maskOpenByoutBrowser1[0].hide();
     });
 }
 Portrait.prototype.fixLastPicSlide = function() {
     var t = legend.render.slider.data;
     var lastSlideDom = t[t.length - 3].content;
     var startx;
     var starty;
     //手指接触屏幕
     lastSlideDom.addEventListener("touchstart", function(e) {
         startx = e.touches[0].pageX;
         starty = e.touches[0].pageY;
     }, false);

     //手指离开屏幕
     lastSlideDom.addEventListener("touchend", function(e) {
         var endx = e.changedTouches[0].pageX;
         var endy = e.changedTouches[0].pageY;
         var direction = getDirection(startx, starty, endx, endy);
         switch (direction) {
             case 0:
                 //alert("未滑动！");
                 break;
             case 1:
                 //alert("向上！")
                 break;
             case 2:
                 //alert("向下！")
                 legend.render.gotoPage(t.length - 4);
                 break;
             case 3:
                 //alert("向左！")
                 break;
             case 4:
                 //alert("向右！")
                 break;
             default:
         }
     }, false);

     function getAngle(angx, angy) {
         return Math.atan2(angy, angx) * 180 / Math.PI;
     };

     //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
     function getDirection(startx, starty, endx, endy) {
         var angx = endx - startx;
         var angy = endy - starty;
         var result = 0;

         //如果滑动距离太短
         if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
             return result;
         }

         var angle = getAngle(angx, angy);
         if (angle >= -135 && angle <= -45) {
             result = 1;
         } else if (angle > 45 && angle < 135) {
             result = 2;
         } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
             result = 3;
         } else if (angle >= -45 && angle <= 45) {
             result = 4;
         }

         return result;
     }
 }

 Portrait.prototype.test = function() {
     for (var i = 0; i < this.len; i++) {
         var key1 = Portrait.getKey(this.dnas[i]);
         var val1 = this.dnas[i][key1];
         for (var j = i + 1; j < this.len; j++) {
             var key2 = Portrait.getKey(this.dnas[j]);
             var val2 = this.dnas[j][key2];
             var imgKey = this.images[val1 + "+" + val2] || this.images[val2 + "+" + val1];
             console.log("{'综艺':100,'" + key1 + "':100," + "'" + key2 + "':100}\n");
             console.log(imgKey + "\n");
         }
     }
 }



 Portrait.getKey = function(obj) {
     for (var key in obj) {
         return key;
     }
 }
 Portrait.getData = function(cuid, renderPortraitNet) {
     var url = 'http://rec.v.baidu.com/rec/wise/userprofilereport?cuid=' + cuid + '&callback=?';
     $.getJSON(url, renderPortraitNet);
 }

 Portrait.orderList = function(obj) {
     var ret = [];
     for (var key in obj) {
         var item = {}
         item.point = obj[key];
         item.image = key;
         ret.push(item);
     }
     ret.sort(function(a, b) {
         return a.point < b.point;
     });
     return ret;
 }

 Portrait.table = function(list) {
     var ret = {};
     for (var i = 0; i < list.length; i++) {
         for (var key in list[i]) {
             ret[key] = list[i][key];
         }
     }
     return ret;
 }


 var loadingBar = legend.getComponentsByName('loadingBar')[0].trailerElement;
 var loadingBg = legend.getComponentsByName('loadingBg')[0].trailerElement;
 var runBear = legend.getComponentsByName('runBear')[0].trailerElement;

 var canvasPannel = legend.getComponentsByName('canvasPannel')[0].trailerElement;
 var canvasPannel2 = legend.getComponentsByName('canvasPannel2')[0].trailerElement;
 var protraitImg = legend.getComponentsByName('protraitImg')[0].trailerElement;
 var protraitWord = legend.getComponentsByName('protraitWord')[0].trailerElement;
 var protraitDesc = legend.getComponentsByName('protraitDesc')[0].trailerElement;
 var portraitTransparent = legend.getComponentsByName('transparent')[0];
 var portraitTip = legend.getComponentsByName('portraitTip')[0].trailerElement;

 var btnShowOff = legend.getComponentsByName('showOffBtn')[0];
 var btnOpenApp = legend.getComponentsByName('openApp');
 var btnInvokeApp = legend.getComponentsByName('invokeApp')[0];
 var btnRetry = legend.getComponentsByName('retryBtn')[0];
 var maskShare = legend.getComponentsByName('share')[0];
 var maskOpenByoutBrowser = legend.getComponentsByName('openByoutBrowser');
 var maskOpenByoutBrowser1 = legend.getComponentsByName('openByoutBrowser1');
 var tip0 = legend.getComponentsByName('tip-0')[0].trailerElement;
 var tip1 = legend.getComponentsByName('tip-1')[0].trailerElement;
 var tip2 = legend.getComponentsByName('tip-2')[0].trailerElement;
 var tip3 = legend.getComponentsByName('tip-3')[0].trailerElement;
 var tip4 = legend.getComponentsByName('tip-4')[0].trailerElement;

 // var esp0 = legend.getComponentsByName('esp0')[0].trailerElement;
 // var esp1 = legend.getComponentsByName('esp1')[0].trailerElement;
 // var esp2 = legend.getComponentsByName('esp2')[0].trailerElement;
 // var esp3 = legend.getComponentsByName('esp3')[0].trailerElement;
 // var esp4 = legend.getComponentsByName('esp4')[0].trailerElement;

 var ua = navigator.userAgent;
 var isQQ = /(MQQwebView)|( QQ\b)/i.test(ua);
 var isWeibo = /weibo_+([^_]+)/i.exec(ua);
 var isWechat = /MicroMessenger/i.test(ua) || /MicroMessenger/i.test(window.location.search);
 var isSharePlatform = isWechat || isWeibo || isQQ;
 var isOuterBrowser = !isSharePlatform && (/festival_share/i.test(window.location.href) || /adinote/i.test(window.location.href));
 var isVideo = !isSharePlatform && !isOuterBrowser;
 var isAndroid = ua.match(/(Android).*?([\d.]+)/) || /HTC/.test(ua);
 var isIphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
 var openAppUrl = 'http://m.v.baidu.com/topic/proxy?&downRoot=';
 var uid = /cuid=([^&]*)/ig.exec(window.location.search);

 if (isOuterBrowser) {
     setTimeout(function() {
         window.location.href = openAppUrl;
     }, 1000);
 }
debugger;
 new Portrait({
     canvasPannel: canvasPannel,
     canvasPannel2: canvasPannel2,
     protraitImg: protraitImg,
     protraitWord: protraitWord,
     protraitDesc: protraitDesc,
     portraitTransparent: portraitTransparent,
     portraitTip: portraitTip,
     btnOpenApp: btnOpenApp,
     btnInvokeApp: btnInvokeApp,
     btnShowOff: btnShowOff,
     btnRetry: btnRetry,
     maskShare: maskShare,
     maskOpenByoutBrowser: maskOpenByoutBrowser,
      maskOpenByoutBrowser1: maskOpenByoutBrowser1,
     tips: [tip0, tip1, tip2, tip3, tip4],
     // esp: [esp0, esp1, esp2, esp3, esp4],
     openAppUrl: openAppUrl,
     isAndroid: isAndroid,
     isVideo: isVideo,
     isSharePlatform: isSharePlatform,
     isOuterBrowser: isOuterBrowser,
     uid: uid && uid[1] ? uid[1] : ''
 });

 function loading() {
     var $loadingBar = $(loadingBar);
     var $loadingBg = $(loadingBg);
     var $runBear = $(runBear).children();
     var rw = $runBear.width();
     var w = $loadingBar.width();
     var t = 3;
     var f = 60;
     var tx = (w - rw) / (f * t);
     var count = 1;
     var handler = function() {
         setTimeout(function() {
             count++;
             if (count >= (f * t)) {
                 var pageIndex = legend.getData().pages.length - 1;
                 if (uid && isSharePlatform) {
                     pageIndex = pageIndex - 1;
                 } else if (uid) {
                     pageIndex = 1;
                 }
                 legend.render.gotoPage(pageIndex);
             } else {
                 $runBear.css('transform', 'translateX(' + count * tx + 'px' + ')');
                 $loadingBg.width(rw + count * tx);
                 handler();
             }
         }, 1000 / f);
     };
     $(loadingBg).css('overflow', 'hidden').children().css('width', w + 'px').children().css('width', w + 'px');
     handler();
 }
 loading();
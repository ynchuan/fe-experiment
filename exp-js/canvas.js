function MirrorExact() {
    this.pagePc = $('#pagePc');
    this.pageContent = $('#pageContent');
    this.pageLoading = $('#pageLoading');
    this.pageStart = $('#pageStart');
    this.pageMain = $('#pageMain');
    this.pageEnd = $('#pageEnd');
    this.pageShare = $('#pageShare');
    this.pageColl = $('#pageColl');
    this.radio = 1;
    this.index = 0;
    this.fps = 40;
    this.scale = .985;
    this.scaleSlow = .995;
    this.imgList = [{
        link: 'imgMirror/P1.jpg',
        imgW: '800',
        imgH: '1280'
    }, {
        link: 'imgMirror/P2.jpg',
        limitMax: .08,
        limitMin: .06,
        imgW: '1875',
        imgH: '3015',
        areaW: '125',
        areaH: '203',
        areaL: '1195',
        areaT: '1923'
    }, {
        link: 'imgMirror/P3.jpg',
        limitMax: .5,
        limitMin: .4,
        imgW: '1875',
        imgH: '3015',
        areaW: '740',
        areaH: '1191',
        areaL: '657',
        areaT: '700'
    }, {
        link: 'imgMirror/P4.jpg',
        limitMax: .22,
        limitMin: .15,
        imgW: '1875',
        imgH: '3015',
        areaW: '283',
        areaH: '456',
        areaL: '633',
        areaT: '194'
    }, {
        link: 'imgMirror/P5.jpg',
        limitMax: .4,
        limitMin: .33,
        imgW: '1875',
        imgH: '3015',
        areaW: '615',
        areaH: '988',
        areaL: '630',
        areaT: '156'
    }, {
        link: 'imgMirror/P6.jpg',
        limitMax: .28,
        limitMin: .23,
        imgW: '1875',
        imgH: '3015',
        areaW: '410',
        areaH: '658',
        areaL: '733',
        areaT: '301'
    }, {
        link: 'imgMirror/P7.jpg',
        limitMax: .2,
        limitMin: .15,
        imgW: '1875',
        imgH: '3015',
        areaW: '295',
        areaH: '475',
        areaL: '1414',
        areaT: '1352'
    }, {
        link: 'imgMirror/P8.jpg',
        limitMax: .1,
        limitMin: .06,
        imgW: '1875',
        imgH: '3015',
        areaW: '125',
        areaH: '200',
        areaL: '1049',
        areaT: '1554'
    }];

    this.init();
}

MirrorExact.prototype.init = function() {

    this.initUA();
    this.initPageEvent();

    // var self = this;
    // this.initEvent();
    // setTimeout(function() {
    //     self.planeFly();
    // }, 1000);

    if (!this.uaInfo.isAndroid && !this.uaInfo.isIphone) {
        this.pageContent.hide();
        return;
    }
    this.sendPV();
    this.initAudio();
    this.initCanvas();
    this.preLoad().done(function() {
        setTimeout((function() {
            this.pageLoading.addClass('hide');
            this.pageStart.addClass('active');
            this.draw();
            this.initEvent();
        }).bind(this), 1500);
    });
    this.wxShare();
};

MirrorExact.prototype.initUA = function() {
    var ua = navigator.userAgent;
    var isQQ = /(MQQwebView)|( QQ\b)/i.test(ua);
    var isWeibo = /weibo_+([^_]+)/i.exec(ua);
    var isWechat = /MicroMessenger/i.test(ua) || /MicroMessenger/i.test(window.location.search);
    var isSharePlatform = isWechat || isWeibo || isQQ;
    var isOuterBrowser = !isSharePlatform && (/festival_share/i.test(window.location.href) || /adinote/i.test(window.location.href));
    var isVideo = !isSharePlatform && !isOuterBrowser;
    var isAndroid = ua.match(/(Android).*?([\d.]+)/) || /HTC/.test(ua);
    var isIphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
    this.uaInfo = {
        isQQ: isQQ,
        isWeibo: isWeibo,
        isWechat: isWechat,
        isSharePlatform: isSharePlatform,
        isOuterBrowser: isOuterBrowser,
        isVideo: isVideo,
        isAndroid: isAndroid,
        isIphone: isIphone,
        device: isAndroid ? 'and' : (isIphone ? 'iph' : 'pc')
    };
    if (this.uaInfo.isAndroid || this.uaInfo.isIphone) {
        this.EVENTDOWN = 'touchstart';
        this.EVENTUP = 'touchend';
    } else {
        this.EVENTDOWN = 'mousedown';
        this.EVENTUP = 'mouseup';
    }
};

MirrorExact.prototype.sendPV = function(param) {
    param = param || '';
    var url = 'http://pc.videoclick.baidu.com/' +
        'p.gif?pid=104&tn=mirrorExact&tpl=mirrorExact&' +
        param +
        '&u=' + encodeURIComponent(location.href) +
        '&ua=' + this.uaInfo.device +
        '&_=' + (+new Date());
    var img = new Image();
    img.src = url;
};

MirrorExact.prototype.wxShare = function(o) {
    var url = 'http://m.v.baidu.com/wechat/sign?url=' +
        window.encodeURIComponent(location.href.split(/#/)[0]);
    $.ajax({
        url: url,
        cache: false,
        dataType: "jsonp",
        jsonpCallback: '_wxCallback',
        success: function(e) {
            e = e.data;
            var config = {
                // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                // debug: true,
                appId: 'wx2ee6627a1a6199f1',
                timestamp: e.timestamp,
                nonceStr: e.nonceStr,
                signature: e.signature,
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            };
            wx.config(config);
            wx.ready(function() {
                var shareObj = {
                    title: '你',
                    desc: '子',
                    // link: 'http://list.video.baidu.com/mirrorExact.html',
                    imgUrl: 'http://list.video.baidu.com/r/image/2017-01-23/0f8f57e023aa39bcb08664604dba941d.jpg'
                };
                wx.onMenuShareTimeline(shareObj);
                wx.onMenuShareAppMessage(shareObj);
            });
            wx.error(function(e) {
                console.log(e);
            });
        }
    });
};

MirrorExact.prototype.initAudio = function() {
    var self = this;
    this.music = $('#music');
    this.audio = document.createElement("audio");
    this.audio.loop = true;
    this.audio.preLoad = true;
    this.audio.autoplay = 'autoplay';
    this.srcDOM = document.createElement("source");
    this.srcDOM.src = 'http://boscdn.bpc.baidu.com/v1/legend/1485267728864.868096.ab.mp3';
    // this.srcDOM.src = 'http://file.ws.126.net/f2e/ent/ent_painting2016/files/sjsznh.mp3';
    this.audio.appendChild(this.srcDOM);
    document.body.appendChild(this.audio);
    this.audio.load();
    this.audio.play();
    // this.audio = new Audio();
    document.addEventListener("WeixinJSBridgeReady", function() {
        self.audio.play();
    });
    this.music.on(this.EVENTDOWN, function() {
        var $this = $(this);
        if ($this.hasClass('d-music-close')) {
            $this.removeClass('d-music-close');
            self.audio.play();
        } else {
            $this.addClass('d-music-close');
            self.audio.pause();
        }
    });
};

MirrorExact.prototype.initCanvas = function() {
    this.canvas = document.getElementById('cvsApp');
    this.ctx = this.canvas.getContext('2d');
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    //切换宽屏
    if (this.w > this.h) {
        this.w = 800;
        this.h = 1280;
        this.pageContent.width(this.w).height(this.h);
    }
    this.canvas.setAttribute('width', this.w);
    this.canvas.setAttribute('height', this.h);
};

MirrorExact.prototype.preLoad = function() {
    var imgs = this.imgList;
    var len = imgs.length;
    var count = 0;
    var self = this;
    var doneFun = function() {};
    var chainFun = function() {
        count++;
        count === len && doneFun.call(self, self.imgList);
    };

    for (var m = 0; m < len; m++) {
        var imgObj = this.imgList[m];
        var img = new Image;
        imgObj.image = img;
        img.src = imgObj.link;
        img.index = m;
        img.name = m;
        img.className = 'img-item';
        img.onload = function() {
            // self.pageColl.append(this);
            chainFun();
        };
        img.onerror = function() {
            console.log('图片获取失败索引:' + this.index);
            chainFun();
            // self.pageColl.append(this);
        }
    }
    return {
        done: function(fun) {
            doneFun = fun || doneFun;
        }
    }
};

MirrorExact.prototype.showEnd = function() {
    var self = this;
    this.pageEnd.addClass('active').removeClass('hide');
    this.pageMain.removeClass('active').addClass('hide');
    this.startBtn.addClass('hide');
    this.shareBtn.removeClass('hide');
    this.tryAgainBtn.removeClass('hide');
    // this.planeFly();
};

MirrorExact.prototype.planeFly = function() {
    var plane = this.pageShare.find('.share-arrow');
    var start = +(new Date);
    var end = start;
    var isReach = false;
    var index = 0;
    var startPos = this.shareBtn.offset();
    var endPos = plane.offset();
    var startX = startPos.left;
    var startY = startPos.top;
    var endX = endPos.left;
    var endY = endPos.top;
    var sangle = (Math.atan((endX - startX) / (startY - endY))) * 2;
    console.log('sangle=' + (sangle / Math.PI * 180));
    var r = (startY - endY) / Math.sin(sangle);
    var m = r + startX;
    var flyFrame = function() {
        end = +(new Date);
        if (end - start > 1000) {
            start = end;
            fly();
        }
        if (!isReach) {
            requestAnimationFrame(flyFrame);
        }
    };
    var fly = function() {
        var angle = (180 - index * 5) * Math.PI / 180;
        if (angle < sangle) {
            isReach = true;
        }
        console.log('angle=' + (angle / Math.PI * 180));

        var x = r * Math.cos(angle) + m;
        var y = r * Math.sin(angle) + startY;
        move(x, y);
        index++;
    };

    var move = function(x, y) {
        plane.css({
            'left': x + 'px',
            'top': y + 'px'
        });
    };
    requestAnimationFrame(flyFrame);
}

MirrorExact.prototype.draw = function() {
    var imglist = this.imgList;
    var idx = this.index;

    if (idx < imglist.length) {
        if (this.radio < imglist[idx + 1].areaW / imglist[idx + 1].imgW) {
            this.index++;
            this.radio = 1;
            console.log(idx);
            if (!imglist[idx + 2]) {
                return this.showEnd();
            }
        }
        this.imgNext = this.imgList[this.index + 1];
        this.imgCur = this.imgList[this.index];
        // debugger;
        this.drawImgOversize(
            this.imgNext.image,
            this.imgNext.imgW,
            this.imgNext.imgH,
            this.imgNext.areaW,
            this.imgNext.areaH,
            this.imgNext.areaL,
            this.imgNext.areaT,
            this.radio
        );

        this.drawImgMinisize(
            this.imgCur.image,
            this.imgCur.imgW,
            this.imgCur.imgH,
            this.imgNext.imgW,
            this.imgNext.imgH,
            this.imgNext.areaW,
            this.imgNext.areaH,
            this.imgNext.areaL,
            this.imgNext.areaT,
            this.radio
        );
    }
};

MirrorExact.prototype.initEvent = function() {
    var self = this;
    this.startBtn = $('#startBtn');
    this.shareBtn = $('#shareBtn');
    this.tryAgainBtn = $('#tryAgainBtn');
    this.startBtn.bind(this.EVENTDOWN, function(e) {
        e.preventDefault();
        var startTime = (+new Date);
        if (!self.isCloseStartPage) {
            self.pageStart.removeClass('active').addClass('hide');
            self.pageMain.addClass('active');
            self.isCloseStartPage = true;
        }

        function shrink() {
            var nowTime = (+new Date);
            if (self.index < self.imgList.length - 1) {
                if (nowTime - startTime < 1000 / self.fps) {
                    self.timer = requestAnimationFrame(shrink);
                    return;
                };
                startTime = nowTime;

                var nextImg = self.imgList[self.index + 1];
                if (nextImg.limitMax && nextImg.limitMin &&
                    self.radio < nextImg.limitMax &&
                    self.radio > nextImg.limitMin) {
                    // 降速缩小
                    self.radio = self.scaleSlow * self.radio
                } else {
                    self.radio = self.scale * self.radio
                }

                self.draw();
                self.timer = requestAnimationFrame(shrink);
            }
        }
        cancelAnimationFrame(self.timer);
        self.timer = requestAnimationFrame(shrink);
    });
    this.startBtn.bind(this.EVENTUP, function() {
        cancelAnimationFrame(self.timer);
    });
    this.shareBtn.bind(this.EVENTDOWN, function(e) {
        self.pageShare.removeClass('hide');
    });
    this.pageShare.bind(this.EVENTDOWN, function(e) {
        self.pageShare.addClass('hide');
    });
    this.tryAgainBtn.bind(this.EVENTDOWN, function(e) {
        var path = window.location.pathname;
        var host = window.location.host;
        window.location.href = 'http://' + host + path + '?v=' + (+new Date);
    });
};

MirrorExact.prototype.drawImgOversize = function(img, imgw, imgh, areaw, areah, areal, areat, radio) {
    // 绘制背景图
    var h = imgh / imgw * this.w;
    this.ctx.drawImage(
        img,
        areal - (areaw / radio - areaw) * (areal / (imgw - areaw)),
        areat - (areah / radio - areah) * (areat / (imgh - areah)),
        areaw / radio,
        areah / radio,
        0,
        0,
        this.w,
        this.h);
};

MirrorExact.prototype.drawImgMinisize = function(img, cimgw, cimgh, imgw, imgh, areaw, areah, areal, areat, radio) {
    // 绘制前贴片图
    this.ctx.drawImage(
        img,
        0,
        0,
        cimgw,
        cimgh,
        (areaw / radio - areaw) * (areal / (imgw - areaw)) * radio * this.w / areaw,
        (areah / radio - areah) * (areat / (imgh - areah)) * radio * this.h / areah,
        this.w * radio,
        this.h * radio);
};

MirrorExact.prototype.cutPic = function(dom) {
    // html2canvas(dom, {
    //     allowTaint: true,
    //     taintTest: false,
    //     onrendered: function(canvas) {
    //         canvas.id = "mycanvas";
    //         //document.body.appendChild(canvas);
    //         //生成base64图片数据
    //         var dataUrl = canvas.toDataURL();
    //         var newImg = document.createElement("img");
    //         newImg.src = dataUrl;
    //         document.body.appendChild(newImg);
    //     }
    // });
};

MirrorExact.prototype.initPageEvent = function() {

    var fun = function(e) {
        e.preventDefault();
    };
    // 取消移动端浏览器长按弹出右键菜单
    document.addEventListener('touchmove', fun, !1);
    document.addEventListener('touchstart', fun, !1);
};

new MirrorExact();

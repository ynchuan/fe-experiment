function i(i) {
    i.preventDefault()
}

function MirrorExact() {
    this.canvas = document.getElementById('cvsApp');
    this.ctx = this.canvas.getContext('2d');
    this.radio = 1;
    this.index = 0;
    this.fps = 40;
    this.scale = .985;
    this.scaleSlow = .995;
    this.isWeiChat = /micromessenger/ig.test(navigator.userAgent);
    this.imgList = [{
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/1.jpg?1520',
        imgW: '750',
        imgH: '1206'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/2.jpg?1520',
        limitMax: .3,
        limitMin: .2,
        imgW: '1875',
        imgH: '3015',
        areaW: '375',
        areaH: '603',
        areaL: '1379',
        areaT: '103'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/3.jpg?1520',
        limitMax: .12,
        limitMin: .08,
        imgW: '1875',
        imgH: '3015',
        areaW: '152',
        areaH: '244',
        areaL: '791',
        areaT: '1193'
    }, {
        link: 'http://img4.cache.netease.com/f2e/ent/ent_painting2016/images/4.jpg?44',
        limitMax: .22,
        limitMin: .15,
        imgW: '1875',
        imgH: '3015',
        areaW: '282',
        areaH: '454',
        areaL: '857',
        areaT: '413'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/5.jpg?44',
        limitMax: .18,
        limitMin: .123,
        imgW: '1875',
        imgH: '3015',
        areaW: '232',
        areaH: '372',
        areaL: '388',
        areaT: '844'
    }, {
        link: 'http://img4.cache.netease.com/f2e/ent/ent_painting2016/images/6.jpg?1200',
        imgW: '1875',
        imgH: '3015',
        areaW: '187',
        areaH: '300',
        areaL: '359',
        areaT: '1226'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/6_5.jpg?1520',
        limitMax: .6,
        limitMin: .415,
        imgW: '1875',
        imgH: '3015',
        areaW: '778',
        areaH: '1251',
        areaL: '133',
        areaT: '856'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/7.jpg?1520',
        imgW: '1875',
        imgH: '3015',
        areaW: '278',
        areaH: '446',
        areaL: '794',
        areaT: '783'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/7_5.jpg?1520',
        limitMax: .75,
        limitMin: .5,
        imgW: '1875',
        imgH: '3015',
        areaW: '938',
        areaH: '1507',
        areaL: '428',
        areaT: '454'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/8.jpg?1520',
        imgW: '1875',
        imgH: '3015',
        areaW: '290',
        areaH: '466',
        areaL: '1276',
        areaT: '665'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/8_5.jpg?1520',
        limitMax: .6,
        limitMin: .415,
        imgW: '1875',
        imgH: '3015',
        areaW: '782',
        areaH: '1258',
        areaL: '977',
        areaT: '557'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/9.jpg?1520',
        imgW: '1875',
        imgH: '3015',
        areaW: '238',
        areaH: '382',
        areaL: '1206',
        areaT: '2310'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/9_5.jpg?1520',
        limitMax: .47,
        limitMin: .355,
        imgW: '1875',
        imgH: '3015',
        areaW: '669',
        areaH: '1076',
        areaL: '894',
        areaT: '1608'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/10.jpg?1520',
        imgW: '1875',
        imgH: '3015',
        areaW: '247',
        areaH: '396',
        areaL: '285',
        areaT: '45'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/10_5.jpg?1520',
        limitMax: .75,
        limitMin: .5,
        imgW: '1875',
        imgH: '3015',
        areaW: '938',
        areaH: '1507',
        areaL: '264',
        areaT: '21'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/11.jpg?1520',
        imgW: '1875',
        imgH: '3015',
        areaW: '434',
        areaH: '698',
        areaL: '1059',
        areaT: '192'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/11_5.jpg?1520',
        limitMax: .6,
        limitMin: .415,
        imgW: '1875',
        imgH: '3015',
        areaW: '780',
        areaH: '1256',
        areaL: '1038',
        areaT: '679'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/12.jpg?1520',
        imgW: '1875',
        imgH: '3015',
        areaW: '415',
        areaH: '668',
        areaL: '226',
        areaT: '2210'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/12_5.jpg?1520',
        limitMax: .6,
        limitMin: .415,
        imgW: '1875',
        imgH: '3015',
        areaW: '782',
        areaH: '1258',
        areaL: '356',
        areaT: '1652'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/13.jpg?1520',
        imgW: '1875',
        imgH: '3015',
        areaW: '288',
        areaH: '462',
        areaL: '1494',
        areaT: '528'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/13_5.jpg?1520',
        limitMax: .6,
        limitMin: .415,
        imgW: '1875',
        imgH: '3015',
        areaW: '782',
        areaH: '1257',
        areaL: '1017',
        areaT: '482'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/14.jpg?1520',
        imgW: '1875',
        imgH: '3015',
        areaW: '99',
        areaH: '160',
        areaL: '1158',
        areaT: '2312'
    }, {
        link: 'http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/15.jpg?1520',
        limitMax: .1,
        limitMin: .053,
        imgW: '1875',
        imgH: '3015',
        areaW: '469',
        areaH: '753',
        areaL: '1001',
        areaT: '2034 '
    }];
    this.init();
}

MirrorExact.prototype.init = function() {
    this.pageContent = $('#pageContent');
    this.pageLoading = $('#pageLoading');
    this.pageStart = $('#pageStart');
    this.pageMain = $('#pageMain');
    this.pageEnd = $('#pageEnd');
    this.pageShare = $('#pageShare');
    this.startBtn = $('#startBtn');
    this.pageColl = $('#pageColl');
    this.initAudio();
    this.initCanvas();
    this.preLoad().done(function() {
        this.pageLoading.addClass('hide');
        this.pageStart.addClass('active');
        this.draw();
        this.touchEvent();
    });
    var self = this;
    setTimeout(function() {
        // self.cutPic(self.pageContent);
    }, 1000);
};

MirrorExact.prototype.initAudio = function() {
    this.audio = document.getElementById('audio');
    this.music = $('#music');
    this.audio.play();
    this.music.removeClass('d-music-close').on('touchend', function() {
        var $this = $(this);
        if ($this.hasClass('d-music-close')) {
            $this.removeClass('d-music-close');
            this.audio.play();
        } else {
            $this.addClass('d-music-close');
            this.audio.pause();
        }
    });
};

MirrorExact.prototype.initCanvas = function() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    //切换宽屏
    if (this.w > this.h) {
        this.w = 725;
        this.h = 1206;
        this.pageContent.width(this.w).height(this.h);
    }
    this.canvas.setAttribute('width', this.w);
    this.canvas.setAttribute('height', this.h)
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
    this.pageEnd.removeClass('hide');
    this.startBtn.addClass('hide');
    setTimeout(function() {
        self.pageEnd.addClass('active');
    }, 200);
};

MirrorExact.prototype.draw = function() {
    var imglist = this.imgList;
    var idx = this.index;

    if (idx < imglist.length) {
        if (this.radio < imglist[idx + 1].areaW / imglist[idx + 1].imgW) {
            this.index++;
            this.radio = 1;
            if (!imglist[idx + 1]) {
                return this.showEnd();
            }
        }
        console.log(this.index);
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

MirrorExact.prototype.touchEvent = function() {
    var i = this;
    var self = this;
    this.startBtn.bind('touchstart', function() {
        var startTime = (new Date).getTime();
        if (!self.isCloseStartPage) {
            self.pageStart.addClass('hide');
            self.isCloseStartPage = true;
        }

        function shrink() {
            var nowTime = (new Date).getTime();
            if (self.index + 1 < self.imgList.length - 1) {
                if (nowTime - startTime < 1000 / self.fps) {
                    self.timer = requestAnimationFrame(shrink);
                    return;
                };
                startTime = nowTime;
                var nextImg = self.imgList[self.index + 1];
                if (nextImg.limitMax && nextImg.limitMin &&
                    self.radio < nextImg.limitMax &&
                    self.radio > nextImg.limitMin) {
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
    this.startBtn.bind('touchend', function() {
        cancelAnimationFrame(self.timer);
    });
};

MirrorExact.prototype.drawImgOversize = function(img, imgw, imgh, areaw, areah, areal, areat, radio) {
    // 绘制背景图
    this.ctx.drawImage(
        img,
        areal - (areaw / radio - areaw) * (areal / (imgw - areaw)),
        areat - (areah / radio - areah) * (areat / (imgh - areah)),
        areaw / radio,
        areah / radio,
        0,
        0,
        750,
        1206);
     console.log(areaw / radio);
     console.log(radio);
};

MirrorExact.prototype.drawImgMinisize = function(img, cimgw, cimgh, imgw, imgh, areaw, areah, areal, areat, radio) {
    // 绘制前贴片图
    this.ctx.drawImage(
        img,
        0,
        0,
        cimgw,
        cimgh,
        (areaw / radio - areaw) * (areal / (imgw - areaw)) * radio * 750 / areaw,
        (areah / radio - areah) * (areat / (imgh - areah)) * radio * 1206 / areah,
        750 * radio,
        1206 * radio);
};
MirrorExact.prototype.cutPic = function(dom) {
    // 绘制前贴片图
    // this.ctx.drawImage(
    //     dom,
    //     0,
    //     0,
    //     725,
    //     1206);
    // var dataUrl = this.ctx.toDataURL();
    // var newImg = document.createElement("img");
    // newImg.src = dataUrl;
    // document.body.appendChild(newImg);
    html2canvas(dom, {
        allowTaint: true,
        taintTest: false,
        onrendered: function(canvas) {
            canvas.id = "mycanvas";
            //document.body.appendChild(canvas);
            //生成base64图片数据
            var dataUrl = canvas.toDataURL();
            var newImg = document.createElement("img");
            newImg.src = dataUrl;
            document.body.appendChild(newImg);
        }
    });
};

MirrorExact.prototype.initPageEvent = function() {
    $('.share_btn').hide();
    document.addEventListener('touchmove', i, !1);
    document.addEventListener('touchstart', i, !1);
    $('.reload').bind('touchstart', function() {
        window.location.reload()
    });
    $('.share_btn').bind('touchend', function() {
        h5Share.share()
    });
    $('.tie').bind('touchend', function() {
        window.location.href = this.href
    });
    $('.review').bind('touchend', function() {
        window.location.href = this.href
    });
};

new MirrorExact();
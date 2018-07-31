/**
 * @file hover作品播放器
 * @author wangxunxun
 */


/* global __inline */



var HoverPlayer = function($dom, opt) {
    this.opt = opt;
    this.playerTmpl = __inline('./player.tmpl');
    this.$dom = $dom;
    this.duration = opt.duration;
    this.init();
};

/**
 * 初始化播放器区块
 */
HoverPlayer.prototype.init = function() {
    var domStr = this.playerTmpl({
        video: this.opt
    });
    this.$playerWrap = $(domStr);
    this.$playerCover = this.$playerWrap.find('.figure-video-cover');
    this.$playerStart = this.$playerWrap.find('.figure-video-start');
    this.$player = this.$playerWrap.find('.figure-video');
    this.player = this.$player.get(0);
    this.$volume = this.$playerWrap.find('.figure-volume');
    this.$dur = this.$playerWrap.find('.figure-dur');
    this.$dom.append(this.$playerWrap);
    this.play();
    this.addPlayerListener();
};


/**
 * 播放器交互
 */
HoverPlayer.prototype.addPlayerListener = function() {
    var self = this;
    this.$volume.click(function(e) {
        e.preventDefault();
        self.switchVolumn();
    });
    this.$player.on('loadstart', function() {
        self.$playerCover.addClass('hide');
        self.log(self.tpl, self.opt);
    }).on('canplay', function() {
        self.$playerStart.addClass('hide');
    }).on('play', function() {
        console.log('play');
    }).on('waiting', function() {
        console.log('waiting');
    }).on('playing', function() {
        console.log('playing');
    }).on('pause', function() {
        self.player.muted = true;
    }).on('timeupdate', function() {
        var times = Math.floor(self.player.currentTime);
        var duration = Math.floor(self.player.duration);
        console.log('times=' + times);
        self.$dur.text((duration - times) + ' 秒');
    }).on('durationchange', function() {
        console.log('durationchange');
    }).on('error', function() {
        // self.reset();
        // self.player.load();
    });
};

/**
 * 播放器播放
 */
HoverPlayer.prototype.play = function() {
    this.player.play();
};

/**
 * 播放器暂停
 */
HoverPlayer.prototype.stop = function() {
    this.player.muted = true;
    this.$volume.addClass('muted');
    this.player.currentTime = 0;
    this.$dur.text((this.opt.duration) + ' 秒');
    this.player.pause();
    this.player.load();
};

/**
 * 播放器声音开关
 */
HoverPlayer.prototype.switchVolumn = function() {
    if (this.$volume.hasClass('muted')) {
        this.$volume.removeClass('muted');
        this.player.muted = false;
    } else {
        this.$volume.addClass('muted');
        this.player.muted = true;
    }
};

/**
 * 播放器日志
 */
HoverPlayer.prototype.log = function(tpl, stp, obj) {
    var image = new Image();
    var logStr = '';
    for (var key in obj) {
        logStr += '&' + key + '=' + obj[key];
    }
    image.src = 'http://pc.videoclick.baidu.com/u.gif?pid=104&bl=hoverPlayer' + logStr
}

function initHoverPlayer(opt) {
    var $dom = $(opt.id);
    var timeHandler;
    var hoverPlayer;
    var hoverPlayers = {};
    $(document).on('mouseover', '[bdv-video-hover-play]', function(e) {
            var self = this;
            e.preventDefault();
            timeHandler = setTimeout(function() {
                var $this = $(self);
                var isInited = $this.data('inited');
                var type = $this.data('type');
                var id = $this.data('id');
                var uid = type + id;
                hoverPlayer && hoverPlayer.stop();
                if (!isInited) {
                    $this.data('inited', 1);
                    hoverPlayer = new HoverPlayer($dom, {
                        uid: uid,
                        type: type,
                        id: id,
                        src: "http://111.202.98.153/vhot2.qqvideo.tc.qq.com/c1821ffo1o3.mp4?vkey=A0143FDB49E176830733AE8212F6E531015E75136CA6315A9597407F578E01733BB8CB7CD22EBC35F4E7CC4946159513B9CEA7584AC3E50E028CE198643368D83B475A8DB98978C8A207F229E5CD96ABC90EDE9476E48B2A&sdtfrom=v1095&guid=30872d2d239c14cb5b91cfc32db29d30",
                        duration: $this.data('duration'),
                        poster: $this.find('img').attr('src'),
                        title: $this.next().find('.title').text(),
                        subtitle: $this.next().find('.intro').text(),
                        mark: $this.find('.st-mark').text(),
                        link: $this.attr('href'),
                        tpl: opt.tpl,
                        tn: opt.tpl
                    });
                    hoverPlayers[uid] = hoverPlayer;
                } else {
                    hoverPlayer = hoverPlayers[uid];
                    hoverPlayer && hoverPlayer.play();
                }
                var pos = $this.offset();
                $dom.find('.figure-video-main').height($this.height() + 15);
                $dom.css({
                    left: pos.left - 20,
                    top: pos.top - 7,
                    width: $this.width() + 40
                }).removeClass('hide').find('#' + uid).removeClass('hide').siblings().addClass('hide');
            }, 100);
        })
        .on('mouseout', '[bdv-video-hover-play], .hoverPlayer-content', function() {
            clearTimeout(timeHandler);
            $dom.addClass('hide');
            hoverPlayer && hoverPlayer.stop();
        });
}

module.exports = function(opt) {
    initHoverPlayer(opt);
};

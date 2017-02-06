var portrait = [{
    '逗逼+八卦': ['曾小贤', 'a.jpg']
}, {
    '逗逼+二次元': ['毛利小五郎', 'a.jpg']
}, {
    '逗逼+毒舌': ['包龙星', 'a.jpg']
}, {
    '逗逼+善战': ['李逍遥', 'a.jpg']
}, {
    '逗逼+忧国忧民': ['柳大尉', 'a.jpg']
}, {
    '逗逼+博学': ['唐伯虎', 'a.jpg']
}, {
    '逗逼+卖萌': ['小黄人', 'a.jpg']
}, {
    '八卦+二次元': ['太子妃；', 'a.jpg']
}, {
    '八卦+毒舌': ['闲人马大姐', 'a.jpg']
}, {
    '八卦+善战': ['容嬷嬷', 'a.jpg']
}, {
    '八卦+忧国忧民': ['闲人马大姐', 'a.jpg']
}, {
    '八卦+博学': ['唐伯虎', 'a.jpg']
}, {
    '八卦+卖萌': ['太子妃', 'a.jpg']
}, {
    '二次元+毒舌': ['太子妃', 'a.jpg']
}, {
    '二次元+善战': ['路飞', 'a.jpg']
}, {
    '二次元+忧国忧民': ['邓布利多', 'a.jpg']
}, {
    '二次元+博学': ['柯南', 'a.jpg']
}, {
    '二次元+卖萌': ['蜡笔小新', 'a.jpg']
}, {
    '毒舌+善战': ['齐天大圣', 'a.jpg']
}, {
    '毒舌+忧国忧民': ['济公', 'a.jpg']
}, {
    '毒舌+博学': ['林黛玉', 'a.jpg']
}, {
    '毒舌+卖萌': ['金叹', 'a.jpg']
}, {
    '善战+忧国忧民': ['梅长苏', 'a.jpg']
}, {
    '善战+博学': ['东方不败', 'a.jpg']
}, {
    '善战+卖萌': ['樱木花道', 'a.jpg']
}, {
    '忧国忧民+博学': ['狄仁杰', 'a.jpg']
}, {
    '忧国忧民+卖萌': ['辛巴', 'a.jpg']
}, {
    '博学+卖萌': ['柯南', 'a.jpg']
}];

window.addEventListener("DOMContentLoaded", function() {
    var cvs = document.createElement('canvas');
    document.body.appendChild(cvs);
    cvs.style.border = "1px solid red";
    cvs.style.background = "#34CAD8";
    var ctx = cvs.getContext("2d");
    cvs.width = 300;
    cvs.height = 300;
    var r = 150;
    var dnas = [{
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
    ctx.save();
    ctx.beginPath();
    ctx.translate(r, r);
    // ctx.rotate(6 * Math.PI / 180);
    ctx.scale(0.9, 0.9);
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#F6F8FF';
    ctx.fill();
    ctx.beginPath();
    var layers = 5;
    var btw = r / layers;
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#F6F8FF';
    for (var j = 0; j < layers; j++) {
        for (var i = 0, l = dnas.length; i < l; i++) {
            var x = Math.cos(2 * Math.PI / l * i);
            var x1 = Math.cos(2 * Math.PI / l * (i + 1));
            var y = -Math.sin(2 * Math.PI / l * i);
            var y1 = -Math.sin(2 * Math.PI / l * (i + 1));
            ctx.moveTo(btw * j * x, btw * j * y);
            ctx.lineTo(btw * (j + 1) * x, btw * (j + 1) * y);
            ctx.lineTo(btw * (j + 1) * x1, btw * (j + 1) * y1);

            ctx.stroke();
        }
    }
    var gradient = ctx.createLinearGradient(0, 0, cvs.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    for (var i = 0, l = dnas.length; i < l; i++) {
        var x = Math.cos(2 * Math.PI / l * i);
        var y = -Math.sin(2 * Math.PI / l * i);
        ctx.fillStyle = gradient;
        ctx.fillText(getKey(dnas[i]), (r + 5) * x, (r + 5) * y);
    }

    // ctx.restore();

    function getKey(obj) {
        for (var key in obj) {
            return key;
        }
    }

    function getData() {
        $.getJSON('http://yf-video-jwks.yf01.baidu.com:8090/rec/wise/userprofilereport?cuid=40263A40B6E3C0146288D1826B84E976|524931620832868&callback=?', renderPortraitNet);
    }
    getData();

    function renderPortraitNet(data) {
        var leval = data['star-level'];
        var udna = data.tag;
        var srcPointList=[];
        for (var i = 0, l = dnas.length; i < l; i++) {
            var dna = dnas[i];
            var value = udna[getKey(dna)] || 0;
            var x = Math.cos(2 * Math.PI / l * i);
            var x1 = Math.cos(2 * Math.PI / l * (i + 1));
            var y = -Math.sin(2 * Math.PI / l * i);
            var y1 = -Math.sin(2 * Math.PI / l * (i + 1));
            var rx =x * r * value / 100;
            var ry =y * r * value / 100;
            if(!i){
                ctx.beginPath();
                ctx.moveTo(rx, ry);
            }else{
                ctx.lineTo(rx, ry);
            }
            srcPointList.push([rx, ry]);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,215,1,.4)';
        ctx.fill();
        ctx.strokeStyle = '#E30225';
        ctx.stroke();
        for(var j = 0;j<srcPointList.length;j++){
            ctx.beginPath();
            ctx.arc(srcPointList[j][0], srcPointList[j][1], 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
        }
        return leval;
    }

})
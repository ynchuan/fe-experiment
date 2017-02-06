<script>
legend.onApiReady = function(){
    //var script=document.createElement('script');
     //script.src = 'http://localhost:3000/closeCheck.js';
     //document.body.appendChild(script);

var index = 0;
var backrender = true;
legend.render.slider.on('slideChanged', function(idx) {
    if (backrender) {
        index = idx;
        var url = window.location.href.replace(/#page=\d/, ('#page=' + idx))
        history.pushState({
            'page': idx
        }, 'page', url);
    }
    backrender = true;
  debugger;
     localStorage.setItem('page',idx);
});
  setTimeout(function(){
    debugger;
    var page =parseInt(localStorage.getItem('page'))||0;
    if (page) {
        legend.render.gotoPage(window.parseInt(page));
    }
  },500)


window.addEventListener('popstate', function(e) {
    //alert('popstate' + index);
  setTimeout(function(){
    //alert('popstate' + e.state.page);
    backrender = false;
    if (e.state.page !== undefined) {
        legend.render.gotoPage(e.state.page);
    }
  },500)

}, false);

var endbg = legend.getComponentsByName('endbg')[0].trailerElement;

var startx, starty;
//获得角度
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
//手指接触屏幕
endbg.addEventListener("touchstart", function(e) {
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
}, false);
//手指离开屏幕

endbg.addEventListener("touchend", function(e) {

    var endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
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
        legend.render.gotoPage(11);
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



}

</script>
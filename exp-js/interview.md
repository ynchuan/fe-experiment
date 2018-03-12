#css部分

1. 消除浮动影响的方法
2. inline和inline-block元素的不同
3. line-height、height、vertical-align的关系
4. postion的用法，以及和z-index的关系

#js部分
1. js基本数据类型
2. typeof和instanceof的用法
3. 实现一个简单的promise
4. 编码模拟实现一个浏览器前进和回退功能
5. 传值和传对象的不同,以及和闭包的结合

    var a =[];
    var b = 1;
    var fun = function(a,b){
        var fun2 =  function(c){
            var d = b*c; 
            a[0] = 'a';
            console.log(d); 
        }
        b = 9;
        return fun2;
    }
    fun(a,b)(5);
    console.log(a[0],b);
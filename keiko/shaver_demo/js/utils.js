var utils = {
    ua: navigator.userAgent.toLowerCase(),
    o: window.orientation,

    getBrowser: function(){
        var bw = {};
        var s;
        (s = this.ua.match(/msie ([\d.]+)/)) ? bw.ie = s[1] :
                (s = this.ua.match(/firefox\/([\d.]+)/)) ? bw.firefox = s[1] :
                    (s = this.ua.match(/chrome\/([\d.]+)/)) ? bw.chrome = s[1] :
                        (s = this.ua.match(/opera.([\d.]+)/)) ? bw.opera = s[1] :
                            (s = this.ua.match(/version\/([\d.]+).*safari/)) ? bw.safari = s[1] : 0;

        return bw;
    },

    getDevice: function(){
        var d = {};
        (this.ua.match(/ipad/i) == "ipad")? d.ipad = true : d.ipad= false;
        (this.ua.match(/iphone os/i) == "iphone os")? d.iphone = true : d.iphone= false;
        (this.ua.match(/android/i) == "android")? d.android = true : d.android= false;
        (this.ua.match(/windows phone/i) == "windows phone")? d.winPhone = true : d.winPhone = false;

        return d;
    },

    getOrientation: function(){
        var d = {};
        var o = this.o;
        if(o == 0 || o == 180){
            d.landscape = true;
        } else {
            d.portrait = true;
        }

        return d;
    }
}



//以下进行测试
//if (bw.ie) document.write('IE: ' + bw.ie);
//if (bw.firefox) document.write('Firefox: ' + bw.firefox);
//if (bw.chrome) document.write('Chrome: ' + bw.chrome);
//if (bw.opera) document.write('Opera: ' + bw.opera);
//if (bw.safari) document.write('Safari: ' + bw.safari);
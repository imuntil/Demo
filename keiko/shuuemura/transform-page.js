/**
 * Created by jtun02 on 15/6/15.
 */

;(function(window, document, undefined) {
    var tdiv = document.createElement('div');
    var prefix = ['webkit', 'moz', 'o', 'ms'];
    var saveProp = {};

    function _setStyle(ele, styles) {
        var style = ele.style;
        for (var prop in styles) {
            setStyle(style, prop, styles[prop]);
        }
    }


    function setStyle(style, prop, val) {
        var _saveProp = saveProp[ prop ];
        if (_saveProp) {
            style[ _saveProp ] = val;
        }
        else if (style[ prop ] !== undefined) {
            saveProp[ prop ] = prop;
            style[ prop ] = val;
        }
        else {
            some(prefix, function(_prefix) {
                var _prop = ucFirst(_prefix) + ucFirst(prop);
                if (style[ _prop ] !== undefined) {
                    saveProp[ prop ] = _prop;
                    style[ _prop ] = val;
                    return true;
                }
            });
        }
    }

    function getCSSVal(prop) {
        if (tdiv.style[ prop ] !== undefined) {
            return prop;
        }
        else {
            var ret;
            some(prefix, function(_prefix) {
                var _prop = ucFirst(_prefix) + ucFirst(prop);
                if (tdiv.style[ _prop ] !== undefined) {
                    ret = '-' + _prefix + '-' + prop;
                    return true;
                }
            });
            return ret;
        }
    }

    function ucFirst(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    function some(ary, callback) {
        for (var i = 0, len = ary.length; i < len; i++) {
            if (callback(ary[i], i)) {
                return true;
            }
        }
        return false;
    }

    function _getTranslate(x, y) {
        return 'translate3d('+x+'px, '+y+'px, 0)';
    }

    function _getTop(y) {
        return y + 'px';
    }



    /**
     * Pt
     * @type {{pageHeight: (*|jQuery), currentPage: number, totalPage: (*|jQuery)}}
     */

    var Pt = {
        pageHeight: $('body').height(),
        currentPage: 0,
        totalPage: $('.page').size()
    };

    Pt.transformPage = function() {
        var that = this;
        pageAni(that.currentPage);
        [].forEach.call(document.querySelectorAll('.page'), function(item, index, array) {
            _setStyle(item, {
                transitionProperty: getCSSVal('transform'),
                transitionTimingFunction: 'cubic-bezier(0,0,0.25,1)',
                transitionDuration: '700ms',
                transform: _getTranslate(0,-that.currentPage * that.pageHeight)
            });
        });
    };

    Pt.toPrev = function() {
        var that = this;
        that.currentPage--;
        if (that.currentPage < 0) {
            that.currentPage = 0;
            return;
        }
        that.transformPage();
    };

    Pt.toNext = function() {
        var that = this;
        that.currentPage ++;
        if (that.currentPage > that.totalPage - 1) {
            that.currentPage = that.totalPage - 1;
            return;
        }
        that.transformPage();
    };

    Pt.go = function (page) {
        var that = this;
        that.currentPage = page;
        if (that.currentPage < 0) {
            that.currentPage = 0;
        }
        if (that.currentPage > that.totalPage - 1) {
            that.currentPage = that.totalPage - 1;
        }
        that.transformPage();
    };

    function pageAni(page) {
        setTimeout(function() {
            var container = $('.page.ani');
            container.offsetWidth = container.offsetWidth;
            container.removeClass('ani');
            $('.page').eq(page).addClass('ani');
        }, 100);
    }

    window.Pt = Pt;

})(window, document);
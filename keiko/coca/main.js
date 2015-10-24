/**
 * Created by ±ó on 2015/10/24.
 */
$(function () {
    var canvas = document.querySelector('#canvas');
    var _w = canvas.width = $(window).width();
    var _h = canvas.height = $(window).height();


    var stage,
        w, h, mainfest, animate,
        loader;
    function init() {
        stage = new createjs.Stage('canvas');
        w = stage.canvas.width;
        h = stage.canvas. height;
        mainfest = getMainfest();
        loader = new createjs.LoadQueue(false);
        loader.on('complete', mainFn);
        loader.loadManifest(mainfest, true);
    }


    function getMainfest() {
        var mf = [];
        for (var i = 0; i <= 45; i ++) {
            var img = 'star00' + (i > 9 ? i : '0' + i);
            mf.push({
                id:img,
                src:'queueb/'+img+'.jpg'
            });
        }
        for (var i = 0; i <= 9; i++) {
            var img = 'sand_0' + i;
            mf.push({
                id:img,
                src:'queuec/'+img+'.jpg'
            });
        }
        for (var i = 0; i <= 172; i++) {
            var img = '';

            if (i < 10) {
                img = 'water_00' + i;
            } else if (i < 100) {
                img = 'water_0' + i;
            } else {
                img = 'water_' + i;
            }
            mf.push({
                id:img,
                src:'queued/' + img + '.jpg'
            });
        }
        return mf;
    }

    function mainFn() {

        //console.log(getImages().length);
        var spriteSheet = new createjs.SpriteSheet({
            framerate:13,
            images:getImages(),
            frames:{width:640, height:1008},
            animations:{
                first:[0,45,'second',1],
                second:[46,55,'second',1],
                third:[56, 257]
            }
        });

        animate = new createjs.Sprite(spriteSheet, 'third');
        animate.scaleX = _w/640;
        animate.scaleY = _w/640;

        stage.addChild(animate);
        //stage.on('stagemousedown', function () {
        //    animate.gotoAndPlay('end');
        //});

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.on('tick', tick);
    }


    function tick(event) {
        stage.update(event);
    }

    function getImages() {
        var imgs = [];
        mainfest.forEach(function (item) {
            var _img = loader.getResult(item.id);
            imgs.push(_img);
        });
        return imgs;
    }

    window.onload = init();
});
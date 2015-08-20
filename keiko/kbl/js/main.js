/**
 * Created by jtun02 on 15/6/11.
 */

IMGS = {};

/**
 * Img Function
 * @param {HTMLElement} img
 * @param {object} options
 * @return {object} Img
 */
function Img(img, options) {
    return (this instanceof Img)
        ? this.init(img, options)
        : new Img(img, options);
}
Img.prototype.init = function(img, options) {
    var self = this;
    self.img = img;
    self.scale = options.scale || 1;
    self.tx = options.tx || 0;
    self.ty = options.ty || 0;
    self.angle = options.angle || 0;
};


function handleFiles(e, ele) {
    var files = e || window.event,
        img = document.querySelector('.' + ele),
        d = utils.getDevice();

    if (d.iphone) {
        var file = files.files[0],
            mpimg = new MegaPixImage(file);

        var tcanvas = document.createElement('canvas');
        tcanvas.width = 800;
        tcanvas.height = 800;
        mpimg.render(tcanvas, {maxWidth:800, maxHeight:800});
        setTimeout(function() {
            img.src = tcanvas.toDataURL();
            img.onload = function() {
                layoutImg();
            }
        }, 1200);
    } else {
        window.URL = window.URL || window.webkitURL;
        if (window.URL) {
            img.src = window.URL.createObjectURL(files.files[0]);
            img.onload = function() {
                window.URL.revokeObjectURL(this.src);
                layoutImg();
            }
        } else if (window.FileReader) {
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function() {
                img.src = this.result;
                img.onload = function() {
                    layoutImg();
                }
            }
        } else {
            e.select();
            e.blur();
            var nfile = document.selection.createRange().text;
            document.selection.empty();
            img.src = nfile;
            img.onload = function() {
                layoutImg();
            }
        }
    }

    function layoutImg() {
        var parent = $(img).parent();
        var cw = parent.width(),
            nw = img.naturalWidth,
            ch = parent.height(),
            nh = img.naturalHeight;
        var ratio = cw / nw,
            tx = -(nw - cw) / 2 | 0,
            ty = -(nh - ch) / 2 | 0;

        var _img = new Img(img, {scale:ratio, tx:tx, ty:ty});
        var value = [
            'translate3d(' + tx + 'px, ' + ty + 'px, 0)',
            'scale(' + ratio + ', ' + ratio + ')'
        ];
        value = value.join(" ");
        img.style.webkitTransform = value;
        img.style.mozTransform = value;
        img.style.transform = value;

        IMGS[ele] = _img;
    }
}


var mc = new Hammer.Manager(document.querySelector('body'));
mc.add(new Hammer.Pan({ threshold: 12, pointers: 0 }));
//mc.add(new Hammer.Swipe({direction: 24})).recognizeWith(mc.get('pan'));
//mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(t_g.mc.get('pan'));
//mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([t_g.mc.get('pan'), t_g.mc.get('rotate')]);

mc.on("panstart panmove", onPan);

function onPan(e) {
    if (e.type == 'panstart' && $(e.target).is('body')) {

    }
    console.log('pan');
    console.log(e);
}


$('#h-f').click(function(e, ele) {
    $(this).data('ele', ele);
}).change(function(e) {
    handleFiles(this, $(this).data('ele'));
});
$('.pick-photo').click(function() {
    $('#h-f').trigger('click',[$(this).siblings('img').attr('class')]);
});
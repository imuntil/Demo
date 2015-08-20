/**
 * Created by jtun02 on 14/12/15.
 */



var workMake = {};
workMake.handleFiles = function(e) {

    var files = e || window.event,
        img = document.getElementById('photo-file'),
        d = utils.getDevice();

    if (d.iphone) {
        var file = files.files[0],
            mpimg = new MegaPixImage(file);

        var tcanvas = document.createElement('canvas');
        tcanvas.width = 800;
        tcanvas.height = 800;
        mpimg.render(tcanvas, {maxWidth:800,maxHeight:800});
        setTimeout(function() {
            img.src = tcanvas.toDataURL();
            img.onload = function() {
                layout();
            };
        }, 1200);
    } else {

        window.URL = window.URL || window.webkitURL;

        if (window.URL) {

            img.src = window.URL.createObjectURL(files.files[0]);

            img.onload = function(ev) {
                window.URL.revokeObjectURL(this.src);
                layout();
            };

        } else if (window.FileReader) {
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function(ev) {
                img.src = this.result;
                img.onload = function() {
                    layout();
                }
            }
        } else {
            e.select();
            e.blur();
            var nfile = document.selection.createRange().text;
            document.selection.empty();
            img.src = nfile;
            img.onload = function() {
                layout();
            }
        }

        function layout() {
            $('#upload_area, #make_header, #make_btn').hide();
            $('#make_bg, #make_btn2').show();
            $("#make_content").height($("#make_content").width()*454/296);
            $('#img_area').height($('#img_area').width());

            var cw = $('#f-content').width(),
                nw = img.naturalWidth,
                ch = $('#f-content').height(),
                nh = img.naturalHeight;

            if (nw < 380 || nh < 380) {
                if (nw < nh) {
                    nh = 380*nh/nw;
                    nw = 380;
                } else {
                    nw = 380*nw/nh;
                    nh = 380;
                }

                var sc = document.createElement('canvas');
                sc.width = nw;
                sc.height = nh;
                var st = sc.getContext('2d');
                st.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight,
                    0, 0, nw, nh);
                img.src = sc.toDataURL();
                img.onload = function() {
                    imginit();
                }
            } else {
                imginit();
            }


            function imginit() {
                workMake.scale = cw/nw;
                workMake.tx = -(nw - cw)/2;
                workMake.ty = -(nh - ch)/2;



                var  value = [
                    'translate3d(' + workMake.tx + 'px, ' + workMake.ty + 'px, 0)',
                    'scale(' +  workMake.scale + ', ' +  workMake.scale + ')'];
                value = value.join(" ");
                img.style.webkitTransform = value;
                img.style.mozTransform = value;
                img.style.transform = value;

//        alert(img.style.transform);

//                synthetic.init();
                t_g.init();
            }
        }
    }
};



var t_g = {
    photo:{
        im:document.getElementById('photo-file')
    },
    shaver:{
        im:document.getElementById('deco-shaver')
    },
    glass:{},
    tie:{}
};

t_g.el = document.getElementById('f-content');
t_g.im = t_g.photo.im;


t_g.mc = new Hammer.Manager(t_g.el);

t_g.init = function(img) {
    this.transform.scale = workMake.scale;
    this.transform.translate.x = workMake.tx;
    this.transform.translate.y = workMake.ty;
//    t_g.im = img;
};
t_g.initTransform = function() {
    this.transform = {
        translate:{x: 0, y: 0},
        scale: 1,
        angle: 0,
        rx: 0,
        ry: 0,
        rz: 0
    };
    t_g.tm = {
        x: 0,
        y: 0,
        sc: 1,
        an: 0
    };
};
t_g.initTransform();

t_g.mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
t_g.mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(t_g.mc.get('pan'));
t_g.mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([t_g.mc.get('pan'), t_g.mc.get('rotate')]);
t_g.mc.add(new Hammer.Tap());

t_g.updateElementTransform = function() {
    var value = [
        'translate3d(' + t_g.transform.translate.x + 'px, ' + t_g.transform.translate.y + 'px, 0)',
        'scale(' + t_g.transform.scale + ', ' + t_g.transform.scale + ')',
        'rotate3d('+ t_g.transform.rx +','+ t_g.transform.ry +','+ t_g.transform.rz +','+  t_g.transform.angle + 'deg)'
    ];

    value = value.join(" ");
    t_g.im.style.webkitTransform = value;
    t_g.im.style.mozTransform = value;
    t_g.im.style.transform = value;
};

t_g.onPan = function(ev) {
    if (ev.type == 'panstart') {
        t_g.tm.x = t_g.transform.translate.x || 0;
        t_g.tm.y = t_g.transform.translate.y || 0;
    }

    t_g.transform.translate = {
        x: t_g.tm.x + ev.deltaX,
        y: t_g.tm.y + ev.deltaY
    };
    t_g.updateElementTransform();
};

t_g.onRotate = function(ev) {

    if (t_g.im != t_g.photo.im) {
        return;
    }

    if(ev.type == 'rotatestart') {
        t_g.tm.an = t_g.transform.angle || 0;
    }

    t_g.transform.rz = 1;
    t_g.transform.angle = t_g.tm.an + ev.rotation;
    t_g.updateElementTransform();
};

t_g.onPinch = function(ev) {
    if(ev.type == 'pinchstart') {
        t_g.tm.sc = t_g.transform.scale || 1;
    }

    t_g.transform.scale = t_g.tm.sc * ev.scale;
    t_g.updateElementTransform();
};

t_g.onTap = function(ev) {

    alert('tap');
    return;

    var btn = document.getElementById('choose_photo').getBoundingClientRect();
    var x = btn.left,
        w = btn.left + btn.width,
        y = btn.top,
        h = btn.height + btn.top;

    var p = ev.pointers[0];

    if (p.clientX >= x && p.clientX <= w && p.clientY >= y && p.clientY <= h) {
        $('#input').trigger('click');
    }
};


t_g.mc.on('tap', t_g.onTap);
t_g.mc.on("panstart panmove", t_g.onPan);
t_g.mc.on("rotatestart rotatemove", t_g.onRotate);
t_g.mc.on("pinchstart pinchmove",t_g.onPinch);



var synthetic = {};
synthetic.init = function() {
    this.photocanvas = document.createElement('canvas');
    this.photocanvas.width = $('#f-content').width();
    this.photocanvas.height = $('#f-content').height();
    this.photocxt = this.photocanvas.getContext('2d');
};
synthetic.init();
synthetic.draw = function(ob) {
    this.photocxt.clearRect(0, 0, this.photocanvas.width, this.photocanvas.height);

    var tc = document.createElement('canvas');
    tc.width = ob.im.naturalWidth;
    tc.height = ob.im.naturalHeight;

    console.log(ob.transform);
    var tt = tc.getContext('2d');
    tt.save();
    tt.translate(tc.width/2 + ob.transform.translate.x, tc.height/2 + ob.transform.translate.y);
    tt.scale(ob.transform.scale, ob.transform.scale);
    tt.rotate(ob.transform.angle*Math.PI/180);

    tt.drawImage(ob.im, 0, 0, ob.im.naturalWidth, ob.im.naturalHeight,
       -tc.width/2, -tc.height/2, tc.width, tc.height);
    tt.restore();

    this.photocxt.drawImage(tc, 0 ,0);
};

synthetic.drawDeco = function(ob) {

    console.log(ob.transform);
    var s = ob.transform.scale,
        t = ob.transform.translate;
//    this.photocxt.drawImage(ob.im, 0, 0, ob.im.width, ob.im.height,
//    100+t.x*s, 100+t.y*s, ob.im.width*s, ob.im.height*s);
    this.photocxt.save();
    this.photocxt.translate(150+t.x, 150+t.y);
    this.photocxt.scale(s, s);
    this.photocxt.drawImage(ob.im, 0, 0, ob.im.width, ob.im.height,
    -ob.im.width/2, -ob.im.height/2, ob.im.width, ob.im.height);
    this.photocxt.restore();
};

synthetic.drawPic = function() {
    this.photocxt.clearRect(0, 0, this.photocanvas.width, this.photocanvas.height);

    var tc = document.createElement('canvas');
    tc.width = t_g.photo.im.naturalWidth;
    tc.height = t_g.photo.im.naturalHeight;

    console.log(t_g.photo.transform);
    var tt = tc.getContext('2d');
    tt.save();
    tt.translate(tc.width/2 + t_g.photo.transform.translate.x, tc.height/2 + t_g.photo.transform.translate.y);
    tt.scale(t_g.photo.transform.scale, t_g.photo.transform.scale);
    tt.rotate(t_g.photo.transform.angle*Math.PI/180);

    tt.drawImage(t_g.photo.im, 0, 0, t_g.photo.im.naturalWidth, t_g.photo.im.naturalHeight,
        -tc.width/2, -tc.height/2, tc.width, tc.height);
    tt.restore();

    this.photocxt.drawImage(tc, 0 ,0);
//    this.photocxt.drawImage(tc, 0, 0, this.photocanvas.width/2, this.photocanvas.height/2,
//        0, 0, this.photocanvas.width, this.photocanvas.height);


    //150=img.left + img.width/2

    var s = t_g.shaver.transform.scale,
        t = t_g.shaver.transform.translate;
    this.photocxt.save();
    this.photocxt.translate(150+t.x, 150+t.y);
    this.photocxt.scale(s, s);
    this.photocxt.drawImage(t_g.shaver.im, 0, 0, t_g.shaver.im.width, t_g.shaver.im.height,
        -t_g.shaver.im.width/2, -t_g.shaver.im.height/2, t_g.shaver.im.width, t_g.shaver.im.height);
    this.photocxt.restore();
};





//选择照片
$('#f-btn').change(function() {
    workMake.handleFiles(this);
});
$('#deco-shaver-list img').click(function() {
    $('#deco-shaver').attr('src', $(this).attr('src'));
    t_g.photo.transform = t_g.transform;
    t_g.initTransform();
    t_g.im = t_g.shaver.im;

//    t_g.shaver.transform = t_g.transform;
//    t_g.shaver.transform.scale = 1.4;
//    t_g.shaver.transform.translate.x = -33;
//    t_g.shaver.transform.translate.y = 80;
//    t_g.updateElementTransform();
});
$('#c').click(function() {

//    t_g.shaver.transform = t_g.transform;
//    t_g.shaver.transform.scale = 1.5;
//    t_g.shaver.transform.translate.x = -30;
//    t_g.shaver.transform.translate.y = 100;
//    t_g.updateElementTransform();

    t_g.shaver.transform = t_g.transform;
    t_g.initTransform();

//    synthetic.draw(t_g.photo);
//    synthetic.drawDeco(t_g.shaver);
    synthetic.drawPic();
    $('#show').attr('src', synthetic.photocanvas.toDataURL());

    return false;
});
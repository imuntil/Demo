/**
 * Created by jtun02 on 15/6/12.
 */
$(function() {

    var imgs = document.querySelectorAll('.img-content');
    [].forEach.call(imgs, function(item, index, array) {
        var bound = item.getBoundingClientRect();
        var _class = 'operate-' + $(item).find('img').attr('class');
        createDiv(bound, _class);
    });

    function createDiv(bound, _class) {
        $('body').append('<div class="'+_class+'"></div>');
        $('.'+_class).css({
            position:'absolute',
            left:bound.left,
            top:bound.top,
            width:bound.width,
            height:bound.height,
            'z-index':10
        });
    }


});
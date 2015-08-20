/**
 * Created by jtun02 on 15/4/29.
 */

Raphael.fn.pieChart = function (cx, cy, r, values, labels, stroke) {
    var paper = this,
        ringwidth = 20,
        linePoints = [],
        rad = Math.PI / 180,
        chart = this.set();
    function sector(cx, cy, r, startAngle, endAngle, params) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);

        var ix1 = cx + (r - ringwidth) * Math.cos(-startAngle * rad),
            ix2 = cx + (r - ringwidth) * Math.cos(-endAngle * rad),
            iy1 = cy + (r - ringwidth) * Math.sin(-startAngle * rad),
            iy2 = cy + (r - ringwidth) * Math.sin(-endAngle * rad);

        return paper.path(["M", ix1, iy1, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0,
            x2, y2, 'L', ix2, iy2, 'A', r-ringwidth, r-ringwidth, 0, +(endAngle - startAngle > 180), 1, ix1, iy1, 'z']).attr(params);

    }

    function polyline(cx, cy, r, popangle) {
        var x1 = cx + r * Math.cos(-popangle * rad),
            y1 = cy + r * Math.sin(-popangle * rad),


            x2 = (x1 > cx) ? x1 + 30 : x1 - 30,
            y2 = (y1 > cy) ? y1 + 20 : y1 - 20,

            l = 300,
            y3 = y2,
            x3 = (x2 > cx) ? x2 + l : x2 - l;

        linePoints.push({x:x2, y:y2});
        return paper.path(['M', x1, y1, 'L', x2, y2, 'L', x3, y3]).attr({fill:'none', stroke:'#aaaaaa', 'stroke-width':1});
    }

    var angle = 0,
        total = 0,
        start = 0,
        process = function (j) {
            var value = values[j],
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
                color = Raphael.hsb(start, .75, 1),
                ms = 500,
                delta = 30,
                bcolor = Raphael.hsb(start, 1, 1),

                p = sector(cx, cy, r, angle, angle + angleplus, {fill: "90-" + bcolor + "-" + color, stroke: stroke, "stroke-width": 1}),
                txt = paper.text(cx + (r + delta + 55) * Math.cos(-popangle * rad), cy + (r + delta + 25) *  Math.sin(-popangle * rad), labels[j])
                    .attr({fill: bcolor, stroke: "none", opacity: 0, "font-size": 20}),

                pl = polyline(cx, cy, r, popangle);

//                num = paper.test(cx + (r + delta - 60) * Math.cos(popangle * rad), cy + (r + delta - 50) * Math.sin(popangle * rad), labels[i] + ' : ' + values[i])
//                    .attr({fill: '#000000', stroke: "none", opacity: 1, "font-size": 10, 'font-weight':'bold'});

            p.mouseover(function () {
//                p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "elastic");
                txt.stop().animate({opacity: 1}, ms, "elastic");
            }).mouseout(function () {
//                p.stop().animate({transform: ""}, ms, "elastic");
                txt.stop().animate({opacity: 0}, ms);
            });

            angle += angleplus;
            chart.push(pl);
            chart.push(p);
            chart.push(txt);
//            chart.push(num);
            start += .1;
        };
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    for (i = 0; i < ii; i++) {
        process(i);
    }

    var centerMoney = paper.text(cx, cy - 30, '0.00 元').attr({fill:'#000000', stroke:'none', align:'center', 'font-size':30}),
        centerText = paper.text(cx, cy + 10, '总资产').attr({fill:'#444444', stroke:'none', align:'center', 'font-size':20}),
        centerBtn = paper.text(cx, cy + 50, '投资统计').attr({fill:'#aaaaaa', stroke:'none', align:'center', 'font-size':20, cursor:'pointer'}),
        centerBtn2 = paper.rect(cx - 50, cy + 37, 100, 30, 15).attr({fill:'none', stroke:'#888888','stroke-width':2});

    centerBtn.click(function() {
        alert('click');
    });

    chart.push(centerText);
    chart.push(centerMoney);
    chart.push(centerBtn);
    chart.push(centerMoney);

    var _attr = {fill:'#444444', stroke:'none', 'text-anchor':'50%', 'font-size':20};
    var a1 = paper.text(linePoints[0].x + 15, linePoints[0].y - 20, '可用余额 0.00元').attr(_attr),
        a2 = paper.text(linePoints[1].x + 15, linePoints[1].y - 20, '可用余额 0.00元').attr(_attr),
        a3 = paper.text(linePoints[2].x + 15, linePoints[2].y - 20, '可用余额 0.00元').attr(_attr);

    chart.push(a1);
    chart.push(a2);
    chart.push(a3);

    return chart;
};

$(function () {
    var values = [],
        labels = [];
    $("tr").each(function () {
        values.push(parseInt($("td", this).text(), 10));
        labels.push($("th", this).text());
    });
    $("table").hide();
    Raphael("holder", 700, 700).pieChart(350, 350, 180, values, labels, "#fff");
});
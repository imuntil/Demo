var easeTime0 = 0.8;
var easeTime = 0.9;
var sequences1=null;
var sequences2=null;
var sequences3=null;
var sequences4=null;
var isToRight=false;
var isplay = false;
var section11IsPlay = false;
var audioSwitch = false;


function gaEvent(labelValue){
	ga('send', 'event', labelValue, 'click', labelValue);
	window._CiQ10286 = window._CiQ10286 || [];
window._CiQ10286.push(['_trackEvent', {
 type: 1,
 labels:[
  {'按钮名称':labelValue}
  ],
 values: [
  {'数量':1}
  ]
}]);
window.CClickiV3 && window.CClickiV3[10286] && window.CClickiV3[10286]._flushObserver(function(){});
}





/*********************************************
requestAnimationFrame
**********************************************/
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
/*********************************************
drawFrame 在canvas上绘制img
**********************************************/
function drawFrame(ctx, image, width, height, num) {
  var offsetY = 0,
      offsetX = 0;
  ctx.drawImage(image, offsetX, offsetY, width, height, 0, 0, width, height);
}
/*********************************************
rightNow 获取当前时间
**********************************************/
function rightNow() {
  if (window['performance'] && window['performance']['now']) {
    return window['performance']['now']();
  } else {
    return +(new Date());
  }
}
/*********************************************
Preload 预加载图片
**********************************************/
var queue = new createjs.LoadQueue();
 var i = 0;
 queue.on("progress",handleLoadStart);
 queue.on("fileload", handleFileComplete);
 queue.on("complete", handleComplete);
 queue.setMaxConnections(5);
 queue.loadManifest([
				{id: "myImage3", src:"img/03-6-1.jpg"},
				{id: "myImage301", src:"img/03-6-2.jpg"},
                {id: "myImage4", src:"img/04.jpg"},
				{id: "myImage7", src:"img/06.jpg"},
				{id: "myImage8", src:"img/07.jpg"},
				{id: "myImage9", src:"img/08.jpg"},
				{id: "myImage10", src:"img/09.jpg"},
				{id: "myImage11", src:"img/10.jpg"},
				{id: "myImage12", src:"img/11.jpg"},
				{id: "myImage15", src:"img/01-1.png"},
				{id: "myImage16", src:"img/01-2.png"},
				{id: "myImage17", src:"img/02-1.png"},
				{id: "myImage18", src:"img/02-2.png"},
				{id: "myImage19", src:"img/02-3.png"},
				{id: "myImage20", src:"img/04-1.png"},
				{id: "myImage21", src:"img/04-2.png"},
				{id: "myImage22", src:"img/05-1.png"},
				{id: "myImage23", src:"img/05-2.png"},
				{id: "myImage24", src:"img/05-3.png"},
				{id: "myImage25", src:"img/05-4.png"},
				{id: "myImage26", src:"img/06-1.png"},
				{id: "myImage27", src:"img/06-2.png"},
				{id: "myImage28", src:"img/06-3.png"},
				{id: "myImage29", src:"img/06-4.png"},
				{id: "myImage30", src:"img/06-5.png"},
				{id: "myImage31", src:"img/07-1.png"},
				{id: "myImage32", src:"img/07-2.png"},
				{id: "myImage33", src:"img/07-3.png"},
				{id: "myImage34", src:"img/08-1.png"},
				{id: "myImage35", src:"img/08-2.png"},
				{id: "myImage36", src:"img/08-3.png"},
				{id: "myImage37", src:"img/09-1.png"},
				{id: "myImage38", src:"img/09-2.png"},
				{id: "myImage39", src:"img/09-3.png"},
				{id: "myImage40", src:"img/10-1.png"},
				{id: "myImage41", src:"img/10-2.png"},
				{id: "myImage42", src:"img/10-3.png"},
				{id: "myImage43", src:"img/11-1.png"},
				{id: "myImage44", src:"img/11-2.png"},
				{id: "myImage45", src:"img/11-3.png"},
				{id: "myImage46", src:"img/12-1.png"},
				{id: "myImage47", src:"img/12-2.png"},
				{id: "myImage51", src:"img/15-1.png"},
				{id: "myImage52", src:"img/15-2.png"},
				{id: "myImage53", src:"img/15-3.png"},
				{id: "myImage54", src:"img/15-4.png"},
				{id: "myImage55", src:"img/15-5.png"},
				{id: "myImage56", src:"img/13.png"},
				{id: "myImage57", src:"img/13-1.png"},
				{id: "myImage58", src:"img/13-2.png"},
				{id: "myImage59", src:"img/14.jpg"},
				{id: "myImage60", src:"img/add_1.png"},
				{id: "myImage61", src:"img/add2.png"},
				{id: "qub1", src:"img/queueb/star0000.jpg"},
				{id: "qub2", src:"img/queueb/star0001.jpg"},
				{id: "qub3", src:"img/queueb/star0002.jpg"},
				{id: "qub4", src:"img/queueb/star0003.jpg"},
				{id: "qub5", src:"img/queueb/star0004.jpg"},
				{id: "qub6", src:"img/queueb/star0005.jpg"},
				{id: "qub7", src:"img/queueb/star0006.jpg"},
				{id: "qub8", src:"img/queueb/star0007.jpg"},
				{id: "qub9", src:"img/queueb/star0008.jpg"},
				{id: "qub10", src:"img/queueb/star0009.jpg"},
				{id: "qub11", src:"img/queueb/star0010.jpg"},
				{id: "qub12", src:"img/queueb/star0011.jpg"},
				{id: "qub13", src:"img/queueb/star0012.jpg"},
				{id: "qub14", src:"img/queueb/star0013.jpg"},
				{id: "qub15", src:"img/queueb/star0014.jpg"},
				{id: "qub16", src:"img/queueb/star0015.jpg"},
				{id: "qub17", src:"img/queueb/star0016.jpg"},
				{id: "qub18", src:"img/queueb/star0017.jpg"},
				{id: "qub19", src:"img/queueb/star0018.jpg"},
				{id: "qub20", src:"img/queueb/star0019.jpg"},
				{id: "qub21", src:"img/queueb/star0020.jpg"},
				{id: "qub22", src:"img/queueb/star0021.jpg"},
				{id: "qub23", src:"img/queueb/star0022.jpg"},
				{id: "qub24", src:"img/queueb/star0023.jpg"},
				{id: "qub25", src:"img/queueb/star0024.jpg"},
				{id: "qub26", src:"img/queueb/star0025.jpg"},
				{id: "qub27", src:"img/queueb/star0026.jpg"},
				{id: "qub28", src:"img/queueb/star0027.jpg"},
				{id: "qub29", src:"img/queueb/star0028.jpg"},
				{id: "qub30", src:"img/queueb/star0029.jpg"},
				{id: "qub31", src:"img/queueb/star0030.jpg"},
				{id: "qub32", src:"img/queueb/star0031.jpg"},
				{id: "qub33", src:"img/queueb/star0032.jpg"},
				{id: "qub34", src:"img/queueb/star0033.jpg"},
				{id: "qub35", src:"img/queueb/star0034.jpg"},
				{id: "qub36", src:"img/queueb/star0035.jpg"},
				{id: "qub37", src:"img/queueb/star0036.jpg"},
				{id: "qub38", src:"img/queueb/star0037.jpg"},
				{id: "qub39", src:"img/queueb/star0038.jpg"},
				{id: "qub40", src:"img/queueb/star0039.jpg"},
				{id: "qub41", src:"img/queueb/star0040.jpg"},
				{id: "qub42", src:"img/queueb/star0041.jpg"},
				{id: "qub43", src:"img/queueb/star0042.jpg"},
				{id: "qub44", src:"img/queueb/star0043.jpg"},
				{id: "qub45", src:"img/queueb/star0044.jpg"},
				{id: "qub46", src:"img/queueb/star0045.jpg"},
				{id: "quc1", src:"img/queuec/sand_00.jpg"},
{id: "quc2", src:"img/queuec/sand_01.jpg"},
{id: "quc3", src:"img/queuec/sand_02.jpg"},
{id: "quc4", src:"img/queuec/sand_03.jpg"},
{id: "quc5", src:"img/queuec/sand_04.jpg"},
{id: "quc6", src:"img/queuec/sand_05.jpg"},
{id: "quc7", src:"img/queuec/sand_06.jpg"},
{id: "quc8", src:"img/queuec/sand_07.jpg"},
{id: "quc9", src:"img/queuec/sand_08.jpg"},
{id: "qud1", src:"img/queued/water_000.jpg"},
{id: "qud2", src:"img/queued/water_001.jpg"},
{id: "qud3", src:"img/queued/water_002.jpg"},
{id: "qud4", src:"img/queued/water_003.jpg"},
{id: "qud5", src:"img/queued/water_004.jpg"},
{id: "qud6", src:"img/queued/water_005.jpg"},
{id: "qud7", src:"img/queued/water_006.jpg"},
{id: "qud8", src:"img/queued/water_007.jpg"},
{id: "qud9", src:"img/queued/water_008.jpg"},
{id: "qud10", src:"img/queued/water_009.jpg"},
{id: "qud11", src:"img/queued/water_010.jpg"},
{id: "qud12", src:"img/queued/water_011.jpg"},
{id: "qud13", src:"img/queued/water_012.jpg"},
{id: "qud14", src:"img/queued/water_013.jpg"},
{id: "qud15", src:"img/queued/water_014.jpg"},
{id: "qud16", src:"img/queued/water_015.jpg"},
{id: "qud17", src:"img/queued/water_016.jpg"},
{id: "qud18", src:"img/queued/water_017.jpg"},
{id: "qud19", src:"img/queued/water_018.jpg"},
{id: "qud20", src:"img/queued/water_019.jpg"},
{id: "qud21", src:"img/queued/water_020.jpg"},
{id: "qud22", src:"img/queued/water_021.jpg"},
{id: "qud23", src:"img/queued/water_022.jpg"},
{id: "qud24", src:"img/queued/water_023.jpg"},
{id: "qud25", src:"img/queued/water_024.jpg"},
{id: "qud26", src:"img/queued/water_025.jpg"},
{id: "qud27", src:"img/queued/water_026.jpg"},
{id: "qud28", src:"img/queued/water_027.jpg"},
{id: "qud29", src:"img/queued/water_028.jpg"},
{id: "qud30", src:"img/queued/water_029.jpg"},
{id: "qud31", src:"img/queued/water_030.jpg"},
{id: "qud32", src:"img/queued/water_031.jpg"},
{id: "qud33", src:"img/queued/water_032.jpg"},
{id: "qud34", src:"img/queued/water_033.jpg"},
{id: "qud35", src:"img/queued/water_034.jpg"},
{id: "qud36", src:"img/queued/water_035.jpg"},
{id: "qud37", src:"img/queued/water_036.jpg"},
{id: "qud38", src:"img/queued/water_037.jpg"},
{id: "qud39", src:"img/queued/water_038.jpg"},
{id: "qud40", src:"img/queued/water_039.jpg"},
{id: "qud41", src:"img/queued/water_040.jpg"},
{id: "qud42", src:"img/queued/water_041.jpg"},
{id: "qud43", src:"img/queued/water_042.jpg"},
{id: "qud44", src:"img/queued/water_043.jpg"},
{id: "qud45", src:"img/queued/water_044.jpg"},
{id: "qud46", src:"img/queued/water_045.jpg"},
{id: "qud47", src:"img/queued/water_046.jpg"},
{id: "qud48", src:"img/queued/water_047.jpg"},
{id: "qud49", src:"img/queued/water_048.jpg"},
{id: "qud50", src:"img/queued/water_049.jpg"},
{id: "qud51", src:"img/queued/water_050.jpg"},
{id: "qud52", src:"img/queued/water_051.jpg"},
{id: "qud53", src:"img/queued/water_052.jpg"},
{id: "qud54", src:"img/queued/water_053.jpg"},
{id: "qud55", src:"img/queued/water_054.jpg"},
{id: "qud56", src:"img/queued/water_055.jpg"},
{id: "qud57", src:"img/queued/water_056.jpg"},
{id: "qud58", src:"img/queued/water_057.jpg"},
{id: "qud59", src:"img/queued/water_058.jpg"},
{id: "qud60", src:"img/queued/water_059.jpg"},
{id: "qud61", src:"img/queued/water_060.jpg"},
{id: "qud62", src:"img/queued/water_061.jpg"},
{id: "qud63", src:"img/queued/water_062.jpg"},
{id: "qud64", src:"img/queued/water_063.jpg"},
{id: "qud65", src:"img/queued/water_064.jpg"},
{id: "qud66", src:"img/queued/water_065.jpg"},
{id: "qud67", src:"img/queued/water_066.jpg"},
{id: "qud68", src:"img/queued/water_067.jpg"},
{id: "qud69", src:"img/queued/water_068.jpg"},
{id: "qud70", src:"img/queued/water_069.jpg"},
{id: "qud71", src:"img/queued/water_070.jpg"},
{id: "qud72", src:"img/queued/water_071.jpg"},
{id: "qud73", src:"img/queued/water_072.jpg"},
{id: "qud74", src:"img/queued/water_073.jpg"},
{id: "qud75", src:"img/queued/water_074.jpg"},
{id: "qud76", src:"img/queued/water_075.jpg"},
{id: "qud77", src:"img/queued/water_076.jpg"},
{id: "qud78", src:"img/queued/water_077.jpg"},
{id: "qud79", src:"img/queued/water_078.jpg"},
{id: "qud80", src:"img/queued/water_079.jpg"},
{id: "qud81", src:"img/queued/water_080.jpg"},
{id: "qud82", src:"img/queued/water_081.jpg"},
{id: "qud83", src:"img/queued/water_082.jpg"},
{id: "qud84", src:"img/queued/water_083.jpg"},
{id: "qud85", src:"img/queued/water_084.jpg"},
{id: "qud86", src:"img/queued/water_085.jpg"},
{id: "qud87", src:"img/queued/water_086.jpg"},
{id: "qud88", src:"img/queued/water_087.jpg"},
{id: "qud89", src:"img/queued/water_088.jpg"},
{id: "qud90", src:"img/queued/water_089.jpg"},
{id: "qud91", src:"img/queued/water_090.jpg"},
{id: "qud92", src:"img/queued/water_091.jpg"},
{id: "qud93", src:"img/queued/water_092.jpg"},
{id: "qud94", src:"img/queued/water_093.jpg"},
{id: "qud95", src:"img/queued/water_094.jpg"},
{id: "qud96", src:"img/queued/water_095.jpg"},
{id: "qud97", src:"img/queued/water_096.jpg"},
{id: "qud98", src:"img/queued/water_097.jpg"},
{id: "qud99", src:"img/queued/water_098.jpg"},
{id: "qud100", src:"img/queued/water_099.jpg"},
{id: "qud101", src:"img/queued/water_100.jpg"},
{id: "qud102", src:"img/queued/water_101.jpg"},
{id: "qud103", src:"img/queued/water_102.jpg"},
{id: "qud104", src:"img/queued/water_103.jpg"},
{id: "qud105", src:"img/queued/water_104.jpg"},
{id: "qud106", src:"img/queued/water_105.jpg"},
{id: "qud107", src:"img/queued/water_106.jpg"},
{id: "qud108", src:"img/queued/water_107.jpg"},
{id: "qud109", src:"img/queued/water_108.jpg"},
{id: "qud110", src:"img/queued/water_109.jpg"},
{id: "qud111", src:"img/queued/water_110.jpg"},
{id: "qud112", src:"img/queued/water_111.jpg"},
{id: "qud113", src:"img/queued/water_112.jpg"},
{id: "qud114", src:"img/queued/water_113.jpg"},
{id: "qud115", src:"img/queued/water_114.jpg"},
{id: "qud116", src:"img/queued/water_115.jpg"},
{id: "qud117", src:"img/queued/water_116.jpg"},
{id: "qud118", src:"img/queued/water_117.jpg"},
{id: "qud119", src:"img/queued/water_118.jpg"},
{id: "qud120", src:"img/queued/water_119.jpg"},
{id: "qud121", src:"img/queued/water_120.jpg"},
{id: "qud122", src:"img/queued/water_121.jpg"},
{id: "qud123", src:"img/queued/water_122.jpg"},
{id: "qud124", src:"img/queued/water_123.jpg"},
{id: "qud125", src:"img/queued/water_124.jpg"},
{id: "qud126", src:"img/queued/water_125.jpg"},
{id: "qud127", src:"img/queued/water_126.jpg"},
{id: "qud128", src:"img/queued/water_127.jpg"},
{id: "qud129", src:"img/queued/water_128.jpg"},
{id: "qud130", src:"img/queued/water_129.jpg"},
{id: "qud131", src:"img/queued/water_130.jpg"},
{id: "qud132", src:"img/queued/water_131.jpg"},
{id: "qud133", src:"img/queued/water_132.jpg"},
{id: "qud134", src:"img/queued/water_133.jpg"},
{id: "qud135", src:"img/queued/water_134.jpg"}
				
 ]);
 function handleLoadStart(event){
	 $("#html5Loader").text(Math.floor(queue.progress*100)+"%");
	 }
 function handleComplete() {
	 
	 $("#html5Loader").fadeOut(200);
	 drawSection1();
	 //showSection14();
	 playMusic();
	 
	 
	 //$("body").append('<audio src="music/bgmusic.mp3" autoplay="autoplay" loop></audio>');
	 
 }
 function playMusic(){
	 audio = document.getElementById('audio');
	 if(!audioSwitch){
		
	 	audio.play();
		audioSwitch = true;
		$(".u-globalAudio span").text("开启");
		TweenMax.killTweensOf(".u-globalAudio span");
		TweenMax.to(".u-globalAudio span", 0.5, {autoAlpha:1,x:0,ease:Expo.easeOut });
		TweenMax.to(".u-globalAudio span", 0.5, {autoAlpha:0,x:-20,delay:1,ease:Expo.easeOut });
	 }else{
		audio.pause();
		audioSwitch = false;
		$(".u-globalAudio span").text("关闭");
		TweenMax.killTweensOf(".u-globalAudio span");
		TweenMax.to(".u-globalAudio span", 0.5, {autoAlpha:1,x:0,ease:Expo.easeOut });
		TweenMax.to(".u-globalAudio span", 0.5, {autoAlpha:0,x:-20,delay:1,ease:Expo.easeOut });
	 }
	 
 }
 
 function handleFileComplete(event){
	 //$("#html5Loader").append(event.item.id+"<br/>");
 }
TweenMax.to($(".dotani1"), 0, {scaleX:0.3 ,scaleY:0.3 });
TweenMax.to($(".dotani2"), 0, {scaleX:0.3 ,scaleY:0.3 });
TweenMax.to($(".dotani3"), 0, {scaleX:0.3 ,scaleY:0.3 });
TweenMax.to($(".dotani4"), 0, {scaleX:0.3 ,scaleY:0.3 });
TweenMax.to($(".dotani1"), 1, {scaleX:1 ,scaleY:1 ,opacity:0.1,repeat:-1});
TweenMax.to($(".dotani2"), 1, {scaleX:1 ,scaleY:1 ,opacity:0.1,repeat:-1,delay:0.33});
TweenMax.to($(".dotani3"), 1, {scaleX:1 ,scaleY:1 ,opacity:0.1,repeat:-1,delay:0.66});
TweenMax.to($(".dotani4"), 1, {scaleX:1 ,scaleY:1 ,opacity:0.1,repeat:-1,delay:1});
/*********************************************
Secrion1 Action
**********************************************/
function drawSection1(){
	TweenMax.to("#section1 .text1",easeTime0,{autoAlpha:1,ease:Linear.easeNone,delay:0.3});
	TweenMax.to("#section1 .text2",easeTime0,{autoAlpha:1,ease:Linear.easeNone,delay:0.3+easeTime0});
	
	var fps          = 12,
      currentFrame = 0,
      totalFrames  = 46,
      canvas       = document.getElementById("s1"),
      ctx          = canvas.getContext("2d"),
      currentTime  = rightNow();
	  
  
  (function animloop(time){
    var delta = (time - currentTime) / 1000;
	if(Math.abs(delta) <1){
		currentFrame += (delta * fps);
	}  
    var frameNum = Math.floor(currentFrame);
    if (frameNum >= totalFrames) {
	  currentFrame = frameNum = totalFrames-1;
    }
	img = queue.getResult("qub"+(frameNum+1));
    sequences1 = requestAnimationFrame(animloop);
	drawFrame(ctx,img,640,1008,frameNum);
	//ctx.drawImage(img, 0, 0, 640, 1008, 0, 0, 640, 1008);
    currentTime = time;
  })(currentTime);

  
TweenMax.to("#section1",easeTime0,{autoAlpha:0,ease:Linear.easeNone,delay:4-easeTime0,onComplete:showSection5});
	//TweenMax.to("#section5",easeTime,{autoAlpha:1,ease:Linear.easeNone,delay:4-easeTime0,onComplete:showSection5});
}

/*********************************************
 Secrion5 Action
 **********************************************/
function showSection5(){
	cancelAnimationFrame(sequences2);
	TweenMax.to("#section4",0,{autoAlpha:0});
	section5Swipe();
}

function section5Swipe(){
	//$$("#section5").swipeLeft(function(){
	//if(!isToRight){
	//gaEvent("slideleft");
	isToRight = true;
	TweenMax.to("#section5",easeTime0*3,{autoAlpha:1,ease:Linear.easeNone});
	TweenMax.to("#section5 .text4",easeTime0*3,{autoAlpha:0});
	TweenMax.to("#section5 .in",2.5,{x:-415,ease:Sine.easeInOut});
	TweenMax.to("#section5 .text1",easeTime0*3,{autoAlpha:1,ease:Linear.easeNone,delay:2.5});
	TweenMax.to("#section5 .text2",easeTime0*3,{autoAlpha:1,ease:Linear.easeNone,delay:2.5+easeTime});
	TweenMax.to("#section5 .text3",easeTime0*3,{autoAlpha:1,ease:Linear.easeNone,delay:2.5+2*easeTime});

	TweenMax.to("#section5 .text4",easeTime0*3,{autoAlpha:1,ease:Linear.easeNone,delay:2.5,onComplete: function () {

	}});

	TweenMax.to("#section2",easeTime0*2,{autoAlpha:1,ease:Linear.easeNone,delay:2.5+4*easeTime,onComplete:drawSection2});

}


/*********************************************
Secrion2 Action
**********************************************/
function drawSection2(){
	cancelAnimationFrame(sequences1);
	TweenMax.to('#section5', 2*easeTime, {autoAlpha:0});
	TweenMax.to("#section2",easeTime,{autoAlpha:1,ease:Linear.easeNone});
  	TweenMax.to("#section2 .text1",easeTime,{autoAlpha:1,ease:Linear.easeNone,delay:easeTime});
  	TweenMax.to("#section2 .text2",easeTime,{autoAlpha:1,ease:Linear.easeNone,delay:2*easeTime});
	//TweenMax.to("#section2",easeTime,{autoAlpha:0,ease:Linear.easeNone,delay:4*easeTime,onComplete:showSection10});

	TweenMax.to("#section2 .text3",easeTime,{autoAlpha:1,ease:Linear.easeNone,delay:3*easeTime,onComplete:function(){
		$("#section2").click(function(e) {
			gaEvent("clickgold");
			TweenMax.to("#section10",easeTime,{autoAlpha:1,ease:Linear.easeNone,onComplete:showSection10});
		});
	}});
}


/*********************************************
Secrion10 Action
**********************************************/
function showSection10(){
	TweenMax.to("#section2",easeTime,{autoAlpha:0});
	//TweenMax.to("#section10",easeTime,{autoAlpha:1,ease:Linear.easeNone,delay:easeTime});

	TweenMax.to("#section10 .text1",easeTime,{autoAlpha:1,ease:Linear.easeNone,delay:1*easeTime});
  	TweenMax.to("#section10 .text2",easeTime,{autoAlpha:1,ease:Linear.easeNone,delay:2*easeTime});
  	TweenMax.to("#section10",easeTime,{autoAlpha:0,ease:Linear.easeNone,delay:5-easeTime0, onComplete:showSection13});

}


/*********************************************
 Secrion13 Action
 **********************************************/
function showSection13() {
	//TweenMax.to('#section10', easeTime, {autoAlpha:0});
	TweenMax.to('#section13', easeTime*2, {autoAlpha:1,ease:Linear.easeNone,delay:0});
	//TweenMax.to('#section13 .bottom', easeTime*2, {scaleX:1.2 ,scaleY:1.2,ease:Linear.easeNone,delay:0});
	TweenMax.to('#section13 .tops', easeTime, {autoAlpha:1,ease:Linear.easeNone,delay:0*easeTime});
	TweenMax.to('#section13 .tops1', easeTime, {autoAlpha:1,ease:Linear.easeNone,delay:1*easeTime});
	TweenMax.to('#section13', easeTime, {autoAlpha:0,ease:Linear.easeNone,delay:4-easeTime0,onComplete:showSection14});
}


/*********************************************
 Secrion14 Action
 **********************************************/
function showSection14() {
	TweenMax.to('#section14', easeTime, {autoAlpha:1,ease:Linear.easeNone,delay:easeTime});
	TweenMax.to('#section14 .tops', easeTime, {autoAlpha:1,ease:Linear.easeNone,delay:1*easeTime});
	TweenMax.to('#section14 .pp', easeTime*4, {autoAlpha:1,ease:Linear.easeNone,delay:2*easeTime});
	TweenMax.to('#section14 .tops1', easeTime, {autoAlpha:1,ease:Linear.easeNone,delay:3*easeTime});

	TweenMax.to('#section14 .bottoms', easeTime*8, {scaleX:1.1 ,scaleY:1.1,ease:Linear.easeNone,delay:easeTime});
	TweenMax.to('#section14 .pp', easeTime*8, {scaleX:1.1 ,scaleY:1.1,ease:Linear.easeNone,delay:3*easeTime});
}



function showSection16(){
	
	TweenMax.to("#section15",easeTime,{autoAlpha:0,ease:Linear.easeNone});	
	TweenMax.to("#section16",easeTime,{autoAlpha:1,ease:Linear.easeNone,delay:easeTime});
	TweenMax.to("#section16 .",easeTime,{autoAlpha:1,ease:Linear.easeNone,delay:easeTime});
}

function submit_form(){
	gaEvent("submit");
	$("#form1").submit();
}

 /* ajax Form */
        var options = {
            beforeSubmit: function(formData, jqForm, options) {
                $phone = $(".phone").val();
                var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
                if (!reg.test($phone)) {
                    alert("请填写正确的手机号码");
                    return false;
                }


            },
            complete: function(response) {
                var contact = JSON.parse(response.responseText);
                if (contact.code == 0) {
                    showSection16();
                } else {
                    alert(contact.message.replace(/<br\/>/g, "\r"));
                }
            },
            error: function() {
                alert("出错了，请重新提交");
            }
        };
        $("#form1").ajaxForm(options);

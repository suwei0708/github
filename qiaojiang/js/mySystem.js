//by zyp
;(function($,window,document,undefined){var Silder=function(ele,opt){this.$element=ele,this.defaults={width:0,height:0,direction:'x',few:1,showFew:1,clearance:0,silderMode:'linear',timeGap:600,auto:true,autoType:'left',autoTime:5,buttonPre:'.silder-button.btl',buttonNext:'.silder-button.btr',jz:true,runEnd:function(){}},this.options=$.extend({},this.defaults,opt);}
Silder.prototype={runTypeOne:function(){var $this=this.$element;var btl=$this.find(this.options.buttonPre);var btr=$this.find(this.options.buttonNext);var direction=this.options.direction.toLowerCase();var showFew=this.options.showFew;var width=this.options.width;var height=this.options.height;var clearance=this.options.clearance;var silderMode=this.options.silderMode;var few=this.options.few;if(few>showFew){few=showFew;}
var moveLength=few*width+(few)*clearance;var timeGap=this.options.timeGap;var jz=this.options.jz;var auto=this.options.auto;var autoType=this.options.autoType.toLowerCase();var autoTime=this.options.autoTime*1000;var ul=$this.find('ul').eq(0);var box=ul.parent();var runEnd=this.options;init();btr.click(function(){if(jz==true){if(ul.is(":animated")){return;}}
if(direction=='x'){ul.stop().animate({left:-moveLength},{easing:silderMode,duration:timeGap,complete:function(){for(var i=0;i<few;i++){var f=ul.find('li').eq(0);var l=ul.find('li').last();$(l).after(f);}
ul.css({left:0});runEnd.runEnd();}});}else if(direction=='y'){ul.stop().animate({top:-moveLength},{easing:silderMode,duration:timeGap,complete:function(){for(var i=0;i<few;i++){var f=ul.find('li').eq(0);var l=ul.find('li').last();$(l).after(f);}
ul.css({top:0});runEnd.runEnd();}});}});btl.click(function(){if(jz==true){if(ul.is(":animated")){return;}}
if(direction=='x'){for(var i=0;i<few;i++){var f=ul.find('li').eq(0);var l=ul.find('li').last();$(f).before(l);}
ul.css({left:-moveLength});ul.stop().animate({left:0},{easing:silderMode,duration:timeGap,complete:function(){runEnd.runEnd();}});}else if(direction=='y'){for(var i=0;i<few;i++){var f=ul.find('li').eq(0);var l=ul.find('li').last();$(f).before(l);}
ul.css({top:-moveLength});ul.stop().animate({top:0},{easing:silderMode,duration:timeGap,complete:function(){runEnd.runEnd();}});}});function init(){$this.css({position:'relative'});box.css({position:'relative',overflow:'hidden'});ul.css({position:'absolute',top:0,left:0});if(direction=='x'){box.css({width:width*showFew+(showFew-1)*clearance,height:height});ul.css({width:999999});ul.children().css({float:'left'});if(clearance!=0){ul.children().css({marginRight:clearance});}}else if(direction=='y'){box.css({width:width,height:height*showFew+(showFew-1)*clearance});ul.css({width:width});ul.children().css({float:'none'});if(clearance!=0){ul.children().css({marginBottom:clearance});}}}
var stop;if(auto){if(autoType=='left'&&direction=='x'){stop=setInterval(autoRunningTypeOne,autoTime);}
if(autoType=='right'&&direction=='x'){stop=setInterval(autoRunningTypeTwo,autoTime);}
if(autoType=='up'&&direction=='y'){stop=setInterval(autoRunningTypeOne,autoTime);}
if(autoType=='down'&&direction=='y'){stop=setInterval(autoRunningTypeTwo,autoTime);}}
function autoRunningTypeOne(){if(ul.is(":animated")){return;}
if(direction=='x'){ul.stop().animate({left:-moveLength},{easing:silderMode,duration:timeGap,complete:function(){for(var i=0;i<few;i++){var f=ul.find('li').eq(0);var l=ul.find('li').last();$(l).after(f);}
ul.css({left:0});runEnd.runEnd();}});}else if(direction=='y'){ul.stop().animate({top:-moveLength},{easing:silderMode,duration:timeGap,complete:function(){for(var i=0;i<few;i++){var f=ul.find('li').eq(0);var l=ul.find('li').last();$(l).after(f);}
ul.css({top:0});runEnd.runEnd();}});}}
function autoRunningTypeTwo(){if(ul.is(":animated")){return;}
if(direction=='x'){for(var i=0;i<few;i++){var f=ul.find('li').eq(0);var l=ul.find('li').last();$(f).before(l);}
ul.css({left:-moveLength});ul.stop().animate({left:0},{easing:silderMode,duration:timeGap,complete:function(){runEnd.runEnd();}});}else if(direction=='y'){for(var i=0;i<few;i++){var f=ul.find('li').eq(0);var l=ul.find('li').last();$(f).before(l);}
ul.css({top:-moveLength});ul.stop().animate({top:0},{easing:silderMode,duration:timeGap,complete:function(){runEnd.runEnd();}});}}}}
$.fn.mySilder=function(options){var nSilder=new Silder(this,options);nSilder.runTypeOne();return this;}})(jQuery,window,document);
!function(t){t.fn.rollSlide=function(e){var n=this,o=e.orientation||"left",i=e.num||1,r="number"==typeof e.v?e.v:0,s=("number"==typeof e.space&&e.space>=100?e.space:100)+r||5e3+r,c=e.isRoll,f=!0,l=function(e,o,i){var r,s=n.find(".roll__list"),c=s.find("li"),l=0,a=c.length,p=[],u=[];(new Date).getTime();switch(f=!1,p=function(){var n=[];if("left"===e||"top"===e)for(r=0;r<o;r++)l+="left"===e?t(c[r]).outerWidth(!0):t(c[r]).outerHeight(!0),n.push(c[r]);else if("right"===e||"bottom"===e)for(r=a-o;o>0;o--,r++)l+="right"===e?t(c[r]).outerWidth(!0):t(c[r]).outerHeight(!0),n.push(c[r]);return n}(),u=t(p).clone(),e){case"left":s.append(u),s.animate({left:-l+"px"},i,function(){t(this).css({left:0}),t(p).remove(),f=!0});break;case"right":s.prepend(u),s.css("left",-l+"px"),s.animate({left:0},i,function(){t(p).remove(),f=!0});break;case"top":s.append(u),s.animate({top:-l+"px"},i,function(){t(this).css({top:0}),t(p).remove(),f=!0});break;case"bottom":s.prepend(u),s.css("top",-l+"px"),s.animate({top:0},i,function(){t(p).remove(),f=!0})}};!function(){var t,e=n.find(".roll__list").find("li").length;i=i<=e?i:e,e>1&&n.on("click",".pre",function(){f&&("left"===o||"right"===o?l("right",i,r):l("bottom",i,r))}).on("click",".next",function(){f&&("left"===o||"right"===o?l("left",i,r):l("top",i,r))}).hover(function(){clearInterval(t)},function(){c&&(t=setInterval(function(){l(o,i,r)},s))}).trigger("mouseout")}()},t.fn.rollNoInterval=function(){var e,n=this,o=n.find(".roll__list"),i=o.find("li"),r=i.length;return{left:function(){var n,r,s,c;c=t(i[0]),s=c.outerWidth(!0),e=setInterval(function(){n=o.css("left"),(n=parseInt(n))>-s?(r=n-1,o.css("left",r+"px"),n=o.css("left")):(c.detach(),o.css("left",0),o.append(c),c=t(o.find("li")[0]),s=c.outerWidth(!0))},50)},right:function(){var n,s,c,f;f=t(i[r-1]),c=f.outerWidth(!0),e=setInterval(function(){n=o.css("right"),(n=parseInt(n))>-c?(s=n-1,o.css("right",s+"px"),n=o.css("right")):(f.detach(),o.css("right",0),o.prepend(f),f=t(o.find("li")[r-1]),c=f.outerWidth(!0))},50)},top:function(){var n,r,s,c;c=t(i[0]),s=c.outerHeight(!0),e=setInterval(function(){n=o.css("top"),(n=parseInt(n))>-s?(r=n-1,o.css("top",r+"px"),n=o.css("top")):(c.detach(),o.css("top",0),o.append(c),c=t(o.find("li")[0]),s=c.outerHeight(!0))},50)},bottom:function(){var n,s,c,f;f=t(i[r-1]),c=f.outerHeight(!0),e=setInterval(function(){n=o.css("bottom"),(n=parseInt(n))>-c?(s=n-1,o.css("bottom",s+"px"),n=o.css("bottom")):(f.detach(),o.css("bottom",0),o.prepend(f),f=t(o.find("li")[r-1]),c=f.outerHeight(!0))},50)}}}}(jQuery);
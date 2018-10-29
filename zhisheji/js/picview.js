var _zsj = {
    event: {
        keydown: {
            data: [],
            add: function(name, call) {
                this.data.push({
                    name: name,
                    call: call
                })
            },
            remove: function(name) {
                for (var i = 0; this.data && i < this.data.length; i++) {
                    if (this.data[i].name == name) this.data.splice(i, 1);
                }
            }
        }
    },
    picview: {
        show: function(ct, ch, call, showother) {
            _zsj.picview.hide();
            var ms = ct.find('img');
            if (!ch.is('img')) ch = ch.find('img');
            var i = -1;
            var vsrc = (typeof ch.data('org') == 'undefined' ? ch.attr('src') : ch.data('org'));
            for (j = 0; j < ms.length; j++) {
                var mssrc = (typeof ms.eq(j).data('org') == 'undefined' ? ms.eq(j).attr('src') : ms.eq(j).data('org'));
                if (mssrc == vsrc) {i = j};
            }
            var v = jQuery('<div class="_picView" data-position-to="window"><a href="javascript:;" onclick="return false;" class="close icon-fail"></a><a href="javascript:;" onclick="return false;" class="prev icon-jiantouz"></a><div class="load"></div><div class="pbox"><img onmousedown="return false;" onmousemove="return false;" src=' + vsrc + ' /></div><a href="javascript:;" onclick="return false;" class="next icon-jiantouy"></a></div>').appendTo(document.body).bind('mousewheel', function(event, delta, deltaX, deltaY) {
                var pb = v.find('.pbox');
                var o = delta > 0 ? 100 : -100;
                var y = parseInt(pb.css('marginTop').replace('px', '')) + o;
                if (y > 0) y = 0;
                else if (y < v.height() - pb.height()) y = v.height() - pb.height();
                pb.css('marginTop', y);
                return false;
            });
            var sublist = jQuery('<div class="sublist"><ul></ul><span class="toogle-thumb icon-apps"></span></div>');
            v.append(sublist);
            jQuery.each(ct.find('img'), function(index) {
                sublist.find('ul').append('<li><img src="' + jQuery(this).attr('src') + '"/></li>');
            });

            sublist.find('li').eq(i).addClass('cur');

            sublist.find('li').click(function() {
                _zsj.picview.show(ct, ms.eq(jQuery(this).index()), call, showother);
            });
            sublist.find('.toogle-thumb').click(function() {
                if(sublist.hasClass('sublist-close')) {
                    sublist.removeClass('sublist-close');
                }
                else {
                    sublist.addClass('sublist-close');
                }

            });


            v.find('.close').click(function() {
                _zsj.picview.hide();
                $('.praise-box').removeClass('praise-box-fixed');
            });
            v.click(function() {
                _zsj.picview.hide();
                $('.praise-box').removeClass('praise-box-fixed');
            });
            v.find('.pbox, .sublist').click(function() {
                return false;
            });
            if (i <= 0) v.find('.prev').hide();
            else v.find('.prev').bind('click', function() {
                _zsj.picview.show(ct, ms.eq(i - 1), call, showother);
            });

            if (i <0 || i >= ms.length - 1) {
                if(showother) {
                    v.find('.next').bind('click', function() {
                        _zsj.picview.hide();
                        jQuery('.bla-bg, .bla-box').show();
                        $('.praise-box').removeClass('praise-box-fixed');
                    });
                }
                else {
                    v.find('.next').hide();
                }
            }
            else v.find('.next').bind('click', function() {
                _zsj.picview.show(ct, ms.eq(i + 1), call, showother);
            });
            _zsj.event.keydown.add('picview', function(e) {
                if (e.keyCode == 27) {
                    _zsj.picview.hide();
                } else if (e.keyCode == 37 && i > 0) {
                    _zsj.picview.show(ct, ms.eq(i - 1), call, showother);
                } else if (e.keyCode == 39 && i >= 0 && i < ms.length - 1) {
                    _zsj.picview.show(ct, ms.eq(i + 1), call, showother);
                }
            });
            v.find('.pbox img').load(function() {
                v.find('.load').hide();
                var pb = v.find('.pbox');
                var x, y, mx, my;
                pb.bind('mouseenter mouseleave', function() {
                    jQuery(document).unbind('mousemove');
                });
                v.bind('mouseenter mouseleave', function() {
                    jQuery(document).unbind('mousemove');
                });
                pb.css('marginTop', v.height() > pb.outerHeight() ? (v.height() - pb.outerHeight()) / 2 : 0).css('marginLeft', (v.width() - pb.outerWidth()) / 2).bind('mouseup touchend', function() {
                    jQuery(document).unbind('mousemove touchmove');
                }).bind('mousedown touchstart', function(event) {
                    event.preventDefault();
                    x = event.pageX || event.originalEvent.changedTouches[0].pageX;
                    y = event.pageY || event.originalEvent.changedTouches[0].pageY;
                    mx = parseInt(pb.css('marginLeft').replace('px', ''));
                    my = parseInt(pb.css('marginTop').replace('px', ''));
                    jQuery(document).bind('mousemove touchmove', function(event) {
                        pb.css({
                            marginLeft: (event.pageX || event.originalEvent.changedTouches[0].pageX) - x + mx,
                            marginTop: (event.pageY || event.originalEvent.changedTouches[0].pageY) - y + my
                        });
                    });
                }).fadeIn(200);
            });
            if (typeof call == 'function') call(v, ms.length, i);
        },
        hide: function() {
            _zsj.event.keydown.remove('picview');
            jQuery(document).unbind('mousemove mouseenter');
            jQuery('._picView').unbind('mousewheel').remove();
        }
    }
}

/**
* jQuery Mousewheel 3.1.13
*
**/
!function(a) { "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery) } (function(a) { function b(b) { var g = b || window.event, h = i.call(arguments, 1), j = 0, l = 0, m = 0, n = 0, o = 0, p = 0; if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) { if (1 === g.deltaMode) { var q = a.data(this, "mousewheel-line-height"); j *= q, m *= q, l *= q } else if (2 === g.deltaMode) { var r = a.data(this, "mousewheel-page-height"); j *= r, m *= r, l *= r } if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) { var s = this.getBoundingClientRect(); o = b.clientX - s.left, p = b.clientY - s.top } return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h) } } function c() { f = null } function d(a, b) { return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0 } var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], i = Array.prototype.slice; if (a.event.fixHooks) for (var j = g.length; j; ) a.event.fixHooks[g[--j]] = a.event.mouseHooks; var k = a.event.special.mousewheel = { version: "3.1.12", setup: function() { if (this.addEventListener) for (var c = h.length; c; ) this.addEventListener(h[--c], b, !1); else this.onmousewheel = b; a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this)) }, teardown: function() { if (this.removeEventListener) for (var c = h.length; c; ) this.removeEventListener(h[--c], b, !1); else this.onmousewheel = null; a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height") }, getLineHeight: function(b) { var c = a(b), d = c["offsetParent" in a.fn ? "offsetParent" : "parent"](); return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16 }, getPageHeight: function(b) { return a(b).height() }, settings: { adjustOldDeltas: !0, normalizeOffset: !0} }; a.fn.extend({ mousewheel: function(a) { return a ? this.bind("mousewheel", a) : this.trigger("mousewheel") }, unmousewheel: function(a) { return this.unbind("mousewheel", a) } }) });

jQuery(function () {
    jQuery('.picview img').load().click(function () {
        _zsj.picview.show(jQuery(this).parents('.picview'), jQuery(this), function () {
            jQuery('.praise-box').addClass('praise-box-fixed');
        }, true);

    });
    jQuery('#all-comment').on('click', '.onimg img', function() {
        _zsj.picview.show(jQuery(this).parents('.onimg'), jQuery(this), function () {}, false);
    });
    jQuery('.bla-bg').on('click', '.bla-close', function() {
        jQuery('.bla-bg, .bla-box').hide();
    });
});
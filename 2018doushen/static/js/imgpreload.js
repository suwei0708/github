/**
 * 加载模块
 *
 */

if ('undefined' != typeof jQuery) {
    (function($) {
        'use strict';

        // extend jquery (because i love jQuery)
        $.imgpreload = function(imgs, settings) {
            settings = $.extend({}, $.fn.imgpreload.defaults, (settings instanceof Function) ? {
                all: settings
            } : settings);

            // use of typeof required
            if ('string' == typeof imgs) {
                imgs = [imgs];
            }

            var loaded = [];

            $.each(imgs, function(i, elem) {
                var img = new Image();

                var url = elem;

                var img_obj = img;

                if ('string' != typeof elem) {
                    url = $(elem).attr('src') || $(elem).css('background-image').replace(/^url\((?:"|')?(.*)(?:'|")?\)$/mg, "$1");
                    img_obj = elem;
                }

                $(img).bind('load error', function(e) {
                    loaded.push(img_obj);

                    $.data(img_obj, 'loaded', ('error' == e.type) ? false : true);

                    if (settings.each instanceof Function) {
                        settings.each.call(img_obj, loaded.slice(0));
                    }

                    if (loaded.length >= imgs.length && settings.all instanceof Function) {
                        settings.all.call(loaded);
                    }

                    $(this).unbind('load error');
                });

                img.src = url;
            });
        };

        $.fn.imgpreload = function(settings) {
            $.imgpreload(this, settings);

            return this;
        };

        $.fn.imgpreload.defaults = {
            each: null, // callback invoked when each image is loaded
            all: null // callback invoked when all images have loaded
        };

    })(jQuery);
}
;(function(window) {

    'use strict';

    // taken from mo.js demos
    function isIOSSafari() {
        var userAgent;
        userAgent = window.navigator.userAgent;
        return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
    };

    // taken from mo.js demos
    function isTouch() {
        var isIETouch;
        isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
    };

    // taken from mo.js demos
    var isIOS = isIOSSafari(),
        clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

    function extend( a, b ) {
        for( var key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }

    function Animocon(el, options) {
        this.el = el;
        this.options = extend( {}, this.options );
        extend( this.options, options );

        this.timeline = new mojs.Timeline();

        for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
            this.timeline.add(this.options.tweens[i]);
        }

        var self = this;
        self.checked = false;
        this.el.addEventListener(clickHandler, function() {
            if(el.className.indexOf('praise-ok') > -1 || document.querySelector('.praise-box-fixed')) {
                self.checked = true;
                self.options.onUnCheck();
            }
            else {
                self.options.onCheck();
                self.timeline.start();
            }

            // if( self.checked ) {
            //     self.options.onUnCheck();
            // }
            // else {
            //     self.options.onCheck();
            //     self.timeline.start();
            // }
        });
    }

    Animocon.prototype.options = {
        tweens : [
            new mojs.Burst({
                shape : 'circle',
                isRunLess: true
            })
        ],
        onCheck : function() { return false; },
        onUnCheck : function() { return false; }
    };

    // grid items:
    function init() {
        if(!document.querySelector('.praise')) {
            return false;
        }
        var el1  = document.querySelector('.praise'), el1span = el1.querySelector('span');
        var anim = GetRandomNum(1,9);
        switch(anim) {
            case 1:
                anim1(el1, el1span);
                break;
            case 2:
                anim2(el1, el1span);
                break;
            case 3:
                anim3(el1, el1span);
                break;
            case 4:
                anim4(el1, el1span);
                break;
            case 5:
                anim5(el1, el1span);
                break;
            case 6:
                anim6(el1, el1span);
                break;
            case 7:
                anim7(el1, el1span);
                break;
            case 8:
                anim8(el1, el1span);
                break;
            case 9:
                anim9(el1, el1span);
                break;
            default:
                break;
        }
    }
    function GetRandomNum(Min,Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
    }
    function anim1(el1, el1span) {
        /* Icon 1 */
        new Animocon(el1, {
            tweens : [
                // burst animation
                new mojs.Burst({
                    parent: el1,
                    duration: 1700,
                    shape : 'circle',
                    fill: '#20a8ff',
                    x: '50%',
                    y: '50%',
                    opacity: 0.6,
                    childOptions: { radius: {15:0} },
                    radius: {30:90},
                    count: 6,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // ring animation
                new mojs.Transit({
                    parent: el1,
                    duration: 700,
                    type: 'circle',
                    radius: {0: 60},
                    fill: 'transparent',
                    stroke: '#20a8ff',
                    strokeWidth: {20:0},
                    opacity: 0.6,
                    x: '50%',
                    y: '50%',
                    isRunLess: true,
                    easing: mojs.easing.sin.out
                }),
                // icon scale animation
                new mojs.Tween({
                    duration : 1200,
                    onUpdate: function(progress) {
                        if(progress > 0.3) {
                            var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                            el1span.style.WebkitTransform = el1span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
                        }
                        else {
                            el1span.style.WebkitTransform = el1span.style.transform = 'scale3d(0,0,1)';
                        }
                    }
                })
            ],
            onCheck : function() {
                el1.style.color = '#988ADE';
            },
            onUnCheck : function() {
                el1.style.color = '#20a8ff';
            }
        });
        /* Icon 1 */
    }
    function anim2(el2, el2span) {
        /* Icon 2 */
        new Animocon(el2, {
            tweens : [
                // burst animation
                new mojs.Burst({
                    parent: el2,
                    duration: 1500,
                    delay: 300,
                    shape : 'circle',
                    fill: '#20a8ff',
                    x: '50%',
                    y: '50%',
                    opacity: 0.6,
                    radius: {40:90},
                    count: 6,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // ring animation
                new mojs.Transit({
                    parent: el2,
                    duration: 600,
                    type: 'circle',
                    radius: {0: 50},
                    fill: 'transparent',
                    stroke: '#20a8ff',
                    strokeWidth: {35:0},
                    opacity: 0.6,
                    x: '50%',
                    y: '50%',
                    isRunLess: true,
                    easing: mojs.easing.ease.inout
                }),
                // icon scale animation
                new mojs.Tween({
                    duration : 1100,
                    onUpdate: function(progress) {
                        if(progress > 0.3) {
                            var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                            el2span.style.WebkitTransform = el2span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
                        }
                        else {
                            el2span.style.WebkitTransform = el2span.style.transform = 'scale3d(0,0,1)';
                        }
                    }
                })
            ],
            onCheck : function() {
                el2.style.color = '#988ADE';
            },
            onUnCheck : function() {
                el2.style.color = '#20a8ff';
            }
        });
        /* Icon 2 */
    }
    function anim3(el3, el3span) {
        /* Icon 3 */
        new Animocon(el3, {
            tweens : [
                // burst animation
                new mojs.Burst({
                    parent: el3,
                    duration: 1500,
                    delay: 300,
                    shape : 'circle',
                    fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
                    x: '50%',
                    y: '50%',
                    opacity: 0.6,
                    radius: {40:90},
                    count: 6,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // ring animation
                new mojs.Transit({
                    parent: el3,
                    duration: 750,
                    type: 'circle',
                    radius: {0: 50},
                    fill: 'transparent',
                    stroke: '#20a8ff',
                    strokeWidth: {35:0},
                    opacity: 0.6,
                    x: '50%',
                    y: '50%',
                    isRunLess: true,
                    easing: mojs.easing.bezier(0, 1, 0.5, 1)
                }),
                // icon scale animation
                new mojs.Tween({
                    duration : 1100,
                    onUpdate: function(progress) {
                        if(progress > 0.3) {
                            var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                            el3span.style.WebkitTransform = el3span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
                        }
                        else {
                            el3span.style.WebkitTransform = el3span.style.transform = 'scale3d(0,0,1)';
                        }
                    }
                })
            ],
            onCheck : function() {
                el3.style.color = '#20a8ff';
            },
            onUnCheck : function() {
                el3.style.color = '#C0C1C3';
            }
        });
        /* Icon 3 */
    }
    function anim4(el4, el4span) {
        /* Icon 4 */
        var scaleCurve4 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
        new Animocon(el4, {
            tweens : [
                // burst animation
                new mojs.Burst({
                    parent: el4,
                    duration: 1500,
                    shape : 'circle',
                    fill : [ '#20a8ff', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
                    x: '50%',
                    y: '50%',
                    opacity: 0.6,
                    childOptions: { radius: {20:0} },
                    radius: {40:120},
                    count: 6,
                    isSwirl: true,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // ring animation
                new mojs.Transit({
                    parent: el4,
                    duration: 750,
                    type: 'circle',
                    radius: {0: 50},
                    fill: 'transparent',
                    stroke: '#20a8ff',
                    strokeWidth: {15:0},
                    opacity: 0.6,
                    x: '50%',
                    y: '50%',
                    isRunLess: true,
                    easing: mojs.easing.bezier(0, 1, 0.5, 1)
                }),
                // icon scale animation
                new mojs.Tween({
                    duration : 900,
                    onUpdate: function(progress) {
                        var scaleProgress = scaleCurve4(progress);
                        el4span.style.WebkitTransform = el4span.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)';
                    }
                })
            ],
            onCheck : function() {
                el4.style.color = '#20a8ff';
            },
            onUnCheck : function() {
                el4.style.color = '#C0C1C3';
            }
        });
        /* Icon 4 */
    }
    function anim5(el5, el5span) {
        /* Icon 5 */
        var scaleCurve5 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
        new Animocon(el5, {
            tweens : [
                // burst animation
                new mojs.Burst({
                    parent: el5,
                    duration: 1500,
                    shape : 'circle',
                    fill : '#20a8ff',
                    x: '50%',
                    y: '50%',
                    opacity: 0.6,
                    childOptions: { radius: {20:0} },
                    radius: {20:80},
                    angle: {0: 140},
                    count: 15,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // icon scale animation
                new mojs.Tween({
                    duration : 800,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
                    onUpdate: function(progress) {
                        var scaleProgress = scaleCurve5(progress);
                        el5span.style.WebkitTransform = el5span.style.transform = 'scale3d(' + progress + ',' + progress + ',1)';
                    }
                })
            ],
            onCheck : function() {
                el5.style.color = '#20a8ff';
            },
            onUnCheck : function() {
                el5.style.color = '#C0C1C3';
            }
        });
        /* Icon 5 */
    }
    function anim6(el6, el6span) {
        /* Icon 6 */
        var scaleCurve6 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
        new Animocon(el6, {
            tweens : [
                // burst animation
                new mojs.Burst({
                    parent: el6,
                    duration: 1500,
                    shape : 'circle',
                    fill : 'white',
                    x: '50%',
                    y: '50%',
                    childOptions: {
                        radius: {12:0},
                        type: 'line',
                        stroke: '#20a8ff',
                        strokeWidth: 2
                    },
                    radius: {40:110},
                    count: 20,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // ring animation
                new mojs.Transit({
                    parent: el6,
                    duration: 800,
                    type: 'circle',
                    radius: {10: 60},
                    fill: 'transparent',
                    stroke: '#20a8ff',
                    strokeWidth: {30:0},
                    x: '50%',
                    y: '50%',
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // icon scale animation
                new mojs.Tween({
                    duration : 800,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
                    onUpdate: function(progress) {
                        var scaleProgress = scaleCurve6(progress);
                        el6span.style.WebkitTransform = el6span.style.transform = 'scale3d(' + progress + ',' + progress + ',1)';
                    }
                })
            ],
            onCheck : function() {
                el6.style.color = '#20a8ff';
            },
            onUnCheck : function() {
                el6.style.color = '#C0C1C3';
            }
        });
        /* Icon 6 */
    }
    function anim7(el7, el7span) {
        /* Icon 7 */
        new Animocon(el7, {
            tweens : [
                // burst animation
                new mojs.Burst({
                    parent: el7,
                    duration: 1200,
                    delay: 200,
                    shape : 'circle',
                    fill: '#20a8ff',
                    x: '50%',
                    y: '50%',
                    opacity: 0.6,
                    childOptions: { radius: {'rand(20,5)':0} },
                    radius: {90:150},
                    count: 18,
                    isSwirl: true,
                    swirlSize: 15,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // ring animation
                new mojs.Transit({
                    parent: el7,
                    duration: 1500,
                    type: 'circle',
                    radius: {30: 100},
                    fill: 'transparent',
                    stroke: '#20a8ff',
                    strokeWidth: {30:0},
                    opacity: 0.6,
                    x: '50%',
                    y: '50%',
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                new mojs.Transit({
                    parent: el7,
                    duration: 1600,
                    delay: 320,
                    type: 'circle',
                    radius: {30: 80},
                    fill: 'transparent',
                    stroke: '#20a8ff',
                    strokeWidth: {20:0},
                    opacity: 0.3,
                    x: '50%',
                    y: '50%',
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // icon scale animation
                new mojs.Tween({
                    duration : 1000,
                    onUpdate: function(progress) {
                        if(progress > 0.3) {
                            var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                            el7span.style.WebkitTransform = el7span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
                        }
                        else {
                            el7span.style.WebkitTransform = el7span.style.transform = 'scale3d(0,0,1)';
                        }
                    }
                })
            ],
            onCheck : function() {
                el7.style.color = '#20a8ff';
            },
            onUnCheck : function() {
                el7.style.color = '#C0C1C3';
            }
        });
        /* Icon 7 */
    }
    function anim8(el8, el8span) {
        /* Icon 8 */
        var scaleCurve8 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
        new Animocon(el8, {
            tweens : [
                // burst animation
                new mojs.Burst({
                    parent: el8,
                    duration: 1600,
                    shape : 'circle',
                    fill: '#20a8ff',
                    x: '50%',
                    y: '50%',
                    opacity: 0.6,
                    childOptions: { radius: {'rand(20,5)':0} },
                    radius: {50:110},
                    count: 28,
                    isSwirl: true,
                    swirlSize: 15,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // burst animation
                new mojs.Burst({
                    parent: el8,
                    duration: 1800,
                    delay: 300,
                    shape : 'circle',
                    fill: '#20a8ff',
                    x: '50%',
                    y: '50%',
                    opacity: 0.6,
                    childOptions: {
                        radius: {'rand(20,5)':0},
                        type: 'line',
                        stroke: '#20a8ff',
                        strokeWidth: 2
                    },
                    angle: {0:10},
                    radius: {140:200},
                    count: 18,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // burst animation
                new mojs.Burst({
                    parent: el8,
                    duration: 2000,
                    delay: 500,
                    shape : 'circle',
                    fill: '#20a8ff',
                    x: '50%',
                    y: '50%',
                    opacity: 0.6,
                    childOptions: { radius: {'rand(20,5)':0} },
                    radius: {40:80},
                    count: 18,
                    isSwirl: true,
                    swirlSize: 15,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // burst animation
                new mojs.Burst({
                    parent: el8,
                    duration: 3000,
                    delay: 750,
                    shape : 'circle',
                    fill: '#20a8ff',
                    x: '50%',
                    y: '50%',
                    opacity: 0.6,
                    childOptions: {
                        radius: {'rand(20,10)':0}
                    },
                    angle: {0:-10},
                    radius: {90:130},
                    count: 20,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // icon scale animation
                new mojs.Tween({
                    duration : 400,
                    easing: mojs.easing.back.out,
                    onUpdate: function(progress) {
                        var scaleProgress = scaleCurve8(progress);
                        el8span.style.WebkitTransform = el8span.style.transform = 'scale3d(' + progress + ',' + progress + ',1)';
                    }
                })
            ],
            onCheck : function() {
                el8.style.color = '#20a8ff';
            },
            onUnCheck : function() {
                el8.style.color = '#C0C1C3';
            }
        });
        /* Icon 8 */
    }
    function anim9(el9, el9span) {
        /* Icon 9 */
        el9span.style.WebkitTransformOrigin = el9span.style.transformOrigin = '-10% 50%';
        new Animocon(el9, {
            tweens : [
                // burst animation
                new mojs.Burst({
                    parent: el9,
                    duration: 1500,
                    delay: 350,
                    shape : 'circle',
                    fill : [ '#20a8ff', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
                    x: '50%',
                    y: '50%',
                    opacity: 0.6,
                    radius: {40:90},
                    count: 6,
                    angle: 135,
                    degree: 90,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // burst animation
                new mojs.Burst({
                    parent: el9,
                    duration: 1500,
                    delay: 550,
                    shape : 'circle',
                    fill : [ '#20a8ff', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
                    x: '50%',
                    y: '50%',
                    opacity: 0.6,
                    radius: {40:100},
                    count: 6,
                    angle: 45,
                    degree: -90,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // ring animation
                new mojs.Transit({
                    parent: el9,
                    duration: 750,
                    type: 'circle',
                    radius: {0: 50},
                    fill: 'transparent',
                    stroke: '#20a8ff',
                    strokeWidth: {35:0},
                    opacity: 0.6,
                    x: '50%',
                    y: '50%',
                    isRunLess: true,
                    easing: mojs.easing.bezier(0, 1, 0.5, 1)
                }),
                // ring animation
                new mojs.Transit({
                    parent: el9,
                    duration: 750,
                    delay: 200,
                    type: 'circle',
                    radius: {0: 50},
                    fill: 'transparent',
                    stroke: '#20a8ff',
                    strokeWidth: {35:0},
                    opacity: 0.6,
                    x: '50%',
                    y: '50%',
                    isRunLess: true,
                    easing: mojs.easing.bezier(0, 1, 0.5, 1)
                }),
                // icon scale animation
                new mojs.Tween({
                    duration : 1500,
                    onUpdate: function(progress) {
                        if(progress > 0.3) {
                            var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                            el9span.style.WebkitTransform = el9span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1) rotate3d(0,0,1,' + 90*(1-elasticOutProgress) + 'deg)';
                        }
                        else {
                            el9span.style.WebkitTransform = el9span.style.transform = 'scale3d(0,0,1)';
                        }
                    }
                })
            ],
            onCheck : function() {
                el9.style.color = '#20a8ff';
            },
            onUnCheck : function() {
                el9.style.color = '#C0C1C3';
            }
        });
        /* Icon 9 */
    }

    init();

})(window);
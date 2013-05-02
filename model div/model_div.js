
(function($) {
    var dotterDiv = (function() {
        var timestrapId = new Date().getTime();
        var vargs = {};
        var methods = {
            init: function(obj, options) {
                
                if(options.mask) {
                     var div1 = $('<div id="' + timestrapId + 'mask"  style="position: absolute;background:black;z-index:99999;filter:alpha(opacity=50); -moz-opacity:0.5; opacity:0.5;"></div>');
                     $("html").append(div1.show());
                }
                
                var div = $('<div id="' + timestrapId + '"  style="position: absolute;display:none;z-index:100000;"></div>');
                var target = $(obj);
                vargs = options;
                target.show();
                div.append(target);
                $("html").append(div);
                _priveteMethods.initStyle();
                _priveteMethods.animate('open');
            }, close: function() {
                _priveteMethods.animate('close');
                $("#" + timestrapId+"mask").remove();
            }
        };

        var _priveteMethods = {
            initStyle: function() {
                try {
                    var scrollTop = $(document).scrollTop(), scrollLeft = $(document).scrollLeft(), bodyWidth = $(document).width(), bodyHeight = $(document).height(), windowWidth = $(window).width(), windowHeight = $(window).height();
                    var height = vargs.height;
                    if (height === 'auto') {
                        height = bodyHeight;
                    }
                    var width = vargs.width;
                    if (width === 'auto') {
                        width = bodyWidth;
                    }
                    
                    
                    $("#" + timestrapId).css({"height": height, "width": width});
                    var left = vargs.left;
                    if (left === 0) {
                        if (width > windowWidth) {
                            left = 0;
                        } else {
                            left = Math.round((windowWidth - width) / 2) + scrollLeft;
                        }
                    }
                    var top = vargs.top;
                    if (top === 0) {
                        if (height > windowHeight) {
                            top = 0;
                        } else {
                            top = Math.round((windowHeight - height) / 2) + scrollTop;
                        }
                    }
                    $("#" + timestrapId).offset({
                        left: left,
                        top: top
                    });
                    
                    var mask = $("#" + timestrapId+"mask");
                    if(mask !== undefined) {
                        mask.css({"height": bodyHeight, "width": bodyWidth});
                        mask.offset({
                        left: scrollLeft,
                        top: scrollTop
                    });
                    }
                    
                } catch (e) {
                    window.console.log("Error when init style:" + e);
                }
            },
            animate: function(operate) {
                try {
                    var rate = 5 / vargs.speed;
                    var transition = vargs.transition;
                    var div1 = $("#" + timestrapId);
                    if (transition === 'waterfall') {
                        if (operate === 'open') {
                            div1.slideDown();
                        } else if (operate === 'close') {
                            div1.slideUp( function() {
                                div1.remove();
                            });
                        }
                    } else if (transition === 'slideLeft') {
                        var left = parseInt(div1.css("left").replace("px", ""));
                        var t = -(left + div1.width());
                        if (operate === 'open') {
                            div1.offset({
                                left: -(left + div1.width())
                            }).css("display", "").animate({
                                left: left
                            }, (left + div1.width()) * rate);
                        } else if (operate === 'close') {
                            left = div1.offset().left;
                            div1.animate({
                                left: -(left + div1.width())
                            }, (left + div1.width()) * rate, function() {
                                div1.remove();
                            });
                        }
                    } else if (transition === 'slideRight') {
                        var left = parseInt(div1.css("left").replace("px", ""));
                        if (operate === 'open') {
                            div1.offset({
                                left: (left + div1.width())
                            }).css("display", "").animate({
                                left: left
                            }, (left + div1.width()) * rate);
                        } else if (operate === 'close') {
                            left = div1.offset().left;
                            div1.animate({
                                left: (2 * left + div1.width())
                            }, (2 * left + div1.width()) * rate, function() {
                                div1.remove();
                            });
                        }
                    } else if (transition === 'fade') {
                        if (operate === 'open') {
                            div1.fadeIn();
                        } else if (operate === 'close') {
                            div1.fadeOut(function() {
                                div1.remove();
                            });
                        }
                    } else {
                       if(operate === 'open') {
                           div1.show();
                       } else {
                           div1.remove();
                       }
                    }
                } catch (e) {
                    window.console.log("Error in transition:" + e);
                }
            }
        };
        $(window).scroll(function() {
            _priveteMethods.initStyle();
        });
        $(window).resize(function() {
            _priveteMethods.initStyle();
        });
        return methods;
    })();
    $.fn.openDiv = function(options) {
        var defaults = {
            left: 0,
            top: 0,
            height: "auto",
            width: "auto",
            transition: "slideLeft",
            speed: "500",
            mask:false
        };
        var opts = $.extend(defaults, options);
        dotterDiv.init(this, opts);
    };
    $.fn.closeDiv = function() {
        dotterDiv.close();
    };
})(jQuery);

/*基于jQuery*/

var banner = {
    //用来统计总共有几个图片的
    max: null,
    //用来表示当前所显示的图片数字
    now: null,
    //自动轮播的计时器
    bannerTimer: null,
    //自动播放时间的
    autoplaytime: null,
    //页面上的小圆点
    pagination: null,
    //prebutton
    prebutton: null,
    //nextbutton
    nextbutton: null,
    //显示 pre next
    showButton: function() {
        if (this.prebutton) {
            $(this.prebutton).show();
        }
        if (this.nextbutton) {
            $(this.nextbutton).show();
        }
    },
    hideButton: function() {
        if (this.prebutton) {
            $(this.prebutton).hide();
        }
        if (this.nextbutton) {
            $(this.nextbutton).hide();
        }
    },
    //用来进行显示和隐藏图片（通过show(), hide()）
    showAuto: function() {
        var ywh_this = this;

        this.bannerTimer = setInterval(function() {
            for (var i = 1; i <= ywh_this.max; i++) {
                if (i == ywh_this.now) {
                    $(".ad" + i).animate({
                        opacity: 1
                    }, 1000);
                    $("#bullet" + i).addClass('active');
                } else {
                    $(".ad" + i).animate({
                        opacity: 0
                    }, 500);
                    $("#bullet" + i).removeClass('active');
                }
                // if (ywh_this.now > ywh_this.max) {
                //     ywh_this.now = ywh_this.max;
                    // $(".ad" + ywh_this.max).animate({
                    //     opacity: 1
                    // }, 1000);
                    // $("#bullet" + ywh_this.max).addClass('active');
                //     clearInterval(ywh_this.bannerTimer);
                // }
            }
            ywh_this.doLoop();

        }, ywh_this.autoplaytime);
    },
    //静态显示
    doPlay: function(num) {
        this.now = num;
        for (var i = 1; i <= this.max; i++) {
            if (i == num) {

                $(".ad" + i).animate({
                        opacity: "1"
                    }, 1000);
                $("#bullet" + i).addClass("active");
            } else {

                $(".ad" + i).animate({
                        opacity: "0"
                    }, 500);
                $("#bullet" + i).removeClass('active');
            }
        }
    },
    doLoop: function() {
        if(this.now<this.max){

        this.now++;
        }
    },
    mouseOver: null,
    init: function(obj, json) {
        var childs = $(obj).children().eq(0).children();
        this.now = 1;
        this.max = childs.length;
        childs.each(function(index, el) {
            $(el).addClass("ad" + (index + 1));
        });
        //如果传入json的话
        if (json) {
            //如果有autoplay的话
            if (json.autoplay) {
                /*如果有autoplaytime的话
                 * 调用show的方法并且设置 autoplaytime
                 */
                if (json.autoplaytime) {
                    this.autoplaytime = json.autoplaytime;
                } else {
                    /*如果没有autoplaytime
                     * 设置默认的2000
                     */
                    this.autoplaytime = 2000;
                }
                this.showAuto();
                //如果没有autoplay属性 那么就直接默认不自动播放
            } else {
                this.doPlay(1);
            }
            //如果有loop的话
            if (json.loop) {
                this.doLoop = function() {
                    if (this.now == this.max) {
                        this.now = 1;
                    } else {
                        this.now++;
                    }
                }
            }

            //如果mouseoverstop是true的话
            var ywh_this = this;
            if (json.mouseoverstop) {
                //绑定一个mouseover事件
                $(obj).bind("mouseover", function() {
                    clearInterval(ywh_this.bannerTimer);
                    ywh_this.showButton();
                }).bind("mouseout", function() {
                    if (ywh_this.autoplaytime) {
                        ywh_this.showAuto();
                        ywh_this.hideButton();
                    }
                });
            }

            //如果pagination有值的话
            if (json.pagination) {
                for (var i = 1; i <= this.max; i++) {
                    $(json.pagination).append("<span class=pagination_bullet id=bullet" + i + " path=" + i + "></span>");
                    ywh_this.doPlay(ywh_this.now);
                }
                if (json.paginationcontrol) {
                    $(".pagination_bullet").on("click", function() {
                        var num = $(this).attr("path");
                        ywh_this.doPlay(num);
                    })
                }
            }

            //如果prebutton有值的话
            if (json.prebutton) {
                this.prebutton = json.prebutton;
                $(json.prebutton).append("<div class=button id=pre>&lt;</div>");
                $("#pre").on("click", function() {
                    var num = ywh_this.now - 1;
                    if (num < 1) {
                        if (json.loop) {
                            num = ywh_this.max;
                        } else {
                            num = 1;
                        }
                    }
                    ywh_this.doPlay(num);
                });

            }

            //如果nextbutton有值的话
            if (json.prebutton) {
                this.nextbutton = json.nextbutton;
                $(json.nextbutton).append("<div class=button id=next>&gt;</div>");
                $("#next").on("click", function() {
                    var num = ywh_this.now + 1;
                    if (num > ywh_this.max) {
                        if (json.loop) {
                            num = 1;
                        } else {
                            num = ywh_this.max;
                        }
                    }
                    ywh_this.doPlay(num);
                });

            }

        }
    },

}

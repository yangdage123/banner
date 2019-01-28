## 1.起步
> 插件是基于jQuery,在使用之前请先引入jQuery引入`ywh_banner.css`、引入`ywh_banner.js`

### banner图基本格式

    .container
        .wrapper
            .slide
        .pagination
        .pre-button
        .next-button

使用前请对`.container`元素进行`width`、`height`设置

请在元素的下面或当页面加载完成的时候对插件进行初始化(使用JavaScript代码)
调用banner.init()方法

banner.init()

## 2.继续
> banner.init(element,json)方法支持两个传参

    第一个参数传入 .container 所在的元素 (id属性以#开头 class属性以.开头)
    第二个参数出入json对象
    暂时支持的参数为
        autoplay: true,
        自动播放 (true||false)

        autoplaytime: 1000,
        自动播放时间(传入毫秒值)

        loop: true,
        循环(true||false)

        mouseoverstop: true,
        鼠标悬浮停止自动播放(true||false)--上一页 下一页悬浮出现 隐藏也在这个功能里面

        pagination: ".pagination",
        分页器的显示(传入.pagination 所在的元素 (id属性以#开头 class属性以.开头))

        paginationcontrol:true,
        分页器的点击控制(true||false)

        prebutton:".pre-button",
        上一页(传入.pre-button 所在的元素 (id属性以#开头 class属性以.开头))

        nextbutton:".next-button"
        下一页(传入.next-button 所在的元素 (id属性以#开头 class属性以.开头))

## 3.后记
> 此插件的banner轮播切换效果只是单纯的通过jQuery的show、hide(jQuery里的animate()修改`opacity`来控制)方法来实现。还未拥有好看绚丽的特效,只做学习使用





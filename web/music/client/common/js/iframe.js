$(function () {
    //时间控制每隔200毫秒检查当前页面高度以及滚动高度，测试多遍，cpu占用极少，不明显影响程序运行速度
    window.setInterval("reinitIframe()", 200);
})


//iframe自适应高度,解决了动态更换页面高度无法自适应问题
function reinitIframe() {
    var content = document.getElementById("content");
    try {
        //bHeight 和 dHeight 如果相等，用其一等于iframe.height 即可
        // var bHeight = iframe.contentWindow.document.body.scrollHeight;
        var dHeight = content.contentWindow.document.documentElement.scrollHeight;
        // var height = Math.max(bHeight, dHeight);
        // console.log(dHeight)
        content.height = dHeight;
    } catch (ex) { }
}
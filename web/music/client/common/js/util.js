// 封装获取参数方法
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

// 消息提示框
toastr.options = {
    closeButton: true,
    debug: false,
    progressBar: true,
    positionClass: "toast-top-right",
    onclick: null,
    showDuration: "1000",
    hideDuration: "1000",
    timeOut: "3000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    closeMethod: "fadeOut",
};


//隐藏地址
$("#albums").on("click", "a", function () {
    var albumId = $(this).parent().parent().parent().find("#albumId").val();
    $(this).attr("href", "/albumDetail?albumId=" + albumId);
});

$("#songLists").on("click", "a", function () {
    // alert(window.location.href);

    var songListId = $(this).parent().find("#songListId").val();
    $(this).attr("href", "/songListDetail?songListId=" + songListId);
});

$("#music").on("click", "#playOne", function () {
    // alert(window.location.href);
    // var url=window.location.href;
    // alert( url.substring(0,url.indexOf("/")+1))
    var songId = $(this).parent().parent().find("#songId").val();
    $(this).attr("href", "/play?temp=song&songId=" + songId);
});

$("#music").on("click", "#singer", function () {
    var singerId = $(this).parent().parent().find("#singerId").val();
    $(this).attr("href", "/singerDetail?singerId=" + singerId);
});
$("#singerList").on("click", "#home", function () {
    var singerId = $(this).parent().parent().parent().parent().find("#singerId").val();
    $(this).attr("href", "/singerDetail?singerId=" + singerId);
});

// 初始化菜单
function initNav() {
    $("#login").css("display", "block");
    $("#register").css("display", "block");
    $("#logout").css("display", "none");
    $("#personalPage").css("display", "none");
    $("#headimg").css("display", "none");
    $("#profile").css("display", "none");
    $("#uc").html(" ");
}

initNav();

// 登录以后
function isLoginNav(data) {
    toastr.success("欢迎您" + data.nickName + "回来(*∩_∩*)")
    $("#login").css("display", "none");
    $("#register").css("display", "none");
    $("#logout").css("display", "block");
    $("#personalPage").css("display", "block");
    $("#headimg").css("display", "block");
    $("#profile").css("display", "block");
    $("#headimg").attr("src", data.headImg);
    $("#uc").html(data.nickName);
}

var userId = JSON.parse(localStorage.getItem("userId"));

// 未登录
function isLogin() {
    toastr.options.onHidden = function () {
        location.href = "/login";
    }
    toastr.warning("请先登录！");
}

// 首页不需要强制登录
function isFirst() {
    if (null == userId) {
        initNav();
    } else {
        $.ajax({
            url: "/getUserInfo/" + userId, method: "get", success: function (data) {
                console.log(data)
                if ("user is not exited" !== $.trim(data)) {
                    console.log(typeof(data)=='string')
                    isLoginNav(data);
                } else {
                    localStorage.removeItem("userId");
                    initNav();
                }
            }
        });
    }
}

// 退出登录
$("#logout").click(function () {
    var message = confirm("是否退出登录?");
    if (message === true) {
        $.ajax({
            url: "/logout", data: {"userId": userId}, method: "post", success: function (data) {
                location.href = data;
                localStorage.removeItem("userId");
            }
        });
    }
});


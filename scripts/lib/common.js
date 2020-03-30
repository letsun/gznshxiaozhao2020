var common = {};

(function ($) {
    var timer = [];
    var baseUrl = "https://zp.letsun.com.cn/";
    common.cfg = {
        companyId: "72",
        getOpenId: baseUrl + "w/crossDomain/",                      //获取用户信息，openId、头像等
        getRound: baseUrl + "w/crossDomain/getAllActivity/",        //获取场次列表
        getVote: baseUrl + "w/crossDomain/govote/",                 //获取投票题目
        submitVote: baseUrl + "w/crossDomain/submitVote/",          //提交投票
        submitMes: baseUrl + "w/crossDomain/submitDataChinabank/",           // 中国银行提交信息
        submitSpeak: baseUrl + "w/crossDomain/submitComment/",      //提交发言
        signUrl: baseUrl + "w/crossDomain/submitCheckin/",          //签到
        pcInit: baseUrl + "w/crossDomain/queryActivity/",           //pc页面初始化
        getUser: baseUrl + "w/crossDomain/getlistRecord/",          //获取用户
        getComment: baseUrl + "w/crossDomain/getlistCommentRecord/",//获取评论
        getVoteNum: baseUrl + "w/crossDomain/getlistVoteRecord/",   //获取投票数据
        setVote: baseUrl + "w/crossDomain/setVoteOpend/"            //投票开启和关闭
    };

    /**
     * @func common.alert()
     * @desc 弹框组件
     * @param cfg
     * @param cfg.title {string} 弹框标题，默认为没有标题
     * @param cfg.content {string} 弹框内容
     * @param cfg.width {string} 弹框宽度
     * @param cfg.dialog {boolean} 是否是对话框，默认为否
     * @param cfg.ok {function} 点击确定的回调函数
     * @param cfg.okValue {string} 确定按钮的文字，默认为确定
     * @param cfg.cancel {function} 点击取消的回调函数
     * @param cfg.cancelValue {string} 取消按钮的文字，默认为取消
     * @param cfg.textAlign {string} 文字方向，默认为居中
     * @param cfg.mask {boolean} 是否有遮罩层，默认为没有
     */
    common.alert = function (cfg) {
        //设置默认值
        var ok = cfg.ok || function () {
            };
        var okValue = cfg.okValue || "确定";
        var cancel = cfg.cancel || function () {
            };
        var cancelValue = cfg.cancelValue || "取消";
        var dialog = cfg.dialog || false;
        var textAlign = cfg.textAlign || "center";
        var width = cfg.width || "70%";

        //生成随机ID
        var id = Math.ceil(Math.random() * 1000000);

        var con = '<div class="alert" style="position: fixed;width: 100%;height: 100%;top: 0;left: 0;';

        //判断是否添加遮罩层
        if (cfg.mask) {
            con += 'background-color: rgba(0, 0, 0, 0.5);';
        }

        con += '-webkit-transition: ease-out 0.5s; -moz-transition: ease-out 0.5s;-ms-transition: ease-out 0.5s; -o-transition: ease-out 0.5s;' +
            'transition: ease-out 0.5s;z-index:9999;opacity:0"><div style="position: absolute;top: 40%;left:50%;width: ' + width +
            ';background-color: #fff;border-radius: 10px;overflow: hidden;-webkit-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);' +
            '-ms-transform: translate(-50%,-50%); -o-transform: translate(-50%,-50%);transform: translate(-50%,-50%);box-shadow: 3px 3px 10px #666">';

        //判断是否有标题
        if (cfg.title) {
            con += '<div style="font-size: 14px;line-height: 30px;text-align: center;color: #60a0ff;">' + cfg.title + '</div>' +
                '<div style="font-size: 14px;color: #555;padding: 10px;text-align:' + textAlign + ';border-bottom: 1px solid #ccc;' +
                'word-break:break-all;word-wrap:break-word;position:relative">' + cfg.content + '</div>';
        } else {
            con += '<div style="font-size: 14px;color: #555;padding: 20px 10px;text-align:' + textAlign + ';border-bottom: 1px solid #ccc;' +
                'word-break:break-all;word-wrap:break-word;position:relative">' + cfg.content + '</div>';
        }

        //判断弹框类型，如果为对话框则显示确定和取消按钮
        if (dialog) {
            con += '<div><button style="width: 48%;height: 40px;border: none;background: none;font-size: 14px;padding: 0;outline: none" ' +
                'id="dCancel' + id + '">' + cancelValue + '</button><button style="width: 48%;height: 40px;border: none;background: none;' +
                'font-size: 14px;padding: 0;color: #60a0ff;outline: none;" id="dConfirm' + id + '">' + okValue + '</button></div></div>';
        } else {
            con += '<div><button style="width: 100%;height: 40px;border: none;background: none;font-size: 14px;' +
                'padding: 0;color: #60a0ff;outline: none;" id="dConfirm' + id + '">' + okValue + '</button></div></div></div>';
        }

        //向页面添加弹框
        $("body").append(con);

        //延时添加过渡效果
        setTimeout(function () {
            $(".alert").css("opacity", 1);
        }, 30);

        //取消按钮事件
        $("#dCancel" + id).on("click", function () {
            $(this).parents(".alert").remove();
            cancel();
        });

        //确定按钮事件
        $("#dConfirm" + id).on("click", function () {
            $(this).parents(".alert").remove();
            ok();
        });
    };

    /**
     * @param content
     * @param time
     */
    common.toast = function (content, time) {
        var html = '<div class="toast" style="position: fixed;padding: 20px;background-color:rgba(0,0,0,0.5);font-size: 16px;border-radius: 10px;' +
            'color: #fff;max-width: 60%;z-index:9999;top: 50%;left:50%;-webkit-transform: translate(-50%,-50%)">' + content + '</div>';
        $("body").append(html);
        setTimeout(function () {
            $(".toast").remove();
        }, time);
    };

    /**
     * @func GetUrlString
     * @desc 获取url传的值
     * @param {string} name 需要获取的字段名
     */
    common.getUrlString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var str = window.location.search.substr(1).match(reg);
        if (str) {
            return str[2];
        }
        else {
            return null;
        }
    };

    /**
     * @func render
     * @desc 页面渲染
     * @param {object} cfg
     * @param {object} cfg.tmpl dotjs的模板对象
     * @param {object} cfg.data 渲染模板所需要数据
     * @param {string} cfg.container 渲染的模板将被插入的容器选择器
     * @param {boolean} cfg.overwrite 是否清空容器原有内容 默认不清空
     * @param {boolean} cfg.append 是否在末尾添加
     * @param {function} cfg.callback 渲染完成的回调方法
     * @example
     * common.render(cfg);
     */
    common.render = function (cfg) {
        var callback = cfg.callback || function () {
            };
        var append = cfg.append || true;

        var tmpl = doT.template(cfg.tmpl.text());

        if (cfg.overwrite) {
            cfg.container.empty();
        }
        if (tmpl) {
            if (append) {
                cfg.container.append(tmpl(cfg.data));
            }
            else {
                cfg.container.html(tmpl(cfg.data));
            }
        }
        else {
            console.log("对应的模块不存在!");
        }
        callback();
    };

    /**
     * @desc 添加动画
     * @func common.animate()
     * @param ele {object} 需要添加动画的元素
     */
    common.animate = function (ele) {
        var num = 0;
        ele.each(function () {
            var self = $(this);
            timer[num] = setTimeout(function () {
                self.show();
                self.css({
                    "-webkit-animation": self.data("animate")
                });
            }, self.data("delay"));
            num++;
        });
    };

    /**
     * @desc 显示页面加载百分比
     * @func common.loading()
     * @param ele 显示百分比的元素
     */
    common.loading = function (ele) {
        var loadpicarray;
        var picloaded = 0;

        loadpicarray = document.getElementsByTagName("img");
        picloaded = 0;
        for (var i = 0; i < loadpicarray.length; i++) {
            var img = new Image();
            img.onload = function () {
                picloaded++;
                var lstr = Math.ceil(100 * picloaded / loadpicarray.length) + "%";
                $("#percent").html(lstr);
            };
            img.src = loadpicarray[i].src;
        }
    };

    /**
     * @desc 获取用户信息
     * @func common.getUserMes()
     * @param getPhoto {Number} 是否获取头像 1：是 0：否
     */
    common.getUserMes = function (getPhoto) {
        var reurl = window.location.href.split('#')[0];
        var isWxBrowser = wxJs.isWeixin();
        if (isWxBrowser) {
            common.opid = wxJs.getUrlParam("wx");
            common.mytoken = wxJs.getUrlParam("mytoken");
            if (wxJs.checkMParam(common.opid) && wxJs.checkMParam(common.mytoken)) {

                var hash = hex_md5(common.opid + "wnzlxcy").toUpperCase();
                if (hash != common.mytoken) {
                    if (getPhoto == 1) {
                        window.location.href = common.cfg.getOpenId + common.cfg.companyId + "?isAuthorize=1&wk_requestUrl=" + reurl.split('?')[0];
                    } else {
                        window.location.href = common.cfg.getOpenId + common.cfg.companyId + "?wk_requestUrl=" + reurl.split('?')[0];
                    }
                }
            } else {
                if (getPhoto == 1) {
                    window.location.href = common.cfg.getOpenId + common.cfg.companyId + "?isAuthorize=1&wk_requestUrl=" + reurl.split('?')[0];
                } else {
                    window.location.href = common.cfg.getOpenId + common.cfg.companyId + "?wk_requestUrl=" + reurl.split('?')[0];
                }
            }
        }

        common.fansid = wxJs.getUrlParam("fansid");

        if (getPhoto == 1) {
            common.nickname = wxJs.getUrlParam("nickname");
            common.photo = wxJs.getUrlParam("photo");

            common.nickname = decodeURI(escape(common.nickname));

            $("body").html('<img src="' + common.photo + '" style="display: none">');
        }
    };
})(jQuery);

/**
 * 删除数组某个元素
 * @param index
 * @returns {boolean}
 */
Array.prototype.del = function (index) {
    if (isNaN(index) || index >= this.length) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[index]) {
            this[n++] = this[i];
        }
    }
    this.length -= 1;
};

/**
 * 复制数组
 * @returns {Array.<T>}
 */
Array.prototype.clone = function () {
    return this.slice(0);
};

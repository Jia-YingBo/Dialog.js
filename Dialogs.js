// Dialogs
// AmsWait
// 最后修改：2020/04/28
// 调用方法 Dialogs('内容', function (a) { a为true是确认反之是关闭或者取消 }, ‘标题’);
// 若传入回调函数则显示取消按钮；
// 因为iOS设备下改写原生方法好像不生效 为了兼容 方法名改为Dialogs  桌面设备兼容到IE9

window.Dialogs = function (msg, callback, title) {
    if (document.getElementById("dialogsBox") === null) {
        var div = document.createElement("div");
        div.id = "dialogsBox"
        div.innerHTML = '<style type=\"text/css\">#dialogs{position:relative;display:none}#dialogsMask{position:fixed;z-index:99;top:0;left:0;height:100vh;width:100vw;background-color:rgb(0, 0, 0);opacity:.8;cursor:pointer}.dialogs_body{position:fixed;z-index:100;width:20%;min-width:250px;top:50%;left:50%;padding:15px;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);background-color:#fff;text-align:center;border-radius:8px;overflow:hidden;opacity:1;box-shadow:0 0 15px rgba(0, 0, 0, .14);-webkit-box-shadow:0 0 15px rgba(0, 0, 0, .14)}#dialogsClose{float:right;width:10px;height:10px;padding:5px;padding-top:0;cursor:pointer}#dialogsTitle{font-size:18px;font-weight:500;line-height:1.2;text-align:left}#dialogMsg{padding:10px;font-size:14px;line-height:1.6;text-align:center}.dialog_btn{padding:5px 0 0;text-align:right;font-size: 0;}.dialog_btn a:nth-child(2) {margin-left: 10px;}.dialog_btn a{display:inline-block;line-height:1;white-space:nowrap;cursor:pointer;background:#fff;border:1px solid #dcdfe6;color:#606266;-webkit-appearance:none;text-align:center;box-sizing:border-box;outline:none;margin:0;font-weight:500;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;padding:12px 20px;font-size:14px;border-radius:4px;padding:9px 15px;font-size:12px;border-radius:3px;text-decoration:none}#dialogSure{color:#fff;background-color:#409eff;border-color:#409eff}</style>'
            + '<div id=dialogs><div id=dialogsMask></div><div class=dialogs_body><img id=dialogsClose class=dialogs_close src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAjVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADqhzP4AAAALnRSTlMA/PU8VPjyZUBFMO5sSysn615RNTof4VgT5xnQ266KdJp9qJMP1KG+tgnFcMqiCJxnNAAAAuBJREFUeNrF2ttO4lAAheFFBVoRTxxbkENRRwHd7/94MwEy28zQWZmQf7tuvfj+3VZCQnXYuP/52n2vC6XZsP+52Y8Ul2fhuEUpfkV1xB4GOq58D79XXQve9jlqmxdJ0i8/rtUWupf5V20uSXkIaQqiH7eUxlkwBYAfN1Mdgikg/bDSOiQrKP/2w1xvIVVB+RrOTLtwblPAn5+VtA6mADl/XPwvNHcB8ncahhQF5VMDs5LeTAHqVy9SOTEFoB8KSRpmTX9uM/c/7lmHXWXoNZg1nn8h2QLa9wW07wto3xcw/kZKUDCbGJ8r8D5b4H2wwPs/pAQFY+ODBd5nC7zPFngfLPD+WoILvM8XjCvjcwXehwu8zxfcV+b7F1xw/2B8rsD7bIH3wQLvL6UEBXfGpwvubozPFXgfLvA+X9Br9GspQUGv2+SvJLbA+2yB9+EC7/MFw0a/L+EFxscLQtv4fEGjv5eSFFxwfrQgl+AC79MF3ucLvM8XeD99waPi6ALv0wXepwu8n7ZgKjOgILmvER/gfb7A+3yB930B7KcvGH3zR3FhfLqg6EQELvC+L4B9X8D7voD3fQHvd5N8MStC0wbDxoLHBOdvDaQEBdf/8k0B7rsC3vcFvC/1TAHi30qSL8hp3xfQvi+gfV9A+76A8PmCW+PTBbct43MF3ucKvN+JPlHg/WuJLfD+BQWw738+ymHf/4CWw74v6F/q8wUD44MF3mcLvM8WeB8s8H4hsQXeZwu8zxZ4Hy7wPl8wNT5dMA2A716t6cO+f7mob/0s+kjB6vT8ufNzd2EvSbNu0/lHimOuQetK0pvx0YKq1Mj4cEGt2vhwwa7hDnSupDQFOn/+C/z/fNlUlbn+9DXQwlx/uCA78xB24/n5go3G2Z/+UHF4QVtaGR99Ej8kaU75/sXvm9mh6kvBU0/wxh9Rm5xOu122wnHPW/GrOydtHbW7fLlYLPOekux+tZjcvNfH4/8EyCPnH2+A9roAAAAASUVORK5CYII="><div id=dialogsTitle></div><div id=dialogMsg></div><div class=dialog_btn><a href="javascript:;" class=dialogs_close id=dialogCancel>取消</a><a href="javascript:;" id=dialogSure>确定</a></div></div></div>'
        document.body.appendChild(div);
    }
    var box = document.getElementById("dialogsBox"),
        dialogs = document.getElementById("dialogs"),
        dialogsTitle = document.getElementById("dialogsTitle"),
        dialogMsg = document.getElementById("dialogMsg"),
        dialogsClose = document.querySelectorAll(".dialogs_close"),
        dialogSure = document.getElementById("dialogSure"),
        dialogFlag = Boolean;

    if (typeof callback !== 'function') {
        title = callback;
        callback = '';
    }

    dialogs.style.display = 'block';
    title ? dialogsTitle.innerText = title.toString() : dialogsTitle.innerText = '';
    dialogMsg.innerText = msg.toString();

    function dialogClick(type) {
        dialogs.style.display = 'none';
        dialogFlag = type;
        callback && callback(dialogFlag);
    };

    if (!callback) {
        dialogCancel.style.display = 'none';
        document.getElementById("dialogsMask").onclick = function () { dialogs.style.display = 'none'; document.body.removeChild(box) };
    } else {
        dialogCancel.style.display = 'inline-block';
        document.getElementById("dialogsMask").onclick = function () { return false; };
    }
    for (i = 0; i < dialogsClose.length; i++) {
        dialogsClose[i].onclick = function () { dialogClick(false) };
    }
    dialogSure.onclick = function () { dialogClick(true) };
}

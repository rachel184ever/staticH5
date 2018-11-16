function getUrlParam(name) {//封装方法
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

console.log(getUrlParam("imgPath"))
wx.miniProgram.postMessage({ data: 'foo' })
wx.miniProgram.postMessage({ data: { foo: 'bar' } })
wx.miniProgram.getEnv(function (res) { console.log(res.miniprogram) })


function chooseImg() {
    wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths
            console.log(tempFilePaths)
        }
    })

}

// web-view下的页面内
function ready() {
    chooseImg()
}
if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
    document.addEventListener('WeixinJSBridgeReady', ready, false)
} else {
    ready()
}


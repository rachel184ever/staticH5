
const { SHA1 } = require('./sha1')

const accToken = '15__NFeOk1iUOef8Ap2QidZLUu51fycxG4bV7yiYt0cwLnHuH7GI91IPXe1nzL8wjVPctZIMwbfDXP8xZ5ko3a4VTlGse3DMVESO55bMR1xOO59hdH1675IzDAOIzwocG_kwNRQnRMXuY0d2Ne2KOCaAAAPTH'
const ticket = 'LIKLckvwlJT9cWIhEQTwfM8lwJeSbsPSo0DlFiwzpa5kK2KxAKCO9_w6aQEn56fQhtIC9IPGnT0XfZBkK253wQ'
const timestamp = new Date().getTime()
const nonceStr = 'Wm3WZYTPz0wzccnW'

wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wx18dcd72830075edf', // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature: SHA1(`jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=https://rachel184ever.github.io/staticH5/`),// 必填，签名
    jsApiList: ['http://res.wx.qq.com/open/js/jweixin-1.4.0.js'] // 必填，需要使用的JS接口列表
})

wx.ready(function(){
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
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
});

wx.error(function(res){console.log(res)})

// function ready() {
//     console.log(window.__wxjs_environment === 'miniprogram') // true
//     wx.miniProgram.chooseImage({
//         count: 1,
//         sizeType: ['original', 'compressed'],
//         sourceType: ['album', 'camera'],
//         success(res) {
//             // tempFilePath可以作为img标签的src属性显示图片
//             const tempFilePaths = res.tempFilePaths
//             console.log(tempFilePaths)
//         }
//     })
// }

// if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
//     document.addEventListener('WeixinJSBridgeReady', ready, false)
// } else {
//     ready()
// }

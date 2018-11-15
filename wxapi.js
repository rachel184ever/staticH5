function add(x, y) {  
    return((x & 0x7FFFFFFF) + (y & 0x7FFFFFFF)) ^ (x & 0x80000000) ^ (y & 0x80000000);  
}  

function SHA1hex(num) {  
    var sHEXChars = "0123456789abcdef";  
    var str = "";  
    for(var j = 7; j >= 0; j--)  
        str += sHEXChars.charAt((num >> (j * 4)) & 0x0F);  
    return str;  
}  

function AlignSHA1(sIn) {  
    var nblk = ((sIn.length + 8) >> 6) + 1,  
        blks = new Array(nblk * 16);  
    for(var i = 0; i < nblk * 16; i++) blks[i] = 0;  
    for(i = 0; i < sIn.length; i++)  
        blks[i >> 2] |= sIn.charCodeAt(i) << (24 - (i & 3) * 8);  
    blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);  
    blks[nblk * 16 - 1] = sIn.length * 8;  
    return blks;  
}  

function rol(num, cnt) {  
    return(num << cnt) | (num >>> (32 - cnt));  
}  

function ft(t, b, c, d) {  
    if(t < 20) return(b & c) | ((~b) & d);  
    if(t < 40) return b ^ c ^ d;  
    if(t < 60) return(b & c) | (b & d) | (c & d);  
    return b ^ c ^ d;  
}  

function kt(t) {  
    return(t < 20) ? 1518500249 : (t < 40) ? 1859775393 :  
        (t < 60) ? -1894007588 : -899497514;  
}  

function SHA1(sIn) {  
    var x = AlignSHA1(sIn);  
    var w = new Array(80);  
    var a = 1732584193;  
    var b = -271733879;  
    var c = -1732584194;  
    var d = 271733878;  
    var e = -1009589776;  
    for(var i = 0; i < x.length; i += 16) {  
        var olda = a;  
        var oldb = b;  
        var oldc = c;  
        var oldd = d;  
        var olde = e;  
        for(var j = 0; j < 80; j++) {  
            if(j < 16) w[j] = x[i + j];  
            else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);  
            t = add(add(rol(a, 5), ft(j, b, c, d)), add(add(e, w[j]), kt(j)));  
            e = d;  
            d = c;  
            c = rol(b, 30);  
            b = a;  
            a = t;  
        }  
        a = add(a, olda);  
        b = add(b, oldb);  
        c = add(c, oldc);  
        d = add(d, oldd);  
        e = add(e, olde);  
    }  
    SHA1Value = SHA1hex(a) + SHA1hex(b) + SHA1hex(c) + SHA1hex(d) + SHA1hex(e);  
    return SHA1Value.toUpperCase();  
}  

const accToken = '15__NFeOk1iUOef8Ap2QidZLUu51fycxG4bV7yiYt0cwLnHuH7GI91IPXe1nzL8wjVPctZIMwbfDXP8xZ5ko3a4VTlGse3DMVESO55bMR1xOO59hdH1675IzDAOIzwocG_kwNRQnRMXuY0d2Ne2KOCaAAAPTH'
const ticket = 'LIKLckvwlJT9cWIhEQTwfM8lwJeSbsPSo0DlFiwzpa5kK2KxAKCO9_w6aQEn56fQhtIC9IPGnT0XfZBkK253wQ'
const timestamp = new Date().getTime()
const nonceStr = 'Wm3WZYTPz0wzccnW'

// wx.config({
//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId: 'wx18dcd72830075edf', // 必填，公众号的唯一标识
//     timestamp: timestamp, // 必填，生成签名的时间戳
//     nonceStr, // 必填，生成签名的随机串
//     signature: SHA1(`jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=https://rachel184ever.github.io/staticH5/`),// 必填，签名
//     jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表
// })

// wx.ready(function(){
//     // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
//     wx.chooseImage({
//                 count: 1,
//                 sizeType: ['original', 'compressed'],
//                 sourceType: ['album', 'camera'],
//                 success(res) {
//                     // tempFilePath可以作为img标签的src属性显示图片
//                     const tempFilePaths = res.tempFilePaths
//                     console.log(tempFilePaths)
//                 }
//             })
// });

// wx.error(function(res){console.log(res)})

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
function getUrlParam(name) {//封装方法
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
    }

    console.log(getUrlParam("imgPath"))
wx.miniProgram.postMessage({ data: 'foo' })
wx.miniProgram.postMessage({ data: {foo: 'bar'} })
wx.miniProgram.getEnv(function(res) { console.log(res.miniprogram) })
wx.miniProgram.navigateTo({url: '../activity/activity'})


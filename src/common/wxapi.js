/* eslint-disable*/
import wx from 'weixin-js-sdk'			//微信sdk依赖
const jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo']
//要用到微信API
function getJSSDK (data, dataForWeixin) {
  console.log(data,'========11111111')
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.appid, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.noncestr, // 必填，生成签名的随机串
    signature: data.signature, // 必填，签名
    jsApiList: jsApiList, // 必填，需要使用的JS接口列表
    success: () => {
      // console.log('success')
      alert('success')
    },
  })
  wx.ready(function () {
    wx.onMenuShareAppMessage({
      title: dataForWeixin.title,
      desc: dataForWeixin.desc,
      link: dataForWeixin.linkurl,
      imgUrl: dataForWeixin.img,
      trigger: function trigger (res) { },
      success: function success (res) {
        alert('已分享1111');
      },
      cancel: function cancel (res) {
        alert('已取消1111');
      },
      fail: function fail (res) {
        alert('进来了1111111');
      }
    });
    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareTimeline({
      title: dataForWeixin.title,
      link: dataForWeixin.linkurl,
      imgUrl: dataForWeixin.img,
      trigger: function trigger (res) {
        alert('用户点击分享到朋友圈');
      },
      success: function success (res) {
        alert('已分享到朋友圈');
      },
      cancel: function cancel (res) {
        alert('已取消到朋友圈');
      },
      fail: function fail (res) {
        alert(JSON.stringify(res+'微信'));
      }
    });
    // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareQQ({
      title: dataForWeixin.title,
      desc: dataForWeixin.desc,
      link: dataForWeixin.linkurl,
      imgUrl: dataForWeixin.img,
      trigger: function trigger (res) {
        alert('用户点击分享到QQ');
      },
      complete: function complete (res) {
        alert(JSON.stringify(res));
      },
      success: function success (res) {
        alert('已分享QQ');
      },
      cancel: function cancel (res) {
        alert('已取消QQ');
      },
      fail: function fail (res) {
        alert(JSON.stringify(res+'qq'));
      }
    });
    // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareWeibo({
      title: dataForWeixin.title,
      desc: dataForWeixin.desc,
      link: dataForWeixin.linkurl,
      imgUrl: dataForWeixin.img,
      trigger: function trigger (res) {
        alert('用户点击分享到微博');
      },
      complete: function complete (res) {
        alert(JSON.stringify(res));
      },
      success: function success (res) {
        alert('已分享微博');
      },
      cancel: function cancel (res) {
        alert('已取消微博');
      },
      fail: function fail (res) {
        alert(JSON.stringify(res));
        console.log(JSON.stringify(res+'微博'));
      }
    });
  })
  wx.error((res) => {
    console.log(JSON.stringify(res) + "微信验证失败");
  });
}
export default {
  // 获取JSSDK
  getJSSDK: getJSSDK
}
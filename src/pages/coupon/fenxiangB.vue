 <template>
 <div>
 <!-- 分享按钮 -->
      <div class="btn" @click="onSelect()">分享</div>

    </div>
</template>
<script>
// import Qrcode from "vue-qrcode";
// import wx from "weixin-js-sdk";
import cancelsystemApi from '@/api/cancelsystem'
import Mshare from "m-share";
import NativeShare from 'nativeshare'   
export default {
  components: {
    // Qrcode,
  },
  data() {
    return {
      dialog: true,
      shareIconDatas: [
        {
          name: "微信好友",
        //   imgUrl: require("@/assets/image/saleRule/wechant.png"),
        },
        {
          name: "朋友圈",
        //   imgUrl: require("@/assets/image/saleRule/wechantquan.png"),
        },
        {
          name: "QQ好友",
        //   imgUrl: require("@/assets/image/saleRule/qq.png"),
        },
        {
          name: "新浪微博",
        //   imgUrl: require("@/assets/image/saleRule/weibo.png"),
        },
        {
          name: "QQ空间",
        //   imgUrl: require("@/assets/image/saleRule/qoze.png"),
        },
      ],
    };
  },
  computed: {
    // 二维码地址合成
    qrcodeUrl(){
      let urls = location.href.replace('invite','userenter')
      return urls
    },
    //判断是否是微信浏览器的函数（如果需要完善QQ的分享请判断浏览器环境后自行设置相关配置）
    isWechant() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
  },
  methods: {
    onSelect() {
          const self = this
 
            var nativeShare = new NativeShare({
              wechatConfig: {
                appId: 'wxab11cd4113e4cd3c',
                timestamp: '1622286399',
                nonceStr: '76336e14-0b45-40d3-b797-857b4757ae06',
                signature: 'ac1b31be70f0d6d304fde38bd9fe781d6513b6cc',
              },
              // 让你修改的分享的文案同步到标签里，比如title文案会同步到<title>标签中
              // 这样可以让一些不支持分享的浏览器也能修改部分文案，默认都不会同步
              syncDescToTag: false,
              syncIconToTag: false,
              syncTitleToTag: false,
            })
 
 
// 设置分享文案
            nativeShare.setShareData({
              icon: 'http://www.zh8zh8.com/uploads/20200515/1383cbec15b3f604c9299f565669fb14.jpg',
              link: window.location.href,
              title: '知会教育',
              desc:'0000000000',
              from: '@fa-ge',
            })
 
// 唤起浏览器原生分享组件(如果在微信中不会唤起，此时call方法只会设置文案。类似setShareData)
            if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
                    this.ui.showToast('图文分享请打开QQ浏览器', 2)
                }else{
                    try {
                        nativeShare.setShareData({
                            link: 'http://192.168.1.5:9528/#/cancelsystem/couponhistory',
                            title: 'title111',
                            desc: 'desc11',
                            icon: 'https://t12.baidu.com/it/u=751929707,172094732&fm=76',
                        })
                        // nativeShare.call('wechatFriend')
                        nativeShare.call()
                        //   nativeShare.call('wechatFriend')
                        // 如果是分享到微信则需要 nativeShare.call('wechatFriend')
                        // 类似的命令下面有介绍
                        console.log('支持')
                        } catch(err) {
                        // 如果不支持，你可以在这里做降级处理
                        self.$toast('不支持该浏览器自动分享,请您手动分享')
                        }

                } 
          // this.showShare = false;
 
          },
  },
};
</script>
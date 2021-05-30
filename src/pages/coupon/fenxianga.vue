 <template>
 <div>
 <!-- 分享按钮 -->
      <div class="btn" @click="handShareBtn">分享二维码</div>
      <!-- 分享弹框 -->
      <div :class="['dialog', { dialogActive: dialog }]" v-if="dialog">
        <div class="title">分享到</div>
        <div class="itemBox">
          <div
            class="item"
            v-for="(item, index) in shareIconDatas"
            :key="index"
            @click="handClickShareType(item.name)"
          >
            <img :src="item.imgUrl" alt="" />
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="cancel" @click="handCancelShare">取消</div>
      </div>
    </div>
</template>
<script>
// import Qrcode from "vue-qrcode";
// import wx from "weixin-js-sdk";
import cancelsystemApi from '@/api/cancelsystem'
import Mshare from "m-share";
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
    Mshare.init(this.getWxConfig()); //插件初始化
    if (this.isWechant) {
      this.getWxConfig();
    }
  },
  methods: {
    getWxConfig() {
      let url = location.href.split("#")[0];
      cancelsystemApi.shareData(url).then(({ data }) => {
        /* 微信官方config初始化 */
        // wx.config({
        //   debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //   appId: data.appId, // 必填，公众号的唯一标识
        //   timestamp: data.timestamp, // 必填，生成签名的时间戳
        //   nonceStr: data.nonceStr, // 必填，生成签名的随机串
        //   signature: data.signature, // 必填，签名
        //   jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
        // });
        /* Mshare 微信端的初始化配置 */ 
        Mshare.wxConfig({
          link: location.href.replace('invite','sharepage'), //要分享出去的网址，请自行修改，默认使用window.location.href
          title: "和我一起来开店吧~", // 标题，默认读取document.title
          desc: "世界那么大，一起去佰材网开店吧！", // 描述, 默认读取<meta name="description" content="desc" />
          imgUrl:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2018257102,1331811395&fm=11&gp=0.jpg", // 图片, 默认取网页中第一个img标签
          wx: {
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
          },
        });
      });
      /* 微信官方ready */ 
    //   wx.ready(() => {
    //     let shareData = {
    //       title: "和我一起来开店吧~", // 分享标题
    //       desc: "世界那么大，我想去佰材网开店", // 分享描述
    //       link: location.href.split("#")[0] + "#/userenter", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //       // imgUrl: require("./logo.jpg"), // 分享图标(不能赋相对路径，一定要是绝对路径)
    //       imgUrl:
    //         "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2018257102,1331811395&fm=11&gp=0.jpg", // 分享图标(不能赋相对路径，一定要是绝对路径)
    //       success: () => {},
    //     };
    //     wx.updateTimelineShareData(shareData);
    //     wx.updateAppMessageShareData(shareData);
    //     wx.error(function (err) {
    //       alert("微信sdk失败：", err);
    //     });
    //   });
    },
    // Mshare初始化
    innitConfig() {
      let config = {
        //   location.href.replace('invite','sharepage')
        link:window.location.href+'?id=000' , // 要分享出去的网址，需要自行修改，默认使用window.location.href
        title: "一起来佰材网开店吧~", // 标题，默认读取document.title
        desc: "世界那么大,一起去佰材网开店吧!", // 描述, 默认读取<meta name="description" content="desc" />
        imgUrl:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2018257102,1331811395&fm=11&gp=0.jpg", // 图片, 默认取网页中第一个img标签
        types: ["wx", "wxline", "qq", "qzone", "sina"],
        fnDoShare(type) {
          console.log("分享回调:", type);
        },
      };
      return config;
    },
    handShareBtn() {
      this.dialog = true;
    },
    handCancelShare() {
      this.dialog = false;
    },
    handClickShareType(name) {
      switch (name) {
        case "微信好友":
          Mshare.to("wx", this.innitConfig());
          break;
        case "朋友圈":
          Mshare.to("wxline", this.innitConfig());
          break;
        case "新浪微博":
          Mshare.to("sina", this.innitConfig());
          break;
        case "QQ空间":
          Mshare.to("qzone", this.innitConfig());
          break;
        case "QQ好友":
          Mshare.to("qq", this.innitConfig());
          break;
      }
    },
  },
};
</script>
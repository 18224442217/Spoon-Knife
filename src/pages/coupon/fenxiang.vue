 <template>
 <div>
 <!-- 分享按钮 -->
    <button @click="sharePage">Nativeshare</button><br />
		<!-- <button @click="shareM=true">vue-native-share</button> -->
		<sharePopup :showShare="showShare" :shareConfig="shareConfig" />
		<vue-native-share 
    :shareMenu="shareMenu" :config="config" 
    @click="shareM=false" class="shareAll animated fadeInUpBig shareM"
     v-if="shareM"/>
		<div :class="{guid:shareM}" @click="shareM=false"></div>

    </div>
</template>
<script>
import sharePopup from '../../components/sharePopup.vue'
import vueNativeShare from 'vue-native-share' 
export default {
  components: {
      sharePopup,
			vueNativeShare
  },
  data() {
    return {
      showShare: false,
			shareConfig: "",
      shareM:false,
      shareMenu: [0, 1],
      config: {
        title: '分享demo',
        desc: '这是一个分享的demo',
        img: 'https://raw.githubusercontent.com/wgjh5/vueSummarize/master/img/QR.png',
        img_title: '分享demo图片',
        link: 'https://wgjh5.github.io/webapp-share/dist/#/app',
        success: () => {
          alert('success')
        }, //成功回调
        cancel: () => {
          alert('cancel')
        }, //取消回调
				}
      
    };
  },
  computed: {
  
  },
  created() {
  },
  mounted() {
    this.$on("showShare", msg => {
      this.showShare = msg;
    });
  },
  methods: {
    sharePage() {
				this.showShare = !this.showShare;
				this.shareConfig = {
					url: "https://wgjh5.github.io/webapp-share/dist/#/app111", //分享url
					title: "分享demo", //内容标题
					desc: "这是一个分享的demo", //描述
					img: "https://raw.githubusercontent.com/wgjh5/vueSummarize/master/img/QR.png" //分享的图片
				};
			}
  },
};
</script>
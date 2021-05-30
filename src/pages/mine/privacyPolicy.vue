<template>
  <div>
    <div class="title">
      <van-nav-bar title="隐私政策" left-text="返回" left-arrow @click-left="onBack" />
    </div>
    <div class="content">
      <iframe id="content" :src="url" width="100%" scrolling="auto" frameborder="0">
        您的浏览器不支持iframe，请升级
      </iframe>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  data () {
    return {
      url: 'https://tienalimg.oss-cn-shanghai.aliyuncs.com/html/2.html'
    }
  },
  mounted () {
    const oIframe = document.getElementById('content')
    const deviceWidth = document.documentElement.clientWidth
    const deviceHeight = document.documentElement.clientHeight
    oIframe.style.width = deviceWidth + 'px'
    oIframe.style.height = deviceHeight + 'px'
  },
  methods: {
    onBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.title {
  position: fixed;
  top: 0;
  width: 100%;
}

.content {
  margin-top: 80px;
}
</style>

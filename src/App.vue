<template>
  <div class="main">
    <transition name="router-fade"
                mode="out-in">
      <!--        <keep-alive>-->
      <router-view />
      <!--        </keep-alive>-->
    </transition>
    <Footer v-if="$route.meta && $route.meta.hasFooter" />
  </div>
</template>

<script>
import cache from '@/utils/cache'
import Footer from './layout/footer'
// import HomeApi from './api/homeApi'
import commonApi from '@/api/commonApi'
export default {
  name: 'App',
  components: {
    Footer
  },
  data() {
    return {
      access_token: ''
    }
  },
  async created() {
    this.access_token = cache.getToken()
    this.setUserInfo()
  },
  methods: {
    setUserInfo() {
      if (this.access_token && this.$route.name !== 'login') {
        commonApi.userInfo()
          .then(res => {
            cache.setCookie('userId', res.user.id)
            this.userId = res.user.id
            this.$store.commit('SET_USER', res.user)
          })
      }
    }
  }
}
</script>

<style lang="less">
// @import url('./assets/css/common.less');
html,
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  height: 100%;
  padding: 0;
}
p{
  font-size: 32px;
}
.main {
  background: #fff;
}
* {
  box-sizing: border-box;
  margin: 0;
}

.van-nav-bar__left{
  .van-icon,
  .van-nav-bar__text{
    color: #333;
  }
}

</style>

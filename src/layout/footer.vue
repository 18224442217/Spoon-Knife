<template>
  <!--项目介绍 组件 -->
  <!-- tabBar -->
  <van-tabbar v-model="tabarActive">
    <!-- <van-tabbar-item name="home"
                     icon="contact"
                     @click="redirects('/mine')">我的
      <img slot="icon"
           slot-scope="props"
           :src="props.active ? '../../static/images/icon/btn_mine_act.png' :  '../../static/images/icon/btn_mine.png'"></van-tabbar-item> -->
    <van-tabbar-item name="home"
                     icon="home-o"
                     @click="redirects('/')">主页</van-tabbar-item>
    <van-tabbar-item name="categories"
                     icon="qr"
                     @click="redirects('/category')">分类</van-tabbar-item>
    <van-tabbar-item name="shoppingCart"
                     icon="diamond-o"
                     @click="navigaterToVip('/shoppingCart')">会员</van-tabbar-item>
    <van-tabbar-item name="my"
                     icon="contact"
                     @click="redirects('/mine')">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import cache from '@/utils/cache'

export default {
  components: {},
  directives: {},
  data() {
    return {
      tabarActive: 0
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {

  },
  created() {
    this.tabarActive = this.$route.name
  },
  methods: {
    redirects(url) {
      this.$router.push(url)
    },
    navigaterToVip() {
      const token = cache.getToken()
      const phone = cache.getCookie('phone')
      if (token && phone) {
        location.href = `https://www.hsh.139sc.com/h5/index.html#/supreme?token=${token}&phone=${phone}&ac_id=h5mall`
      } else {
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style lang="less">
</style>


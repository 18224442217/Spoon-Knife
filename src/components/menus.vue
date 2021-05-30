<template>
  <div>
    <van-row style="border-bottom: 1px solid #ddd;"
             @click="sendMsg(1)">
      <van-col span="9">
        <van-image :src="require('../../static/images/indexIcon.png')"
                   width="2.5rem"
                   height="2.5rem"
                   fit="scale-down" />
      </van-col>
      <van-col span="15"
               style="line-height: 45px;text-align: left;">首页</van-col>
    </van-row>
    <van-row style="border-bottom: 1px solid #ddd;"
             @click="sendMsg(2)">
      <van-col span="9">
        <van-image :src="require('../../static/images/cart.png')"
                   width="2.5rem"
                   height="2.5rem"
                   fit="scale-down" />
      </van-col>
      <van-col span="15"
               style="line-height: 45px;text-align: left;">购物车</van-col>
    </van-row>
    <van-row @click="sendMsg(3)">
      <van-col span="9">
        <van-image :src="require('../../static/images/per.png')"
                   width="2.5rem"
                   height="2.5rem"
                   fit="scale-down" />
      </van-col>
      <van-col span="15"
               style="line-height: 45px;text-align: left;">个人中心</van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'Menus',
  methods: {
    sendMsg(data) {
      switch (data) {
        case 1:
          this.$router.push({ name: 'home' })
          break
        case 2:
          this.$router.push({ name: 'shoppingCart' })
          break
        case 3:
          this.$router.push({ name: 'mine' })
          break
      }
    }
  }
}
</script>

<style scoped>

</style>

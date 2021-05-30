<template>
  <!-- 返回上一级 -->

  <van-nav-bar
    title="标题"
    left-text="返回"
    right-text="按钮"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />

</template>

<script>
export default {
  name: 'HeaderBar',
  data() {
    return {
      value: null
    }
  },
  computed: {
    userAvatar() {
      return this.$store.state.common.user.imgUrl
    }
  },
  methods: {
    search() {
      this.$router.push('/search')
    }
  }
}
</script>
<style lang="less">
.van-search {
  background: #f8b500;
}
</style>

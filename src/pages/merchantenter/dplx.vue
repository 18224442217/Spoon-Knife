<template>
  <div class="box">
    <p class="MsoNormal"
    >
      <b>店铺类型说明文档</b>
    </p>
    <p class="MsoNormal"
    >
      <b>旗舰店：</b>
    </p>

    <p class="MsoNormal">
      是指商户以自有品牌（商标），或者经品牌（商标）权利人出具排他性授权文件，入驻和生活平台开设的店铺。
    </p>
    <p class="MsoNormal"
    >
      <span>旗舰店包括以下情形：</span>
    </p>
    <p class="MsoNormal"
    >
      <span>1、经营一个品牌商品的旗舰店；</span>
    </p>
    <p class="MsoNormal"
    >
      <span>2、经营多个品牌商品，且各品牌归属于同一实际控制人的旗舰店；</span>
    </p>
    <p class="MsoNormal"
    >
      <span>3、卖场型品牌（服务类商标）商标权利人开设的旗舰店。</span>
    </p>
    <p class="MsoNormal"
    >
      <b>专卖店：</b>
    </p>
    <p class="MsoNormal"
    >
      <span>是指商户持非自有品牌（商标）授权文件入驻和生活平台开设的店铺。</span>
    </p>
    <p class="MsoNormal"
    >
      <span>商户在和生活平台开设专卖店，只能够经营一个授权品牌的商品。</span>
    </p>
    <p class="MsoNormal"
    >
      <b>专营店：</b>
    </p>
    <p class="MsoNormal"
    >
      <span>是指入驻和生活平台平台经营同一主营类目下两个及以上品牌商品的店铺。</span>
    </p>
    <p class="MsoNormal"
    >
      <span>商户在和生活平台平台开设专营店，可以经营自有品牌商品，也可以经营非自有品牌商品。</span>
    </p>
    <!-- <van-button round size="normal" type="info" class="wzdls" @click="namedialog">我知道了</van-button> -->
  </div>
</template>

<script>
export default {
  methods: {
    namedialog() {
      this.$emit('know', 1)
    }
  }
}
</script>

<style lang="less" scoped>
p{
  line-height: 50px;
}
.box{
  padding: 30px;
  margin-top: 30px;
  text-indent: 65px;
}

.wzdls{
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>

<template>
  <div class="box">
    <div class="main">

      <div v-if="list.logo"
           class="top1">
        <!-- <img :src="list.logo?list.log:'../../assets/img/merchantlogo.png'" alt="" class="topimg"> -->
        <img :src="list.logo"
             alt=""
             class="topimg">
      </div>

      <div v-if="!list.logo"
           class="top1">
        <!-- <img :src="list.logo?list.log:'../../assets/img/merchantlogo.png'" alt="" class="topimg"> -->
        <img src="../../assets/img/merchantlogo.png"
             alt=""
             class="topimg">
      </div>
      <div class="top">
        <p class="shopname"
           style="font-size: 1.2rem;">{{ list.merchantName }}</p>
      </div>
      <p class="shopname">{{ list.name }}</p>
      <div class="top">
        <img :src="img"
             alt=""
             class="img">
      </div>

      <van-row>
        <van-col span="6"
                 class="left">核销码</van-col>
        <van-col span="18"
                 class="right">{{ list.redeemCode }}</van-col>
      </van-row>
      <van-divider />

      <van-row>
        <van-col span="6"
                 class="left">有效期</van-col>
        <van-col span="18"
                 class="right">{{ list.startTimeFormat }}至{{ list.endTimeFormat }}</van-col>
      </van-row>
      <van-divider />

      <van-row>
        <van-col span="6"
                 class="left">门店地址</van-col>
        <van-col span="14"
                 class="right">{{ list.address }}</van-col>
        <van-col span="4"><img src="../../assets/img/dzq.png"
                               alt=""
                               style="width:100%"
                               @click="jump"></van-col>
      </van-row>
      <van-divider />

      <van-row>
        <van-col span="6"
                 class="left">使用须知</van-col>
        <van-col span="18"
                 class="right">
          {{ list.useRule }}
        </van-col>
      </van-row>
      <van-divider />

      <van-row>
        <van-col span="6"
                 class="left">商家电话</van-col>
        <van-col span="18"
                 class="right">{{ list.phone }}</van-col>
      </van-row>
      <van-divider />

      <van-row>
        <van-col span="6"
                 class="left">重要说明</van-col>
        <van-col span="18"
                 class="right">此券为商家自行发放，仅限发券商家店内使用</van-col>
      </van-row>
      <van-divider />
    </div>
  </div>
</template>

<script>
import cancelsystemApi from '@/api/cancelsystem'

export default {
  data() {
    return {
      id: '',
      couponId: '',
      list: [],
      img: '',
      lng: '',
      lat: ''
    }
  },
  created() {
    this.id = this.$route.query.id
    this.couponId = this.$route.query.couponId
    this.lat = this.$route.query.lat
    this.lng = this.$route.query.lng
    this.img = `http://218.205.252.24:18090/web/user-coupon/ymBrUserMerchantCoupon/createImg/${this.id}`
    console.log(this.img)
  },
  mounted() {
    cancelsystemApi.querycouponinfo(this.id).then(res => {
      this.list = res
      console.log(res)
    })
  },
  methods: {
    jump() {
      console.log(this.lat)
      console.log(this.lng)
      console.log(this.list.name)
      window.location.href =
          `https://api.map.baidu.com/marker?location=${this.lat},${this.lng}&title=店铺位置&content=${this.list.name}&output=html `
    }
  }
}
</script>

<style lang="less" scoped>
  .box {
    width: 100%;
    height: 1500px;
    // padding-top: 150px;
    background: #fff;
  }

  .main {
    width: 90%;
    border-radius: 8px;
    margin: 0 auto;
    padding: 30px;
  }

  .left {
    color: #242323;
    font-size: 36px;
    margin-bottom: 10px;
  }

  .right {
    color: #848484;
    font-size: 36px;
  }

  .img {
    width: 80%;
    margin: 20px 0;
  }

  .topimg {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    // margin-top: -120px;
    background: rgb(204, 204, 211);
  }

  .top {
    width: 100%;
    text-align: center;
  }

  .top1 {
    width: 100%;
    text-align: center;
  }

  .shopname {
    text-align: center;
    font-weight: bold;
    font-size: 34px;
  }
</style>

<template>
  <div class="home">
    <WriteOff/>
    <div class="cancelbox">
      <div v-for="(item,index) in list"
           :key="index"
           @click="skip(item.id)">
        <div class="cancelimg">
          <img :src="item.url"
               alt="">
        </div>

        <p>{{ item.name }}</p>
      </div>
    </div>
    <div class="footer">
      <p class="footer-phone">客服电话：<span style="color:#AD0EA2;">4000112998</span></p>
    </div>
    <!-- <div class="shop">
      <div class="shop-top">
        <img v-if="merchantLogo"
             :src="merchantLogo"
             alt=""
             class="shop-img">
        <img v-if="!merchantLogo"
             src="../../assets/img/merchantlogo.png"
             alt=""
             class="shop-img">
        <p class="shop-title">
          {{ merchantName }}
        </p>
        <router-link :to="{name:'mine',params:{type:'business'}}">
        <span class="mytext">个人中心</span></router-link>
        <p class="shop-num"><span
          style="margin-right:20px">累计发券：{{ cumulativeIssuanceCount }}</span><span>已核销：{{ writtenOffCount }}</span>
        </p>
        <p class="add">{{ merchantAddress }}</p>
      </div>
      <div class="center">
        <img src="../../assets/img/cancel.png"
             alt=""
             class="img"
             @click="skip(1)">
      </div>
      <div class="coupon">
        <img src="../../assets/img/fcoupon.png"
             alt=""
             class="img"
             @click="skip(3)">
      </div>
      <div class="coupon">
        <img src="../../assets/img/record.png"
             alt=""
             class="img"
             @click="skip(2)">
      </div>

    </div> -->

  </div>
</template>

<script>
import cancelsystemApi from '@/api/cancelsystem'
import cache from '@/utils/cache'
import WriteOff from '@/components/writeOff'
import cancel from '@/assets/img/hx0.png'
import fcoupon from '@/assets/img/hx1.png'
import record from '@/assets/img/hx2.png'
export default {
  components: {
    WriteOff
  },
  data() {
    return {
      merchantName: '',
      cumulativeIssuanceCount: '',
      writtenOffCount: '',
      merchantAddress: '',
      merchantLogo: '',
      list: [
        { name: '券码核销', url: cancel, id: 1 },
        { name: '发放记录', url: fcoupon, id: 2 },
        { name: '发免费券', url: record, id: 3 }
      ]
    }
  },
  created() {
    cancelsystemApi.querysuer().then(res => {
      console.log(res[0], '11111111111')
      // cache.setType(res[0].type)
      // cache.setStatus(res[0].auditStatus ? res[0].auditStatus : '')
      this.merchantName = res[0].merchantName
      this.merchantAddress = res[0].merchantAddress
      this.merchantLogo = res[0].merchantLogo
      // if (res[0].type === 1 && res[0].auditStatus === 1) {
      //   this.$router.push('/cancelsystem')
      // } else if (res[0].type === 0 || res[0].auditStatus === 0 || res[0].auditStatus === 2) {
      //   this.$router.push('/')
      // }
      console.log(res[0].type, '---------')
    })
    cancelsystemApi.queryhxnum().then(res => {
      console.log(res)
      this.writtenOffCount = res.writtenOffCount
      this.cumulativeIssuanceCount = res.cumulativeIssuanceCount
    })
  },
  mounted() {
    if (!cache.getToken()) {
      this.$router.push('/merchantlogin')
    }
    console.log(this.$store.state.user)
  },
  methods: {
    skip(num) {
      if (num === 1) {
        this.$router.push({
          name: 'cancel',
          params: {
            id: 1
          }
        })
      }
      if (num === 2) {
        this.$router.push({
          name: 'couponhistory'
        })
      }
      if (num === 3) {
        this.$router.push({
          name: 'merchant_offline_coupon'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cancelimg img{
  width: 100px;
  height: 100px;
  margin: auto;
  margin-bottom: 20px;
}
.cancelimg{
  text-align: center;
}
.cancelbox div{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: #030E40;
}
.cancelbox{
  display: flex;
  flex-direction: row;
  padding: 30px;
}
.footerbox{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 30px 0 0 0;
}
.footer {
    text-align: center;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    background: white;
  }
  .footer-phone {
    font-size: 30px;
    margin-bottom: 50px;
  }
  .mytext{
    font-size: .8rem;
    display: block;
    padding: 10px 0;
  }
  .home {
    width: 100%;
    height: auto;
  }

  .shop {
    width: 100%;
    margin: 0 auto;
    margin-top: -80px;
  }

  .shop-top {
    text-align: center;
    border-radius: 20px;
  }

  .shop-title {
    font-size: 44px;
    color: #594949;
  }

  .shop-img {
    width: 150px;
    height: 150px;
    border-radius: 100%;
  }

  .shop-num {
    font-size: 32px;
    margin-top: 10px;
    color: #959595;
  }

  .add {

    width: 600px;
    font-size: 32px;
    margin: 10px auto;
    color: #959595;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .center {
    width: 95%;
    margin: 50px auto 0;
  }

  .coupon {
    width: 95%;
    margin: 0 auto;
  }

  .footer {
    width: 95%;
    margin: 0 auto;
  }

  .img {
    width: 100%;
  }

  .main {
    width: 100%;
  }

  .phone {
    margin-top: 110px;
    font-size: 28px;
    text-align: center;
  }
</style>

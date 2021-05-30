<template>
  <div>
    <header>
      <div class="info">
        <van-image :src="details.logo"
                   fit="scale-down"/>
        <span>{{ details.merchantName }}</span>
      </div>
      <div class="focus"
           @click="focusFu">{{ focus }}</div>
    </header>
    <div class="address">
      <p>店铺地址：</p>
      <div class="label">
        <span class="text">{{ details.address }}</span>
        <p class="icon">
          <van-icon name="location"
                    @click="jump" />
          <a :href="'tel:'+shopInfo.phone"><van-icon name="phone" /></a>
        </p>
      </div>
    </div>
    <div class="address introduction">
      <p>店铺简介：</p>
      <div class="label">
        <span class="text">{{ details.introduction }}</span>
      </div>
    </div>
    <div class="address credentials">
      <p>店铺资质：</p>
      <div class="images">
        <van-image
          v-for="(item,index) in credentials"
          :src="item"
          :key="item"
          class="label"
          @click="imagePreview(index)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import shopApi from '@/api/shopApi'
import cache from '@/utils/cache'
import { ImagePreview } from 'vant'
export default {
  data() {
    return {
      details: {
        credentials: ''
      },
      shopInfo: {},
      focus: '关注'
    }
  },
  computed: {
    credentials() {
      return this.details.credentials.split(',').filter(v => v.length)
    }
  },
  mounted() {
    this.query()
    this.getShopInfomation()
  },
  methods: {
    jump() {
      console.log('?')
      window.location.href =
          `https://api.map.baidu.com/marker?location=${this.details.lat},${this.details.lng}&title=店铺位置&content=${this.details.merchantName}&output=html `
    },
    query() {
      shopApi.getMerchantInfo({ merchantId: this.$route.query.merchantId })
        .then(res => {
          console.log(res)
          this.details = res
        })
    },
    getShopInfomation() {
      const param = {
        merchantId: this.$route.query.merchantId
      }
      shopApi.shopInfomation(param)
        .then(res => {
          console.log(res, '店铺信息')
          this.shopInfo = res
          if (res.onFocus) {
            this.focus = '已关注'
          } else {
            this.focus = '关注'
          }
        })
    },
    focusFu() {
      if (cache.getToken()) {
        const param = {
          userId: cache.getCookie('userId'),
          merchantId: this.$route.query.merchantId
        }
        shopApi.focusShop(param)
          .then(res => {
            console.log(res)
            if (res === null) {
              this.focus = '已关注'
            } else {
              this.focus = '关注'
            }
            this.getShopInfomation(this.$route.query.merchantId)
          })
      } else {
        this.$toast('请先登录！')
        this.$router.push({ name: 'login' })
      }
    },
    imagePreview(index) {
      ImagePreview({
        images: this.credentials,
        startPosition: index
      })
    }
  }
}
</script>

<style lang="less" scoped>
header{
  display: flex;
  justify-content: space-between;
  padding:40px;
  .info{
    display: flex;
    align-items: flex-start;
    .van-image{
  width: 200px;
  height: 200px;
  border-radius: 10px;
}
span{
  font-size: 42px;
  margin-top:40px;
  margin-left: 20px;
}
  }
  .focus{
  margin-top:42px;
    font-size: 32px;
    background: linear-gradient(180deg,#ff6f02, #f20600);
    height: 60px;
    padding:0px 30px;
    color: #fff;
    line-height: 60px;
    border-radius: 100px;
  }

}
.address{
  padding:0 40px 30px;
  .label{
  display: flex;
  justify-content: space-between;
  align-items: center;
    .text{
    font-size: 34px;
    flex-basis: 70%;
    margin-top: 20px;
    color: #999;
  }
  .icon{
    flex-basis: 30%;
    font-size: 48px;
    display: flex;
    justify-content: flex-end;
    .van-icon{
      color: #fff;
      padding:10px;
      border-radius: 30px;
    }
    .van-icon-phone{
      margin-left: 40px;
      background: #F31500;
    }
    .van-icon-location{
      background: #336DFF;
    }
  }
  }
}
.introduction{
  margin-top: 20px;
  .label{
    .text{
    flex-basis:100%;
  }
  }
}

.credentials{
  .images{
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .van-image{
      width: 320px;
      height: 320px;
      margin-right: 10px;
    margin-top: 20px;
      border-radius: 20px;
    }
  }
}

</style>

<template>
  <div class="box">
    <!-- <div class="border" /> -->
    <WriteOff/>
    <div class="main">
      <div class="main-title">
        <!-- <p class="left-icon" /> -->
        <p class="center-msg">卡券核销</p>
      </div>
      <!-- label="券 码 核 销" -->
      <van-field v-model="cancelcode"
                 placeholder="请输入核销码"
                 class="input"/>
      <!-- <van-field v-model="cancelcode"
                 placeholder="请输入核销码"
                 class="input"
                 right-icon="scan"
                 @click-right-icon="righticon" /> -->
      <p class="input-bottom">共核销<span>{{ writtenOffCount }}</span>张优惠券</p>

      <div class="btn"
           @click="hxbtn">立即核销</div>
      <!-- <div class="msg">共核销{{ num }}张优惠券</div> -->
      <div class="footer">
        <div class="footerbox">
          <!-- <p class="footer-title"
             @click="history">发 放 记 录</p> -->
          <p class="footer-title"
             @click="ljfq">立 即 发 券</p>
        </div>
        <p class="footer-phone">客服电话：<span style="color:#AD0EA2;">4000112998</span></p>
      </div>
    </div>
    <van-dialog v-model="show"
                class="dialog"
                @confirm="confirm">
      <p class="dialog-msg">核销成功</p>
    </van-dialog>
    <van-dialog v-model="open"
                :show-confirm-button="false"
                :close-on-click-overlay="true"
                class="sxj">
      <div class="box">
        <qrcode-stream :camera="camera"
                       @decode="onDecode"
                       @init="onInit">
          <div v-show="showScanConfirmation"
               class="scan-confirmation" />
        </qrcode-stream>
      </div>

    </van-dialog>
  </div>
</template>

<script>
import cancelsystemApi from '@/api/cancelsystem'
import QrcodeStream from './QrcodeStream'
import cache from '@/utils/cache'
import WriteOff from '@/components/writeOff'

export default {
  components: {
    QrcodeStream,
    WriteOff
  },
  data() {
    return {
      num: '',
      cancelcode: '',
      merchantName: '',
      show: false,
      merchantLogo: '',
      merchantAddress: '',
      writtenOffCount: '',
      open: false,
      camera: 'auto',
      result: null,
      showScanConfirmation: false
    }
  },
  created() {
    if (cache.getType() != 1) {
      this.$router.push('/')
    }
    cancelsystemApi.querysuer().then(res => {
      this.merchantName = res[0].merchantName
      this.merchantAddress = res[0].merchantAddress
      this.merchantLogo = res[0].merchantLogo
    })
    cancelsystemApi.queryhxnum().then(res => {
      this.writtenOffCount = res.writtenOffCount
    })
    if (window.plus && window.plus.android) {
      this.plusReady()
    } else {
      document.addEventListener('plusready', this.plusReady, false)
    }

    // cancelsystemApi.querynum().then(res => {
    //   console.log(res)
    //   this.num = res
    // })
  },
  methods: {
    history() {
      this.$router.push('/cancelsystem/couponhistory')
    },
    ljfq() {
      this.$router.push({
        name: 'merchant_offline_coupon'
      })
    },
    hxbtn() {
      if (!this.cancelcode) {
        this.$toast('请输入核销码')
      } else {
        const data = {
          redeemCode: this.cancelcode
        }
        cancelsystemApi.cancelcoupon(data).then(res => {
          console.log(res)
          this.show = true
        })
      }
    },
    righticon() {
      this.open = true
    },
    confirm() {
      this.show = false
      this.cancelcode = ''
      // cancelsystemApi.querynum().then(res => {
      //   console.log(res)
      //   this.num = res
      // })
    },
    ljfq() {
      this.$router.push({
        name: 'merchant_offline_coupon'
      })
    },
    async onInit(promise) {
      try {
        await promise
      } catch (e) {
        console.error(e)
      } finally {
        this.showScanConfirmation = this.camera === 'off'
      }
    },

    async onDecode(content) {
      this.cancelcode = content
      if (this.cancelcode) {
        this.open = false
        console.log(this.result)
      }
      this.pause()
      await this.timeout(500)
      this.unpause()
    },

    unpause() {
      this.camera = 'auto'
    },

    pause() {
      this.camera = 'off'
    },

    timeout(ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    }

  }
}
</script>

<style lang="less" scoped>
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

  .footer-title {
    font-size: 32px;
    color: #AD0EA2;
    margin-bottom: 50px;
  }
  .footer-title+.footer-title{
    margin-left: 150px;
  }

  .footer-phone {
    font-size: 30px;
    margin-bottom: 50px;
  }
.input-bottom span{
  color: #B019A6;
  display: inline-block;
  padding: 0 10px;
  margin-top: 10px;
  font-size: 36px;
}
.input-bottom{
  font-size: 28px;
  color: #1C1C1C;
}
  .box {
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .border {
    background: #f8f8f8;
    height: 10px;
    width: 100%;
  }

  .ljfq {
    width: 150px;
    background: #4480f3;
    font-size: 22px;
    text-align: center;
    line-height: 60px;
    color: #fff;
    border-radius: 30px;
  }

  .img {
    width: 90px;
    height: 90px;
    border-radius: 100%;
  }

  .main {
    width: 100%;
    margin: 0 auto 0;
    padding:0 30px;
    background: #fff;
    border-radius: 20px;

  }

  .input {
    background: #f7f7f7;
    border-radius: 20px;
    margin-top: 30px;
  }

  .btn {
    width: 95%;
    height: 100px;
    margin: 200px auto 0;
    font-size: 38px;
    background: linear-gradient(0deg,#a70b9c, #ce48c4);
    border-radius: 50px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .msg {
    font-size: 28px;
    margin-top: 40px;
  }

  .examine {
    margin-top: 500px;
    text-align: center;
    font-size: 32px;
    color: #3056F6;
  }

  .dialog {
    text-align: center;
  }

  .dialog-msg {
    height: 300px;
    line-height: 300px;
    font-size: 50px;
  }

  .main-title {
    font-weight: bold;
    margin-bottom:50px;
    display: flex;
    align-items: center;
    margin-top: 20px;
    color: #3E3E3E;
  }

  .left-icon {
    display: inline-block;
    height: 42px;
    width: 15px;
    background: #4480f3;
    border-radius: 6px;
    margin-right: 20px;
    margin-left: 20px;

  }

  .center-msg {
    font-size: 36px;
  }

  .phone {
    margin-top: 110px;
    font-size: 30px;
    text-align: center;
  }

  .sxj {
    height: 500px;
  }

  .scan-confirmation {
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: rgba(255, 255, 255, .8);

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }
</style>

<template>
  <div class="mainbg" style="height:100vh;margin-bottom:-60px;">

    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="$router.go(-1)" />

    <div class="bg">
      <div class="bgt1">您好，</div>
      <div class="bgt2">今天天气晴，向全世界说我爱你</div>
      <van-image :src="require('../../assets/img/loginlogo.png')" />
      <!-- <div class="bgt3">{{phoneNumber.slice(0,3)}}****{{phoneNumber.slice(8,11)}}</div>s -->
    </div>

    <div class="circular" />

    <div class="content">
      <van-cell-group>
        <van-field v-model="account.phone" left-icon="phone-o" placeholder="请输入手机号码" />
        <div style="width: 100%;height: 20px;"></div>
        <van-field v-model="account.smsCode" left-icon="closed-eye" placeholder="请输入验证码">
          <template #button>
            <van-button :disabled="isShowTimeCountDown" size="small" color="#ffffff" type="primary" @click="sendCode">
              <van-count-down v-show="isShowTimeCountDown" ref="timeCountDown" :time="CountDownTime" format="ss"
                @finish="isShowTimeCountDown=false" />
              <span class="codespan" style="color: #AD0EA2;" v-show="!isShowTimeCountDown">
                发送验证码
              </span>

            </van-button>
          </template>
        </van-field>
      </van-cell-group>

      <van-button class="btn" type="primary" round color="linear-gradient(180deg,#c837bd, #9f0d95 100%)" @click="login">

        <span>登录</span>
      </van-button>
      <div class="merchant" @click="merchantlogin">
        <p>我是商家</p>
      </div>
    </div>
  </div>
</template>

<script>
  import loginApi from '@/api/loginApi'
  import cache from '@/utils/cache'
  import cancelsystemApi from '@/api/cancelsystem'
  require('@/assets/js/jssdk.min.js')

  export default {
    data() {
      return {
        account: {
          phone: '',
          smsCode: '',
          smsKey: ''
        },
        CountDownTime: 60000,
        isShowTimeCountDown: false,
        YDRZ: {}
      }
    },
    mounted() {
      cache.clearToken()
      this.YDRZ = window.YDRZ
      // const sign = this.YDRZ.getSign('300012040777', '1.0')
      // loginApi.resCode({ sign: sign })
      //   .then(res => {
      //     return new Promise((resolve, reject) => {
      //       this.YDRZ.getTokenInfo({
      //         data: {
      //           version: '1.0',
      //           appId: '300012040777',
      //           sign: res.sign,
      //           openType: '1',
      //           isTest: '',
      //           expandParams: ''
      //         },
      //         success: (res) => {
      //           console.log('取号成功', res)
      //           resolve(res)
      //         }, error(err) {
      //           console.log('取号失败', err)
      //           reject(err)
      //         }
      //       })
      //     })
      //   })
      //   .then(res => {
      //     return loginApi.token4h5({ token: res.token, userInformation: res.userInformation })
      //   })
      //   .then(res => {
      //     console.log(res)
      //   })

      // console.log(window)
      console.log(this.$route, '========')
    },
    methods: {
      login() {
        if (this.account.smsCode) {
          loginApi.login(this.account)
            .then(res => {
              cancelsystemApi.querysuerB().then(res => {
                console.log(res[0], '11111111111')
                cache.setType(res[0].type)
                cache.setStatus(res[0].auditStatus ? res[0].auditStatus : '')
                console.log(res[0].type, '---------')
              })
              console.log(res)
              debugger
              cache.setToken(res.accessToken.access_token)
              cache.setCookie('userId', res.user.userId)
              cache.setCookie('phone', this.account.phone)
              cache.setCookie('isSiChuan', res.user.location === 'yd' ? 1 : 0)
              this.$store.commit('SET_USER', res.user)

              if (this.$route.params.url === 'coupon') {
                this.$router.push('/coupon')
              } else {
                this.$router.push('/')
              }
            })
        } else {
          this.$toast('验证码')
        }
      },
      sendCode() {
        if (!this.account.phone) {
          this.$toast('请输入手机号码')
        } else {
          this.$refs.timeCountDown.reset()
          this.isShowTimeCountDown = true
          loginApi.smsCode({
              phone: this.account.phone
            })
            .then(res => {
              this.account.smsKey = res.key
            })
        }
      },
      merchantlogin() {
        this.$router.push('/merchantlogin')
      }
    }
  }
</script>

<style lang="less" scoped>
  .bg {
    position: relative;
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;

    .van-image {
      position: absolute;
      bottom: -150px;
      width: 418px;
    }
  }

  .bgt1 {
    width: 636px;
    height: 100px;
    opacity: 1;
    font-size: 46px;
    // font-family: Source Han Sans CN, Source Han Sans CN-Bold;
    font-weight: 700;
    text-align: left;
    color: #ffffff;
    position: absolute;
  }

  .bgt2 {
    width: 636px;
    height: 83px;
    top: 100px;
    opacity: 1;
    font-size: 30px;
    // font-family: Source Han Sans CN, Source Han Sans CN-Bold;
    text-align: left;
    color: #ffffff;
    position: absolute;
  }

  .bgt3 {
    color: #FFFFFF;
    // bottom: 0;
    bottom: -400px;
    position: absolute;
    font-size: 46px;
  }


  .mainbg {
    background: url(../../assets/img/loginmianbg.png);
  }

  .circular {
    width: 100%;
    height: 212px;
    margin-top: 100px;
    // background: #fff;
    border-top-left-radius: 50% 100%;
    border-top-right-radius: 50% 100%;
  }

  .van-cell-group {
    margin-top: 30px;
    padding: 0 30px;
    background: none;
    width: 20rem;
    // display: flex;
    // justify-content: center;
    margin: 0 auto;
  }

  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border: none;
  }

  .btn {
    display: block;
    margin: 120px auto 0;
    width: 636px;
    height: 84px;
  }

  .content {
    // background: #fff;
    overflow-x: hidden;
    height: calc(100% - 820px);
    // border-radius: 100px 100px 0 0;
  }

  .van-count-down {
    color: #AD0EA2;
  }

  .merchant {
    width: 100%;
    text-align: center;
    margin-top: 50px;
    color: #FFFFFF;
  }

  /deep/ .van-nav-bar__left {
    .van-icon,
    .van-nav-bar__text {
      color: #FFFFFF;
    }
  }

  /deep/ .van-nav-bar {
    background: none;
    border: none;
  }

  /deep/ .van-hairline--bottom::after {
    border-bottom-width: 0px;
  }

  /deep/ .van-nav-bar__title {
    color: #FFFFFF;
  }

  .van-field {
    // width: 628px;
    opacity: 1;
    background: #f8f8f8;
    border-radius: 44px;
  }


  /deep/ .van-button--small {
    height: 1rem;
    // padding: -0.5rem 0.5rem
    // position: absolute;
  }

  .codespan {
    line-height: 0px;
    // font-size: 20px;
  }

  .van-cell{
    line-height: 1rem;
    height: 100px;
  }
</style>

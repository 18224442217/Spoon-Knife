<template>
  <div style="background:#F45051;height:100vh;margin-bottom:-60px;">

    <van-nav-bar
      title="商家登录"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div class="bg">
      <van-image
        :src="require('../../../static/images/bg_mine_top.png')" />
    </div>

    <div class="circular"/>

    <div class="content">
      <van-cell-group>
        <van-field v-model="phoneount.username"
                   left-icon="user-o"
                   required
                   placeholder="请输入账号" />
        <van-field v-model="phoneount.password"
                   type="password"
                   left-icon="bag-o"
                   required
                   placeholder="请输入密码" />
        <!-- <van-field v-model="phoneount.smsCode"
                   left-icon="closed-eye"
                   required
                   placeholder="请输入验证码"
                   @click-right-icon="getNewValidateCode" >
          <template #right-icon>
            <img :src="'http://218.205.252.24:18090/web/api-auth/validata/code/'+r"
                 alt=""
            >
          </template>
        </van-field> -->
        <van-field v-model="phoneount.smsCode"
                   left-icon="closed-eye"
                   required
                   placeholder="请输入验证码" >
          <template #button>
            <van-button :disabled="isShowTimeCountDown"
                        size="small"
                        color="#F45051"
                        type="primary"
                        @click="sendCode"
            >
              <van-count-down v-show="isShowTimeCountDown"
                              ref="timeCountDown"
                              :time="CountDownTime"
                              format="ss"
                              @finish="isShowTimeCountDown=false"/>
              <span v-show="!isShowTimeCountDown">
                发送验证码
              </span>

            </van-button>
          </template>
        </van-field>

      </van-cell-group>

      <van-button class="btn"
                  type="primary"
                  round
                  color="#F45051"
                  @click="login">

        <span>登录</span>
      </van-button>
      <!-- <div class="merchant"
           @click="merchantlogin">
        <p>会员登录</p>
      </div> -->
    </div>
  </div>
</template>

<script>
import loginApi from '@/api/loginApi'
import cache from '@/utils/cache'
import cancelsystemApi from '@/api/cancelsystem'
export default {
  data() {
    return {
      phoneount: {
        // phone: '',
        username: '',
        smsCode: '',
        smsKey: '',
        password: ''
      },
      changeR: Math.floor((Math.random() * 10)),
      CountDownTime: 60000,
      isShowTimeCountDown: false,
      YDRZ: {}
    }
  },
  computed: {

    r() {
      let r = ''
      const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      for (let i = 0; i < 31; i++) {
        const id = parseInt(Math.random() * 61)
        r += chars[id]
      }
      r += this.changeR
      return r
    }

  },
  methods: {
    login() {
      if (!this.phoneount.username) {
        this.$toast('请填写账号')
      }
      if (!this.phoneount.password) {
        this.$toast('请填写密码')
      }
      if (!this.phoneount.smsCode) {
        this.$toast('请填写验证码')
      }

      if (this.phoneount.smsCode && this.phoneount.smsKey && this.phoneount.username && this.phoneount.password) {
        loginApi.businessLogin(this.phoneount)
          .then(res => {
            cancelsystemApi.querysuer().then(res => {
              console.log(res[0], '11111111111')
              cache.setType(res[0].type)
              cache.setStatus(res[0].auditStatus ? res[0].auditStatus : '')
              console.log(res[0].type, '---------')
            })
            console.log(res)
            cache.setToken(res.accessToken.access_token)
            cache.setCookie('userId', res.user.userId)
            cache.setCookie('phone', this.phoneount.username)
            cache.setCookie('isSiChuan', res.user.location === 'yd' ? 1 : 0)
            cache.setCookie('mchId', res.user.mchId)
            this.$store.commit('SET_USER', res.user)
            return cancelsystemApi.querysuer()
          })
          .then(resdata => {
            cache.setType(resdata[0].type)
            cache.setStatus(resdata[0].auditStatus ? resdata[0].auditStatus : '')
            if (resdata[0].type * 1 === 1) {
              this.$router.push('/cancelsystem')
            } else {
              this.$router.push('/')
            }
          })
      }
    },
    getNewValidateCode() {
      this.changeR = Math.floor((Math.random() * 10))
    },
    sendCode() {
      if (!this.phoneount.username) {
        this.$toast('请输入手机号码')
      } else {
        this.$refs.timeCountDown.reset()
        this.isShowTimeCountDown = true
        loginApi.smsCode({ phone: this.phoneount.username })
          .then(res => {
            console.log(res, '-----------')
            this.phoneount.smsKey = res.key
          })
      }
    },
    merchantlogin() {
      this.$router.push('/login')
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
  .van-image{
    position:absolute;
    bottom:-220px;
    width:418px;
  }
}

.circular{
  width: 100%;
  height: 212px;
  margin-top: 100px;
  background: #fff;
  border-top-left-radius: 50% 100%;
  border-top-right-radius:  50% 100%;

}

.van-cell-group {
  margin-top: 30px;
  padding: 0 30px;
}
.btn {
  display: block;
  margin: 120px auto 0;
  width: 600px;
  height: 80px;
}
.content{
  background: #fff;
  overflow-x: hidden;
  height: calc(100% - 820px);
  // border-radius: 100px 100px 0 0;

}
.van-count-down{
  color: #fff;
}
.merchant{
  width: 100%;
  text-align: center;
  margin-top: 50px;
}
</style>

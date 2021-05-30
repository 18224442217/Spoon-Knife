<template>
  <div class="container">
    <div class="user_info">
      <div class="circle"
           @click="logout"/>
      <div class="user">
        <van-image :src="user.headImgUrl || avatar"
                   round/>
        <div class="details">
          <p class="text">
            <span class="username">{{ user.nickname || user.username }}</span>
            <span class="phone">{{ user.phone?user.phone.replace(/^(\d{3})\d+(\d{4})$/, '\$1****\$2'):'' }}</span>
          </p>
          <div class="level">
            <img src="../../assets/img/mine/vip.png">
            <span>{{ pageInfo.memberName }}</span>
          </div>
        </div>
        <img src="../../assets/img/mine/logout.png"
             class="logout">
      </div>
    </div>
    <div class="mine_nav">
      <div class="header">
        <span class="title">我的订单</span>
        <div class="text"
             @click="goToOrder({index:0})">
          <span class="text">查看全部订单</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <van-grid :border="false">
        <van-grid-item v-for="item in nav"
                       :key="item.alt"
                       :text="item.alt"
                       icon="photo-o"
                       @click="goToOrder(item.params)">
          <template slot="icon">
            <img :src="item.image"
                 alt="">
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="other_nav">
      <div class="title">
        常用服务
      </div>
      <van-grid :border="false">
        <div v-for="item in service"
             :key="item.title">
          <van-grid-item
            v-if="item.show"
            :text="item.title"
            icon="photo-o"
            @click="handlerBaseServer(item.link)"
          >
            <template
              slot="icon">
              <img :src="item.image"
                   alt="">
            </template>
          </van-grid-item>
        </div>
      </van-grid>
    </div>

    <div v-if="businessShow==1"
         class="other_nav bottom">
      <div class="title">
        商家服务
      </div>
      <van-grid :border="false">
        <van-grid-item v-for="item in businessList"
                       :key="item.title"
                       :text="item.title"
                       icon="photo-o"
                       @click="skip(item)"
        >
          <template slot="icon">
            <img :src="item.image"
                 alt="">
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <van-popup v-model="isShowPhoneCall"
               :style="{ height: '30%' }"
               position="bottom"
               class="phone_popup"
    >
      <a href="tel:4000112998">
        <span class="phone">4000112998</span>
        <span>安卓客户可直接点击进行拨打</span>
        <span>苹果客户需长按复制后手动拨打</span>
      </a>
    </van-popup>
  </div>

</template>

<script>
import mineApi from '@/api/mineApi'
import cache from '@/utils/cache'

export default {
  data() {
    return {
      businessShow: '',
      businessList: [
        {
          image: require('../../assets/img//mine/hexiao.png'),
          title: '商家核销',
          link: 'cancel',
          id: 1
        },
        {
          image: require('../../assets/img/mine/faquan.png'),
          title: '商家发券',
          link: 'couponhistory',
          id: 2
        },
        {
          image: require('../../assets/img/mine/jilu.png'),
          title: '发券记录',
          link: 'merchant_offline_coupon',
          id: 3
        }
      ],
      user: {
        phone: '',
        headImgUrl: ''
      },
      vipLevel: '',
      welcomeMsg: '四川移动和生活欢迎您',
      pageInfo: {
        memberName: '普通会员'
      },
      avatar: require('../../assets/img/mine/avatar.png'),
      isShowPhoneCall: false,
      nav: [{
        image: require('../../assets/img/mine/dfk@3x.png'),
        alt: '待付款',
        params: {
          index: 1
        }
      }, {
        image: require('../../assets/img/mine/dfh@3x.png'),
        alt: '待发货',
        params: {
          index: 2
        }
      }, {
        image: require('../../assets/img/mine/dsh@3x.png'),
        alt: '待收货',
        params: {
          index: 3
        }
      }, {
        image: require('../../assets/img/mine/pj@3x.png'),
        alt: '已完成',
        params: {
          index: 4
        }
      }],
      service: [
        // {
        //   image: require('../../assets/img/mine/myCoin.png'),
        //   title: '我的权益币',
        //   link: ''
        // },
        {
          image: require('../../assets/img/mine/myShoppingCard.png'),
          title: '我的购物车',
          link: 'gotoShoppingCart',
          show: true
        }, {
          image: require('../../assets/img/mine/myCoupon.png'),
          title: '我的卡券',
          link: 'goToMyCoupon',
          show: true
        }, {
          image: require('../../assets/img/mine/myAddress.png'),
          title: '收货地址',
          link: 'gotoAddress',
          show: true
        }, {
          image: require('../../assets/img/mine/help.png'),
          title: '客服帮助',
          link: 'callService',
          show: true
        }, {
          image: require('../../assets/img/mine/feedback.png'),
          title: '意见反馈',
          link: 'gotoFeedback',
          show: true
        }, {
          image: require('../../assets/img/mine/agreement.png'),
          title: '用户协议',
          link: 'gotoUserAgreement',
          show: true
        }, {
          image: require('../../assets/img/mine/policy.png'),
          title: '隐私政策',
          link: 'gotoPrivacyPolicy',
          show: true
        }, {
          image: require('../../assets/img/mine/ruzhu.png'),
          title: '商户入驻',
          link: 'merchantenter',
          show: ''
        }, {
          image: require('../../assets/img/mine/merchant.png'),
          title: '我是商家',
          link: 'merchantlogin',
          show: true
        }
        //  {
        //   image: require('../../assets/img/mine/merchant.png'),
        //   title: '我是商家',
        //   link: 'logout'
        // }
      ]
    }
  },
  watch: {
    '$store.getters.user': {
      deep: true,
      immediate: true,
      handler(val) {
        // console.log(val.user)
        this.user = val
      }
    }
  },
  created() {
    this.businessShow = cache.getType()
    console.log(this.businessShow, '商家type')
    for (let i = 0; i < this.service.length; i++) {
      if (this.service[i].title === '商户入驻') {
        console.log(cache.getStatus(), '入驻状态')
        // if (this.businessShow == 0) {
        //   this.service[i].show = 1
        // } else if (this.businessShow == 1) {
        //   this.service[i].show = 0
        // }
        if (this.businessShow === 0 && cache.getStatus() === 0 || cache.getStatus() === 2 || !cache.getStatus()) {
          this.service[i].show = 1
        } else if (this.businessShow === 1 && cache.getStatus() === 1) {
          this.service[i].show = 0
        }
      }
    }
  },
  mounted() {
    this.getPageInfo()
    this.businessShow = cache.getType()
    for (let i = 0; i < this.service.length; i++) {
      if (this.service[i].title === '商户入驻') {
        console.log(!this.businessShow, '商户type')
        if (this.businessShow == 0) {
          this.service[i].show = 1
        } else {
          this.service[i].show = 0
        }
      }
    }
  },
  methods: {
    skip(num) {
      console.log(num)
      if (num.id === 1) {
        this.$router.push({
          name: 'cancel',
          params: { id: 1 }
        })
      }
      if (num.id === 2) {
        this.$router.push({
          name: 'merchant_offline_coupon'
        })
      }
      if (num.id === 3) {
        this.$router.push({
          name: 'couponhistory'
        })
      }
    },
    goToOrder(params) {
      this.$router.push({ name: 'order', params })
    },
    // 前往地址管理页面
    gotoAddress() {
      this.$router.push({ path: '/address' })
    },
    // 前往我的订单页面
    gotoOrder() {
      this.$router.push({ path: '/order' })
    },
    // 前往隐私政策页面
    gotoPrivacyPolicy() {
      this.$router.push({
        path: '/privacyPolicy'
      })
    },
    // 前往商户入驻界面
    merchantenter() {
      this.$router.push({
        path: '/merchantenter',
        query: {
          url: 'mine',
          phone: this.user.phone
        }
      })
    },
    gotoFeedback() {
      this.$router.push({ name: 'feedback' })
    },
    gotoShoppingCart() {
      this.$router.push({
        name: 'shoppingCart'
      })
    },
    // 前往客户协议页面
    gotoUserAgreement() {
      this.$router.push({
        path: '/userAgreement'
      })
    },
    callService() {
      this.isShowPhoneCall = true
    },
    handlerBaseServer(method) {
      if (method == 'merchantlogin') {
        this.$router.push('merchantlogin')
      } else {
        this[method]()
      }
    },
    // 退出登录
    logout() {
      const access_token = cache.getToken()
      mineApi.logout(access_token)
        .then(res => {
          cache.clearToken()
          this.$router.push({ name: 'home' })
        })
        .catch(e => {
          cache.clearToken()
          this.$router.push({ path: '/login' })
        })
    },
    // 获取页面信息
    getPageInfo() {
      mineApi.getPageInfo().then(res => {
        this.pageInfo = res
        const member = res.member
        if (member === 'super') {
          this.pageInfo.memberName = '至尊会员'
        } else if (member === 'best') {
          this.pageInfo.memberName = '精英会员'
        } else {
          this.pageInfo.memberName = '普通会员'
        }
      })
    },
    goToMyCoupon() {
      this.$router.push('/mycoupon')
    }

  }
}
</script>

<style  scoped lang="less">
.container{
  background: #f9f9f9;
  min-height: 100vh;
  position: relative;
  overflow-y: scroll;
}
.user_info{
  background: linear-gradient(#F7D2D2,#fff);
  height: 400px;
  padding:60px 40px 0;
  .circle{
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(#FF9BA2, 0.1);
    width: 400px;
    height: 400px;
    border-radius: 50%;
    transform: translate(50%,-50%);
  }
  .user{
    display: flex;
    .van-image{
      width: 108px;
      height: 108px;
    }
    .details{
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding:4px 0;
      margin: 0 20px;
      flex-basis: 75%;
      .text{
        display: flex;
        align-items: flex-end;
        .username{
          font-size: 36px;
        }
        .phone{
          font-size: 28px;
          margin-left:10px;
        }
      }
      .level{
        max-width: 164px;
        display: flex;
        align-items: center;
        height: 40px;
        border-radius: 20px;
        background: linear-gradient(90deg,#fae1b0 7%, #ffeccb 50%, #f5cd90 91%);
        font-size: 20px;
        color:#D09C4B;
        img{
          width: 40px;
          height: 40px;
          margin-left:10px;
          padding: 8px 6px;
          background: #ffffff55;
          border-radius: 50%;
          margin-left: -10px;
        }
        span{
          margin-left: 10px;
        }
      }
    }
    .logout{
      height: 32px;
      width: 32px;
      margin-top:20px;
      float: right;
    }
  }
}

  .mine_nav{
    margin:-160px 40px 0;
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    padding: 28px 30px 0;
    .header{
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      border-bottom: 1px solid #ededed;
      .title{
        font-size: 32px;
      }
      .text{
        font-size: 24px;
      }
      .van-icon{
        padding-top: 4px;
      }
      padding-bottom: 28px;
    }
    .van-grid{
      img{
        width: 68px;
        height: 68px;
      }
    }
  }
  .other_nav.bottom{
    margin-bottom: 200px;
  }
  .other_nav{
    background: #fff;
    margin: 30px 40px 0;
    padding-top: 40px;
    border-radius: 20px;
    .title{
      font-size: 32px;
      padding-left: 26px;
      padding-bottom: 20px;
      border-bottom: 1px solid #ededed;
    }
        .van-grid{
      img{
        width: 68px;
        height: 68px;
      }
    }
  }
  .phone_popup{
    padding:40px;
    a{
      color: #333;
      font-size: 32px;
          .phone{
            font-size: 48px;
            font-weight: bold;
            display: block;
    }
    }
  }
</style>

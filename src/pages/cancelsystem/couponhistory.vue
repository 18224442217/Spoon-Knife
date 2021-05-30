<template>
  <div class="home">
    <!-- <div class="border" /> -->
    <WriteOff/>
    <div class="center">
      <div class="center-title">
        <!-- <p class="center-icon" /> -->
        <p class="center-msg"> 发放记录</p>
        <span style="position: absolute;right:0;font-size: .8rem;"
              @click="wxRegCallback">分享</span>
      </div>
    </div>
    <div class="couponlist">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="暂无更多记录"
                style="margin-bottom: 150px;"
                @load="onLoad">
        <div v-for="(item,index) in couponlist"
             :key="index"
             class="list">
          <van-row class="listbox">
            <van-col span="6">
              <!-- <img src="../../assets/img/couponlist.png"
                   alt=""
                   class="list-img"> -->
              <p class="list-left">￥<span>{{ item.cupponMoney }}</span></p>
            </van-col>
            <van-col span="17"
                     class="list-right">
              <p class="list-title">{{ item.name }}</p>
              <p class="list-time">规则：{{ item.useRule }}</p>
              <p class="list-num"><span class="list-num-z">总量：{{ item.count }}</span><span
                class="list-num-z">已领取：{{ item.cumulativeIssuanceCount }}</span><span
                  class="list-num-z">已核销：{{ item.writtenOffCount }}</span></p>
              <p class="list-time">过期时间：{{ item.expirationFormat }}</p>
              <div class="hxjl">
                <!--  -->
                <p v-if="item.state==0"
                   @click="PutOnTheShelves(item,1)">{{ textTop }}</p>
                <p v-if="item.state==1"
                   @click="PutOnTheShelves(item,0)">{{ textDow }}</p>
                <p
                  @click="hxjl(item.id)">核销记录</p>
              </div>

            </van-col>
          </van-row>
        </div>

        <div v-if="couponlist.length===0"
             class="nodatabox">
          <img src="../../assets/img/wjl.png"
               alt=""
               style="width:50%">
          <p class="nodata">什么都没有哦</p>
        </div>
      </van-list>

    </div>
    <div class="footer">
      <div class="footerbox">
        <p class="footer-title"
           @click="ljfq">立 即 发 券</p>
        <p class="footer-title"
           @click="qmhx">券 码 核 销</p>
      </div>
      <p class="footer-phone">客服电话：<span style="color:#AD0EA2;">4000112998</span></p>
    </div>
  </div>
</template>

<script>
import cancelsystemApi from '@/api/cancelsystem'
import cache from '@/utils/cache'
import WriteOff from '@/components/writeOff'
import wxShare from '@/common/wxapi.js'

export default {
  components: {
    WriteOff
  },
  data() {
    return {
      textDow: '上架',
      textTop: '下架',
      merchantName: '',
      merchantAddress: '',
      merchantLogo: '',
      couponCurrentPage: 1,
      couponPageSize: 5,
      couponlist: [
        // { cupponMoney: 8, name: '名字', count: 10, cumulativeIssuanceCount: 1, writtenOffCount: 1, expirationFormat: '' }
      ],
      loading: false,
      finished: false
    }
  },
  created() {
    // if (cache.getType() != 1) {
    //   this.$router.push('/')
    // }
    cancelsystemApi.querysuer().then(res => {
      this.merchantName = res[0].merchantName
      this.merchantAddress = res[0].merchantAddress
      this.merchantLogo = res[0].merchantLogo
    })
    wxShare.getJSSDK()
  },
  mounted() {
  },
  methods: {
    wxRegCallback() {
      const dataForWeixin = {
        title: '标题',
        desc: '5555555555555',
        link: window.location.href,
        imgUrl: ''
      }
      const href = {
        url: 'https://www.hsh.139sc.com/h5mall/#/storeSharing?merchantId=1382015274710585345'
      }
      cancelsystemApi.shareData(href).then((res) => {
        // console.log(res, 'res---------')
        const data = res
        wxShare.getJSSDK(data, dataForWeixin)
      })
    },
    PutOnTheShelves(item, type) {
      const data = {
        id: item.id,
        state: type
      }
      cancelsystemApi.addOrSubtractApply(data).then(res => {
        this.couponlist = []
        this.couponCurrentPage = 1
        if (type == 1) {
          this.$toast('上架成功')
          this.onLoad()
        } if (type == 0) {
          this.$toast('下架成功')
          this.onLoad()
        }
      })
    },
    async onLoad() {
      const data = {
        couponCurrentPage: this.couponCurrentPage,
        couponPageSize: this.couponPageSize
      }
      await cancelsystemApi.queryconponlist(data).then(res => {
        // console.log(res)
        this.couponlist.push(...res.data)
        this.loading = false
        if (this.couponlist.length >= res.count) {
          this.finished = true // 结束加载状态
        } if (this.couponlist.length === 0) { // 判断获取数据条数若等于0
          this.couponlist = [] // 清空数组
          this.finished = true // 停止加载
        }
        this.couponCurrentPage++
      })
    },
    qmhx() {
      this.$router.push({
        name: 'cancel'
      })
    },
    hxjl(id) {
      this.$router.push({
        name: 'history',
        query: {
          id: id
        }
      })
    },
    ljfq() {
      this.$router.push({
        name: 'merchant_offline_coupon'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.more {
  text-align: center;
  color: #999;
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 12px;
}
.nodatabox{
  text-align: center;
}
.nodata{
  color: #737373;
  font-size: 28px;
  margin-top: 20px;
}
body{
  background: color #f7f7f7!important;
}
.footerbox{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 30px 0 0 0;
}
.listbox{
  display: flex;
  align-items: center;
}
.list-left span{
  font-size:78px;
}
.list-left{
  color: #AD0EA2;
  font-size:46px;
  text-align: center;
}
  .home {
    width: 100%;
    height: 100%;
    background: #F7F7F7;
    position: fixed;
  }

  .border {
    background: #f8f8f8;
    height: 10px;
    width: 100%;
  }

  .ljfq {
    width: 150px;
    background: #4480f3;
    font-size: 24px;
    text-align: center;
    line-height: 60px;
    color: #fff;
    border-radius: 30px;
  }

  .img {
    width:120px;
    height: 120px;
    border-radius: 100%;
  }

  .center {
    width: 90%;
    margin: 0 auto;
  }

  .center-title {
    font-weight: bold;
    margin-top: 20px;
    display: flex;
    align-items: center;
    position: relative;
    color: #3E3E3E;
  }

  .center-icon {
    display: inline-block;
    height: 42px;
    width: 15px;
    background: #4480f3;
    border-radius: 6px;
    margin-right: 20px;
    margin-left: 17px;
  }

  .center-msg {
    font-size: 36px;
  }

  .couponlist {
    width: 90%;
    height: 90%;
    margin: 0 auto 500px;
    margin-top: 30px;
    padding: 0 0 240px 0;
    background: #F7F7F7;
    overflow-x: scroll;
  }

  .list {
    padding:40px 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.09);
    margin: 20px 0;
  }

  .list-right {
    margin-left: 20px;
  }

  .list-img {
    width: 100%;
  }

  .list-title {
    width: 100%;
    font-size: 34px;
    color: #4c4a4a;
    line-height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 10px;
  }

  .list-num {
    font-size: 30px;
    color: #8b8b8b;
    margin: 15px 0;
  }

  .list-time {
    font-size: 25px;
    color: #8b8b8b;
  }

  .list-num-z {
    font-size: 25px;
    margin-right: 28px;
  }

  .hxjl {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 30px;
  }
  .hxjl p{
    font-size: 30px;
    height: 48px;
    padding: 0 20px;
    text-align: center;
    border: 1px solid #4c4a4a;
    border-radius: 26px;
    color: #4c4a4a;
    margin-left: 20px;
  }

  .footer {
    text-align: center;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    background: #F7F7F7;
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

  .null {
    text-align: center;
    font-size: 40px;
    color: #afafaf;
  }
</style>

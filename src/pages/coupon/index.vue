<template>
  <div class="box">
    <img class="boxFixed"
         src="../../assets/img/publicbj.png"
         alt="">
    <div class="boxFixedb">
      <div class="nav"
           @click="rightclick">
        <!-- <van-icon name="location-o"
                size="20" /> -->
        <img src="../../assets/img/dituicon2.png"
             alt="">
        <span class="nav-font">{{ location }}</span>
        <van-icon name="arrow"
                  class="nav-right" />
      </div>
      <!-- finished-text="没有更多了" -->
      <div class="listbox">
        <van-list v-model="loading"
                  :finished="finished"
                  @load="onLoadcon">
          <div v-for="(item,index) in shoplist"
               :key="index"
               class="shop">
            <div class="shop-top">
              <div class="shop-top-left">
                <img v-if="item.logo"
                     :src="item.logo"
                     alt=""
                     class="shop-logo">
                <img v-if="!item.logo"
                     src="../../assets/img/merchantlogo.png"
                     alt=""
                     class="shop-logo">
                <div>
                  <p class="title">{{ item.merchantName }}</p>
                  <p class="merchantAddress">{{ item.merchantAddress }}
                    <van-icon name="arrow"
                              class="shop-top-right" />
                  </p>

                </div>
              </div>
              <div class="shop-share">
                <span>{{ item.distance }}</span>
                <div>
                  <img
                    src="../../assets/img/fx0.png"
                    alt="">
                </div>

              </div>
            </div>
            <div class="shop-center">
              <div v-for="(item,index) in item.ymBMerchantCouponReturnVO"
                   :key="index"
                   :class="item.state===1 ? 'shop-list' :'shop-list1'">
                <span :class="item.state===1 ? '' :'color8E8E8E'"
                      class="countTotal"><span>剩{{ item.count }}张</span>
                  <span>分享</span>
                </span>
                <div :class="item.state===1 ? 'shop-box' :'shop-box1'">
                  <p :class="item.state===1 ? '' :'color8E8E8E'"
                     class="shop-num">￥<span>{{ item.cupponMoney }}</span> </p>
                  <div class="shop-msg"
                  >
                    <p class="shop-name">{{ item.name }}</p>
                    <span >{{ item.useRule }}</span>
                  </div>
                  <div :class="item.state===1 ? 'shop-right' :'shop-right1'"
                       @click="receive(item.id,item.cupponMoney,item.state)">{{ item.state===1 ? '立即领取' : '已领取' }}</div>
                </div>
                <div class="shop-hintbox"><p class="shop-hint time">过期时间: {{ item.endTime.slice(0,11) }}</p>
                  <span :class="item.state===1 ? '' :'color8E8E8E'"
                        class="shop-hint-right"

                        @click="mycouponsee(item)">查看详情</span></div>

              </div>
            </div>
            <div v-if="item.ymBMerchantCouponReturnVO.length<item.totalCouponNumber"
                 class="more"
                 @click="morelist(item.merchantId,index,item.page)">查看更多
              <van-icon name="arrow-down"
                        class="arrow-down" />
            </div>
          </div>
        </van-list>

        <van-dialog v-model="show"
                    :show-confirm-button="false"
                    :style="{ height: '59%' }"
                    theme="round-button"
                    class="dialog">
          <div class="cgbox">
            <div>
              <img src="../../assets/img/lqcg.png"
                   alt=""
                   class="lqcg"
                   @click="ljck">
            </div>

            <!-- <span class="num">{{ num }}</span> -->
            <!-- <div class="btn"
                 @click="ljck">立 即 查 看</div> -->
            <span>领取成功</span>
            <p>可前往我的卡券进行卡券核销</p>
            <div class="btn"
                 @click="ljck">确定</div>
          </div>

          <van-icon name="close"
                    size="30"
                    class="close"
                    @click="Getthesuccess" />
                    <!-- <p class="lq-msg">请在我的卡券查询或使用</p> -->
        </van-dialog>
        <!--    <van-popup v-model="map" position="top" class="mapfiex" style="width:100%;height:100%">
      <Map @func="getMsgFormSon" />
    </van-popup> -->
        <van-popup v-model="particulars"
                   :style="{ height: 'auto' }"
                   position="bottom" >
          <div class="cuoponbox">
            <van-row class="cupponlist">
              <van-col span="10"
                       class="cupponname color"
              >{{ detailsObj.name }}</van-col>
              <van-col span="14"
                       class="cupponname"
              >
                <van-icon class="rightClose"
                          name="cross"
                          @click="rightClose"/>
              </van-col>
            </van-row>
            <van-divider />
            <van-row class="cupponlist">
              <van-col span="10"
                       class="cupponname"
              >优惠券金额</van-col>
              <van-col span="14"
                       class="cupponname"
              >{{ detailsObj.cupponMoney }} 元</van-col>
            </van-row>
            <van-divider />
            <van-row class="cupponlist">
              <van-col span="10"
                       class="cupponname"
              >剩余未领取数量</van-col>
              <van-col span="14"
                       class="cupponname"
              >{{ detailsObj.count }} 张</van-col>
            </van-row>
            <van-divider />
            <van-row class="cupponlist">
              <van-col span="10"
                       class="cupponname"
              >优惠券使用规则</van-col>
              <van-col span="14"
                       class="cupponname"
              >
                {{ detailsObj.useRule }}
              </van-col>
            </van-row>
            <van-divider />
            <van-row class="cupponlist">
              <van-col span="10"
                       class="cupponname"
              >优惠券有效期</van-col>
              <van-col span="14"
                       class="cupponname"
              >{{ detailsObj.endTime.slice(0,10) }}</van-col>
            </van-row>
            <van-divider />
          </div>

        </van-popup>
        <div class="myCoupon"
             @click="couponLsit">
          我的卡券
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import BMap from 'BMap'
import queryshopAi from '@/api/coupon'
import Map from '../coupon/map.vue'
import cache from '@/utils/cache'
export default {
  components: {
    Map
  },
  data() {
    return {
      detailsObj: {
        cupponMoney: '',
        count: '',
        useRule: '',
        endTime: ''
      },
      map: false,
      shoplist: [],
      location: '',
      lng: 30.67994285,
      lat: 104.06792346,
      show: false,
      num: '',
      loading: true,
      finished: false,
      page: {
        merchantCurrentPage: 1,
        merchantPageSize: 5
      },
      page1: {
        merchantCurrentPage: 1,
        merchantPageSize: 5
      },
      particulars: false

    }
  },
  created() {
    this.onLoadcon()
  },
  mounted() {
    // console.log(this.$route.params)
  },
  methods: {

    rightclick() {
      // this.map = true
      // // this.map111 = false
      // const that = this
      // const timer = setInterval(() => {
      //   const ispeed = Math.floor(-that.scrollTop / 5)
      //   document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
      //   if (that.scrollTop === 0) {
      //     clearInterval(timer)
      //   }
      // }, 16)
      // this.showmap = true
      this.$router.push('/map')
    },
    // map() {
    //   this.$router.push('/map');
    // },
    morelist(id, index, page) {
      console.log(id)
      console.log(index)
      if (!cache.getToken()) {
        this.$router.push({
          name: 'login',
          params: {
            url: 'coupon'
          }
        })
      } else {
        const data = {
          merchantId: id,
          couponPageSize: page.couponPageSize,
          couponCurrentPage: page.couponCurrentPage
        }
        console.log(this.shoplist[index].ymBMerchantCouponReturnVO.length)
        queryshopAi.querycouponlist(data).then(res => {
          console.log(res.data)
          this.shoplist[index].ymBMerchantCouponReturnVO.push(...res.data)
          page.couponCurrentPage++
          console.log(this.shoplist[index].ymBMerchantCouponReturnVO.length)
        })
      }
    },
    receive(id, num, state) {
      if (!cache.getToken()) {
        this.$router.push({
          name: 'login',
          params: {
            url: 'coupon'
          }
        })
      } if (state === 1) {
        const data = {
          couponId: id
        }
        queryshopAi.getcoupon(data).then(res => {
          this.show = true
          console.log('领取成功')
        })
      } else {
        this.$toast('优惠券已领取')
      }
    },

    Getthesuccess() {
      this.show = false
      window.location.reload()
    },
    onLoadcon() {
      // console.log(this.$route.query.data.mapname)

      if (this.$route.query.data) {
        this.location = this.$route.query.data.mapname
        this.lat = this.$route.query.data.print.lat
        this.lng = this.$route.query.data.print.lng
        // this.location = this.$route.params.mapname
        this.shoplist = [] // 清空数组
        const params = {
          lng: this.lng,
          lat: this.lat,
          merchantCurrentPage: this.page1.merchantCurrentPage,
          // merchantCurrentPage: 1,
          merchantPageSize: this.page1.merchantPageSize,
          couponCurrentPage: 1,
          couponPageSize: 4
        }
        queryshopAi.queryshoplist(params).then(res => {
          console.log(res)
          res.map(item => {
            item.page = {
              couponPageSize: 4,
              couponCurrentPage: 2
            }
          })
          this.loading = false
          this.shoplist.push(...res)
          if (res.length === 0) { // 判断获取数据条数若等于0
            this.shoplist = [] // 清空数组
            this.finished = true // 停止加载
          }
          if (this.shoplist.length >= res[0].totalMerchantNumber) {
            this.finished = true // 结束加载状态
          }
          this.page1.merchantCurrentPage++
          console.log(this.shoplist)
        }).catch(err => {
          console.log(err)
          this.finished = true // 停止加载
        })
      } else {
        const _this = this
        this.shoplist = [] // 清空数组
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function(r) {
          console.log(r)
          // eslint-disable-next-line no-undef
          if (this.getStatus() === BMAP_STATUS_SUCCESS) {
            const myGeo = new BMap.Geocoder()
            myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), data => {
              if (data.addressComponents) {
                const result = data.addressComponents
                const location = {
                  Latitude: r.point.lat, // 维度
                  Longtitude: r.point.lng, // 精度
                  creditProvince: result.province || '', // 省
                  creditCity: result.city || '', // 市
                  creditArea: result.district || '', // 区
                  creditStreet: (result.street || '') + (result.streetNumber || '') // 街道
                }
                _this.lat = location.Latitude
                _this.lng = location.Longtitude
                _this.location = location.creditProvince + location.creditCity + location.creditArea +
                    location.creditStreet
                const params = {
                  lng: _this.lng,
                  lat: _this.lat,
                  merchantCurrentPage: _this.page.merchantCurrentPage,
                  merchantPageSize: _this.page.merchantPageSize,
                  couponCurrentPage: 1,
                  couponPageSize: 4

                }
                queryshopAi.queryshoplist(params).then(res => {
                  console.log(res)
                  res.map(item => {
                    item.page = {
                      couponPageSize: 4,
                      couponCurrentPage: 2
                    }
                  })
                  _this.loading = false
                  _this.shoplist.push(...res)
                  if (res.length === 0) { // 判断获取数据条数若等于0
                    _this.shoplist = [] // 清空数组
                    _this.finished = true // 停止加载
                  }
                  if (_this.shoplist.length >= res[0].totalMerchantNumber) {
                    _this.finished = true // 结束加载状态
                  }
                  _this.page.merchantCurrentPage++
                  console.log(_this.shoplist)
                }).catch(err => {
                  console.log(err)
                  _this.finished = true // 停止加载
                })
              }
            })
          }
        })
      }
    },
    ljck() {
      this.$router.push({
        name: 'mycoupon'
      })
    },
    // 我的领券列表
    couponLsit() {
      if (!cache.getToken()) {
        this.$router.push({
          name: 'login',
          params: {
            url: 'coupon'
          }
        })
      } else {
        this.$router.push({
          name: 'mycoupon'
        })
      }
    },
    mycouponsee(e) {
      if (e.state === 0) {
        this.$router.push({
          name: 'mycoupon'
        })
      } else {
        this.particulars = true
        this.detailsObj = e
        console.log(this.detailsObj, '========')
      }
    },
    rightClose() {
      this.particulars = false
    },
    getMsgFormSon(data) {
      this.map = false
      // this.map111 = true
      // this.detailed = data.mapname;
      this.location = data.mapname
      this.lat = data.print.lat
      this.lng = data.print.lng
      console.log(this.lng)
      console.log(this.lat)
      // this.$router.push({
      //   name: 'coupon',
      //   params: {
      //     mapname: this.location,
      //     print: {
      //       lng: this.lng,
      //       lat: this.lat
      //     }
      //   }
      // })
      this.onLoadcon()
    }
  }
}
</script>

<style lang="less" scoped>
.cgbox div{
  text-align: center;
}
.cgbox{
  background: white;
  width: 600px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin: auto;
}
.cgbox span{
  color: #B019A5;
  font-size: 46px;
  display: block;
  text-align: center;
  padding: 20px 0;
}
.cgbox p{
  text-align:center;
  color: #8A8A8A;
}
.cgbox{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
  .boxFixedb{
    position: absolute;
    z-index: 2;
    width: 100%;
  }
  .boxFixed{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
  }
  .rightClose{
    float: right;
    font-size: 1.2rem;
  }
  .shop{
    position: relative;
  }
  .countTotal{
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 15px;
    left: 40px;
    right: 40px;
    font-size: .5rem;
    color: #BB2BB1;
  }
  .myCoupon{
    width: 200px;
    height: 70px;
    overflow: hidden;
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#A70B9C), to(#CE48C4));
    opacity: .8;
    position: fixed;
    right: 0px;
    bottom: 200px;
    color: white;
    font-size: .9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-top-left-radius:50px;
    border-bottom-left-radius:50px;
  }
  .box {
    width: 100%;
    background: #fdfdfd;
  }

  .nav {
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding-top: 30px;
  }
  .nav img{
    width: 40px;
    margin-right: 10px;
  }
  .nav-right{
    color: white;
    font-size: .8rem;
    margin-top: 5px;
    margin-left: 10px;
  }

  .nav-font {
    font-size: 30px;
    margin-left: 10px;
    color: white;
  }

  .shop {
    width: 100%;
    margin: 30px auto;
    padding: 30px 40px;
    background: rgba(255,255,255, .8);
    border-radius: 30px;
    margin-bottom: 20px;
    // background: #ffffff;
    // border-radius: 16px;
    // box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.10);
  }
  .listbox{

  }

  .shop-logo {
    width: 110px;
    height: 110px;
    margin-right: 30px;
    border-radius: 50%;
  }

  .shop-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    color: #626062;
    overflow: hidden;
  }

  .shop-top-left {
    display: flex;
    // flex-direction: row;
    align-items: center;
    color: #626062;
  }
  .shop-top-right{
    color: #626062;
    font-size: .8rem;
    position: relative;
    top: 5px;
    left: 0;
  }

  .title {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .shop-share{
    flex: 0 0 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .shop-share .border{
    width: 40px;
    display: inline-block;
  }
  .shop-share div{
    padding: 0 0 0 20px;
  }
  .shop-share div img{
    width: 40px;
    height: auto;
  }

  .shop-list {
    background: url(../../assets/img/dp0.png) no-repeat;//top/100%
    background-size:100% 100% ;
    position: relative;
    justify-content: space-between;
    // margin-bottom: 20px;
    // background: #ffffff;
    padding: 30px 30px 15px 30px;
    border-radius: 16px;
    margin-bottom: 10px;
    // box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.10);
  }
  .color8E8E8E{
    color: #8E8E8E;
  }

  .shop-list1 {
    background: url(../../assets/img/dp0.png) no-repeat;//top/100%
    background-size:100% 100% ;
    position: relative;
    justify-content: space-between;
    // margin-bottom: 20px;
    // background: #ffffff;
    padding: 30px 30px 15px 30px;
    border-radius: 16px;
    margin-bottom: 10px;
  }

  .icon {
    width: 150px;
    position: absolute;
    top: 0;
  }

  .shop-center {
    margin-top: 50px;
    width: 100%;
  }

  .shop-msg {
    flex-grow: 1;
    text-align: left;
    margin-top: 30px;
    padding: 0 0 0 40px;
    color:#4C4C4C ;
    overflow: hidden;
  }
  .shop-msg span{
    margin-bottom: 10px;
    line-height:45px;
    height: 100px;
    font-size: 24px;
    display: block;
    padding: 5px 0 20px 0;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
  }

  .shop-num {
    font-size: 40px;
    margin-bottom: 5px;
    font-weight: 100;
  }
  .shop-num span{
    font-size: 70px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .shop-name{
    font-size: 45px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .shop-hintbox{
    padding: 10px 30px;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top:10px;
  }
  .shop-hintbox p{
    color:#8E8E8E ;
  }
  .shop-hint-right{
    color: #B019A5;
  }
  .shop-hint-right.color8E8E8E{
    color: #8E8E8E;
  }
  .shop-hint{
    font-size: 28px;
  }
  .shop-hint.time{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .shop-hint {
    font-size: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .shop-right {
    font-size: .8rem;
    flex-shrink: 0;
    line-height: 40px;
    margin-top: 20px;
    margin-left: 15px;
    font-weight: 100;
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#A70B9C), to(#CE48C4));
    border-radius:50px;
    color: white;
    padding:15px 30px;
  }

  .shop-right1 {
    font-size: .8rem;
    flex-shrink: 0;
    line-height: 40px;
    margin-top: 20px;
    margin-left: 15px;
    font-weight: 100;
    background: #8E8E8E;
    border-radius:50px;
    color: white;
    padding:15px 30px;
  }

  .shop-box {
    color: #B019A5;
    display: flex;
    align-items: center;
    padding: 5px 0 0 20px;
  }

  .shop-box1 {
    color: #aaa;
    display: flex;
    align-items: center;
    padding: 5px 0 0 20px;
  }

  .more {
    width: 220px;
    height: 60px;
    margin: 20px auto;
    font-size: 32px;
    background: #FFE8CF;
    color: #DB5B00;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lqcg {
    width: 50%;
    margin-top: 80px;
  }

  .num {
    position: absolute;
    top: 320px;
    right: 320px;
    font-size: 70px;
    font-weight: bold;
    color: #FC4732;
  }

  .lq-msg {
    width: 100%;
    text-align: center;
    color: #FC4732;
    margin: 20px 0;
  }

  /deep/ .van-dialog {
    background: none;
  }

  /deep/.van-dialog__footer {
    padding: 0;

  }

  .btn {
    width: 450px;
    font-size: 40px;
    margin:60px auto 50px;
    height: 100px;
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#A70B9C), to(#CE48C4));
    border-radius: 50px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .close {
    left: 350px;
    top: 40px;
    color: white;
    opacity: .8;
  }

  .merchantAddress {
    width: 500px;
    font-size: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cupponname{
    font-size: .9rem;
  }
  .cupponname.color{
    color: black;
    font-size: 1rem;
    margin-top: 10px;
  }
  .cupponlist{
    margin-top: 30px;

    color:#4c4c4c;
  }
  .cuoponbox{
    width: 90%;
    margin: 0 auto;
  }
</style>

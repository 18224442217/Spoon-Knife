<template>
  <div class="box">
    <img class="boxFixed"
         src="../../assets/img/publicbj.png"
         alt="">
    <div class="boxFixedb">
      <van-tabs v-model="active"
                sticky>
        <van-tab title="全部">
          <van-list v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad">
            <div v-for="(item,index) in list"
                 :key="index"
                 class="shoplist"
                 @click="use(item.id,item.couponId ,item.status,item.lat,item.lng)">
              <span v-if="item.type==1"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">折扣券</span>
              <span v-if="item.type==2"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">满减券</span>
              <span v-if="item.type==3"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">代金券</span>
              <span v-if="item.type==4"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">赠品券</span>
              <span v-if="item.type==5"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">优惠券</span>
              <van-row type="flex"
                       align="center ">
                <van-col :class="item.status===1 ? 'price' :'gqprice'"
                         span="6"><span
                  class="moneyicon">￥</span>{{ item.cupponMoney }}</van-col>
                <van-col span="11"
                         class="center">
                  <div>
                    <p class="title">{{ item.merchantName }}</p>
                    <p class="title">{{ item.name }}</p>
                    <p class="msg">{{ item.useRule }}</p>
                    <p class="time">{{ item.userBeginTimeFormat }}-{{ item.userEndTimeFormat }}</p>
                  </div>
                </van-col>
                <van-col span="5">
                  <div v-if="item.status===1"
                       class="ljsy"
                       @click="use(item.id,item.couponId ,item.status,item.lat,item.lng)">立即使用</div>
                  <div v-if="item.status===2"
                       class="ysy">已使用</div>
                  <div v-if="item.status===3"
                       class="ysy">已过期</div>
                </van-col>
              </van-row>
            </div>

          </van-list>

        </van-tab>
        <van-tab title="待使用">
          <van-list v-model="loading1"
                    :finished="finished1"
                    finished-text="没有更多了"
                    @load="onLoad1">
            <div v-for="(item,index) in list1"
                 :key="index"
                 class="shoplist"
                 @click="use(item.id,item.couponId ,item.status,item.lat,item.lng)">
              <span v-if="item.type==1"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">折扣券</span>
              <span v-if="item.type==2"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">满减券</span>
              <span v-if="item.type==3"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">代金券</span>
              <span v-if="item.type==4"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">赠品券</span>
              <span v-if="item.type==5"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">优惠券</span>
              <van-row type="flex"
                       align="center ">
                <van-col span="6"
                         class="price"><span class="moneyicon">￥</span>{{ item.cupponMoney }}</van-col>
                <van-col span="11"
                         class="center">
                  <div>
                    <p class="title">{{ item.merchantName }}</p>
                    <p class="title">{{ item.name }}</p>
                    <p class="msg">{{ item.useRule }}</p>
                    <p class="time">{{ item.userBeginTimeFormat }}-{{ item.userEndTimeFormat }}</p>
                  </div>
                </van-col>
                <van-col span="5">
                  <div class="ljsy"
                       @click="use(item.id,item.couponId ,item.status,item.lat,item.lng)">立即使用</div>

                </van-col>
              </van-row>

            </div>

          </van-list>
        </van-tab>
        <van-tab title="已使用">
          <van-list v-model="loading2"
                    :finished="finished2"
                    finished-text="没有更多了"
                    @load="onLoad2">
            <div v-for="(item,index) in list2"
                 :key="index"
                 class="shoplist"
                 @click="use(item.id,item.couponId,item.status)">
              <span v-if="item.type==1"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">折扣券</span>
              <span v-if="item.type==2"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">满减券</span>
              <span v-if="item.type==3"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">代金券</span>
              <span v-if="item.type==4"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">赠品券</span>
              <span v-if="item.type==5"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">优惠券</span>
              <van-row type="flex"
                       align="center ">
                <van-col span="6"
                         class="gqprice"><span class="moneyicon">￥</span>{{ item.cupponMoney }}</van-col>
                <van-col span="11"
                         class="center">
                  <div>
                    <p class="title">{{ item.merchantName }}</p>
                    <p class="title">{{ item.name }}</p>
                    <p class="msg">{{ item.useRule }}</p>
                    <p class="time">{{ item.userBeginTimeFormat }}-{{ item.userEndTimeFormat }}</p>
                  </div>
                </van-col>
                <van-col span="5">
                  <div class="ysy">已使用</div>
                </van-col>
              </van-row>

            </div>

          </van-list>
        </van-tab>
        <van-tab title="已过期">
          <van-list v-model="loading3"
                    :finished="finished3"
                    finished-text="没有更多了"
                    @load="onLoad3">
            <div v-for="(item,index) in list3"
                 :key="index"
                 class="shoplist"
                 @click="use(item.id,item.couponId,item.status)">
              <span v-if="item.type==1"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">折扣券</span>
              <span v-if="item.type==2"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">满减券</span>
              <span v-if="item.type==3"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">代金券</span>
              <span v-if="item.type==4"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">赠品券</span>
              <span v-if="item.type==5"
                    :class="item.status===1 ? 'color' :'colorB'"
                    class="shopText">优惠券</span>
              <van-row type="flex"
                       align="center">
                <van-col span="6"
                         class="gqprice"><span class="moneyicon">￥</span>{{ item.cupponMoney }}</van-col>
                <van-col span="11"
                         class="center">
                  <div>
                    <p class="title">{{ item.merchantName }}</p>
                    <p class="title">{{ item.name }}</p>
                    <p class="msg">{{ item.useRule }}</p>
                    <p class="time">{{ item.userBeginTimeFormat }}-{{ item.userEndTimeFormat }}</p>
                  </div>
                </van-col>
                <van-col span="5">
                  <div class="ysy">已过期</div>
                </van-col>
              </van-row>

            </div>

          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import cancelsystemApi from '@/api/cancelsystem'

export default {
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      loading1: false,
      finished1: false,
      loading2: false,
      finished2: false,
      loading3: false,
      finished3: false,
      list: [],
      list1: [],
      list2: [],
      list3: [],

      qblist: {
        page: 1,
        size: 10,
        state: 0
      },
      qblist1: {
        page: 1,
        size: 10,
        state: 1
      },
      qblist2: {
        page: 1,
        size: 10,
        state: 2
      },
      qblist3: {
        page: 1,
        size: 10,
        state: 3
      }
    }
  },
  mounted() { this.onLoad() },
  methods: {
    use(id, couponId, status, lat, lng) {
      console.log(status)
      if (status === 1) {
        this.$router.push({
          name: 'mecoupon',
          query: {
            id: id,
            couponId: couponId,
            lat: lat,
            lng: lng
          }

        })
      }
    },
    onLoad() {
      cancelsystemApi.querymycoupon(this.qblist).then(res => {
        console.log(res)
        this.list.push(...res.data)
        console.log(this.list)

        this.loading = false
        if (this.list.length === 0) { // 判断获取数据条数若等于0
          this.list = [] // 清空数组
          this.finished = true // 停止加载
        }
        if (this.list.length >= res.count) {
          this.finished = true // 结束加载状态
        }
        this.qblist.page++
      })
    },
    onLoad1() {
      cancelsystemApi.querymycoupon(this.qblist1).then(res => {
        console.log(res)
        this.list1.push(...res.data)
        console.log(this.list1)

        this.loading1 = false
        if (this.list1.length === 0) { // 判断获取数据条数若等于0
          this.list1 = [] // 清空数组
          this.finished1 = true // 停止加载
        }
        if (this.list1.length >= res.count) {
          this.finished1 = true // 结束加载状态
        }
        this.qblist1.page++
      })
    },
    onLoad2() {
      cancelsystemApi.querymycoupon(this.qblist2).then(res => {
        console.log(res)
        this.list2.push(...res.data)
        console.log(this.list2)

        this.loading2 = false
        if (this.list2.length === 0) { // 判断获取数据条数若等于0
          this.list2 = [] // 清空数组
          this.finished2 = true // 停止加载
        }
        if (this.list2.length >= res.count) {
          this.finished2 = true // 结束加载状态
        }
        this.qblist2.page++
      })
    },
    onLoad3() {
      cancelsystemApi.querymycoupon(this.qblist3).then(res => {
        console.log(res)
        this.list3.push(...res.data)
        console.log(this.list3)

        this.loading3 = false
        if (this.list3.length === 0) { // 判断获取数据条数若等于0
          this.list3 = [] // 清空数组
          this.finished3 = true // 停止加载
        }
        if (this.list3.length >= res.count) {
          this.finished3 = true // 结束加载状态
        }
        this.qblist3.page++
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-tabs__content{
  margin-top: 140px;
}
/deep/.van-sticky{
  position: fixed;
  top: 0;
  left:0;
  right:0;
  z-index: 2;
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
    opacity: .5;
  }
/deep/.van-tabs__line{
  background-color: #AD0EA2;
}
/deep/.van-tab--active{
  color: #AD0EA2;
}
  .shopText{
    position: absolute;
    left: 0;
    top:40px;
    padding: 5px 40px;
    font-size: 20px;
    background: #9b9b9b;
    color: white;
    border-top-right-radius:30px ;
    border-bottom-right-radius:30px ;
  }
  .color {
    background: linear-gradient(180deg,#a70b9c, #ce48c4);
  }

  .colorB {
    background: #9b9b9b;

  }
  .box {
    width: 100%;
    height: auto;
    background: #fff;
    overflow: scroll;
  }

  .shoplist {
    width: 90%;
    margin: 30px auto;
    padding: 40px 30px;
    background: #fff;
    border-radius: 30px;
    box-shadow: 1px 2px 24px 1px rgba(0, 0, 0, 0.03);
    position: relative;
  }

  .ljsy {
    font-size: 26px;
    width: 100%;
    color: #fff;
    background: linear-gradient(180deg,#a70b9c, #ce48c4);
    text-align: center;
    line-height: 70px;
    border-radius: 40px;
  }

  .price {
    color: #AD0EA2;
    font-size: 66px;
  }

  .gqprice {
    color: #9b9b9b;
    font-size: 50px;
    font-size: 66px;

  }

  .center {
    line-height: 50px;
    margin-left: 50px;
  }

  .title {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    /*不换行*/
    text-overflow: ellipsis;
    /*超出部分文字以...显示*/
    color: #242323;
  }

  .msg {
    color: #9b9b9b;
    font-size: 28px;
  }

  .time {
    font-size: 28px;
    color: #9b9b9b;
  }

  .ysy {
    font-size: 26px;
    width: 100%;
    height: 70px;
    color: #fff;
    background: #ccc;
    text-align: center;
    line-height: 70px;
    border-radius: 40px;
  }

  .moneyicon {
    font-size: 40px;
  }

  .coupon-icon {
    display: inline-block;
    width: 160px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: absolute;
    top: 30px;
    left: -1px;
    font-size: 25px;
    color: #fff;
    background: #f13f40;
    border-radius: 0 20px 20px 0;
  }

  .coupon-icon1 {
    display: inline-block;
    width: 160px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: absolute;
    top: 30px;
    left: -1px;
    font-size: 25px;
    color: #fff;
    background: #cccc;
    border-radius: 0 20px 20px 0;
  }
</style>

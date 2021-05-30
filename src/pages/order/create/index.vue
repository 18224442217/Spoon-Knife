<template>
  <div>
    <van-nav-bar
      title="提交订单"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div class="address">
      <div v-if="address.id"
           @click="isShowUserAddress = true">
        <p class="info">
          <span>{{ address.name }}</span>
          <span>{{ address.tel }}</span>
        </p>
        <p class="full__address">
          {{ address.address }}
        </p>
      </div>
      <p v-else
         class="remark"
         @click="$router.push({name:'address'})">暂无收货地址，请点击添加</p>
    </div>

    <div class="product__list">
      <van-card
        v-for="(item,index) in productList"
        :num="item.num"
        :price="item.cardPrice"
        :title="item.name"
        :key="index"
        :thumb="item.logo"
      />
    </div>

    <van-cell-group class="more">
      <van-cell title="快递配送"
                value="免运费" />
      <van-cell v-if="PriceData>=conditionsData"
                :value="(activityPrice?'- '+activityPrice.toString().slice(0, -2) + '.' + activityPrice.toString().slice(-2):0)+' 元'"
                title="折扣活动" />
      <!-- 优惠券单元格 -->
      <van-coupon-cell
        :coupons="couponList"
        :chosen-coupon="chosenCoupon"
        @click="isShowCouponList = true"
      />
    </van-cell-group>

    <!-- 优惠券列表 -->
    <van-popup
      v-model="isShowCouponList"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px;"
    >
      <van-coupon-list
        :show-exchange-bar="false"
        :coupons="couponList"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="setChosenCoupon"
      />
    </van-popup>

    <van-popup v-model="isShowUserAddress"
               :lazy-render="false"
               style="width:100%;height:100%">
      <user-address @closeAddressPopup="closeAddressPopup"/>
    </van-popup>

    <!-- <van-overlay :show="isShowLoading"
                 @click="isShowLoading = false">
      <van-loading type="spinner" />
    </van-overlay> -->

    <van-submit-bar :price="realPrice"
                    button-text="提交订单"
                    @submit="onSubmit" />

    <!-- 订单支付 -->
    <van-dialog v-model="isShowPayPopup"
                title="请选择支付方式"
                show-cancel-button
                @cancel="cancelPay"
                @confirm="confirmPay">
      <van-cell v-if="payConfig.WX_APP_PAY"
                title="微信"
                @click="payConfig.currentIndex = 'wxPay'">
        <template #icon>
          <img src="../../../assets/img/order/wxPayIcon.png"
               alt="">
        </template>
        <template #right-icon>
          <van-icon v-show="payConfig.currentIndex ==='wxPay'"
                    name="success"/>
        </template>
      </van-cell>
      <van-cell v-if="payConfig.ALI_APP_PAY"
                title="支付宝"
                @click="payConfig.currentIndex = 'aliPay'">
        <template #icon>
          <img src="../../../assets/img/order/aliPayIcon.png"
               alt="">
        </template>
        <template #right-icon>
          <van-icon v-show="payConfig.currentIndex ==='aliPay'"
                    name="success" />
        </template>
      </van-cell>
    </van-dialog>
  </div>
</template>

<script>
import orderApi from '@/api/orderApi'
import cache from '@/utils/cache'
import UserAddress from '@/pages/mine/address/index'

export default {
  components: {
    UserAddress
  },
  data() {
    return {
      PriceData: '',
      conditionsData: '',
      productList: [],

      totalPrice: 0, // 满减
      couponPrice: 0,

      couponList: [],
      chosenCoupon: -1,
      disabledCoupons: [],
      isShowCouponList: false,
      isShowUserAddress: false,
      isShowLoading: false,

      isShowPayPopup: false,
      payConfig: {
        ALI_APP_PAY: false,
        WX_APP_PAY: false,
        currentIndex: 'aliPay'
      },
      order: {}
    }
  },

  computed: {
    address() {
      return this.$store.getters.address
    },
    realPrice() {
      // 满减   活动折扣价格 选中优惠券

      let price
      // toolId值 2满折 3是满减
      // type值 1满金额减 2满数量减
      // this.productList && this.productList[0].activity &&
      const _this = this
      console.log(this.productList[0], '==========')
      const num = this.productList[0] && this.productList[0].num // 商品数量
      const Price = this.productList[0] && this.productList[0].cardPrice * num // 总价合计
      const quantity = this.productList[0].activity && this.productList[0].activity.quantity // 条件满足要减的金额
      const conditions = this.productList[0].activity && this.productList[0].activity.conditions // 满减金额为200

      _this.PriceData = Price
      _this.conditionsData = parseInt(conditions)
      console.log(Price, parseInt(conditions))
      if (this.productList[0].activity &&
      this.productList[0].activity.toolId == 2 &&
       Price >= parseInt(conditions)) {
        // price = this.totalPrice - this.activityPrice - (this.couponList[this.chosenCoupon]?.value || 0)
        // if (price <= 0) price = 1
        // return price
        const discount = (this.activityPrice ? this.activityPrice.toString().slice(0, -2) + '.' + this.activityPrice.toString().slice(-2) : 0) // 折扣价结果
        if (this.productList[0].activity.type == 1 &&
        Price >= parseInt(conditions)) {
          price = (Price - discount) * 100
          return price
        } else if (this.productList[0].activity.type == 2 &&
         num >= parseInt(conditions)) {
          price = (Price - discount) * 100
          return price
        } else {
          const cardPrice = this.productList.map(v => v.cardPrice)
          const num = this.productList.map(v => v.num)
          price = cardPrice * num * 100
          return price
        }
      } else if (this.productList[0].activity &&
      this.productList[0].activity.toolId == 3 &&
      Price >= parseInt(conditions)) {
        if (this.productList[0].activity.type == 1 &&
         Price >= parseInt(conditions)) {
          price = (Price - quantity) * 100
          return price
        } if (this.productList[0].activity.type == 2 &&
         num >= parseInt(conditions)) {
          price = (Price - quantity) * 100
          return price
        } else {
          const cardPrice = this.productList.map(v => v.cardPrice)
          const num = this.productList.map(v => v.num)
          price = cardPrice * num * 100
          return price
        }
      } else {
        const cardPrice = this.productList.map(v => v.cardPrice)
        const num = this.productList.map(v => v.num)
        price = cardPrice * num * 100
        return price
      }
      // else {
      //   const cardPrice = this.productList.map(v => v.cardPrice)
      //   const num = this.productList.map(v => v.num)
      //   price = cardPrice * num * 100
      //   console.log(this.productList, '==========444777')
      //   console.log(price, '--------')
      //   return price
      // }
    },
    // 获取活动折扣价格
    activityPrice() {
      const activitySet = {}
      let totalActivityPrice = 0
      // if (this.productList && this.productList[0].activity &&
      // this.productList[0].cardPrice * this.productList[0].num >= this.productList[0].activity.conditions) {}
      // 使用key来当唯一值，活动id相同的取唯一满减满折
      this.productList.forEach(v => {
        if (v.activityId) {
          activitySet[v.activityId]
            ? activitySet[v.activityId].push(v)
            : activitySet[v.activityId] = [v]
        }
      })
      // 获取有活动的商品折扣后总价
      for (const key in activitySet) {
        let temp = 0
        let totalPrice = 0
        const activeity = activitySet[key][0].activity // 因为每个活动都是一样的，直接取第一个
        let nums = 0
        // 获取list商品的总价和对应的满减或满折数值
        if (activeity.type === 1) {
          activitySet[key].forEach(v => {
            temp += (v.paramPrice * v.num)
            totalPrice += (v.paramPrice * v.num)
            nums += v.num
          })
        } else if (activeity.type === 2) {
          activitySet[key].forEach(v => {
            temp += v.num
            nums += v.num
            totalPrice += (v.paramPrice * v.num)
          })
        }
        // 根据满减/瞒折类型进行处理
        if (activeity.toolId === '2' && activeity.conditions <= temp) {
          totalActivityPrice += totalPrice * ((10 - activeity.quantity) / 10)
        } else if (activeity.toolId === '3' && activeity.conditions <= temp) {
          totalActivityPrice += activeity.quantity * 100
        }
        // 计算单个商品的折扣价格
        const singleActivityPrice = (totalActivityPrice / nums)
        activitySet[key].forEach(v => (v.activityPrice = singleActivityPrice * v.num))
      }
      console.log(totalActivityPrice, '==========55555')
      return totalActivityPrice
    }

  },
  mounted() {
    this.productList = JSON.parse(sessionStorage.getItem('orderProductInfo'))
      .map(v => {
        v.paramPrice = Math.round(v.paramPrice)
        this.totalPrice += v.paramPrice * v.num

        if (v.paramPrice < 100) {
          v.cardPrice = '0' + v.paramPrice
        } else {
          v.cardPrice = '' + v.paramPrice
        }
        v.cardPrice = v.cardPrice.slice(0, -2) + '.' + v.cardPrice.slice(-2)
        return v
      })
    this.queryCoupon()
    this.queryMerchantPayment()
    // console.log(this.productList[0].cardPrice, '单价')
    // console.log(this.productList[0].num, '数量')
    // console.log(this.productList[0].activity, '购买----------')
  },

  methods: {
    // 用户切换地址
    closeAddressPopup(val) {
      this.isShowUserAddress = false
    },
    // 提交订单
    onSubmit() {
      const { id, addressDetail, name, tel, areaCode, address } = this.address
      if (!id) {
        this.$toast(
          '请先填写地址！'
        )
        return
      }
      const ymBOrder = {
        userId: cache.getCookie('userId'),
        freight: '0.00',
        merchantId: this.productList.map(v => v.merchantId).join(','),
        price: this.totalPrice / 100,
        realPrice: (this.realPrice / 100).toFixed(2),
        userDetail: `${name},${tel}`,
        sendDetail: addressDetail,
        provinceName: address,
        provinceCode: areaCode,
        couponId: this.couponList[this.chosenCoupon]?.id || ''
      }
      const orderProductVOS = this.productList.map(v => {
        const data = {
          paramPrice: v.paramPrice / 100,
          productId: v.productId,
          paramId: v.paramId,
          paramName: v.paramName,
          num: v.num
        }
        if (v.activityId) data.activityId = v.activityId
        return data
      })
      const data = {
        ymBOrder,
        orderProductVOS
      }
      this.isShowLoading = true
      orderApi.createOrder(data)
        .then(res => {
          return orderApi.getOrders(`page=1&pageNum=10&orderNo=${res}`)
        })
        .then((res) => {
          this.order = res.data[0]
          this.isShowPayPopup = true
        })
        .catch(() => {
          this.isShowLoading = false
        })
    },

    // 请求商家支付配置
    queryMerchantPayment() {
      const data = {
        page: 1,
        pageNum: 20,
        mchId: this.productList[0]?.merchantId
      }
      orderApi.queryPayment(data)
        .then(res => {
          res.data.forEach(v => {
            this.payConfig[v.payType] = true
          })
          this.payConfig.currentIndex = this.payConfig.ALI_APP_PAY ? 'aliPay' : 'wxPay'
        })
    },
    // 设置选中的优惠券
    setChosenCoupon(index) {
      this.chosenCoupon = index
      this.isShowCouponList = false
    },
    // 请求优惠券
    queryCoupon() {
      const data = {
        merchantId: this.productList[0]?.merchantId,
        productIds: this.productList.map(v => (v.productId)),
        userId: cache.getCookie('userId')
      }
      orderApi.queryCoupon(data)
        .then(res => {
          const list = res.filter(v => v.status === '1')
          // 优惠券列表
          list.forEach(v => {
            const data = {
              id: v.userCouponId,
              name: v.name,
              startAt: new Date(v.beginTime).getTime() / 1000,
              endAt: new Date(v.endTime).getTime() / 1000,
              value: v.decrease * 100
            }
            const productList = this.productList.filter(item => item.productId === v.productId)
            const totalPrice = productList.reduce((pre, cur) => (pre += (cur.paramPrice - cur.activityPrice)), 0)
            switch (v.type) {
              case '1':
                data.condition = `满${v.full}元减${v.decrease}`
                data.valueDesc = '满减券'
                if (totalPrice >= v.full * 100) {
                  this.couponList.push(data)
                } else {
                  data.reason = '价格不满足'
                  this.disabledCoupons.push(data)
                }
                break
              case '2' :
                data.condition = `立减${v.decrease}元`
                data.valueDesc = '立减券'
                this.couponList.push(data)
                break
              case '3':
                data.valueDesc = '关注券'
                data.condition = `满${v.full}元减${v.decrease}`
                if (v.scope === 1) {
                  // 全店可用
                } else {
                  // 指定商品满减券
                  if (totalPrice >= v.full * 100) {
                    this.couponList.push(data)
                  } else {
                    data.reason = '价格不满足'
                    this.disabledCoupons.push(data)
                  }
                }
                break
            }
          })
        })
    },
    confirmPay() {
      this[this.payConfig.currentIndex]()
    },
    cancelPay() {
      this.isShowLoading = false
    },
    aliPay() {
      const ua = navigator.userAgent
      const isWeixin = ua.toLowerCase().indexOf('micromessenger') !== -1
      const data = {
        payType: 'ALI_APP_PAY',
        orderNo: this.order.orderNo,
        amount: this.order.realPrice
      }
      if (isWeixin) {
        this.$toast('请长按网址复制链接后使用浏览器访问并完成支付')
        setTimeout(() => {
          orderApi.createH5Pay(data)
            .then(res => {
              const div = document.createElement('div')
              div.id = 'alipay'
              div.innerHTML = res.payParams
              console.log(res.payParams)
              document.body.appendChild(div)
              document.querySelector('#alipay').children[0].submit()
            })
        }, 1000)
      } else {
        orderApi.createH5Pay(data)
          .then(res => {
            const div = document.createElement('div')
            div.id = 'alipay'
            div.innerHTML = res.payParams
            console.log(res.payParams)
            document.body.appendChild(div)
            document.querySelector('#alipay').children[0].submit()
          })
      }
    },
    wxPay() {
      const data = {
        payType: 'WX_APP_PAY',
        orderNo: this.order.orderNo,
        amount: this.order.realPrice
      }
      console.log(data)
      orderApi.createH5Pay(data)
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.address{
  background: #fff;
  padding: 40px;
  margin-top: 20px;
  .info{
    font-size: 36px;
    padding:20px 0;
    font-weight: bold;
  }
  .remark{
    font-size: 36px;
    text-align: center;
    color: #999;
  }
}

.product__list{
  margin: 40px 0;
  .van-card{
    background: #fff;
  }
}

/deep/ .van-card__content{
  padding: 20px 0;
  .van-card__title{
    font-size: 38px;
    line-height:normal;
    max-height: none;
  }
  .van-card__price{
    color: #FA4B3B;
  }
  .van-card__num{
      color: #333333;
  }
}
/deep/ .van-coupon__amount{
  font-size: 42px;
}

.van-overlay{
  z-index: 200;
  display:flex;
  justify-content:center;
  align-items:center;
}

.van-dialog{
  img{
    width: 60px;
    height: 60px;
    margin-right:20px;
  }
  .van-icon{
    font-size: 52px;
    color: #FA4B3B;
    padding-top: 4px;
  }
}
</style>


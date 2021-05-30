<template>
  <div class="container">
    <div class="title">
      <van-nav-bar
        title="订单详情"
        left-text="返回"
        left-arrow
        @click-left="onBack"
      />
    </div>

    <div class="content">
      <!-- 已取消 -->
      <div v-if="order.status === 0">
        <div class="order-status-logo">
          <van-image width="80"
                     height="80"
                     src="../../../static/images/cancel.png"/>
        </div>
        <div class="order-status-label">
          <span>交易取消</span>
        </div>
        <van-divider
          :hairline="false"
          :style="{ padding: '0', margin: '0' }"/>
        <div class="order-desc">
          您的订单<span class="cancel">【已取消】</span>，期待下次再为您服务。
        </div>
        <div class="order-time">
          {{ order.doneTime }}
        </div>
      </div>
      <!-- 待付款 -->
      <div v-else-if="order.status === 1">
        <div class="order-status-logo">
          <van-image width="80"
                     height="80"
                     src="../../../static/images/waitpay.png"/>
        </div>
        <div class="order-status-label">
          <span>等待付款</span>
        </div>
        <div class="pay-time">
          <span>支付剩余时间：</span>
          <van-count-down :time="time"
                          format="mm分ss秒"
                          @finish="finishCountDown"/>
        </div>
        <div class="pay-price">
          <div>
            <span>需付款：</span>
            <span class="real">￥{{ order.realPrice }}</span>
          </div>
          <div>
            <van-button type="warning"
                        round
                        size="mini">去支付
            </van-button>
          </div>
        </div>
      </div>
      <!-- 待发货 -->
      <div v-else-if="order.status === 2">
        <div class="order-status-logo">
          <van-image width="80"
                     height="80"
                     src="../../../static/images/wait.png"/>
        </div>
        <div class="order-status-label">
          <span>等待发货</span>
        </div>
        <van-divider
          :hairline="false"
          :style="{ padding: '0', margin: '0' }"/>
        <div class="order-desc">
          您的订单<span class="other">【等待发货】</span>，请耐心等待。
        </div>
        <div class="order-time">
          {{ order.doneTime }}
        </div>
      </div>
      <!-- 待收货 -->
      <div v-else-if="order.status === 3">
        <div class="order-status-logo">
          <van-image width="80"
                     height="80"
                     src="../../../static/images/wait.png"/>
        </div>
        <div class="order-status-label">
          <span>等待收货</span>
        </div>
        <van-divider
          :hairline="false"
          :style="{ padding: '0', margin: '0' }"/>
        <div class="order-desc">
          您的订单<span class="other">【等待收货】</span>，请耐心等待。
        </div>
        <div class="order-time">
          {{ order.doneTime }}
        </div>
      </div>
      <!-- 已完成 -->
      <div v-else-if="order.status === 4">
        <div class="order-status-logo">
          <van-image width="80"
                     height="80"
                     src="../../../static/images/complete.png"/>
        </div>
        <div class="order-status-label">
          <span>已完成</span>
        </div>
        <van-divider
          :hairline="false"
          :style="{ padding: '0', height: '3px' }"/>
        <div class="order-desc">
          您的订单<span class="other">【已完成】</span>，期待下次再为您服务。
        </div>
        <div class="order-time">
          {{ order.doneTime }}
        </div>
      </div>

      <div class="userinfo">
        <div>
          <div class="detail">{{ order.userDetail }}</div>
          <div class="address">{{ order.provinceName + order.sendDetail }}</div>
        </div>
      </div>

      <div class="deliver"/>
      <div class="product-container">
        <div class="header">
          <van-image :src="order.merchantLogo"
                     width="30"
                     height="30"
                     round
                     fit="cover"/>
          <div class="shop-name"><span>{{ order.merchantName }}</span></div>
        </div>
        <van-divider
          :hairline="false"
          :style="{ padding: '0', margin: '0' }"/>
        <div>
          <div v-for="(product, index) in order.orderProducts"
               :key="index"
               class="item">
            <div class="info">
              <div>
                <van-image :src="product.imgUrl"
                           width="80"
                           height="80"
                           fit="cover"
                           radius="5px"/>
              </div>
              <div class="param">
                <div>
                  <div class="product-name">{{ product.productName }}</div>
                  <div class="param-name">{{ product.paramName }}</div>
                </div>
                <div class="price">
                  ￥{{ product.paramPrice }}
                </div>
              </div>
            </div>
            <div class="btn-box1">
              <van-button plain
                          type="warning"
                          round
                          size="mini"
                          @click="joinShoppingCart(index)"
              >加入购物车
              </van-button>
            </div>
            <van-divider
              :hairline="false"
              :style="{ padding: '0', margin: '0' }"/>
          </div>
          <div class="deliver"/>
          <div class="contact-box"
               style="">
            <a :href="'tel:'+ cusTelNo"><span>联系客服</span></a>
          </div>
          <div class="deliver"/>

          <div class="order-info">
            <div class="item">
              <div>订单编号：</div>
              <div>{{ order.orderNo }}</div>
            </div>
            <div class="item">
              <div>下单时间：</div>
              <div>{{ order.createTime }}</div>
            </div>
            <div class="item">
              <div>支付方式：</div>
              <div>{{ order.payName === '' ? '未支付' : order.payName }}</div>
            </div>
            <div class="item">
              <div>支付时间：</div>
              <div>{{ order.payedTime }}</div>
            </div>
            <div class="item">
              <div>配送方式：</div>
              <div>{{ order.logisticWayName }}</div>
            </div>
            <div class="item">
              <div>商品总额：</div>
              <div>￥{{ order.price }}</div>
            </div>
            <div class="item">
              <div>运费：</div>
              <div>{{ order.freight === 0 ? '免运费' : order.freight }}</div>
            </div>
            <div class="item">
              <div>优惠：</div>
              <div>￥{{ order.couponWay === '' ? '0.00' : order.conponWay }}</div>
            </div>
            <div class="item price">
              <div>实付款：</div>
              <div>￥{{ order.realPrice }}</div>
            </div>
          </div>

        </div>

      </div>

      <!-- 底部操作栏 -->
      <div class="footer">
        <!-- 已取消 -->
        <div v-if="order.status === 0">
          <van-button plain
                      type="default"
                      round
                      size="small"
                      @click="deleteOrder"
          >删除订单
          </van-button>
        </div>
        <div v-if="order.status === 1">
          <van-button plain
                      type="default"
                      round
                      size="small"
                      @click="cancelOrder"
          >取消订单
          </van-button>
          <van-button plain
                      type="danger"
                      round
                      size="small"
                      @click="pay"
          >去支付
          </van-button>
        </div>
        <!--        <div v-if="order.status === 2">-->
        <!--          <van-button plain-->
        <!--                      type="default"-->
        <!--                      round-->
        <!--                      size="mini"-->
        <!--                      @click="logistics"-->
        <!--          >查看物流-->
        <!--          </van-button>-->
        <!--        </div>-->
        <div v-if="order.status === 3 || order.status === 4">
          <van-button plain
                      type="default"
                      round
                      size="small"
                      @click="logistics"
          >查看物流
          </van-button>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import orderApi from '@/api/orderApi'
import mineApi from '@/api/mineApi'
import cache from '@/utils/cache'
import shipping from '@/utils/shipping'
import { Dialog } from 'vant'

export default {
  name: 'Detail',
  data() {
    return {
      order: {},
      orderId: '',
      time: 0,
      cusTelNo: ''
    }
  },
  mounted() {
    this.orderId = this.$route.query.orderId
    this.loadOrder()
    this.getMinePage()
  },
  methods: {
    onBack() {
      this.$router.go(-1)
    },
    loadOrder() {
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      orderApi.getOrderDetail(this.orderId).then(res => {
        this.order = res
        if (res.logisticWay !== '') {
          for (let i = 0; i < shipping.length; i++) {
            const item = shipping[i]
            if (item.value === res.logisticWay) {
              this.order.logisticWayName = item.label
              break
            }
          }
        }
        if (res.status === 1) {
          const doneTime = new Date(res.doneTime)
          this.time = doneTime - new Date()
          console.log(this.time)
        }
        toast.clear()
      })
    },
    // 获取客服电话
    getMinePage() {
      mineApi.getPageInfo().then(res => {
        this.cusTelNo = res.cusTelNo
      })
    },
    // 取消订单
    cancelOrder() {
      Dialog.confirm({
        title: '取消订单',
        message: '确定取消该订单？'
      })
        .then(() => {
          const toast = this.$toast.loading({
            duration: 0,
            forbidClick: true,
            message: '取消中'
          })
          orderApi.cancelOrder(this.orderId).then(res => {
            this.$router.go(-1)
            toast.clear()
          })
        })
        .catch(() => {

        })
    },
    // 删除订单
    deleteOrder() {
      Dialog.confirm({
        title: '删除订单',
        message: '确定删除该订单？'
      })
        .then(() => {
          const toast = this.$toast.loading({
            duration: 0,
            forbidClick: true,
            message: '删除中'
          })
          orderApi.deleteOrder(this.orderId).then(res => {
            toast.clear()
            this.$router.go(-1)
          })
        })
        .catch(() => {

        })
    },
    // 去支付
    pay() {
      // this.$toast.loading({
      //   message: '去支付...',
      //   forbidClick: true
      // })
      this.$router.push({ name: 'orderPay', query: { orderNo: this.order.orderNo }})
    },
    // 查看物流
    logistics() {
      this.$router.push({
        path: '/order/logistics',
        query: {
          orderId: this.orderId
        }
      })
    },
    // 加入购物车
    joinShoppingCart(index) {
      console.log(index)
      const product = this.order.orderProducts[index]
      console.log(product)
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '添加中'
      })
      orderApi.joinShoppingCart({
        merchantId: product.merchantId,
        userId: cache.getCookie('userId'),
        productId: product.productId,
        productNum: 1,
        productParamId: product.paramId
      }).then(res => {
        toast.clear()
        this.$toast.success('已添加成功')
      })
    },
    // 倒计时完成
    finishCountDown() {
      this.loadOrder()
    }
  }
}
</script>

<style scoped>

.title {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 9999;
}

.content {
  padding-top: 120px;
}

.container {
  background-color: #ffffff;
}

.order-status-logo {
  text-align: center;
  padding: 20px 0;
}

.order-status-label {
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  padding-bottom: 30px;
}

.order-desc {
  padding: 20px 25px;
  font-size: 34px;
}

.order-desc .cancel {
  color: #999999;
}

.order-desc .other {
  color: #f9e972;
}

.order-time {
  padding: 8px 25px;
  font-size: 34px;
}

.userinfo {
  padding: 15px;
  font-size: 34px;
}

.userinfo > div {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 25px 15px;
}

.userinfo .detail {
  font-size: 34px;
}

.userinfo .address {
  color: #333;
  padding-top: 10px;
}

.deliver {
  height: 10px;
  background-color: #f9f9f9;
}

.product-container .header {
  display: flex;
  padding: 14px 15px;
}

.product-container .header .shop-name {
  padding-left: 20px;
  font-size: 35px;
  font-weight: bold;
  margin: auto 0;
}

.product-container .item {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}

.product-container .item .info {
  display: flex;
}

.product-container .item .info .param {
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
}

.param .product-name {
  font-weight: 500;
  font-size: 32px;
}

.param .param-name {
  font-size: 32px;
  padding-top: 25px;
}

.param .price {
  color: red;
  font-size: 38px;
  margin-bottom: 10px;
}

.btn-box1 {
  text-align: right;
  padding-bottom: 20px;
}

.contact-box {
  text-align: center;
  padding: 25px;
  font-size: 36px;
}

.contact-box a {
  color: #b7b7b7;
}

.order-info {
  color: #b7b7b7;
  font-size: 38px;
  padding-bottom: 140px;
  padding-top: 30px;
}

.order-info .item {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
}

.order-info .item.price {
  color: black;
  font-size: 50px;
}

.pay-time {
  text-align: center;
  display: flex;
  justify-content: center;
}

.pay-time * {
  margin: auto 0;
  font-size: 14px;
}

.pay-price {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.pay-price .real {
  color: red;
  font-size: 30px;
}

.footer {
  width: 100%;
  padding: 15px 20px;
  position: fixed;
  bottom: 0;
  text-align: right;
  background-color: white;
  font-size: 14px;
}

.footer button {
  width: 180px;
}

</style>

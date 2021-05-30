<template>
  <div>
    <van-empty
      :description="'订单需支付 '+order.ymBOrder.realPrice+' 元' "
    />

    <van-cell :is-link="true"
              title="微信支付"
              @click="wxPay"
    />
    <van-cell :is-link="true"
              title="支付宝支付"
              @click="aliPay"/>
  </div>
</template>

<script>
import orderApi from '@/api/orderApi'
export default {
  data() {
    return {
      order: {
        ymBOrder: {}
      }
    }
  },
  mounted() {
    this.queryOrder({ orderNo: this.$route.query.orderNo })
  },
  methods: {
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
    },
    queryOrder(params) {
      orderApi.getOrders(`page=1&pageNum=10&orderNo=${params.orderNo}`)
        .then(res => {
          this.order = res.data[0]
        })
    }
  }
}
</script>

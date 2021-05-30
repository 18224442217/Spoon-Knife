import Request from '@/utils/request'

const Service = {

  // 提交订单
  createOrder(data = {}) {
    return Request.post('/ydmall-order/ymBOrder', data)
  },
  // 获取订单
  getOrders(data) {
    return Request({
      url: '/ydmall-order/ymBOrder/queryAll?' + data,
      method: 'get',
      data
    })
  },
  // 删除订单
  deleteOrder(orderId) {
    return Request({
      url: '/ydmall-order/ymBOrder/del/' + orderId,
      headers: {
        client_id: 'webApp',
        client_secret: 'webApp'
      },
      method: 'get'
    })
  },
  // 获取订单详情
  getOrderDetail(orderId) {
    return Request({
      url: '/ydmall-order/ymBOrder/queryAllById/' + orderId,
      headers: {
        client_id: 'webApp',
        client_secret: 'webApp'
      },
      method: 'get'
    })
  },
  // 取消订单
  cancelOrder(orderId) {
    return Request({
      url: '/ydmall-order/ymBOrder/put/',
      method: 'post',
      data: {
        orderId: orderId,
        status: 0
      }
    })
  },
  // 添加购物车
  // /ydmall-user/ymBUserShoppingCart
  joinShoppingCart(data = {}) {
    return Request({
      url: '/ydmall-user/ymBUserShoppingCart',
      method: 'post',
      data
    })
  },
  // 查看物流信息
  queryLogistics(data = {}) {
    console.log(data)
    return Request({
      url: '/message/express/queryExpressDataByOrder',
      method: 'post',
      data
    })
  },
  // 查询订单的可用优惠券
  queryCoupon(data = {}) {
    return Request.post('/user-coupon/ymBCoupon/findCouponByMerchantId', data)
  },
  // 创建支付
  createH5Pay(data = {}) {
    return Request.post('/ydmall-payment/pay/h5Pay', data)
  },
  // 获取订单详情
  queryOrderDetails(params = {}) {
    return Request.get(`/ydmall-order/ymBOrder/${params.orderId}`)
  },
  // 查询支付配置
  // mch_pay_config/query
  queryPayment(params) {
    return Request.get(`/ydmall-payment/mch_pay_config/query`, { params })
  }
}

export default Service

import Request from '@/utils/request'
const Service = {
  // 分享接口
  shareData() {
    return Request.get('/ydrest/weichat/share')
  },
  // 查询是否为商户
  querysuer() {
    return Request.get('/merchant-user/ymBMerchantUser/isMerchant')
  },
  // 普通用户登录查询是否为商户
  querysuerB() {
    return Request.get('/merchant-user/ymBMerchantUser/isMerchantForOrdinary')
  },
  // 查询商家核销数量
  querynum() {
    return Request.get('/user-coupon/ymBrCouponConvertRecord/queryCount')
  },
  // 核销优惠券
  cancelcoupon(params = {}) {
    return Request.get('/user-coupon/ymBrUserMerchantCoupon/convert', { params })
  },
  // 核销记录
  cancelhistory(params = {}) {
    return Request.get('/user-coupon/ymBrCouponConvertRecord/queryConvertRecordByCoupon', { params })
  },
  // 查询我的优惠券
  querymycoupon(params = {}) {
    return Request.get('/user-coupon/ymBrUserMerchantCoupon/queryByUserId', { params })
  },
  // 查询优惠券详情
  querycouponinfo(params = {}) {
    return Request.get(`/user-coupon/ymBMerchantCoupon/${params}`)
  },
  // 获取二维码
  qrcode(params = {}) {
    return Request.get(`/ymBrUserMerchantCoupon/createImg/${params}`)
  },
  // 查询商家累计发券数量以及核销数量
  queryhxnum() {
    return Request.get(`/user-coupon/ymBMerchantCoupon/queryMerchantCouponCount`)
  },
  // 查询优惠券发放记录
  queryconponlist(params = {}) {
    return Request.get(`/user-coupon/ymBrUserMerchantCoupon/queryCouponIssuanceRecord`, { params })
  },
  // 查询优惠券发放记录单条数据
  querycouponone(params = {}) {
    return Request.get(`/user-coupon/ymBrUserMerchantCoupon/queryCouponIssuanceRecordById`, { params })
  },
  // 上架下架
  addOrSubtractApply(data) {
    return Request.post(`/user-coupon/ymBMerchantCoupon/addOrSubtractApply`, data)
  }
}
export default Service

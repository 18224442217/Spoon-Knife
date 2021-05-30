import Request from '@/utils/request'
const Service = {
  queryNearMerchantById(data) {
    return Request.post('/user-coupon/ymBMerchantCoupon/queryNearMerchantById', data)
  },
  // 查询附件店铺
  queryshoplist(params = {}) {
    return Request.get('/user-coupon/ymBMerchantCoupon/queryNearMerchant', { params })
  },
  // 查询店铺下面的优惠券
  querycouponlist(params = {}) {
    return Request.get('/user-coupon/ymBMerchantCoupon/queryCoupon', { params })
  },
  // 领取优惠券
  getcoupon(params) {
    return Request.get(`/user-coupon/ymBrUserMerchantCoupon/receiveByH5/${params.couponId}`)
  },
  // 查询店铺底商优惠券列表
  queryCouponByMerchant(params) {
    return Request.get(`/user-coupon/ymBMerchantCoupon/query`, { params })
  },
  // 新增底商优惠券
  addmerchantCoupon(data) {
    return Request.post('/user-coupon/ymBMerchantCoupon/save', data)
  },
  // 删除底商优惠券
  removeMerchantCoupon(data) {
    return Request.post(`/user-coupon/ymBMerchantCoupon/delete/${data.id}`)
  },
  // 更新底商优惠券
  updateMerchantCoupon(data) {
    return Request.post(`/user-coupon/ymBMerchantCoupon/update`, data)
  }
}
export default Service

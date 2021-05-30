import Request from '@/utils/request'

const Service = {
  // 查询广告
  queryAdvert(data = {}) {
    return Request.post('/platform-manager/ymPlatformAdvert/queryAdvert', data)
  },

  // 请求橱窗列表
  queryBusinessType(params = {}) {
    return Request.get('/ydmall-product/ymBBusinessClass/businessType', { params })
  },
  // 首页橱窗信息
  queryHomeWindowInfo(params = {}) {
    return Request.get('/platform-manager/ymPlatformWindow/queryNewWindow', { params })
  },
  // 检查是否移动用户
  checkIsYD(params = {}) {
    return Request.get('/ydmall-user/user/isCMCC')
  },
  queryAnnouncement(data) {
    return Request.post('/platform-manager/ymBnotice/page', data)
  },
  queryAnnouncementType(data) {
    return Request.post('/platform-manager/ymBnotice/typeList', data)
  },
  // 查询附近商家
  queryNearbyMerchant(data) {
    return Request.post('/merchant-user/merchant/nearbyMerchantPage', data)
  }

}

export default Service

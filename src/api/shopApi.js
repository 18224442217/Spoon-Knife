import Request from '@/utils/request'

const Service = {
  /**
   * @description 查询店铺信息的接口
   * @param {type} data:传入的请求
   * @funName shopInfomation
   * @date 20201128
   */
  shopInfomation(data = {}) {
    return Request({
      url: '/merchant-user/ymBMerchantBaseInfo/merchantDetail/' + data.merchantId,
      method: 'get',
      data
    })
  },
  /**
   * @description 查询店铺的商品的列表
   * @date 20201128
   * @funName shopGoodsFilter
   * */
  shopGoodsFilter(data = {}) {
    return Request({
      url: '/ydmall-search/esProduct/query?merchantId=' + data.merchantId + '&sort=' + data.sort + '&pageSize=' + data.pageSize + '&pageNum=' + data.pageNum + '&type=1',
      method: 'get',
      data
    })
  },
  /**
   * @description 查询店铺的活动的列表
   * @date 20201128
   * @funName activityList
   * */
  activityList(data = {}) {
    return Request({
      url: '/ydmall-product/ymBProduct/activityList?merchantId=' + data.merchantId + '&page=1&size=20',
      method: 'get',
      data
    })
  },
  /**
   * @description 关注/取消关注店铺
   * @date 20201128
   * @funName focusShop
   * */
  focusShop(data = {}) {
    return Request({
      url: '/merchant-user/ymBMerchantFocus/focusPut',
      method: 'post',
      data
    })
  },
  /**
   * @desc 橱窗分类的查询
   * @date 20201207
   * @funName windowCategory
   * */
  windowCategory(data) {
    return Request({
      url: '/platform-manager/ymBrWindowProductClassific/queryWindowClassific',
      method: 'post',
      data
    })
  },
  /**
 * @description 查询店铺的活动的列表
 * @date 20201128
 * @funName getWindowGoodsList
 * */
  getWindowGoodsList(data = {}) {
    return Request({
      url: '/ydmall-search/esProduct/queryWindow?pageSize=' + data.pageSize + '&sort=' + data.sort + '&pageNum=' + data.pageNum + '&categoryId=' + data.categoryId + '&windowId=' + data.windowId,
      method: 'get',
      data
    })
  },

  // 查询商家信息
  // /merchant-user/merchant/info
  getMerchantInfo(data) {
    return Request.post('/merchant-user/merchant/info', data)
  }
}

export default Service

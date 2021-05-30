import Request from '@/utils/request'

const Service = {
  /**
     * @description 查询商品的已经的分类
     * @date 20201124
     * @funName getSecondCategry
     * */
  allCategory(data = {}) {
    return Request({
      url: '/ydmall-product/ymBProductClassification/categories?fatherId=0&classType=1&status=1',
      method: 'get',
      data
    })
  },
  queryCategory(params = {}) {
    return Request.get('/ydmall-product/ymBProductClassification/secondCategories', { params })
  },
  queryFinancialCategory(data) {
    return Request.post('/ydmall-product/financialdata/categories', data)
  },
  queryFinancialSecondCategory(data) {
    return Request.post('/ydmall-product/financialdata/secondCategories', data)
  },
  /**
     * @description 获取2级分类的商品的接口
     * @date 20201125
     * @funName getSecondCategry
     */
  getSecondCategry(data = {}) {
    return Request({
      url: '/ydmall-product/ymBProductClassification/secondCategories?fatherId=' + data.fatherId,
      method: 'get',
      data
    })
  },
  /**
     * @description 获取推荐分类的接口
     * @date 20201125
     * @funName hotCategry
     */
  hotCategry(data = {}) {
    return Request({
      url: '/ydmall-product/ymSHotClass/hot',
      method: 'get',
      data
    })
  },
  /**
     * @description 获取推荐分类的接口
     * @date 20201125
     * @funName getIdCategroy
     */
  getIdCategroy(data = {}) {
    return Request({
      url: '/ydmall-product/ymBProductClassification/categories?fatherId=' + data.classificationId,
      method: 'get',
      data
    })
  },
  /**
   * @description 查询广告
   * @date 20201125
   * @funName getIdCategroy
   */
  queryAdvert(data = {}) {
    return Request.post('/platform-manager/ymPlatformAdvert/queryAdvert', data)
  }
}

export default Service

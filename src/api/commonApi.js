import Request from '@/utils/request'

const Service = {

  /**
     * 推荐商品
     *
     * @param page
     * @param size
     * @param type       1首页普通推荐，2购物车底部推荐 3店铺推荐 4详情推荐 5物流推荐 6 订单推荐 7 商户精选 9扶贫专区
     * @param categoryId 选填：首页的第一个tab不传  首页其他的传首页分类返回的 classificationId值
     * @param callback
     * @param classType
     */
  queryRecommendProduct(params = {}) {
    return Request.get('/ydmall-product/ymSRecommendProduct/query', { params })
  },

  // 获取用户信息
  userInfo(data = {}) {
    return Request.get(`/api-auth/oauth/current_user`)
  },

  // sm4加密
  async sm4(params = {}) {
    return await Request.get('ydmall-user/encrypt/getEncrypt', { params })
  }
}

export default Service

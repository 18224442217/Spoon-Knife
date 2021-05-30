import Request from '@/utils/request'
const Service = {
  // 查询分类
  queryclassifylist(params = {}) {
    return Request.get('/ydmall-product/ymBProductClassification/categories', { params })
  },
  // 推荐商品
  querycommoditylist(params = {}) {
    return Request.get('/ydmall-product/ymSRecommendProduct/query', { params })
  },
  // 分类下商品
  queryproductlist(params = {}) {
    return Request.get('/ydmall-product/ymSSectionProduct/query', { params })
  },
  test(params) {
    return Request.get('/ydmall-product/ymSRecommendProduct/queryPlatform', { params })
  }
}
export default Service

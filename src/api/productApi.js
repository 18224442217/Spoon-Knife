import Request from '@/utils/request'

const Service = {
  // 获取商品详情
  queryProductDetails(params = {}) {
    return Request.get(`/ydmall-product/ymBProduct/${params.id}`)
  },
  // 将商品添加到购物车
  addToShoppingCart(data = {}) {
    return Request.post('/ydmall-user/ymBUserShoppingCart', data)
  }
}

export default Service

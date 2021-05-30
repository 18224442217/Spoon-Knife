import Request from '@/utils/request'

const Service = {
  /**
     * @description 查询购物车列表的接口
     * @param {type} data:传入的请求
     * @funName shopCartsList
     * @date 20201124
    */
  shopCartsList(data = {}) {
    return Request({
      url: '/ydmall-user/ymBUserShoppingCart/getShoppingCart?userId=' + data.userId,
      method: 'get',
      data
    })
  },
  /**
     * @description 查询推荐商品列表的接口
     * @param {type} data:传入的请求
     * @funName shopCartsList
     * @date 20201124
    */
  recommondGoods(data = {}) {
    return Request({
      url: '/ydmall-product/ymSRecommendProduct/query?type=2&page=' + data.page + '&size=' + data.size,
      method: 'get',
      data
    })
  },
  /**
     * @description 查询推荐商品列表的接口
     * @param {type} data:传入的请求
     * @funName shopCartsList
     * @date 20201124
    */
  deleteCart(data = {}) {
    return Request({
      url: '/ydmall-user/ymBUserShoppingCart/del',
      method: 'post',
      data
    })
  },
  getAddress(data) {
    return Request({
      url: '/ydmall-user/addr/' + data + '/addrs',
      headers: {
        client_id: 'webApp',
        client_secret: 'webApp'
      },
      method: 'get'
    })
  }
}

export default Service

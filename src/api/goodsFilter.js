import Request from '@/utils/request'

const Service = {
  /**
   * @description 查询商品的已经的分类
   * @date 20201124
   * @funName getSecondCategry
   * */
  goodsFilter(data = {}) {
    return Request({
      url: '/ydmall-search/esProduct/query?highPrice=' + data.highPrice + '&lowPrice=' + data.lowPrice + '&categoryId=' + data.categoryId + '&sort=' + data.sort + '&pageSize=' + data.pageSize + '&pageNum=' + data.pageNum + '&type=1',
      method: 'get',
      data
    })
  }

}

export default Service

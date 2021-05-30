<template>
  <div>
    <van-nav-bar
      title=""
      left-text="返回"
      left-arrow
      @click-left="onBack"
    />
    <van-tabs @change="tabChange">
      <van-tab v-for="item in cartegory"
               :title="item.title"
               :key="item.status">
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="getGoodsList"
        >
          <!--商品列表的视图部分-->
          <div class="rowBox">
            <div v-for="(items, i) in item.goodsListData"
                 :key="i"
                 class="boxs"
                 @click="jumperDetail(items)">
              <div class="imgsD">
                <van-image :src="items.imgLogo"
                           width="100"
                           height="100" />
              </div>
              <div class="gnameBox">{{ items.name }}</div>
              <div class="priceBox">￥{{ items.priceExhibition }}</div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import windowShopApi from '@/api/shopApi'
export default {
  name: 'Index',
  data() {
    return {
      index: 0,
      tabList: [],
      cartegory: [],
      windowId: ''
    }
  },
  mounted() {
    const windowId = this.$route.query.windowId
    this.windowId = windowId
    this.windowCatgory()
    this.addEventListennerScroll()
  },
  methods: {
    addEventListennerScroll() {
      const that = this
      window.onscroll = function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        // 滚动条到底部的条件
        if (scrollTop + windowHeight === scrollHeight) {
          that.getGoodsList()
        }
      }
    },
    /**
     * @desc 跳转到商品详情页面
     * @date 20201208
     * */
    jumperDetail(data) {
      this.$router.push({ name: 'productDetails', query: { id: data.productId }})
    },
    /**
     * @desc 获取橱窗商品的列表
     * @date 20201207
     * */
    getGoodsList() {
      const goodsList = this.cartegory[this.index]
      goodsList.pageNum++
      const param = {
        pageSize: goodsList.pageSize,
        sort: '1',
        pageNum: goodsList.pageNum,
        categoryId: goodsList.categoryId,
        windowId: this.windowId
      }
      windowShopApi.getWindowGoodsList(param)
        .then(res => {
          goodsList.goodsListData.push(...res.list)
          const totla = parseInt(res.size)
          const dataLength = goodsList.goodsListData.length
          if (dataLength === totla) goodsList.finished = true
        })
    },
    /**
     * @desc 橱窗分类的列表
     * @date 20201207
     * */
    windowCatgory() {
      const param = {
        windowId: this.windowId
      }
      windowShopApi.windowCategory(param)
        .then(res => {
          this.tabList.push(res)
          this.tabList[0].forEach((item, index) => {
            this.cartegory.push({
              title: item.name,
              flag: 0,
              pageSize: 20,
              pageNum: 0,
              goodsListData: [],
              finished: false,
              loading: false,
              categoryId: item.classificationId
            })
          })
        })
    },
    /**
     * @desc tab切换获取点击的下标
     * @param [name] tab的名字
     * @param [title] tab的标题
     * @date 20201208
     * */
    tabChange(name, title) {
      this.index = name
    },
    /**
     * @desc 返回的函数
     * @date 20201207
     * */
    onBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .imgsD{
    text-align: center
  }
  .rowBox .boxs{
    padding: 15px;
    float: left;
    width: 45%;
    margin: 20px 0 20px 30px;
    background-color: #fff;
  }
  .rowBox .boxs .gnameBox{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 30px;
  }
  .rowBox .boxs .priceBox{
    font-size: 30px;
  }
</style>

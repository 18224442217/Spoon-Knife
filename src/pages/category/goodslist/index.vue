<template>
  <div>
    <!--    单独的导航条部分-->
    <van-nav-bar
      title="商品列表"
      left-text="返回"
      left-arrow
      @click-left="onBack"
    />
    <!--    tab的切换部分-->
    <van-tabs animated
              @change="tabChange">
      <van-tab v-for="item in goodsD"
               :title="item.title"
               :key="item.status">
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="insearch"
        >
          <div v-for="(item, i) in item.goodsData"
               :key="i"
               class="listBox">
            <van-row>
              <van-col span="8">
                <van-image :src="item.imgLogo"
                           width="100"
                           height="100"
                           @click="jumperDetail(item)" />
              </van-col>
              <van-col span="11">
                <div class="nameBox"
                     @click="jumperDetail(item)">{{ item.name }}</div>
                <div class="priceExhibition"
                     @click="jumperDetail(item)">￥{{ item.priceExhibition }}</div>
                <div class="merchantName"
                     @click="jumperShop(item)">{{ item.merchantName }}</div>
              </van-col>
              <van-col span="5">
                <van-icon name="shop-o"
                          @click="jumperShop(item)" />
              </van-col>
            </van-row>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
    <van-empty
      v-if="empty"
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="没有数据"
    />
    <!--    筛选的弹出层-->
    <van-popup v-model="show"
               position="top">
      <van-row style="padding: 10px;font-size: 18px;">
        折扣/服务
      </van-row>
      <van-row style="margin-left:10px;font-size: 18px;">
        <van-button :class="showB ?'haves': 'acHave'"
                    class="acHave"
                    type="default"
                    @click="btnsClick">有货</van-button>
      </van-row>
      <van-row style="padding: 10px;font-size:18px;">
        价格区间
      </van-row>
      <van-row style="font-size: 18px;">
        <van-col span="8">
          <van-field v-model="minimum"
                     style="width: 100px"
                     placeholder="最低价/元" />
        </van-col>
        <van-col span="8"
                 style="padding-top: 10px;">----</van-col>
        <van-col span="8">
          <van-field v-model="highest"
                     style="width: 100px"
                     placeholder="最高价/元" />
        </van-col>
      </van-row>
      <van-row style="margin-bottom: 30px;">
        <van-col span="12">
          <van-button
            style="width: 80px;height: 30px;border-radius: 5px;margin-left: 50px"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            @click="reset">
            重置
          </van-button>
        </van-col>
        <van-col span="12">
          <van-button
            style="width:80px;height: 30px;border-radius: 5px;"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            @click="done">
            完成
          </van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import goodsFilterApi from '@/api/goodsFilter'
import { Loading } from 'vant'
import { Popup } from 'vant'
export default {
  data() {
    return {
      empty: false,
      index: 0,
      pageSize: 10,
      pageNum: 1,
      flag: '0',
      categoryId: '',
      show: false,
      showB: false,
      insearchFlag: 0,
      minimum: '', // 最低价
      highest: '', // 最高价
      goodsD: [
        {
          title: '综合推荐',
          flag: 0,
          pageSize: 20,
          pageNum: 0,
          goodsData: [],
          finished: false,
          loading: false
        },
        {
          title: '销量',
          flag: 1,
          pageSize: 20,
          pageNum: 0,
          goodsData: [],
          finished: false,
          loading: false
        },
        {
          title: '价格',
          flag: 2,
          pageSize: 20,
          pageNum: 0,
          goodsData: [],
          finished: false,
          loading: false
        },
        {
          title: '筛选',
          flag: 0,
          pageSize: 20,
          pageNum: 0,
          goodsData: [],
          finished: false,
          loading: false
        }
      ]
    }
  },
  created() {
    const categoryId = this.$route.query.categoryId
    this.categoryId = categoryId
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
          that.pageNum++
          that.insearch(that.flag)
        }
      }
    },
    /**
     * @desc 点击跳转到商品的详情页面
     * @date 20201203
     * */
    jumperDetail(data) {
      this.$router.push({ name: 'productDetails', query: { id: data.productId }})
    },
    tabChange(name, title) {
      this.index = name
      if (this.index === 3) {
        this.show = true
      }
    },
    /**
       * @desc 点击筛选弹出层中的重置按钮
       * @date 20201130
       * */
    reset() {
      this.showB = false
      this.minimum = ''
      this.highest = ''
    },
    /**
       * @desc 点击筛选弹出层中的完成按钮
       * @date 20201130
       * */
    done() {
      this.show = false
      this.showB = false
      this.insearchFlag = 1
      this.insearch('1')
    },
    /**
       * @desc 点击弹出层的中有货按钮
       * @date 20201130
       * */
    btnsClick() {
      this.showB = true
    },
    /**
       * @desc 点击返回
       * @date 20201128
       * */
    onBack() {
      this.$router.go(-1)
    },
    /**
       * @desc 加载商品列表的函数
       * @param flag 0-->综合排序 1-->销量从高到低 2-->价格从高到低 3 -->价格从低到高 4查看有货
       * @date 20201128
       * */
    insearch(ids) {
      const curGoods = this.goodsD[this.index]
      this.loading = true
      let param = ''
      curGoods.pageNum = curGoods.pageNum + 1
      if (ids === '1') {
        param = {
          sort: curGoods.flag,
          pageSize: curGoods.pageSize,
          pageNum: curGoods.pageNum,
          categoryId: this.categoryId,
          lowPrice: this.minimum,
          highPrice: this.highest
        }
      } else {
        param = {
          sort: curGoods.flag,
          pageSize: curGoods.pageSize,
          pageNum: curGoods.pageNum,
          categoryId: this.categoryId,
          lowPrice: '',
          highPrice: ''
        }
      }

      goodsFilterApi.goodsFilter(param)
        .then(res => {
          if (res.list.length === 0) {
            curGoods.goodsData = []
            this.empty = true
            const totlas = parseInt(res.total)
            const dataLengths = curGoods.goodsData.length
            if (totlas <= dataLengths) {
              curGoods.finished = true
            }
            return false
          } else {
            this.empty = false
            curGoods.goodsData.push(...res.list)
            const totla = parseInt(res.total)
            const dataLength = curGoods.goodsData.length
            if (totla <= dataLength) {
              curGoods.finished = true
            }
          }
        })
    },
    /**
       * @desc 跳转到店铺的页面
       * @param datas 点击的时候携带的参数
       * @date 20201128
       * */
    jumperShop(datas) {
      this.$router.push({
        path: '/shop',
        query: {
          merchantId: datas.merchantId
        }
      })
    }
  }
}
</script>

<style scoped>
  .acHave{
    border: 1px solid #ddd;
  }
  .haves{
    color: #de0e3f;
    border: 1px solid red;
  }
  .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
  .listBox{
    width: 92%;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 10px;
  }
  .listBox .nameBox{
    overflow: hidden;
    white-space: nowrap;
    width: 500px;
    text-overflow: ellipsis;
    font-size: 32px;
  }
  .listBox .priceExhibition{
    font-size: 32px;
    font-weight: bold;
    color: #de0e3f;
    margin-top: 50px;
  }
  .listBox .merchantName{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 50px;
    font-size: 32px;
  }
  .loading{
    text-align: center;
  }
  .van-icon-shop-o{
    font-size: 36px;
    font-weight: bold;
    color: #de0e3f;
    margin: 190px 0 0 20px;
  }
  .van-tab__pane{
    font-size: 40px !important;
  }
  .van-card__price-integer{
    font-weight: bold;
    font-size: 30px;
    color: #de0e3f;
  }
  .van-ellipsis{
    margin-top: 50px;
  }
  .van-card{
    width: 90%;
    margin: 10px auto;
    background-color: #fff !important;
    border-radius: 10px;
  }
</style>

<template>
  <div class="container">
    <van-nav-bar
      title=""
      left-text="返回"
      left-arrow
      @click-left="onBack"
    />
    <div v-if="isApp"
         class="titless">
      <open-app :closes="closes" />
    </div>
    <div class="mainBox">
      <div class="topBox">
        <div v-if="isHiden"
             class="hidenLa">
          <menu-list />
        </div>

        <van-row class="infoBox">
          <van-col span="8">
            <div class="imgBox">
              <van-image :src="shopInfo.logo"
                         width="5rem"
                         height="5rem"
                         fit="scale-down" />
            </div>
          </van-col>
          <van-col span="8">
            <div class="nameBox">{{ shopInfo.name }}</div>
            <div class="focusCountBox"
                 @click="$router.push({name:'shopInfo',query:{merchantId:shopInfo.merchantId}})">简介:{{ shopInfo.introduction }}</div>
          </van-col>
          <van-col span="6">
            <van-button class="focusBtn"
                        type="default"
                        @click="focusFu">{{ focus }}</van-button>
          </van-col>
          <van-col span="2">
            <van-image :src="require('../../../../static/images/menu.png')"
                       class="menu"
                       width="1rem"
                       height="1rem"
                       fit="scale-down"
                       @click="menus"/>
          </van-col>
        </van-row>
      </div>
      <div class="tabBox">
        <van-tabs animated
                  @change="tabChange">
          <van-tab v-for="item in shopData"
                   :title="item.title"
                   :key="item.status">
            <van-list
              v-model="item.loading"
              :finished="item.finished"
              finished-text="没有更多了"
              @load="getGoodsShops"
            >
              <!--              精选视图部分-->
              <div v-if="item.flag == 0"
                   class="rowBox">
                <div v-for="(items, i) in item.goodsListData"
                     :key="i"
                     class="boxs">
                  <div style="text-align: center"
                       @click="jumperDetail(items)">
                    <van-image :src="items.imgLogo"
                               width="100%"
                               height="100%" />
                  </div>
                  <div class="gnameBox">{{ items.name }}</div>
                  <div class="priceBox">￥{{ items.priceExhibition }}</div>
                </div>
              </div>
              <!--              商品视图部分-->
              <div v-if="item.flag == 1">
                <div v-for="(items, i) in item.goodsListData"
                     :key="i"
                     class="listBox">
                  <van-row>
                    <van-col span="8"
                             @click="jumperDetail(items)">
                      <van-image :src="items.imgLogo"
                                 width="100"
                                 height="100" />
                    </van-col>
                    <van-col span="8">
                      <div class="nameBox">{{ items.name }}</div>
                      <div class="priceExhibition">￥{{ items.priceExhibition }}</div>
                      <div class="merchantName">{{ items.merchantName }}</div>
                    </van-col>
                    <van-col span="8"/>
                  </van-row>
                </div>
              </div>
              <!--              活动视图部分-->
              <div v-if="item.flag == 2"
                   class="activty">
                <div v-for="(items, i) in item.goodsListData"
                     :key="i"
                     class="detailRow">
                  <h4>{{ items.name }}</h4>
                  <div v-for="(ites, j) in items.productListVOList"
                       :key="j"
                       class="acList">
                    <div class="boxs"
                         @click="jumperDetail(ites)">
                      <div class="images">
                        <van-image :src="ites.imgLogo"
                                   width="100"
                                   height="100" />
                      </div>
                      <div class="pname">
                        {{ ites.productName }}
                      </div>
                      <div class="price">
                        <van-row>
                          <van-col span="12"
                                   style="color: red">￥{{ ites.priceExhibition }}</van-col>
                          <van-col span="12"
                                   class="youhui"/>
                        </van-row>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </van-list>
          </van-tab>

        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import shopApi from '@/api/shopApi'
import cache from '@/utils/cache'
import { Toast } from 'vant'
import OpenApp from '@/components/openApp'
import MenuList from '@/components/menus'
export default {
  name: 'Index',
  components: {
    OpenApp,
    MenuList
  },
  data() {
    return {
      shopInfo: '',
      index: 0,
      pageSize: 15,
      pageNum: 1,
      flag: 0,
      merchantId: '',
      focus: '',
      isHiden: false,
      isApp: true,
      shopData: [
        {
          title: '精选',
          flag: 0,
          pageSize: 8,
          pageNum: 0,
          goodsListData: [],
          finished: false,
          loading: false
        },
        {
          title: '商品',
          flag: 1,
          pageSize: 8,
          pageNum: 0,
          goodsListData: [],
          finished: false,
          loading: false
        },
        {
          title: '活动',
          flag: 2,
          pageSize: 8,
          pageNum: 0,
          goodsListData: [],
          finished: false,
          loading: false
        }
      ],
      u: navigator.userAgent,
      isIOS: '',
      isAndroid: '',
      isWeixin: ''
    }
  },
  created() {
    const merchantId = this.$route.query.merchantId
    this.merchantId = merchantId
    this.getShopInfomation(merchantId)
    this.getGoodsShops(merchantId, this.flag)
    this.addEventListennerScroll()
  },
  methods: {
    closes() {
      this.isApp = false
    },
    /**
     * @desc:点击菜单按钮显示和隐藏菜单
     * @date:20210311
     * */
    menus() {
      if (this.isHiden === true) {
        this.isHiden = false
      } else {
        this.isHiden = true
      }
    },
    tabChange(name, title) {
      this.index = name
    },
    addEventListennerScroll() {
      const that = this
      window.onscroll = function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        // 滚动条到底部的条件
        if (scrollTop + windowHeight === scrollHeight) {
          that.pageNum++
          that.getGoodsShops(that.merchantId, that.flag)
        }
      }
    },
    /**
       * @desc 跳转到商品的详情页
       * @date 20201201
       * */
    jumperDetail(data) {
      this.$router.push({ name: 'productDetails', query: { id: data.productId }})
    },
    /**
       * @desc 关注店铺或者取消关注店铺
       * @date 20201128
       * */
    focusFu() {
      if (cache.getToken()) {
        const param = {
          userId: cache.getCookie('userId'),
          merchantId: this.merchantId
        }
        shopApi.focusShop(param)
          .then(res => {
            console.log(res)
            if (res === null) {
              this.focus = '已关注'
            } else {
              this.focus = '关注'
            }
            this.getShopInfomation(this.merchantId)
          })
      } else {
        this.$toast('请先登录！')
        this.$router.push({ name: 'login' })
      }
    },
    /**
       * @desc 查询店铺里面的商品列表数据
       * @param merchantId 从商品分类跳转过来携带的参数
       * @date 20201128
       * */
    getGoodsShops(merchantId, index) {
      const shops = this.shopData[this.index]
      shops.pageNum++
      if (shops.flag === 2) { // 点击活动单独查询接口查询活动列表数据
        const param = {
          merchantId: this.merchantId
        }
        shopApi.activityList(param)
          .then(res => {
            console.log(res)
            if (res.data.length === 0) {
              Toast('店铺暂时没有活动')
              shops.finished = true
              return false
            } else {
              shops.goodsListData.push(...res.data)
              const totlaAc = parseInt(res.data.length)
              const dataLength = shops.goodsListData.length
              if (totlaAc <= dataLength) {
                shops.finished = true
              }
            }
          })
        return false
      } else {
        const param = {
          sort: shops.flag,
          pageSize: shops.pageSize,
          pageNum: shops.pageNum,
          merchantId: this.merchantId
        }
        shopApi.shopGoodsFilter(param)
          .then(res => {
            shops.goodsListData.push(...res.list)
            const totla = parseInt(res.size)
            const dataLength = shops.goodsListData.length
            if (dataLength === totla) shops.finished = true
          })
      }
    },
    /**
       * @desc 通过merchantId查询商铺的详细信息
       * @param merchantId 从商品分类跳转过来携带的参数
       * @date 20201128
       * */
    getShopInfomation(merchantId) {
      const param = {
        merchantId: merchantId
      }
      shopApi.shopInfomation(param)
        .then(res => {
          this.shopInfo = res
          if (res.onFocus) {
            this.focus = '已关注'
          } else {
            this.focus = '关注'
          }
        })
    },
    onBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
  .titless{
    position: fixed;
    top: 0;
    width: 100%;
    height: 3rem;
    background: #fff;
    z-index: 9999;
    font-size: 35px;
    border: 1px solid #fff;
  }
  .van-nav-bar {
    background-color: #F13F40;
    color: #fff;
  }

  /deep/ .van-nav-bar__text {
    color: #fff;
  }
  .activty{
    width: 100%;
  }
  .activty .detailRow{
    font-size: 36px;
  }
  .activty .detailRow h4{
    padding: 15px 0 20px 15px;
    margin-left: 15px;
  }
  .activty .detailRow .acList{
  }
  .activty .detailRow .acList .boxs{
    border-radius: 5px;
    width: 45%;
    margin-left: 20px;
    float: left;
    background-color: #fff;
  }
  .activty .detailRow .acList .boxs .price{
    padding: 10px;
  }
  .youhui{
    border-radius: 15px;
    width: 150px;
    font-size: 24px;
    color: red;
    padding: 7px;
    background-color: #ffd1c4;
  }
  .activty .detailRow .acList .boxs .images{
    text-align: center;
  }
  .activty .detailRow .acList .boxs .pname{
    padding-left: 15px;
    font-size: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
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
    width: 520px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    font-size: 32px;
    margin-top: 10px;
  }
  .listBox .priceExhibition{
    font-size: 32px;
    font-weight: bold;
    color: #de0e3f;
    margin-top: 20px;
  }
  .listBox .merchantName{
    margin-top: 30px;
    font-size: 32px;
  }
  .rowBox{}
  .rowBox .boxs{
    padding: 15px;
    float: left;
    width: 45%;
    margin: 20px 0 20px 30px;
    border-radius: 16px;
    background-color: #fff;
    box-shadow:1px 2px 6px #ddd;
  }
  .rowBox .boxs .gnameBox{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 30px;
  }
  .rowBox .boxs .priceBox{
    margin-top: 10px;
    color: #F13F40;
    font-size: 40px;
    font-weight: bold;
  }
.topBox{
  position: relative;
  background:#F13F40;
}
  .topBox .hidenLa{
    width: 8rem;
    height:8.5rem;
    background: #fff;
    position: absolute;
    top: 130px;
    right: 50px;
    border: 1px solid #ddd;
    z-index: 999;
    font-size: 30px;
    border-radius: 15px;
  }
.topBox .infoBox .imgBox{
  margin: 50px 0 0 30px;
  width: 200px;
  height: 200px;
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid #fff;
}
  .topBox .infoBox .menu{
    margin: 80px 0 0 0;
  }
  .topBox .infoBox .focusBtn{
  font-size: 30px;
  margin: 60px 0 0 0;
  border-radius: 50px;
  border: 1px solid #fff;
  width: 180px;
  height: 70px;
  background: rgba(255,255,255,0);
  color: #fff;
}
.topBox .infoBox .nameBox{
  font-size: 36px;
  margin: 60px 0 0 -20px;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.topBox .infoBox .focusCountBox{
  margin: 40px 0 0 -20px;
  font-size: 36px;
  width: 550px;
  color: #fff;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
}
.topBox .infoBox{
  border: none;
  height: 300px;
}
</style>

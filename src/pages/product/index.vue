<template>
  <div id="target">
    <div v-if="isApp"
         class="titless">
      <open-app :closes="closes" />
    </div>
    <van-nav-bar :border="false"
                 :fixed="true"
                 title=""
                 left-arrow
                 @click-left="$router.go(-1)" />
    <van-swipe :autoplay="3000"
               class="my-swipe"
               indicator-color="white">
      <van-swipe-item v-for="(item,index) in details.productImgRecords"
                      :key="item.productImgId"
                      @click.stop="imagePreview(index)"
      >
        <van-image :src="item.imgLogo"
                   fit="cover"
                   class="swipe__img"/>
      </van-swipe-item>
    </van-swipe>

    <van-icon name="more"
              size="25"
              style="position: absolute;top: 10px;right: 20px;z-index:999;"
              @click="menus" />
    <div v-if="isHiden"
         class="hidenLa">
      <menu-list />
    </div>

    <div class="product__info">
      <van-row type="flex"
               align="center">
        <van-col class="price"
                 span="16">¥{{ (details.priceExhibition*1).toFixed(2) }}</van-col>
      </van-row>
      <p class="name">{{ details.name }}</p>
    </div>

    <van-cell-group :border="false">
      <van-cell :value="details.groupStrategies&&details.groupStrategies[0]&&details.groupStrategies[0].name?details.groupStrategies[0].name:'暂无活动'"
                title="活动" />
      <van-cell :value="productFreight"
                title="服务"/>
    </van-cell-group>

    <van-cell-group :border="false"
                    class="sku">
      <van-cell :value="skuName.join(' ')"
                title="规格"
                @click="isShowSku=true"/>
      <van-cell :value="productAddress"
                title="发货地"/>
      <van-cell title="快递"
                value="免运费"/>
    </van-cell-group>

    <van-row type="flex"
             class="merchant"
             align=""
             @click="$router.push({name:'shop',query:{merchantId:details.merchantId}})">
      <van-col>
        <van-image :src="details.merchantLogo"
                   fit="cover"/>
      </van-col>
      <van-col class="info">
        <p class="name">{{ details.merchantName }}</p>
        <!--
        <p class="score">
          <span v-for="(value,key) in score"
                :key="key">
            {{ value }}:{{ details.score[key] }}
          </span>
        </p>
        <!-->
      </van-col>
    </van-row>
    <p class="recommendTitle">店铺推荐</p>
    <van-grid :border="false"
              :column-num="3">
      <van-grid-item v-for="(item,index) in recommendProductList"
                     :key="index"
                     @click="$router.push({name:'productDetails',query:{id:item.productId}})">
        <van-image :src="item.imgLogo" />
        <p class="price">¥{{ item.priceExhibition }}</p>
        <p class="name">{{ item.productName }}</p>
      </van-grid-item>
    </van-grid>

    <van-divider class="">商品详情</van-divider>
    <div class="product__details"
         v-html="details.productDetail"/>
    <div><img src="../../assets/img/hjx.png"
              alt=""
              class="hjx"></div>
    <van-goods-action>
      <van-goods-action-icon icon="shop-o"
                             text="店铺"
                             @click="navigateToMerchant" />
      <van-goods-action-icon icon="cart-o"
                             text="购物车"
                             @click="navigateToShoppingCart" />

      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="isShowSku=true" />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="isShowSku=true"
      />
    </van-goods-action>

    <van-sku
      ref="sku"
      v-model="isShowSku"
      :sku="sku"
      :goods="{picture:details.productImgRecords[0].imgLogo}"
      :goods-id="details.productId"
      :hide-stock="true"
      :initial-sku="initialSku"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
      @sku-selected="onChangeCurrent"
    />
  </div>
</template>

<script>
import OpenApp from '@/components/openApp'
import MenuList from '@/components/menus'
import productApi from '@/api/productApi'
import commonApi from '@/api/commonApi'
import cache from '@/utils/cache'
import { ImagePreview } from 'vant'
export default {
  components: {
    OpenApp,
    MenuList
  },
  data() {
    return {
      isHiden: false,
      isApp: true,
      details: {
        groupStrategies: [],
        productFreight: {},
        productImgRecords: [{}],
        score: {}
      },
      isShowSku: false,
      sku: {
        tree: [],
        list: []
      },
      initialSku: {
        selectedNum: 1
      },
      skuName: [],
      score: {
        logisticScore: '物流评价',
        productScore: '商品评价',
        serviceScore: '店铺评价'
      },
      recommendProductList: [],
      u: navigator.userAgent,
      isIOS: '',
      isAndroid: '',
      isWeixin: ''
    }
  },
  computed: {
    productFreight() {
      if (this.details.productFreight && this.details.productFreight.sendtime) {
        return this.details.productFreight.sendtime
      } else {
        return '暂无时间'
      }
    },
    productAddress() {
      if (this.details.productFreight?.productAddress) {
        return this.details.productFreight.productAddress
      } else {
        return '暂无发货地'
      }
    }
  },
  watch: {
    $route(to, form) {
      this.queryProductDetails(to.query.id)
      window.scrollTo(0, 0)
    }
  },
  mounted() {
    // console.log(this.$route)
    this.queryProductDetails(this.$route.query.id)
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
    queryProductDetails(id) {
      productApi.queryProductDetails({ id })
        .then((res) => {
          console.log(res.groupStrategies[0], '活动价格=========')
          this.queryRecommendProduct(res.merchantId)
          // sku设置
          res.skuList.forEach((val, index) => {
            this.initialSku[index] = val.ymBProductParameters[0].parameterId
            this.skuName[index] = val.ymBProductParameters[0].pmName
            const spec = {
              k: val.name,
              k_s: '' + index,
              v: val.ymBProductParameters.map(item => ({ id: item.parameterId, name: item.pmName }))
            }
            this.sku.tree.push(spec)
          })
          res.ymBrProductParameters.forEach(v => {
            const check = {
              id: v.productParamId,
              price: v.price * 100,
              stock_num: v.amount
            }
            res.skuList.forEach((sku, index) => {
              check[index] = v.param[index]
            })
            this.sku.list.push(check)
          })
          this.details = res
        })
    },
    // 获取商品推荐
    queryRecommendProduct(merchantId) {
      const params = {
        page: 1,
        size: 3,
        type: 7,
        merchantId
      }
      commonApi.queryRecommendProduct(params)
        .then(res => {
          console.log(res)
          this.recommendProductList = res.data
        })
    },
    // 图片预览
    imagePreview(index) {
      ImagePreview({
        images: this.details.productImgRecords.map(v => v.imgLogo),
        startPosition: index
      })
    },
    // 添加到购物车
    onAddCartClicked() {
      this.isShowSku = false
      const skuData = this.$refs.sku.getSkuData()
      if (cache.getToken()) {
        if (skuData.selectedSkuComb) {
          const data = {
            merchantId: this.details.merchantId,
            productId: skuData.goodsId,
            productNum: skuData.selectedNum,
            productParamId: skuData.selectedSkuComb.id,
            userId: cache.getCookie('userId')
          }
          productApi.addToShoppingCart(data)
            .then(res => {
              this.$toast.success('添加成功')
            })
        } else {
          this.$toast('库存不足')
        }
      } else {
        this.$router.push({ name: 'login' })
      }
    },
    // 立即购买
    onBuyClicked(data) {
      const info = {
        name: this.details.name,
        logo: this.details.productImgRecords[0].imgLogo,
        paramName: this.skuName.join(','),
        num: data.selectedNum,
        productId: data.goodsId,
        paramId: data.selectedSkuComb.id,
        paramPrice: data.selectedSkuComb.price,
        merchantId: this.details.merchantId
        // quantity: this.details.quantity,
        // conditions: this.details.conditions
      }
      if (this.details.groupStrategies?.[0]?.strategyId) {
        info.activity = this.details.groupStrategies[0]
        info.activityId = this.details.groupStrategies[0]?.strategyId
      }
      console.log(JSON.stringify([info]), '=============4444444')
      sessionStorage.setItem('orderProductInfo', JSON.stringify([info]))
      this.$router.push({ name: 'createOrder' })
    },
    // 切换选中到商品
    onChangeCurrent({ skuValue }) {
      const key = skuValue.skuKeyStr
      const skuComb = this.$refs.sku.getSkuData().selectedSkuComb
      if (skuComb !== null && skuComb[skuValue.skuKeyStr]) {
        this.skuName[key] = skuValue.name
      } else {
        this.skuName[key] = ''
      }
    },
    // 跳转到店铺
    navigateToMerchant() {
      this.$router.push({ name: 'shop', query: { merchantId: this.details.merchantId }})
    },
    // 跳转到购物车
    navigateToShoppingCart() {
      this.$router.push({ name: 'shoppingCart' })
    }
  }
}
</script>

<style lang="less" scoped>
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
  .hidenLa{
    width: 8rem;
    height:8.5rem;
    background: #fff;
    position: absolute;
    top: 90px;
    right: 50px;
    border: 1px solid #ddd;
    z-index: 999;
    font-size: 30px;
    border-radius: 15px;
  }
.hjx{
  width: 100%;
  margin-bottom: 40px;
}
.van-nav-bar {
  background-color: transparent;
}
.product__info{
  background: #fff;
  padding:40px 40px 10px;
  .price{
    font-size: 58px;
    font-weight: bold;
    color:#FA4B3B;
  }
  .sale__num{
    font-size: 34px;
    color: #666;
    text-align: right;
  }
  .name{
    font-size: 42px;
  }
}
.sku{
  margin-top: 40px;
}
.merchant{
  background: #fff;
  padding:40px;
  margin-top: 40px;
  .van-col{
    height: 120px;
  }
  .van-image{
    width: 120px;
    border-radius: 10px;
    overflow: hidden;
  }
  .name{
    font-size: 42px ;
  }
  .info{
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .score{
      font-size: 32px;
      color: #999;
      span{
        padding-right: 20px;
      }
    }
  }
}

.recommendTitle{
    background: #fff;
    text-align: center;
    padding:20px 0 0;
    border-top: 1PX solid #eee;
}

.van-grid{
  .price{
    color: #FA4B3B;
    font-weight: bold;
    font-size: 32px;
    margin-top: 20px;
  }
  .name{
    text-align: center;
    white-space:nowrap;
    width: 240px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.product__details{
  background: #fff;
  padding: 20px;
  /deep/ p{
    padding:20px 0;
  }
}
</style>

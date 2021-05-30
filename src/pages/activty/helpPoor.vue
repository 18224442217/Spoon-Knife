<template>
  <div class="main">
    <van-swipe :autoplay="3000"
               indicator-color="white">
      <van-swipe-item v-for="item of bannerList"
                      :key="item.brAdvertId">
        <van-image :src="item.url"
                   fit="cover"
                   @click="bannerNavigate(item)" />
      </van-swipe-item>
    </van-swipe>

    <van-dropdown-menu>
      <van-dropdown-item v-model="area"
                         :options="areaList"
                         @change="setSort(0)" />

      <van-dropdown-item disabled>
        <template slot="title">
          <span @click="setSort(1)">销量</span>
        </template>
      </van-dropdown-item>
      <van-dropdown-item title-class="sort_price"
                         disabled>
        <template slot="title">
          <span @click="sort === 3 ? setSort(2) : setSort(3)">价格</span>
        </template>
      </van-dropdown-item>
      <van-dropdown-item disabled>
        <template slot="title">
          <span @click="setSort(0)">新品</span>
        </template>
      </van-dropdown-item>
    </van-dropdown-menu>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="queryRecommendGoods"
    >
      <div class="waterfall">
        <div
          v-for="(item, i) in list"
          :key="i"
          class="recommend__grid__item"
          @click="navigateToProductDetails(item)"
        >
          <van-image :src="item.imgLogo"
                     class="imgLogo" />
          <p class="price">¥ {{ (item.priceExhibition * 1).toFixed(2) }}</p>
          <p class="title">{{ item.productName }}</p>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import commonApi from '@/api/commonApi'
import cache from '@/utils/cache'
import homeApi from '@/api/homeApi'

export default {
  data() {
    return {
      bannerList: [],
      loading: false,
      finished: false,
      list: [],
      sort: 0,
      page: 1,
      areaList: [
        { text: '全部', value: '' },
        { text: '成都市', value: '成都' },
        { text: '绵阳市', value: '绵阳' },
        { text: '自贡市', value: '自贡' },
        { text: '攀枝花市', value: '攀枝花' },
        { text: '泸州市', value: '泸州' },
        { text: '德阳市', value: '德阳' },
        { text: '广元市', value: '广元' },
        { text: '遂宁市', value: '遂宁' },
        { text: '乐山市', value: '乐山' },
        { text: '内江市', value: '内江' },
        { text: '资阳市', value: '资阳' },
        { text: '宜宾市', value: '宜宾' },
        { text: '南充市', value: '南充' },
        { text: '达州市', value: '达州' },
        { text: '雅安市', value: '雅安' },
        { text: '广安市', value: '广安' },
        { text: '巴中市', value: '巴中' },
        { text: '眉山市', value: '眉山' }
      ],
      area: ''
    }
  },
  computed: {},
  mounted() {
    this.queryAdvertList()
  },
  methods: {
    // shopCartApi
    queryRecommendGoods() {
      const params = {
        page: this.page,
        size: 20,
        type: 6,
        status: 1,
        sort: this.sort
      }
      if (this.area) params.area = this.area
      commonApi.queryRecommendProduct(params).then((res) => {
        console.log(res.data)
        this.loading = false
        this.list.push(...res.data)
        this.page++
        if (this.list.length >= res.count * 1) {
          this.finished = true
        }
      })
    },
    //
    setSort(val) {
      this.sort = val
      this.list = []
      this.page = 1
      this.queryRecommendGoods()
    },
    // 查询广告banner列表
    queryAdvertList() {
      const data = {
        advertType: 7, // 1首页轮播图，2首页广告，3分类轮播，4首页弹窗，5悬浮广告,7扶贫专区
        tabId: 1005, // 首页1000，分类页1001，消息1002，购物车1003，我的1004，1005扶贫专区
        status: 'Y'
      }
      homeApi.queryAdvert(data).then((res) => {
        console.log(res[0])
        this.bannerList = res[0].brAdvertlist
      })
    },
    // banner跳转
    bannerNavigate(val) {
      if (val.linkType === '1') {
        this.$router.push({ name: 'shop', query: { merchantId: val.link }})
      } else if (val.linkType === '1') {
        this.$router.push({ name: '', query: { id: val.link }})
      } else this.navigateUrl(val.link)
    },
    // 链接跳转的处理
    async navigateUrl(url) {
      const user = this.$store.getters.user
      const phone = user.phone

      // 移动业务的跳转
      if (url.startsWith('http://wap.sc.10086.cn')) {
        if (!(cache.getCookie('isSiChuan') * 1)) {
          if ((await homeApi.checkIsYD()) !== 'yd') {
            this.$toast('亲，您不是四川移动用户暂不能正常使用哦！')
            return
          }
        }
        const sm4 = await commonApi.sm4({ plainText: phone })
        window.location.replace(`${url}&info=${sm4}`)
      } else if (url.startsWith('https://www.hsh.139sc.com/h5/')) {
        if (!(cache.getCookie('isSiChuan') * 1)) {
          if ((await homeApi.checkIsYd()) !== 'yd') {
            this.$toast('亲，您不是四川移动用户暂不能正常使用哦！')
            return
          }
        }
        const token = cache.getToken()
        const ac_id = 'h5mall_home'
        window.location.replace(`${url}?token=${token}&phone=${phone}&ac_id=${ac_id}`)
      } else {
        window.location.replace(`${url}`)
      }
    },
    navigateToProductDetails(val) {
      this.$router.push({ name: 'productDetails', query: { id: val.productId }})
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  background: #f6f6f6;
  padding: 0;
  min-height: 100vh;
}

.waterfall {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: wrap;
  .recommend__grid__item {
    width: 48%;
    margin-bottom: 20px;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    margin: 1%;
    .price {
      font-size: 38px;
      font-weight: bold;
      margin: 0;
      color: #d95336;
      padding-left: 10px;
    }
    .title {
      margin: 10px;
      font-size: 34px;
    }
    .van-image {
      width: 390px;
      height: 390px;
    }
  }
}

/deep/ .van-dropdown-menu__title {
  color: #323233;
}
/deep/ .sort_price::after {
  top: 65%;
}

/deep/ .sort_price::before {
  position: absolute;
  top: 55%;
  right: -0.25rem;
  margin-top: -0.3125rem;
  border: 0.1875rem solid;
  border-color: transparent transparent #dcdee0 #dcdee0;
  -webkit-transform: rotate(-45deg);
  transform: rotate(135deg);
  opacity: 0.8;
  content: '';
}
</style>

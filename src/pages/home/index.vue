<template>
  <div>
    <p class="location"
       @click="$router.push({ name: 'location' })">
      <van-icon name="location-o" />
      <span>{{ geolocationAddress }}</span>
      <van-icon name="arrow" />
    </p>
    <van-swipe :autoplay="3000"
               class="banner_swipe"
               indicator-color="white">
      <van-swipe-item v-for="item of bannerList"
                      :key="item.brAdvertId">
        <van-image :src="item.url"
                   @click="bannerNavigate(item)" />
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="5"
              :border="false"
              class="business__type">
      <van-grid-item
        v-for="item in businessTypeList"
        :key="item.businessId"
        @click="businessNavigate(item)"
      >
        <van-image :src="item.businessLogo" />
        <p class="title">{{ item.businessName }}</p>
      </van-grid-item>
    </van-grid>
    <!-- <van-notice-bar
      left-icon="volume-o"
      color="#333"
      background="#FFC0C544"
      text="测试公告显示……测试公告显示……测试公告显示……测试公告显示……测试公告显示……"
    /> -->
    <van-notice-bar
      v-if="announcementList.length"
      left-icon="volume-o"
      color="#333"
      background="#F6F6F6"
      @click="onClickAnnouncement"
    >
      <div class="NoticeBox">
        <span class="NoticeTitlew">公告</span>
        <van-swipe :autoplay="3000"
                   :show-indicators="false"
                   vertical
                   class="notice-swipe">
          <van-swipe-item v-for="item in announcementList"
                          :key="item.id">{{
                            item.title
                          }}</van-swipe-item>
        </van-swipe>
      </div>

    </van-notice-bar>
    <!-- 权益推荐 -->
    <div class="recommendBox">
      <van-row class="titles">
        <van-col span="12">权益推荐</van-col>
        <van-col span="12"
                 class="rightBox"/>
      </van-row>
      <van-row class="imagBox">
        <van-col
          span="12"
          class="poorImage">
          <div class="leftBoxs"
               @click="clickImg(1)">
            <img src="../../assets/img/home/home1.jpg" >
          </div>
        </van-col>
        <van-col span="12"
                 class="rightBoxs">
          <div
            class="top"
            @click="clickImg(2)">
            <img src="../../assets/img/home/home2.jpg" >
          </div>
          <div
            class="top"
            @click="clickImg(3)">
            <img src="../../assets/img/home/home3.jpg" >
          </div>
        </van-col>
      </van-row>
    </div>
    <!--    广告图视图部分-->
    <!-- <div v-for="(adv, g) in advertise"
         :key="'g=' + g"
         class="adBanner">
      <div class="adImage">
        <van-image :src="adv.url"
                   @click="navigateUrl(adv.link)" />
      </div>
    </div> -->
    <!--    1：1橱窗视图层-->
    <div class="outWindowBox">
      <div class="innerBox">
        <div v-for="(data, p) in newWindowListOneToOne"
             :key="'p=' + p"
             class="rightBox">
          <div
            v-if="data.style === 1"
            @click="
              windowNavgiter(
                data.ymBrPlatformWindows[0].windowId,
                data.ymBrPlatformWindows[0].type,
                data.style
              )
            "
          >
            <div class="topBox">
              <div class="leftsBox">{{ data.windowName }}</div>
              <div class="rightsBox">
                <div class="innersBox">{{ data.buttonName }}</div>
              </div>
            </div>
            <div v-if="data.ymBrPlatformWindows.length > 0"
                 class="contetBox">
              <div class="lfBox">
                <van-image :src="data.ymBrPlatformWindows[0].logo"
                           fit="fill" />
              </div>
            </div>
          </div>

          <div
            v-if="data.style === 2"
            @click="
              windowNavgiter(
                data.ymBrPlatformWindows[0].url,
                data.ymBrPlatformWindows[0].type,
                data.style
              )
            "
          >
            <div class="topBox">
              <div class="leftsBox">{{ data.windowName }}</div>
              <div class="rightsBox">
                <div class="innersBox">{{ data.buttonName }}</div>
              </div>
            </div>
            <div v-if="data.ymBrPlatformWindows.length > 0"
                 class="contetBox">
              <div class="lfBox">
                <van-image :src="data.ymBrPlatformWindows[0].logo"
                           fit="fill" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    热门活动视图层-->
    <div v-for="(three, k) in newWindowListThree"
         :key="'k=' + k"
         class="actityBox">
      <van-row class="titles">{{ three.windowName }}</van-row>
      <van-row class="imagBox">
        <van-col v-for="(item, i) in three.ymBrPlatformWindows"
                 :key="'i=' + i"
                 span="8">
          <van-image
            v-if="i <= 2"
            :src="item.logo"
            fit="cover"
            @click="windowNavgiter(item.url, item.type, three.style)"
          />
        </van-col>
      </van-row>
    </div>

    <!-- 限时促销 -->
    <div class="timeLimitBox displayNone">
      <van-row class="titles">
        <van-col
          class="leftTitles"
          span="13"/>
        <van-col
          class="rightTitles"
          span="11">
          <div class="textTwo">
            <!-- <van-count-down :time="time">
              <template #default="timeData"
                        class="timebox">
                <span class="block">{{ timeData.hours }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.minutes }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.seconds }}</span>
              </template>
            </van-count-down> -->
          </div>
          <div class="textOne">
            <!-- <p>距离结束</p>
            <p>时间还剩</p> -->
          </div>
        </van-col>
      </van-row>
      <van-row class="imagBox">
        <van-col
          span="8">
          <div class="imagBoxCenter"
               @click="clickImg(4)">
            <div class="imagBoxOne" >
              <img class="img"
                   src="../../assets/img/home/home4.jpg"
                   fit="cover">
            </div>
            <!-- <div class="imagBoxTwo">
              <van-progress
                :percentage="75"
                class="percentageText"
                style="border-radius: 10px;"
                stroke-width="16"
                pivot-color="#AD0EA2"
                color="#AD0EA2"
              />
            </div> -->
            <div class="imagBoxTherr">
              ￥<span>28</span>
              <!-- <s>￥10</s> -->
            </div>
          </div>
        </van-col>
        <van-col
          span="8">
          <div class="imagBoxCenter"
               @click="clickImg(5)">
            <div class="imagBoxOne">
              <img class="img"
                   src="../../assets/img/home/home5.jpg"
                   fit="cover">
            </div>
            <!-- <div class="imagBoxTwo">
              <van-progress
                :percentage="75"
                class="percentageText"
                style="border-radius: 10px;"
                stroke-width="16"
                pivot-color="#AD0EA2"
                color="#AD0EA2"
              />
            </div> -->
            <div class="imagBoxTherr">
              ￥<span>30</span>
              <!-- <s>￥10</s> -->
            </div>
          </div>
        </van-col>
        <van-col
          span="8">
          <div class="imagBoxCenter"
               @click="clickImg(6)">
            <div class="imagBoxOne">
              <img class="img"
                   src="../../assets/img/home/home6.jpg"
                   fit="cover">
            </div>
            <!-- <div class="imagBoxTwo">
              <van-progress
                :percentage="75"
                class="percentageText"
                style="border-radius: 10px;"
                stroke-width="16"
                pivot-color="#AD0EA2"
                color="#AD0EA2"
              />
            </div> -->
            <div class="imagBoxTherr">
              ￥<span>35.8</span>
              <!-- <s>￥10</s> -->
            </div>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 扶贫专区视图层-->
    <div v-for="(items, j) in newWindowListFour"
         :key="'j=' + j"
         class="poorBox">
      <van-row class="titles">
        <van-col span="12">{{ items.windowName }}</van-col>
        <van-col span="12"
                 class="rightBox"
                 @click="navigateUrl(items.buttonUrl)">{{
                   items.buttonName
                 }}</van-col>
      </van-row>
      <van-row class="imagBox">
        <van-col v-if="items.ymBrPlatformWindows[0]"
                 span="8"
                 class="poorImage">
          <div class="leftBoxs">
            <img
              :src="items.ymBrPlatformWindows[0].logo"
              @click="
                windowNavgiter(
                  items.ymBrPlatformWindows[0].url,
                  items.ymBrPlatformWindows[0].type,
                  items.style
                )
              "
            >
          </div>
        </van-col>
        <van-col v-if="items.ymBrPlatformWindows[1]"
                 span="8"
                 class="centerBox">
          <div class="leftBoxs">
            <img
              :src="items.ymBrPlatformWindows[1].logo"
              @click="
                windowNavgiter(
                  items.ymBrPlatformWindows[1].url,
                  items.ymBrPlatformWindows[1].type,
                  items.style
                )
              "
            >
          </div>
        </van-col>
        <van-col span="8"
                 class="rightBoxs">
          <div v-if="items.ymBrPlatformWindows[2]"
               class="top">
            <img
              :src="items.ymBrPlatformWindows[2].logo"
              @click="
                windowNavgiter(
                  items.ymBrPlatformWindows[2].url,
                  items.ymBrPlatformWindows[2].type,
                  items.style
                )
              "
            >
          </div>
          <div v-if="items.ymBrPlatformWindows[3]"
               class="bottom">
            <img
              :src="items.ymBrPlatformWindows[3].logo"
              @click="
                windowNavgiter(
                  items.ymBrPlatformWindows[3].url,
                  items.ymBrPlatformWindows[3].type,
                  items.style
                )
              "
            >
          </div>
        </van-col>
      </van-row>
    </div>

    <!--    权益活动专区的视图区域-->
    <div v-for="(items, b) in newWindowListFive"
         :key="'b=' + b"
         class="vips">
      <van-row class="titles">
        <van-col span="12">{{ items.windowName }}</van-col>
        <van-col span="12"
                 class="rightBox"
                 @click="navigateUrl(items.buttonUrl)">{{
                   items.buttonName
                 }}</van-col>
      </van-row>
      <van-row>
        <van-col span="8"
                 class="poorImage">
          <div class="leftBox">
            <img
              v-if="items.ymBrPlatformWindows[0]"
              :src="items.ymBrPlatformWindows[0].logo"
              @click="
                windowNavgiter(
                  items.ymBrPlatformWindows[0].url,
                  items.ymBrPlatformWindows[0].type,
                  items.style
                )
              "
            >
          </div>
        </van-col>
        <van-col span="8"
                 class="centerBoxes">
          <div v-if="items.ymBrPlatformWindows[1]"
               class="topBox">
            <img
              :src="items.ymBrPlatformWindows[1].logo"
              @click="
                windowNavgiter(
                  items.ymBrPlatformWindows[1].url,
                  items.ymBrPlatformWindows[1].type,
                  items.style
                )
              "
            >
          </div>
          <div v-if="items.ymBrPlatformWindows[2]"
               class="btops">
            <img
              :src="items.ymBrPlatformWindows[2].logo"
              @click="
                windowNavgiter(
                  items.ymBrPlatformWindows[2].url,
                  items.ymBrPlatformWindows[2].type,
                  items.style
                )
              "
            >
          </div>
        </van-col>
        <van-col span="8"
                 class="leftBoxes">
          <div v-if="items.ymBrPlatformWindows[3]"
               class="topBox">
            <img
              :src="items.ymBrPlatformWindows[3].logo"
              @click="
                windowNavgiter(
                  items.ymBrPlatformWindows[3].url,
                  items.ymBrPlatformWindows[3].type,
                  items.style
                )
              "
            >
          </div>
          <div v-if="items.ymBrPlatformWindows[4]"
               class="btops">
            <img
              :src="items.ymBrPlatformWindows[4].logo"
              @click="
                windowNavgiter(
                  items.ymBrPlatformWindows[4].url,
                  items.ymBrPlatformWindows[4].type,
                  items.style
                )
              "
            >
          </div>
        </van-col>
      </van-row>
    </div>

    <div v-if="nearbyMerchantList.length"
         class="near_merchant_title">
      <div style="display:flex">
        <p class="line" />
        <p class="title">附近商家</p>
      </div>
      <p style="color:#999"
         @click="$router.push({name:'nearbyMerchant'})">
        查看更多>
      </p>
    </div>
    <div
      v-for="merchant of nearbyMerchantList"
      :key="merchant.merchantId"
      class="near_merchant_details"
    >
      <van-image
        :src="merchant.logo"
        fit="scale-down"
        @click=" $router.push({ name: 'shop', query: { merchantId: merchant.merchantId }}) "
      />
      <div class="details">
        <p class="name">
          <span @click=" $router.push({ name: 'shop', query: { merchantId: merchant.merchantId }}) ">{{ merchant.name }}</span>
          <span v-if="merchant.distance"
                style="font-weight:normal;color:#999">{{ merchant.distance*1>1000?`${merchant.distance/1000}km`:`${merchant.distance}m` }}</span>
        </p>
        <!-- <div class="discount">
          <div>20减10</div>
        </div> -->
        <div class="product_list_scroll">
          <div class="product_list">
            <div
              v-for="(product, index) of merchant.productList"
              :key="index"
              class="product"
              @click="$router.push({name: 'productDetails', query: { id: product.productId }})"
            >
              <van-image :src="product.imgLogo"
                         fit="scale-down" />
              <p>{{ product.productName }}</p>
              <p class="price">￥{{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h5 class="guest__you__like">热门推荐</h5>

    <van-divider class="divider">实时推荐你的心心念念</van-divider>

    <van-list
      v-model="recommendProductLoading"
      :finished="recommendProductFinished"
      finished-text="没有更多了"
      class="recommend__grid__group"
      @load="queryRecommendProduct"
    >
      <div class="waterfall">
        <div v-for="flag in [true, false]"
             :key="flag"
             :class="flag ? 'left' : 'right'">
          <div
            v-for="(item, i) in flag ? waterfallLeft : waterfallRight"
            :key="item.productName + i"
            class="recommend__grid__item"
            @click="navigateToProductDetails(item)"
          >
            <van-image :src="item.imgLogo"
                       class="imgLogo" />
            <p class="price">¥ {{ (item.priceExhibition * 1).toFixed(2) }}</p>
            <p class="title">{{ item.productName }}</p>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import homeApi from '@/api/homeApi'
import commonApi from '@/api/commonApi'
import cache from '@/utils/cache'
import getGeolocation from '@/utils/getGeolocation'
import cancelsystemApi from '@/api/cancelsystem'// 获取入驻审核状态
// import axios from 'axios'

export default {
  components: {},
  data() {
    return {
      time: new Date(),
      bannerList: [],
      recommendProductLoading: true,
      recommendProductFinished: false,
      recommendProductList: [],
      recommendProductLoadingConfig: {
        type: 1,
        page: 1,
        size: 8
      },
      businessTypeList: [],
      newWindowList: [],
      newWindowListThree: [],
      newWindowListFour: [],
      newWindowListFive: [],
      newWindowListOneToOne: [],
      advertise: [],
      geolocationAddress: '定位中…',
      announcementList: [],
      nearbyMerchantList: [],
      geolocation: {}
    }
  },
  computed: {
    waterfallLeft() {
      return this.recommendProductList.filter((v, index) => index % 2 === 0)
    },
    waterfallRight() {
      return this.recommendProductList.filter((v, index) => index % 2 !== 0)
    }
  },
  async mounted() {
    this.queryAdvertList()
    this.queryBusinessType()
    this.queryRecommendProduct()
    this.queryWindowInfo()
    this.homeAdvertise()
    this.queryAnnouncement()

    let geolocation = this.$store.getters.geolocation
    try {
      if (!geolocation.address) {
        geolocation = await getGeolocation()
        this.$store.commit('SET_GEOLOCATION', geolocation)
      }
      this.geolocationAddress = geolocation.address
      this.geolocation = geolocation
    } catch (error) {
      console.log(error)
    }
    this.queryNearbyMerchant()
    // 获取入驻审核状态
    // cancelsystemApi.querysuer().then(res => {
    //   console.log(res[0], '11111111111')
    //   // res[0].type
    //   cache.setType(1)
    //   // res[0].auditStatus ? res[0].auditStatus : ''
    //   cache.setStatus(1)
    //   console.log(res[0].type, '---------')
    // })
  },
  methods: {
    clickImg(item) {
      if (item == 1) {
        window.open('https://ecam.spdb.com.cn/ecam/page/1526153051902199632/a7991c?cl_md=&cl_sh=11855&cl_sr=10373&cl_orgid=730')
      } else if (item == 2) {
        this.$router.push({
          path: '/gaprefecture'
        })
      } else if (item == 3) {
        window.open('https://www.hsh.139sc.com/fpg/')
      } else if (item == 4) {
        // window.open({
        //   path: '/productDetails',
        //   query: {
        //     id: '1387602939426484226'
        //   }
        // })
        window.open('https://www.hsh.139sc.com/h5mall/index.html#/productDetails?id=1387602939426484226')
      } else if (item == 5) {
        // window.open({
        //   path: '/productDetails',
        //   query: {
        //     id: '1386563031899418626'
        //   }
        // })
        window.open('https://www.hsh.139sc.com/h5mall/index.html#/productDetails?id=1386563031899418626')
      } else if (item == 6) {
        // window.open({
        //   path: '/productDetails',
        //   query: {
        //     id: '1371716466823245826'
        //   }
        // })
        window.open('https://www.hsh.139sc.com/h5mall/index.html#/productDetails?id=1371716466823245826')
      }
    },
    // 搜索
    queryAnnouncement() {
      const data = {
        pageSize: 10,
        showHome: 1,
        pageNum: 1
      }
      homeApi.queryAnnouncement(data).then((res) => {
        this.announcementList = res.records
      })
    },
    // 查询附近商家
    queryNearbyMerchant() {
      // const geolocation = this.$store.getters.geolocation
      console.log(this.geolocation, '???')
      const data = {
        lat: this.geolocation?.point?.lat,
        lng: this.geolocation?.point?.lng,
        pageNum: 1,
        pageSize: 3,
        scope: 5000
      }
      homeApi.queryNearbyMerchant(data).then((res) => {
        console.log(res)
        this.nearbyMerchantList = res.records
      })
    },
    // 点击公告
    onClickAnnouncement() {
      this.$router.push({ name: 'announcement' })
    },

    /**
     * @desc 处理橱窗跳转页面的判断
     * @param [url] style为3、4、5时，type 1商铺id、2链接地址、3商铺id;style为2时 业务url
     * @param [type] style为3、4、5时，type 1商品详情、2链接、3商铺
     * @param [style] 类型
     * @date 20201206
     * */
    windowNavgiter(url, type, style) {
      console.log('url=' + url + '&&type=' + type + '&&style=' + style)
      const user = this.$store.getters.user
      // type style为3、4、5时，type 1商品详情、2链接、3商铺
      // url style为3、4、5时，type 1商铺id、2链接地址、3商铺id;style为2时 业务url
      if (style === 3 || style === 4 || style === 5) {
        switch (type) {
          case 1:
            this.$router.push({ name: 'productDetails', query: { id: url }})
            break
          case 2:
            if (user.phone) {
              this.navigateUrl(url)
            } else {
              this.$toast('请先登录！')
              this.$router.push({ name: 'login' })
            }
            break
          case 3:
            this.$router.push({ name: 'shop', query: { merchantId: url }})
            break
        }
      }
      // style为2时 业务url
      if (style === 2) {
        switch (type) {
          case 1:
            this.$router.push({ name: 'productDetails', query: { id: url }})
            break
          case 2:
            if (user.phone) {
              this.navigateUrl(url)
            } else {
              this.$toast('请先登录！')
              this.$router.push({ name: 'login' })
            }
            break
          case 3:
            this.$router.push({ name: 'shop', query: { merchantId: url }})
            break
        }
      }
      if (style === 1) {
        this.$router.push({ name: 'shopWindowList', query: { windowId: url }})
      }
    },
    /**
     * @desc 首页橱窗信息
     * @date 20201206
     * */
    queryWindowInfo() {
      const data = {}
      homeApi.queryHomeWindowInfo(data).then((res) => {
        this.newWindowList.push(...res)
        this.newWindowList.forEach((item, index) => {
          if (item.style === 3) {
            this.newWindowListThree.push(item)
          } else if (item.style === 4) {
            this.newWindowListFour.push(item)
          } else if (item.style === 5) {
            this.newWindowListFive.push(item)
          } else if (item.style === 1 || item.style === 2) {
            this.newWindowListOneToOne.push(item)
          }
        })
      })
    },
    /**
     * @desc 查询首页的广告
     * @date 20201206
     */
    homeAdvertise() {
      const data = {
        advertType: 2,
        tabId: 1000,
        status: 'Y'
      }
      homeApi.queryAdvert(data).then((res) => {
        if (res[0]) {
          this.advertise = res[0].brAdvertlist
        }
      })
    },
    // 查询广告banner列表
    queryAdvertList() {
      const data = {
        advertType: 1, // 1首页轮播图，2首页广告，3分类轮播，4首页弹窗，5悬浮广告,
        tabId: 1000, // 首页1000，分类页1001，消息1002，购物车1003，我的1004
        status: 'Y'
      }
      homeApi.queryAdvert(data).then((res) => {
        console.log(res[0])
        this.bannerList = res[0].brAdvertlist
      })
    },
    // 查询业务列表
    queryBusinessType() {
      const params = {
        showTypes: '1,3'
      }
      homeApi.queryBusinessType(params).then((res) => {
        this.businessTypeList = res
      })
    },

    // 查询推荐商品
    queryRecommendProduct() {
      commonApi.queryRecommendProduct(this.recommendProductLoadingConfig).then((res) => {
        this.recommendProductList.push(...res.data)
        this.recommendProductLoadingConfig.page++
        this.recommendProductLoading = false
        if (this.recommendProductList.length === res.count * 1) {
          this.recommendProductFinished = true
        }
      })
    },

    navigateToProductDetails(val) {
      // console.log(val)
      this.$router.push({ name: 'productDetails', query: { id: val.productId }})
    },
    // 业务分类的跳转
    async businessNavigate(val) {
      const user = this.$store.getters.user
      if (user.phone) {
        switch (val.businessType) {
          case 1:
            this.$router.push({ name: 'shop', query: { merchantId: val.businessUrl }})
            break
          case 2:
            this.$router.push({ name: 'productDetails', query: { id: val.businessUrl }})
            break
          case 3:
            this.navigateUrl(val.businessUrl)
            break
        }
      } else {
        this.$toast('请先登录！')
        this.$router.push({ name: 'login' })
      }
    },
    // banner跳转
    bannerNavigate(val) {
      if (val.linkType === '1') {
        this.$router.push({ name: 'shop', query: { merchantId: val.link }})
      } else if (val.linkType === '2') {
        this.$router.push({ name: 'productDetails', query: { id: val.link }})
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
        window.location.href = `${url}?token=${token}&phone=${phone}&ac_id=${ac_id}`
      } else {
        window.location.href = `${url}`
      }
    }
  }
}
</script>

<style lang="less" scoped>
.timeLimitBox{
  padding:20px 20px 50px 20px;
  // height: 550px;
  margin: 50px 20px 0;
  margin-top: 15px;
  border-radius: 32px;
  background: url('../../assets/img/home/cuxiaobj.png')no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
  .leftTitles{
    height: 65px;
    background: url('../../assets/img/home/cuxiao.png')no-repeat 0 10px;
    background-size: 90% auto;
  }
  .rightTitles{
    display: flex;
    flex-direction:  row-reverse;
    text-align: right;
    align-items: center;
    .textOne{
      color: white;
      margin-right: 20px;
      font-size: .8rem;
    }
    .textTwo{

    }
    .timebox{
          display: flex;
          justify-content: center;
          flex-direction: row;
        }

  }
  .colon {
    margin: 0 4px;
    color: white;
  }
  .block {
    display: inline-block;
    width: 45px;
    border-radius: 10px;
    color: black;
    font-size: .8rem;
    text-align: center;
    background-color: white;
  }
  .imagBox{
    margin-top: 20px;
  }
  .imagBoxCenter{
    background: white;
    border-radius: 20px;
    // height: 380px;
    margin: 0 5px;
    overflow: hidden;
  }
  .img{
    width: 100%;
    height:100%;
  }
  .imagBoxOne{
    height: 260px;
    overflow: hidden;
  }
  .imagBoxTwo{
    padding: 40px 10px 15px 10px;
    display: block;
  }
  .percentageText{

  }
  /deep/.van-progress__pivot{
    line-height: 1.4;
  }
  .imagBoxTherr{
    color: #AD0EA2;
    font-size: .7rem;
    padding:30px 10px 15px 10px;
  }
  .imagBoxTherr span{
    font-size: 1rem;
    font-weight: b;
  }
  .imagBoxTherr s{
    font-size: .3rem;
    color: #8D8D8D;
    margin-left: 20px;
  }
}
.recommendBox {
  padding-top: 30px;
  background-color: #fff;
  .titles {
    font-size: 38px;
    padding: 5px 30px 25px 20px;
    .rightBox {
      text-align: right;
      padding-right: 25px;
    }
  }
  .imagBox {
    .poorImage {
      padding-left: 20px;
      .leftBoxs {
        width: 96%;
        height: 530px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
      .leftBoxs {
        width: 95%;
        height: 530px;
        border-radius: 20px;
        overflow: hidden;
        img {
          width: 100%;
          // height: 100%;
        }
      }
    .rightBoxs {
      .top {
        width: 95%;
        height: 255px;
        border-radius: 20px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .top:last-child{
        margin-top: 20px;
      }
      .bottom {
        width: 95%;
        height: 180px;
        margin-top: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.NoticeTitlew{
  flex-shrink: 0;
  margin-right: 10px;
  font-weight: bold;
}
.NoticeBox{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.location {
  display: flex;
  align-items: center;
  .van-icon {
    margin-left: 10px;
  }
  padding-right: 30px;
}
.outWindowBox {
  width: 100%;
  .innerBox {
    width: 100%;
    margin: 0 auto;
    float: left;
    background-color: #fff;
    .rightBox {
      width: 45%;
      margin: 20px 0 20px 20px;
      border-radius: 10px;
      float: left;
      .topBox {
        width: 100%;
        height: 70px;
        display: flex;
        .leftsBox {
          width: 45%;
          color: #000;
          font-size: 38px;
          margin: 5px 0 0 15px;
        }
        .rightsBox {
          margin-top: 10px;
          width: 45%;
          flex-direction: row;
          .innersBox {
            margin-left: 20px;
            width: 160px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 28px;
            color: #96969b;
          }
        }
      }
      .contetBox {
        display: flex;
        .lfBox {
          width: 100%;
          margin: 30px 0 0 15px;
          flex-direction: row;
        }
      }
    }
  }
}
/deep/ .banner_swipe {
  // margin:0 30px;
  margin: 0 30px;
  // border-radius: 10px;
  // overflow: hidden;
  .van-image {
    width: 100%;
    height: 400px;
    // border-radius: 10px;
    // overflow: hidden;
  }
  img {
    border-radius: 20px;
  }
}

/deep/ .van-notice-bar {
  margin: 0 40px;
  height: 2.2rem;
  border-radius: 100px;
  .notice-swipe {
    height: 40px;
    line-height: 40px;
    color: #A8A8A8;
  }
  .van-icon-volume-o {
    min-width: 1.4rem;
    background: #AD0EA2;
    color: #fff;
    border-radius: 20px;
    padding:11px 0;
    margin-right: 20px;
    font-size: .8rem;
    display: inline-block;
    text-align: center;
  }
  .van-swipe-item{
    text-overflow: ellipsis;
  }
}

.business__type {
  padding: 10px 0;
  /deep/ .van-grid-item__content {
    padding: 20px;
  }
  .van-image {
    width: 100px;
  }
  .title {
    margin: 0;
    width: 120px;
    text-align: center;
    font-size: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.waterfall {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .left {
    margin-right: 10px;
    width: 50%;
  }
  .right {
    margin-left: 10px;
    width: 50%;
  }
  .recommend__grid__item {
    width: 100%;
    background: #ffffff;
    margin-bottom: 20px;
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
  }
}

.guest__you__like {
  margin: 20px 0 10px;
  text-align: center;
  font-size: 48px;
  color: #f38a41;
}

.divider {
  border-color: #999;
  font-size: 24px;
  margin: 0;
}
.actityBox {
  background-color: #fff;
  padding:50px 10px 0;
  .titles {
    font-size: 38px;
    padding: 15px 30px 15px 20px;
  }
  .imagBox {
    .van-image {
      height: 100%;
      margin:0 5px;
    }
  }
}
.poorBox {
  padding-top: 10px;
  background-color: #fff;
  .titles {
    font-size: 38px;
    padding: 5px 30px 25px 20px;
    .rightBox {
      text-align: right;
      padding-right: 25px;
    }
  }
  .imagBox {
    .poorImage {
      padding-left: 20px;
      .leftBoxs {
        width: 95%;
        height: 370px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .centerBox {
      .leftBoxs {
        width: 95%;
        height: 370px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .rightBoxs {
      .top {
        width: 95%;
        height: 180px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .bottom {
        width: 95%;
        height: 180px;
        margin-top: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.vips {
  padding-top: 10px;
  background-color: #fff;
  .titles {
    font-size: 38px;
    padding: 5px 30px 15px 20px;
    .rightBox {
      text-align: right;
      padding-right: 25px;
    }
  }
  .poorImage {
    padding-left: 20px;
    .leftBox {
      width: 95%;
      height: 370px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .centerBoxes {
    .topBox {
      width: 95%;
      height: 180px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .btops {
      width: 95%;
      height: 180px;
      margin-top: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .leftBoxes {
    .topBox {
      width: 95%;
      height: 180px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .btops {
      width: 95%;
      height: 180px;
      margin-top: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.adBanner {
  width: 100%;
  height: 250px;
  margin: 20px 0 20px 0;
  background-color: #fff;
  .adImage {
    width: 92%;
    margin: 0 auto;
    .van-image {
      margin-top: 15px;
      width: 100%;
      height: 200px;
    }
  }
}
.location {
  font-size: 34px;
  margin: 30px 20px;
  .van-icon-location-o {
    font-size: 42px;
  }
  span {
    padding-left: 10px;
  }
}

.near_merchant_title {
  display: flex;
  justify-content: space-between;
  margin: 40px 20px;
  .line {
    height: 46px;
    width: 10px;
    border-radius: 10px;
    background: #fd4340;
  }
  .title {
    font-size: 36px;
    padding-left: 20px;
  }
}
.near_merchant_details {
  display: flex;
  margin: 0 40px;
  margin-bottom: 40px;
  .van-image {
    width: 180px;
    height: 180px;
    border-radius: 10px;
    overflow: hidden;
  }
  .details {
    margin-left: 20px;
    width: 600px;
    .name {
      font-size: 36px;
      color: #4a4a4a;
      font-weight: bold;
      display: flex;
      justify-content: space-between;

    }
    .product_list_scroll {
      width: 600px;
      overflow-x: auto;
      .product_list {
        .product {
          margin-right: 20px;
          margin-top: 20px;
          font-size: 40px;
          display: inline-block;
          .price {
            color: #eb1515;
            font-size: 32px;
          }
          p {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 180px;
            height: 50px;
          }
        }
      }
    }
    .product_list_scroll::-webkit-scrollbar {
      width: 0;
    }
    .discount {
      div {
        border: solid 2px #fab579;
        color: #fab579;
        border-radius: 8px;
        padding: 4px 10px;
        font-size: 24px;
        margin-top: 10px;
      }
    }
  }
}
</style>

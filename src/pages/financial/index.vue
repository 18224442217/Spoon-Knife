<template>
  <div>
    <!-- <van-nav-bar title="金融专区" />    -->
    <van-tree-select :items="items"
                     :main-active-index.sync="active"
                     height="55vw"
                     @click-nav="secondCategory">
      <template #content>

        <div>

          <van-swipe :autoplay="3000"
                     indicator-color="white">
            <van-swipe-item v-for="item of bannerList"
                            :key="item.brAdvertId">
              <van-image :src="item.url"
                         fit="cover"
                         @click="categroyBannerNavigate(item)"
              />
            </van-swipe-item>
          </van-swipe>
          <div class="classList" v-for="(ct, i) in category1"
               :key="i">
            <h4 v-if="ct.ymBProductClassificationList.length">{{ ct.name }}</h4>

            <van-grid :border="false"
                      :column-num="3">
              <van-grid-item v-for="(item, i) in ct.ymBProductClassificationList"
                             :key="i"
                             @click="jumperDetail(item)">
                <van-image :src="item.classLogo" />
                <div class="nameBox">{{ item.name }}</div>
              </van-grid-item>
            </van-grid>
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import categoryApi from '@/api/categoryApi'
import cache from '@/utils/cache'
import commonApi from '@/api/commonApi'
export default {
  data() {
    return {
      active: 0,
      index: 0,
      bannerList: [],
      category1: '',
      items: []
    }
  },
  async created() {
    await this.getCategory()
    await this.secondCategory(0)
    console.log(this.items)
    console.log(this.category1)
    this.queryCategroyBanner(this.items[0].fatherId)
  },
  methods: {
    /**
     * @desc 查询分类banner列表
     * @param 点击携带的商品的参数
     * @date 20201127
     * */
    queryCategroyBanner(tabId) {
      const data = {
        advertType: 8, // 3分类轮播
        tabId,
        status: 'Y'
      }
      categoryApi.queryAdvert(data)
        .then(res => {
          this.bannerList = res[0]?.brAdvertlist || []
        })
    },
    /**
     * @desc 点击商品图片进入商品列表的页面
     * @param 点击携带的商品的参数
     * pathId 链接或者店铺id或者商品id。type 1.普通分类 2.商品 3.链接分类 4.商铺
     * @date 20201127
     * */
    jumperDetail(param) {
      switch (param.type) {
        case 1:// 跳转到普通分类
          this.$router.push({
            path: '/goodslist',
            query: {
              categoryId: param.classificationId
            }
          })
          break
        case 2:// 跳转到商品
          this.$router.push({
            path: '/productDetails',
            query: {
              id: param.pathId
            }
          })
          break
        case 3:// 链接分类
          this.navigateUrl(param.pathId)
          break
        case 4:// 跳转到商铺
          this.$router.push({
            path: '/shop',
            query: {
              merchantId: param.pathId
            }
          })
          break
      }
    },
    /**
     * @desc 链接跳转的处理
     * @param 点击携带的url
     * @date 20210104
     * */
    async navigateUrl(url) {
      const user = this.$store.getters.user
      // 移动业务的跳转
      if (url.startsWith('http://wap.sc.10086.cn')) {
        if (cache.getCookie('isSiChuan') * 1) {
          const sm4 = await commonApi.sm4({ 'plainText': 15183870359 })
          window.location.replace(`${url}&info=${sm4}`)
        } else {
          this.$toast('亲，您不是四川移动用户暂不能正常使用哦！')
        }
      } else if (url.startsWith('https://www.hsh.139sc.com/h5/')) {
        if (cache.getCookie('isSiChuan') * 1) {
          const token = cache.getToken()
          const phone = user.phone
          const ac_id = 'h5mall_home'
          window.location.replace(`${url}?token=${token}&phone=${phone}&ac_id=${ac_id}`)
        } else {
          this.$toast('亲，您不是四川移动用户暂不能正常使用哦！')
        }
      } else {
        window.location.replace(`${url}`)
      }
    },
    /**
     * @description 获取商品的分类
     * @date 20201124
     * @funName getCategory
     */
    getCategory() {
      const params = {
        fatherId: 1,
        classType: 2,
        status: 1,
        phone: cache.getCookie('phone')
      }
      return categoryApi.queryFinancialCategory(params)
        .then(res => {
          this.items = res.map(v => {
            return {
              text: v.name,
              fatherId: v.classificationId,
              classType: v.classType
            }
          })
        })
    },
    /**
     * @description 获取2级分类的目录和列表
     * @param {type} index:点击左边分类的下标的值
     * @date 20201125
     * @funName secondCategory
    */
    secondCategory(index) {
      this.index = index
      const param = {
        fatherId: this.items[index].fatherId,
        phone: cache.getCookie('phone') || ''
      }
      return categoryApi.queryFinancialSecondCategory(param)
        .then(res => {
          this.category1 = res
          if (res.length) this.queryCategroyBanner(res[0].fatherId)
        })
    },
    /**
     * @description banner跳转
     * @param {val} val:点击携带的参数
     * @date 20201207
     * @funName categroyBannerNavigate
     */
    categroyBannerNavigate(val) {
      if (val.linkType === '1') this.$router.push({ name: 'shop', query: { merchantId: val.link }})
      else if (val.linkType === '1') this.$router.push({ name: '', query: { id: val.link }})
      else this.categroyUrl(val.link)
    },
    /**
     * @description 链接跳转的处理
     * @param {url} val:地址
     * @date 20201207
     * @funName categroyUrl
     */
    async categroyUrl(url) {
      const user = this.$store.getters.user
      // 移动业务的跳转
      if (url.startsWith('http://wap.sc.10086.cn')) {
        if (cache.getCookie('isSiChuan') * 1) {
          const sm4 = await commonApi.sm4({ 'plainText': 15183870359 })
          window.location.replace(`${url}&info=${sm4}`)
        } else {
          this.$toast('亲，您不是四川移动用户暂不能正常使用哦！')
        }
      } else if (url.startsWith('https://www.hsh.139sc.com/h5/')) {
        if (cache.getCookie('isSiChuan') * 1) {
          const token = cache.getToken()
          const phone = user.phone
          const ac_id = 'h5mall_home'
          window.location.replace(`${url}?token=${token}&phone=${phone}&ac_id=${ac_id}`)
        } else {
          this.$toast('亲，您不是四川移动用户暂不能正常使用哦！')
        }
      } else {
        window.location.replace(`${url}`)
      }
    }
  }
}
</script>

<style scoped>
.van-grid-item__content{
  padding: 0 !important;
}
.van-image{
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
}
.classList h4{
  font-size: 1rem;
  padding: 0 20px;
}
.classList{
  margin: 20px 20px;
  padding: 30px 0 0 0;
  border-radius: 10px;
  background-color: #fff;
}
.van-tree-select__content{
  background-color: #f8f8f8;
}
.van-tree-select__nav{
  background-color: #f0f0f0;
}
.van-sidebar-item,.van-sidebar-item--select:active {
    background-color: #f0f0f0;
}
.van-sidebar-item--select{
    background-color: #f8f8f8;
}
.van-tree-select {
  height: 180vw !important;
}
.van-swipe{
    margin:0 20px;
}
.van-swipe .van-image{
    width: 100%;
    height: 300px;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 20px;
}
.nameBox {
  width: 140px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  margin-top: 30px;
  font-size: .9rem;
  color: #4A4A4A;
}
</style>

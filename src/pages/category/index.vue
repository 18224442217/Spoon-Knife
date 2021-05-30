<template>
  <div>
    <van-nav-bar title="商品分类" />
    <van-tree-select :items="items"
                     :main-active-index.sync="active"
                     height="55vw"
                     @click-nav="secondCategory">
      <template #content>

        <div v-if="index === 0">
          <!--商品的轮播视图部分-->
          <van-swipe v-if="active == 0"
                     :autoplay="3000"
                     indicator-color="white">
            <van-swipe-item v-for="item of bannerList"
                            :key="item.brAdvertId">
              <van-image :src="item.url"
                         fit="cover"
                         @click="categroyBannerNavigate(item)"
              />
            </van-swipe-item>
          </van-swipe>
          <h4>热门分类</h4>
          <van-grid :border="false"
                    :column-num="3">
            <van-grid-item v-for="(item, i) in category"
                           :key="i"
                           @click="jumperDetail(item)">
              <van-image :src="item.classLogo" />
              <div class="nameBox">{{ item.name }}</div>
            </van-grid-item>
          </van-grid>
        </div>

        <div v-if="active === index">
          <!--商品的轮播视图部分-->
          <van-swipe v-if="active != 0"
                     :autoplay="3000"
                     indicator-color="white">
            <van-swipe-item v-for="item of bannerList"
                            :key="item.brAdvertId">
              <van-image :src="item.url"
                         fit="cover"
                         @click="categroyBannerNavigate(item)"
              />
            </van-swipe-item>
          </van-swipe>
          <div v-for="(ct, i) in category1"
               :key="i">
            <h4>{{ ct.name }}</h4>
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
import Vue from 'vue'
import categoryApi from '@/api/categoryApi'
import cache from '@/utils/cache'
import commonApi from '@/api/commonApi'
import { TreeSelect } from 'vant'
import { Toast } from 'vant'
export default {
  data() {
    return {
      active: 0,
      index: 0,
      category: [],
      bannerList: [],
      category1: '',
      items: []
    }
  },
  created() {
    this.getCategory()
    //  获取推荐分类的接口
    this.hotCategory()
    this.queryCategroyBanner()
  },
  methods: {
    /**
     * @desc 查询分类banner列表
     * @param 点击携带的商品的参数
     * @date 20201127
     * */
    queryCategroyBanner() {
      const data = {
        advertType: 3, // 3分类轮播
        tabId: 1000,
        status: 'Y'
      }
      categoryApi.queryAdvert(data)
        .then(res => {
          if (res.length === 0) {
            return false
          } else {
            this.bannerList = res[0].brAdvertlist
          }
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
     * @description 获取推荐分类的接口
     * @date 20201125
     * @funName hotCategory
     */
    hotCategory() {
      categoryApi.hotCategry('')
        .then(res => {
          this.category = res
        })
    },
    /**
     * @description 获取商品的分类
     * @date 20201124
     * @funName getCategory
     */
    getCategory() {
      categoryApi.allCategory('')
        .then(res => {
          var array = []
          // 推荐分类固定写死的
          array.push({ text: '推荐分类', fatherId: '', classType: '' })
          for (var i = 0; i < res.length; i++) {
            array.push({ text: res[i].name, fatherId: res[i].classificationId, classType: res[i].classType })
          }
          this.items = array
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
        fatherId: this.items[index].fatherId
      }
      categoryApi.getSecondCategry(param)
        .then(res => {
          this.category1 = res
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
.van-tree-select {
  height: 180vw !important;
}
.van-swipe .van-image{
    width: 100%;
    height: 400px;
}
.nameBox {
  width: 140px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}
</style>

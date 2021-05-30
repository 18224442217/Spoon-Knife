<template>
  <div class="body">
    <van-search
      v-model="searchForm.queryName"
      show-action
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onHandlerSearch"
    >
      <template #action>
        <div @click="onHandlerSearch">搜索</div>
      </template>
    </van-search>
    <p class="geolocation"
       @click="$router.push({name:'location'})">我的位置：{{ geolocationAddress }} ></p>

    <van-dropdown-menu>
      <van-dropdown-item v-model="searchForm.classType"
                         :options="classification"
                         @change="onDropdownChange"/>
      <van-dropdown-item v-model="searchForm.scope"
                         :options="scopeOptions"
                         @change="onDropdownChange" />
    </van-dropdown-menu>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onSearch"
    >
      <div
        v-for="(merchant,index) of nearbyMerchantList"
        :key="index"
        class="near_merchant_details"
      >
        <van-image
          :src="merchant.logo"
          fit="scale-down"
          @click=" $router.push({ name: 'shop', query: { merchantId: merchant.merchantId } }) "
        />
        <div class="details">
          <p class="name"
             @click=" $router.push({ name: 'shop', query: { merchantId: merchant.merchantId } }) ">
            <span>{{ merchant.name }}</span>
            <span v-if="merchant.distance"
                  style="font-weight:normal;color:#999">{{ merchant.distance*1>1000?`${(merchant.distance/1000).toFixed(2)}km`:`${merchant.distance}m` }}</span>
          <!-- <span>{{ merchant.distance }}m</span> -->
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
                <van-image :src="product.imgLogo" />
                <p>{{ product.productName }}</p>
                <p class="price">￥{{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list>

  </div>
</template>
<script>
import getGeolocation from '@/utils/getGeolocation'
import homeApi from '@/api/homeApi'
import merchantenterApi from '@/api/merchantenter'
export default {
  data() {
    return {
      searchForm: {
        lat: '',
        lng: '',
        pageSize: 10,
        pageNum: 0,
        queryName: '',
        classType: '',
        scope: ''
      },
      loading: false,
      finished: true,
      geolocationAddress: '定位中…',
      classification: [{ text: '类型', value: '' }],
      scopeOptions: [
        { text: '区域', value: '' },
        { text: '500m', value: 500 },
        { text: '1km', value: 1000 },
        { text: '3km', value: 2000 },
        { text: '5km', value: 5000 }
      ],
      nearbyMerchantList: []

    }
  },
  async mounted() {
    let geolocation = this.$store.getters.geolocation
    this.queryMerchantClassification()
    try {
      if (!geolocation.address) {
        geolocation = await getGeolocation()
        this.$store.commit('SET_GEOLOCATION', geolocation)
      }
      this.geolocationAddress = geolocation.address
      this.searchForm.lat = geolocation.point.lat
      this.searchForm.lng = geolocation.point.lng
    } catch (error) {
      console.log(error)
    }
    this.finished = false
  },
  methods: {
    onSearch() {
      const data = {}
      this.searchForm.pageNum += 1
      for (const key in this.searchForm) {
        if (this.searchForm[key]) data[key] = this.searchForm[key]
      }

      homeApi.queryNearbyMerchant(data)
        .then((res) => {
          console.log(this.searchForm.pageNum)
          this.loading = false
          if (this.nearbyMerchantList.length >= res.total) this.finished = true
          this.nearbyMerchantList.push(...res.records)
        })
    },
    queryMerchantClassification() {
      merchantenterApi.queryclass({ fatherId: 0, status: 1 })
        .then(res => {
          this.classification.push(...res.map(v => ({ text: v.name, value: v.merchantClassificationId })))
        })
    },
    onDropdownChange() {
      this.searchForm.pageNum = 0
      this.nearbyMerchantList = []
      this.onSearch()
    },
    onHandlerSearch() {
      this.searchForm.pageNum = 0
      this.nearbyMerchantList = []
      this.onSearch()
    }
  }
}
</script>

<style lang="less" scoped>
.geolocation{
  color:#999;
  margin-left:40px;
  background: #fff;
}
/deep/ .van-dropdown-menu{
  .van-dropdown-menu__bar{
    box-shadow: none;
  }
  .van-dropdown-menu__item{
  justify-content: flex-start;
  flex: none;
  margin-left: 30px;
  margin-right: 100px;
  font-size: 24px;
  .van-ellipsis{
    font-size: 34px;
    color: #666;
  }
}
}

.near_merchant_details {
  display: flex;
  margin: 0 20px;
  margin-top: 20px;
  margin-bottom: 0;
  padding:20px;
  background: #fff;
  border-radius: 20px;
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
          display: inline-block;
          .price {
            color: #eb1515;
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
.body{
  background: #f7f7f7;
}
</style>

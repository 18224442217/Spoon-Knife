<template>
  <div>
    <header>
      <van-icon name="arrow-left"
                @click="$router.go(-1)"/>
      <van-icon name="search" />
      <input v-model="keyword"
             type="text"
             placeholder="请输入详细地址">
    </header>
    <p class="location">
      <span>当前定位：</span>
      <span>{{ geolocationAddress }}</span>
    </p>
    <div class="line"/>

    <van-cell-group>
      <van-cell v-for="item in addressList"
                :title="item.title"
                :label="item.address"
                :key="item.uid"
                @click="setLocation(item)"/>
    </van-cell-group>
    <baidu-map :center="center"
               :zoom="zoom"
               @ready="handler">
      <bm-view class="map"/>
      <bm-local-search :panel="false"
                       :keyword="keyword"
                       location="成都"
                       @searchcomplete="searchResult"/>
    </baidu-map>
  </div>
</template>
<script>
import getGeolocation from '@/utils/getGeolocation'
export default {
  data() {
    return {
      location: {},
      center: { lng: 35.86166, lat: 104.195397 },
      keyword: '',
      zoom: 3,
      addressList: [],
      geolocationAddress: '定位中…'
    }
  },
  watch: {
    keyword(val) {
      if (!val) this.addressList = []
    }
  },
  mounted() {

  },
  methods: {
    handler(val) {
      // navigator.geolocation.getCurrentPosition(async(val) => {
      //   this.center = {
      //     lng: val.coords.longitude,
      //     lat: val.coords.latitude
      //   }
      // })
      getGeolocation()
        .then(res => {
          this.geolocationAddress = res.address
          this.center = {
            lng: res.point.lng,
            lat: res.point.lat
          }
          this.$store.commit('SET_GEOLOCATION', res)
        })
    },
    searchResult(val) {
      if (val) this.addressList = val.Hr
    },
    setLocation(val) {
      this.location = val
      this.$store.commit('SET_GEOLOCATION', val)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
header{
  display: flex;
  align-items: center;
  padding-right: 26px;
  padding-left: 40px;
  margin-top: 20px;
  position: relative;
  .van-icon{
    font-size: 52px;
  }
  input{
    height: 80px;
    border-radius: 40px;
    border:1px solid #979797;
    padding-left: 90px;
    margin-left: 20px;
    width: 750px;
    font-size: 34px;
  }
  .van-icon-search{
    position: absolute;
    margin-left: 100px;
    font-size: 42px;
    color: #999;
  }

}
.location{
  margin-top: 60px;
  margin-left: 40px;
  font-size: 32px;
}
.line{
  height: 1px;
  width: 100%;
  background: #CCCCCC;
  margin-top: 40px;
}
</style>

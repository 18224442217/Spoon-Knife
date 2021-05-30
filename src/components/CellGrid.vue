<template>
  <van-row class="content"
           type="flex"
           align="center"
           justify="space-between">

    <van-col span="12"
             v-for="(item,index) in list"
             :key="index">

      <van-grid :column-num='1'
                :border='false'>

        <router-link :to="{path:'goods',query:{goodsId:item.goodsId}}">
          <van-image fit='cover'
                     lazy-load
                     :src="'http://www.goinphoto.com'+item.originalImg" />
        </router-link>

        <p class="title">{{item.goodsName}}</p>

        <div class="bottom">
          <div @click="toShop">
            <span class="price">{{item.shopPrice}}</span>
            <span>元</span>
          </div>

          <div class="more">相似推荐</div>
        </div>

      </van-grid>

    </van-col>

  </van-row>

</template>

<script>
import Request from '../utils/request'

export default {
  name: 'CellGrid',
  props: {
    list: Array
  },
  mounted () {

  },
  computed: {
  },
  methods: {
    toShop () {
      console.log('toShop');
    },
    showMore () {
      console.log('showMore');
    }
  }

}
</script>

<style lang="less" scoped>
.content {
  flex-wrap: wrap;
  padding: 0 10px;
}

.van-grid {
  margin: 5px;
  padding: 10px;
  background: #fff;
  border: 1px solid #efefef;
  border-radius: 4px;
  .van-grid-item {
    border-radius: 4px;
    border: 1px solid #ededed;
  }
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
  color: #999;
  font-size: 12px;
  display: flex;
  .price {
    color: red;
    font-size: 16px;
  }
  .more {
    border: 1px solid #dfdfdf;
    color: #999;
    border-radius: 4px;
    padding: 4px 10px;
    font-size: 12px;
  }
}

.title {
  width: 100%;
  text-align: center;
  margin: 5px 0;
}
</style>
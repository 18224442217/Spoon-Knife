<template>
  <div class="gahome">
    <div class="nav">
      <van-row type="flex"
               justify="space-around"
               gutter="1"
               class="nav-top"
      >
        <van-col v-for="item in navlist"
                 :key="item.name"
                 span="5"
                 class="nav-list3"><img :src="item.classLogo"
                                        class="nav-img"
                                        @click="particulars(item.classificationId)">
        <p class="nav-font">{{ item.name }}</p></van-col>
      </van-row>
    </div>
    <div class="recommend">
      <div class="recommend-top">
        <img src="../../assets/img/gaprefecture/hotSale.png"
             alt=""
             class="recommend-img">
        <img src="../../assets/img/more.png"
             alt=""
             class="more"
             @click="Classification(10)">
      </div>

      <van-row
        class="recommend-list">
        <van-col v-for="(value,index) in recommendlist"
                 :key="index"
                 span="8"
                 class="recommend-list-item"
                 @click="skip(value.productId)">
          <div class="food-img-box">
            <img :src="value.imgLogo"
                 alt=""
                 class="p30"
            >
          </div>

          <p class="recommend-list-title">{{ value.productName }}</p>
          <p class="recommend-list-num">￥{{ (value.priceExhibition*1).toFixed(2) }}</p>

        </van-col>
      </van-row>
      <div v-if="show"
           class="clickmore"
           @click="clickmore"
      >点击展开更多</div>
    </div>
    <div class="recommend1">
      <div class="recommend-top">
        <img src="../../assets/img/dzm1.png"
             alt=""
             class="recommend-img">
        <img src="../../assets/img/more.png"
             alt=""
             class="more"
             @click="Classification(11)">
      </div>

      <van-row class="recommend-list">
        <van-col v-for="(value,index) in recommendlist1"
                 :key="index"
                 span="8"
                 class="recommend-list-item1"
                 @click="skip(value.productId)">
          <div class="food-img-box">
            <img :src="value.imgLogo"
                 alt=""
                 class="p30"
            >
          </div>

          <p class="recommend-list-title">{{ value.productName }}</p>
        <p class="recommend-list-num">￥{{ (value.priceExhibition*1).toFixed(2) }}</p></van-col>

      </van-row>
      <div v-if="show1"
           class="clickmore1"
           @click="clickmore1">点击展开更多</div>
    </div>
    <div v-for="(item,index) in navlist"
         :key="index"
         class="foodlist1">
      <div class="food-left">
        <p class="food-msg">{{ item.name }}</p>
        <p class="food-home">送货到家</p>
        <p><img src="../../assets/img/purchase.png"
                alt=""
                class="purchase"
                @click="particulars(item.classificationId)"></p>
      </div>
      <div class="food-right">
        <van-row>
          <van-col v-for="(value,index) in classlist[item.classificationId]"
                   :key="index"
                   span="8"
                   class="food-list"
                   @click="skip(value.productId)">
            <div class="food-img-box">
              <img :src="value.imgLogo"
                   alt=""
                   class="food-img"
              >
            </div>

            <p class="recommend-list-title1">{{ value.productName }}</p>
            <p class="recommend-list-num">￥{{ (value.priceExhibition*1).toFixed(2) }}</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <van-image v-if="isShowFloatIcon"
               :src="require('../../assets/img/gaprefecture/floatIcon.png')"
               class="floatIcon"
               @click="$router.push({name:'mine'})"
    />
    <!-- <Footer/> -->
  </div>
</template>

<script>
// import Footer from '../../layout/footer'
import querylist from '@/api/gaprefecture'
export default {
  // components: {
  //   Footer
  // },
  data() {
    return {
      navlist: [],
      recommendlist: [],
      recommendlist1: [],
      show: false,
      show1: false,
      classlist: {}

    }
  },
  computed: {
    isShowFloatIcon() {
      const ua = navigator.userAgent
      return ua.toLowerCase().indexOf('hsh') === -1
    }
  },
  created() {
    const data = {
      classType: 3,
      fatherId: 0,
      status: 1
    }
    const datalist = {
      type: 10,
      size: 6,
      page: 1
    }
    const datalist1 = {
      type: 11,
      size: 6,
      page: 1
    }
    querylist.queryclassifylist(data).then(res => {
      this.navlist = res
      this.navlist.forEach(v => {
        this.$set(this.classlist, v.classificationId, '')
        const params = {
          size: 3,
          page: 1,
          categoryId: v.classificationId
        }
        querylist.queryproductlist(params)
          .then(res => {
            if (res.data) {
              this.classlist[v.classificationId] = res.data
              console.log(res.data)
            }
          })
      })
    })
    querylist.querycommoditylist(datalist).then(res => {
      this.recommendlist = res.data
      console.log(res)

      if (this.recommendlist.length === 6) {
        this.show = true
      }
    })
    querylist.querycommoditylist(datalist1).then(res => {
      this.recommendlist1 = res.data
      if (this.recommendlist1.length === 6) {
        this.show1 = true
      }
    })
  },
  methods: {
    Classification(value) {
      this.$router.push({
        name: 'classification',
        query: {
          value
        }
      }
      )
    },
    particulars(value) {
      this.$router.push({
        name: 'particulars',
        query: {
          value
        }
      })
    },
    clickmore() {
      this.show = false

      const datalist = {
        type: 10,
        size: 12,
        page: 1
      }
      querylist.querycommoditylist(datalist).then(res => {
        console.log(res)
        this.recommendlist = res.data
      })
    },
    clickmore1() {
      this.show1 = false
      const datalist = {
        type: 11,
        size: 12,
        page: 1
      }
      querylist.querycommoditylist(datalist).then(res => {
        console.log(res)
        this.recommendlist1 = res.data
      })
    },
    skip(id) {
      this.$router.push({
        name: 'productDetails',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

.gahome {
  width: 100%;
  height: 100%;
  background:#C5261D url(../../assets/img/gabj.png) no-repeat top/100% ;
  padding-top: 650px;
  padding-bottom: 50px;
}
.nav {
  width: 100%;
  padding: 0 20px;
  color: #fff;
  text-align: center;
}
.nav-img{
  display: inline-block;
  width: 120px;
  height: 120px;
  margin-top: 5px;
}

.nav-list3 {
  background: url(../../assets/img/3c.png) no-repeat top/100%;
  height: 200px;
}

.recommend{
  width: 95%;
  margin: 30px auto;
  background: #F5C247;
  padding-bottom: 10px;
  border-radius: 10px;
}
.recommend1{
  width: 95%;
  margin: 30px auto;
  background: #4B61AA;
  padding-bottom: 10px;
  border-radius: 10px;

}
.recommend-list-item{
  height:410px ;
  background: #fff;
  border: 5px solid #F5C247;
  padding: 5px;
  border-radius: 11px;

}
.recommend-list-item1{
  height:410px ;
  background: #fff;
  border: 5px solid #4B61AA;
  padding: 5px;
  border-radius: 11px;

}
.recommend-top{
  width: 100%;
  position: relative;
}
.recommend-img{
  width: 100%;
}
.more{
  width: 20%;
position: absolute;
right: 50px;
top: 20px;
}
.p30{
  width: 230px;
  height: 230px;
}

.recommend-list-title{
  width: 100%;
  height: 84px;
  line-height: 45px;
  overflow: hidden;
  font-size: 30px;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
}
.recommend-list-title1{
  width: 100%;
  height: 75px;
  line-height: 40px;
  overflow: hidden;
  font-size: 30px;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
}
.recommend-list-init{
  font-size: 24px;
  background: #fdeded;
  width: 70%;
  height: 40px;
  color: #E02716;
  text-align: center;
}
.recommend-list-num{
  color: #DF0202;
  margin-top: 12px;
  font-size: 30px;
}
.recommend-list-num-old{
  color: #9e9e9e;
  font-size: 24px;
  text-decoration:line-through;
}
.clickmore{
  width: 300px;
  height: 50px;
  margin: 20px auto;
  font-size: 36px;
  line-height: 50px;
  text-align: center;
  color: #F5C247;
  background: #fff;
  border-radius: 25px;
}
.clickmore1{
    width: 300px;
  height: 50px;
  margin: 20px auto;
  font-size: 36px;
  line-height: 50px;
  text-align: center;
  color: #4B61AA;
  background: #fff;
  border-radius: 25px;
}

.foodlist1{
  width: 95%;
  margin: 0 auto;
  height: 300px;
  background: url(../../assets/img/costumebj.png)no-repeat top/100%;
  display: flex;
}
.food-left{
  width: 25%;
  color: #fff;
  text-align: center;
  padding-top: 20px;
  box-sizing: border-box;
  P{
    line-height: 80px;
  }
}
.food-msg{
  font-size: 44px;
  font-weight: bold;
}
.food-list{
  background: #fff;
  height: 280px;
  padding: 10px;
  line-height: 40px;
}
.food-right{
  width: 75%;
}
.purchase{
  width: 80%;
}
.food-img{
  width: 140px;
  height: 140px;
  text-align: center;
}
.food-img-box{
  width: 100%;
  text-align: center;
}
.nav-top{
  width: 100%;
}
.nav-font{
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
}
.floatIcon{
  position: fixed;
  right: 0;
  top: 80%;
  width: 210px;
  height: 106px;
}
</style>

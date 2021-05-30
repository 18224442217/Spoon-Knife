<template>
  <div class="box">
    <van-tabs v-model="active"
              sticky
              title-active-color="#f00"
              background="#f7f7f7"
              @click="onClick">

      <van-tab title="全部 ">
        <div v-for="(value,index) in qblist"
             :key="index"
             class="list"
             @click="skip(value.productId)">
          <div class="list-left">
            <img :src="value.imgLogo"
                 alt=""
                 class="list-img">
          </div>
          <div class="list-right">
            <p class="list-name"> {{ value.productName }}</p>
            <p class="list-num">￥{{ (value.priceExhibition*1).toFixed(2) }}</p>
            <p><span class="tag1">包邮</span></p>
            <p class="list-footer">{{ value.merchantName }} ></p>

          </div>
        </div>
      </van-tab>
      <van-tab title="销量">
        <div v-for="(value,index) in xllist"
             :key="index"
             class="list"
             @click="skip(value.productId)">
          <div class="list-left">
            <img :src="value.imgLogo"
                 alt=""
                 class="list-img">
          </div>
          <div class="list-right">
            <p class="list-name">{{ value.productName }}</p>
            <p class="list-num">￥{{ (value.priceExhibition*1).toFixed(2) }}</p>
            <p><span class="tag1">包邮</span></p>
            <p class="list-footer">{{ value.merchantName }} ></p>

          </div>
        </div>
      </van-tab>
      <van-tab>
        <template #title>价格 <img :src="icon[index].img"
                                 alt=""
                                 class="jgicon"> </template>
        <div v-for="(value,index) in jglist"
             :key="index"
             class="list"
             @click="skip(value.productId)">
          <div class="list-left">
            <img :src="value.imgLogo"
                 alt=""
                 class="list-img">
          </div>
          <div class="list-right">
            <p class="list-name">{{ value.productName }}</p>
            <p class="list-num">￥{{ (value.priceExhibition*1).toFixed(2) }}</p>
            <p><span class="tag1">包邮</span></p>
            <p class="list-footer">{{ value.merchantName }} ></p>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import querylist from '@/api/gaprefecture'

export default {
  data() {
    return {
      active: 0,
      classificationId: '',
      qblist: [],
      xllist: [],
      jglist: [],
      icon: [{ img: require('../../../assets/img/filter_nor.png') }, { img: require('../../../assets/img/filter_sel.png') }],
      index: 0
    }
  },
  created() {
    var data = this.$route.query.value
    console.log(data)
    this.classificationId = data
    const aaa = {
      size: 999,
      page: 1,
      categoryId: this.classificationId
    }
    querylist.queryproductlist(aaa).then(res => {
      console.log(aaa)
      console.log(res)
      this.qblist = res.data
    })
  },
  methods: {

    onClick(name) {
      console.log(name)
      if (name === 1) {
        const data = {
          size: 999,
          page: 1,
          categoryId: this.classificationId,
          sort: 1
        }
        querylist.queryproductlist(data).then(res => {
          console.log(res)
          this.xllist = res.data
        })
      }
      if (name === 2) {
        if (this.index === 0) {
          const data = {
            size: 999,
            page: 1,
            categoryId: this.classificationId,
            sort: 2
          }
          querylist.queryproductlist(data).then(res => {
            console.log(res)
            this.jglist = res.data
            this.index = 1
          })
        }
        if (this.index === 1) {
          const data = {
            size: 999,
            page: 1,
            categoryId: this.classificationId,
            sort: 3
          }
          querylist.queryproductlist(data).then(res => {
            console.log(res)
            this.jglist = res.data
            this.index = 0
          })
        }
      }
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
.jgicon{
  width: 20px;
}
.box{
  width: 100%;
  height: 100%;
  background: #fff;

}
.title{
  font-size: 50px;
  text-align: center;
  background: #fff;
  font-weight: bold;
}
.list{
  width: 95%;
  height: 310px;
  margin: 30px auto;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
}
.list-left{
  height: 300px;
}
.list-img{
   width: 300px;
  height: 300px;
  border-radius: 20px;
}
.list-right{
  width: 60%;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
  position: relative;
}
.list-name{
  font-size: 34px;
  height: 100px;
  line-height: 50px;
  overflow: hidden;
}
.list-footer{
  font-size: 26px;
  position: absolute;
  bottom: 10px;
  color: rgb(61, 59, 59);
}
.list-num{
  margin: 0 0 10px;
  color: #DF0202;
  font-size: 40px;
}
.list-num-old{
  font-size: 30px;
  margin-left: 30px;
  text-decoration:line-through;
    color: #9e9e9e;
}
.tag{
  display: inline-block;
  font-size: 20px;
  width: 70px;
  height: 40px;
  text-align: center;
  line-height: 40px;
    color: #a3a3a3;

  border: 1px solid #a3a3a3;
}
.tag1{
    display: inline-block;
    color: #EF540D;
  font-size: 20px;
  width: 70px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 1px solid #EF540D;
  margin-left: 10px;
}
.shop{
margin-top: 30px;
color: #626262;
}
</style>

<template>
  <div class="Classification">
    <van-tabs v-model="active"
              sticky
              title-active-color="#f00"
              background="#f7f7f7"
              @click="onClick">
      <van-tab title="全部">
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
            <p class="list-name">{{ value.productName }}</p>
            <p class="list-num">￥{{ (value.priceExhibition*1).toFixed(2) }}</p>
            <p><span class="tag1">包邮</span></p>
            <p class="list-footer">{{ value.merchantName }} ></p>
          </div>
        </div>
      </van-tab>
      <van-tab v-for="(item,index) in navlist"
               :key="index"
               :title="item.name">
        <div v-for="(value,index) in classshop"
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
      qblist: [],
      num: 10,
      navlist: [],
      categoryId: '',
      classshop: []
    }
  },
  created() {
    var num = this.$route.query.value
    console.log(num)
    this.num = num
    const data = {
      type: this.num,
      size: 999,
      page: 1
    }
    querylist.querycommoditylist(data).then(res => {
      console.log(res)
      console.log(data)

      this.qblist = res.data
    })

    const classlist = {
      classType: 3,
      fatherId: 0,
      status: 1
    }
    querylist.queryclassifylist(classlist).then(res => {
      console.log(res)

      this.navlist = res
    })
  },
  methods: {
    onClick(title, name) {
      console.log(title)
      if (title === 1 || title === 2 || title === 3 || title === 4 || title === 5) {
        console.log(this.navlist[(title - 1)].classificationId)
        this.categoryId = this.navlist[(title - 1)].classificationId
        const data = {
          type: this.num,
          size: 999,
          page: 1,
          categoryId: this.categoryId
        }
        querylist.querycommoditylist(data).then(res => {
          console.log(res)
          console.log(data)
          this.classshop = res.data
        })
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

.Classification{
  width: 100%;
  height: 100%;
  background: #fff;

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
.list-footer{
  font-size: 26px;
  position: absolute;
  bottom: 10px;
 color: rgb(61, 59, 59);
}
.list-name{
  font-size: 34px;
  height: 100px;
  line-height: 50px;
  overflow: hidden;
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

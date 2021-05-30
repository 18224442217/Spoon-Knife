<template>
  <div class="box">
    <!-- <div class="list">
      <van-row >
        <van-col span="6"><img src="../../assets/img/couponlist.png"
                               alt=""
                               class="list-img"></van-col>
        <van-col span="17"
                 class="list-right"><p class="list-title">{{ name }}</p><p class="list-num"><span class="list-num-z">总量：{{ count }}</span><span class="list-num-z">已领取：{{ cumulativeIssuanceCount }}</span><span class="list-num-z">已核销：{{ writtenOffCount }}</span></p>
          <p class="list-time">过期时间：{{ expirationFormat }}</p>

        </van-col>
      </van-row>
    </div> -->
    <WriteOff/>
    <div class="nav">
      <div class="num">手机号</div>
      <div class="num">核销码</div>
      <div class="num">状态</div>
    </div>
    <div class="main">

      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        finished-text="暂无更多记录"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div v-for="(item,index) in list"
             :key="index"
             class="listbox">
          <p class="num">{{ item.phone }}</p>
          <p class="num">{{ item.redeemCode }}</p>
          <p class="num">{{ item.status===2 ? "已核销" : "待使用" }}</p>
        </div>

      </van-list>

      <div v-if="list.length===0"
           class="nodatabox">
        <img src="../../assets/img/wjl.png"
             alt=""
             style="width:50%">
        <p class="nodata">什么都没有哦</p>
      </div>

    </div>
    <div class="footer">
      <div class="footerbox">
        <p class="footer-title"
           @click="ljfq">立 即 发 券</p>
        <p class="footer-title"
           @click="cancel">券 码 核 销</p>
      </div>
      <p class="footer-phone">客服电话：<span style="color:#AD0EA2;">4000112998</span></p>
    </div>
  </div>
</template>

<script>
import cancelsystemApi from '@/api/cancelsystem'
import WriteOff from '@/components/writeOff'

export default {
  components: {
    WriteOff
  },
  data() {
    return {
      list: [],
      type: '',
      merchantName: '',
      loading: false,
      finished: false,
      error: false,
      page: 1,
      size: 10,
      id: '',
      count: '',
      writtenOffCount: '',
      expirationFormat: '',
      cumulativeIssuanceCount: '',
      name: ''
    }
  },
  created() {
    this.id = this.$route.query.id
    const data = {
      id: this.id
    }
    cancelsystemApi.querycouponone(data).then(res => {
      console.log(res)
      this.writtenOffCount = res.writtenOffCount
      this.expirationFormat = res.expirationFormat
      this.cumulativeIssuanceCount = res.cumulativeIssuanceCount
      this.count = res.count
      this.name = res.name
    })
  },
  methods: {
    cancel() {
      this.$router.push('/cancelsystem/cancel')
    },
    onLoad() {
      const data = {
        page: this.page,
        size: this.size,
        couponId: this.id
      }
      cancelsystemApi.cancelhistory(data).then(res => {
        console.log(res)
        this.list.push(...res.data)
        this.loading = false
        if (this.list.length === 0) { // 判断获取数据条数若等于0
          this.list = []				// 清空数组
          this.finished = true		// 停止加载
        }
        if (this.list.length >= res.count) {
          this.finished = true		// 结束加载状态
        }
        this.page++
      })
    },
    ljfq() {
      this.$router.push({
        name: 'merchant_offline_coupon'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.footerbox{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 30px 0 0 0;
}
.footer {
    text-align: center;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    background: white;
  }

  .footer-title {
    font-size: 32px;
    color: #AD0EA2;
    margin-bottom: 50px;
  }
  .footer-title+.footer-title{
    margin-left: 150px;
  }

  .footer-phone {
    font-size: 30px;
    margin-bottom: 50px;
  }
.nodatabox{
  text-align: center;
  padding: 30px 0;
}
.nodata{
  color: #737373;
  font-size: 28px;
  margin-top: 20px;
}
.box{
  width: 100%;
  height: 1500px;
}

.main{
  width: 100%;
  height: 800px;
  overflow: scroll;
  margin: 0px auto 0;
  border-radius: 8px;
}

.title{
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.time{
color: #606060;

}

.footer{
  text-align: center;
  margin-top: 50px;
  font-size: 38px;
  color: #3E3E3E;
}
.null{
  text-align: center;
  font-size: 40px;
  color: #afafaf;
}
.hxjl{
  margin-bottom: 30px;
  font-size: 40px;
}
.phone{
  margin-top: 110px;
  font-size: 30px;
  text-align: center;
}
.list{
width: 90%;
padding: 20px;
background: #ffffff;
border-radius: 8px;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.09);
margin: 20px auto;
}
.list-right{
  margin-left: 20px;
}
.list-img{
  width: 100%;
}
.list-title{
  width: 100%;
  font-size: 36px;
  color: #4c4a4a;
  line-height: 50px;
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
margin-bottom: 10px;
}
.list-num{
  font-size: 30px;
 color: #8b8b8b;
 margin: 15px 0;
}
.list-time{
  font-size: 30px;
  color: #8b8b8b;
}
.list-num-z{
  font-size: 30px;
  margin-right: 20px;
}
.nav{
  width: 100%;
  margin-top: 30px;
  height: 72px;
  background: #f8f8f8;
  line-height: 72px;
  font-size: 28px;
  color: #AD0EA2;
  display: flex;
  justify-content: space-around;
}
.listbox{
  width: 100%;
  height: 100px;
  line-height: 100px;
  color: #4C4A4A;
  font-size: 26px;
  border-bottom: 1px solid #DEDADA;
  display: flex;
  justify-content: space-around;
}
.num{
  font-size: 32px;
  text-align: center;
  width: 33.3%;
}
</style>

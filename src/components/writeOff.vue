<template>
  <div class="top">
    <div class="topbox">
      <van-row type="flex"
               align="center">

        <van-col v-if="merchantLogo"
                 span="5">
          <router-link :to="{name:'mine',params:{type:'business'}}">
            <img :src="merchantLogo"
                 alt=""
                 class="img">
          </router-link>
        </van-col>
        <van-col v-if="!merchantLogo"
                 span="5">
          <router-link :to="{name:'mine',params:{type:'business'}}">
            <img src="../assets/img/merchantlogo.png"
                 alt=""
                 class="img">
          </router-link>
        </van-col>
        <van-col span="19">
          <p class="title"><span>{{ merchantName }} </span>
            <!-- <van-icon class="top-right"
                      name="edit"/> -->
          </p>
          <p class="add"><span>{{ merchantAddress }}</span>
            <!-- <van-icon class="top-right"
                      name="arrow" /> -->
          </p>
        </van-col>
        <!-- <van-col span="4">
          <div class="ljfq"
               @click="ljfq">立即发券</div>
        </van-col> -->
      </van-row>
      <div class="record-onebox">
        <div class="record-one">
          <div>
            <span>{{ writtenOffCount?writtenOffCount:'0' }}</span>
            <p>已核销</p>
          </div>
          <div>
            <span>0</span>
            <p>已领取</p>
          </div>
          <div>
            <span>{{ cumulativeIssuanceCount?cumulativeIssuanceCount:'0' }}</span>
            <p>累计发券</p>
          </div>
          <div>
            <span>0</span>
            <p>总订单量</p>
          </div>
          <div>
            <span>0</span>
            <p>累计收益</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cancelsystemApi from '@/api/cancelsystem'

export default {
  data() {
    return {
      merchantLogo: '',
      merchantName: '',
      merchantAddress: '',
      writtenOffCount: '',
      cumulativeIssuanceCount: ''
    }
  },
  created() {
    cancelsystemApi.querysuer().then(res => {
      this.merchantName = res[0].merchantName
      this.merchantAddress = res[0].merchantAddress
      this.merchantLogo = res[0].merchantLogo
    })
    cancelsystemApi.queryhxnum().then(res => {
      // console.log(res)
      this.writtenOffCount = res.writtenOffCount
      this.cumulativeIssuanceCount = res.cumulativeIssuanceCount
    })
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.record-one div span{
  display: block;
  margin-top: -30px;
  font-size: 36px;
  margin-bottom: 10px;
}
.record-one div p{
  font-size: 20px;
}
.record-one div:last-child{
  border: 0;
}
.record-one div{
  width: auto;
  height: 40px;
  border-right:1px solid white;
  flex-direction: column;
  text-align: center;
  padding: 0 20px;
  flex-shrink: 0;

}
.record-one{
  display: flex;
  flex-direction: row;
  color: white;
  justify-items: center;
  align-items: center;

}
.record-onebox{
  // height: 150px;
  padding: 70px 0 50px 0;
  overflow-x: scroll;
}
.top {
    display: block;
    // margin: 30px auto 0;
    padding: 20px 0;
  }
  .topbox{
    background: -webkit-linear-gradient(left, #9C0CC4 , #DB5B90);
    background: -moz-linear-gradient(right, #9C0Cc4, #DB5B90);
    background: -o-linear-gradient(right, #9C0Cc4, #DB5B90);
    background: linear-gradient(to right, #9C0Cc4 , #DB5B90);
    opacity: .8;
    margin: 0 30px;
    padding:25px 30px;
    border-radius: 20px;
  }

  .title {
    font-size: 40px;
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
  }
  .title span{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .add {
    font-size: 30px;
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  .add span{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .top-right{
    position: relative;
    top: 4px;
    margin-left: 20px;
    flex-shrink: 0;
  }

  .ljfq {
    width: 150px;
    background: #4480f3;
    font-size: 24px;
    text-align: center;
    line-height: 60px;
    color: #fff;
    border-radius: 30px;
  }

  .img {
    width:120px;
    height: 120px;
    border-radius: 100%;
  }
</style>

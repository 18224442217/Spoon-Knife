<template>
  <div class="box">
    <div class="banner">
      <van-swipe :autoplay="3000"
                 class="my-swipe"
                 indicator-color="white"
                 @change="bannerindex">
        <van-swipe-item v-for="(item,index) in bannerlist"
                        :key="index" >
          <img :src="item.img"
               class="img"></van-swipe-item>
    </van-swipe></div>

    <div class="Optimizingservice">
      <div class="title">
        <img src="../../assets/img/title-icon.png"
             alt=""
             class="title-icon"><span class="title-msg">优选服务</span>
      </div>
      <div class="classify">
        <div class="classify-left">1</div>
        <div class="classify-right">
          <div class="classify-top">2</div>
          <div class="classify-footer">3</div>
        </div>
      </div>
    </div>
    <div class="border"/>
    <div class="characteristicservice">
      <div class="title">
        <img src="../../assets/img/title-icon.png"
             alt=""
             class="title-icon"><span class="title-msg">特色生活</span>
      </div>
      <div class="lifeclass">
        <div class="lifeclass-left">1</div>
        <div class="lifeclass-right">2</div>
      </div>
      <div class="lifelist">
        <van-row
          type="flex"
          justify="space-around">
          <van-col v-for="(item,index) in lifelist"
                   :key="index"
                   span="6"
                   class="lifeitem"><img :src="item.img"
                                         alt=""
                                         class="lifeimg">
            <p class="lifefont">{{ item.title }}</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="border"/>
    <div class="info">
      本服务由畅由提供，客服电话：4001506868
    </div>
    <van-tabs v-model="active"
              line-height="5px"
              line-width="50px">
      <van-tab v-for="(item,index) in classlist"
               :key="index"
               :title="item">
        <div class="classlist">
          <van-row type="flex"
                   justify="space-around"
          >
            <van-col v-for="(item,index) in 6"
                     :key="index"
                     span="11"
                     class="list-item"><div class="list-item-top"><img src="../../assets/img/mgtv.png"
                                                                       alt=""
                                                                       class="classlist-img"></div>
              <div class="list-liem-num">原价10元 <span class="list-liem-num-right">券后价<span class="list-liem-num-right-font">14.91</span>元</span></div>
              <p class="item-title">腾讯视频月卡</p>
              <p class="item-yhq">可领券5.1元 <span class="item-lqgm">领劵购买</span></p>

            </van-col>

          </van-row>

        </div>

      </van-tab>

    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerlist: [{ img: require('../../assets/img/banner1.jpg') }, { img: require('../../assets/img/banner2.png') }, { img: require('../../assets/img/banner3.png') }],
      index: 0,
      lifelist: [{ img: require('../../assets/img/life1.png'), title: '住房出租' }, { img: require('../../assets/img/life2.png'), title: '金融理财' }, { img: require('../../assets/img/life3.png'), title: '用工求职' }, { img: require('../../assets/img/life4.png'), title: '二手转让' }],
      active: 0,
      classlist: ['宅家娱乐', '视频专区', '娱乐专区', '生活娱乐']
    }
  },
  methods: {
    bannerindex(index) {
    }
  }
}
</script>

<style lang="less" scoped>
.box{
  width: 100%;
  height: 100%;
  background: #fff;

}
.top{
  width: 100%;
  height: 400px;
  background: linear-gradient(180deg,#f36229, rgba(239,91,34,0.67) 51%, rgba(230,78,20,0.00));
}
.banner{
  width: 100%;
}

  .img{
    width: 100%;
border-radius: 10px;
  }
.Optimizingservice{
  width: 90%;
  margin:  20px auto;

}
.title{
  display: flex;
  align-items: center;
}
.title-icon{
  width: 12px;
  height: 40px;
  margin-right: 20px;
}
.title-msg{
  font-size: 40px;
}
.classify{
  width: 100%;
  height: 400px;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
}
.classify-left{
  width: 49.5%;
  background: #f36229;
  border-radius: 10px;
}
.classify-right{
  width: 49.5%;
}
.classify-top{
  height: 198px;
  background: #0f0;
  border-radius: 10px;

}
.classify-footer{
  height: 198px;
  background: #f30;
  margin-top: 4px;
  border-radius: 10px;
}
.border{
  width: 100%;
  height: 30px;
  margin:30px 0 0;
  background: #fbfaff;
}
.characteristicservice{
   width: 90%;
   margin: 30px auto;
}
.lifeclass{
  margin-top: 30px;
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.lifeclass-left{
width: 49.5%;
height: 200px;
background: #f30;
  border-radius: 10px;

}
.lifeclass-right{
width: 49.5%;
height: 200px;
border-radius: 10px;
background: #f30;
}
.lifeimg{
  width: 70%;
}
.lifelist{
  width: 100%;
  margin: 40px auto 0;
}
.lifeitem{
  text-align: center;
}
.lifefont{
  font-weight: bold;
  font-size: 34px;
}
.info{
  width: 100%;
  height: 40px;
  font-size: 30px;
  color: #b9b9b9;
  text-align: center;
  line-height: 40px;
  border-bottom: 1px solid #fbfaff;
}
.classlist{
  width: 100%;
  margin:  30px  auto;
  background: #fbfaff;
}
.list-item{
  margin-bottom: 30px;
  height: 550px;
  background: #ffffff;
border-radius: 6px;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
}
.list-item-top{
  padding: 30px ;
  box-sizing: border-box;
}
.list-liem-num{
  background: #e3e2e0;
  font-size: 28px;
  height: 60px;
  line-height: 60px;
  color: #676d69;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
}
.classlist-img{
 width: 100%;
border-radius: 10px;
}
.list-liem-num-right{
  width: 60%;
  display: inline-block;
  background: #4EB8F6;
  color: #fff;
  font-size: 30px;
  text-align: center;
  border-radius: 30px 0 0 30px;
}
.list-liem-num-right-font{
  font-weight: bold;
  font-size: 34px;
}
.item-title{
  margin-top: 20px;
  height: 90px;
  margin-left: 10px;
  font-size: 36px;
}
.item-yhq{
  margin-left: 10px;
  color: #D20000;
}
.item-lqgm{
  display: inline-block;
  width: 160px;
  height: 60px;
  background: #ffffff;
  border: 1px solid #49baff;
  margin-left: 15px;
  color: #49baff;
  text-align: center;
  line-height: 60px;
}
</style>

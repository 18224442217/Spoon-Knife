<template>
  <div>
    <van-nav-bar
      title="订单列表"
      left-text="返回"
      left-arrow
      @click-left="onBack"
    />

      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @edit="onEdit"
      />
    <div v-for="(item, i) in cartList" :key="i">
      <van-row class="listBox">
        <van-col span="4">
          <div class="radio">
            <van-checkbox v-model="item.status"
                          @click="checkedfun(item, i)"></van-checkbox>
          </div>
        </van-col>
        <van-col span="6">
          <van-image width="100"
                     height="100"
                     :src="item.paramLogo" />
        </van-col>
        <van-col span="6">
          <div class="cartName">{{item.productName}}</div>
          <div class="sku">{{item.parameterName}}</div>
          <div class="money">￥{{item.price}}</div>
        </van-col>
        <van-col span="8">
          <van-stepper v-model="item.productNum" @plus="add(item, i)" @minus="reduce(item, i)" />
        </van-col>
      </van-row>
    </div>

    <van-submit-bar :price="price"
                    button-text="提交订单"
                    @submit="onSubmit">
    </van-submit-bar>
    <!-- 弹出支付方式的选择，弹出框 -->
    <van-overlay :show="show">
      <div class="wrapper">
        <div class="alertBox">
          <van-row class="titleBox">请选择支付方式</van-row>
          <van-row style="width:300px;margin-left;border:1px solid #ddd;"
                   v-for="(items, i) in payMehed"
                   :key="i">
            <van-col span="8">
              <van-image width="35"
                         height="35"
                         style="margin:0 0 0 30px"
                         :src="items.payIcon" />
            </van-col>
            <van-col span="8"
                     class="payName">{{items.payName}}</van-col>
            <van-col span="8">
              <van-checkbox v-model="items.check"
                            style="margin:15px 0 0 0;"></van-checkbox>
            </van-col>
          </van-row>
          <van-row class="payBtn">
            <van-button class="buttons" color="linear-gradient(to right, #ff6034, #ee0a24)" @click="show = false">
            立即付款
          </van-button>
          </van-row>
        </div>

      </div>
    </van-overlay>
  </div>
</template>

<script>
  import shopCartApi from '@/api/shopCartApi'
  import cache from '@/utils/cache'
  import { Toast } from 'vant'
  export default {
    name: 'index',
    data(){
      return{
        userId:'',
        addresIfo:'',
        show: false,
        stepper:1,
        price:0,
        chosenAddressId: '1',
        cartList:[],
        list: [
          {
            id: '',
            name: '',
            tel: '',
            address: '',
            isDefault: true,
          }
        ],
        payMehed: [
          {
            "payIcon": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1683440168,2286570410&fm=26&gp=0.jpg",
            "payName": "支付宝支付",
            "check": true
          },
          {
            "payIcon": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2044444568,2980168493&fm=26&gp=0.jpg",
            "payName": "微信支付",
            "check": false
          }
        ]
      }
    },
    created() {
      const cartList = JSON.parse(this.$route.query.cartList)
      this.cartList = cartList
      console.log(this.cartList)
      this.calculation()
      const userId = cache.getCookie("userId")
      this.userId = userId
      this.getAddress()
    },
    methods:{
      /**
       * @desc 点击步进器的减号
       * @date 20201128
       * */
      reduce:function(item, index){
        console.log(item)
        this.price = this.price - parseInt(item.price) * 100
      },
      /**
       * @desc 点击步进器的加号
       * @date 20201128
       * */
      add:function(item){
        console.log('price=' + this.price)
        this.price = parseInt((item.productNum+1) * item.price) * 100
      },
      /**
       * @desc 点击复选框执行函数
       * @date 20201128
       * */
      checkedfun (item, index) {
        console.log(index)
        if (item.status) {
          this.price = parseInt(item.productNum * item.price) * 100;
        } else {
          this.price -= parseInt(item.productNum * item.price) * 100;
        }
      },
      /**
       * @desc 初始化页面时计算价格
       * @date 20201128
       * */
      calculation(){
        var data = this.cartList
        for (var i = 0; i < data.length; i++){
          this.price += (data[i].price) * 100
        }
      },
      /**
       * @desc 获取地址
       * @date 20201128
       * */
      getAddress(){
        shopCartApi.getAddress(this.userId).then(res => {
          this.addresIfo = res.data
          this.list = res.data
          var dataL = this.list
          for (var i = 0; i < dataL.length; i++){
            dataL[i].name = res.data[i].contactName
            dataL[i].tel = res.data[i].contactPhone
            dataL[i].address = res.data[i].fullAddress
          }
        })
      },
      /**
       * @desc 点击返回
       * @date 20201128
       * */
      onBack(){
        this.$router.go(-1)
      },
      onEdit() {
        Toast('跳转到地址编辑页面')
      },
      onSubmit(){
        if (this.price > 0) {
          this.show = true
          this.payMehed[0].check = true
          this.payMehed[1].check = false
        } else {
          Toast('至少选择一件商品才能支付');
        }
      }
    }
  }
</script>

<style scoped>
  .payBtn{
    text-align: center;
  }
  .payBtn .buttons{
    width: 500px;
    border-radius: 50px;
    margin-top: 60px;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .alertBox {
    border-radius: 20px;
    width: 90%;
    height: 500px;
    background-color: #fff;
  }
  .alertBox .titleBox {
    padding: 20px 30px;
    font-size: 32px;
  }
  .alertBox .payName {
    margin: 30px 0 0 0;
    font-size: 28px;
  }
  .van-address-list{
    padding: 0.75rem 0.75rem 1rem 0.75rem;
  }
.van-address-list__bottom{
  display: none;
}
.listBox {
  background-color: #fff;
  padding: 15px 0;
  margin: 15px 0 0 0;
}
.radio {
  margin: 100px 0 0 30px;
}
.radio1 {
  margin: 10px 0 0 30px;
}
.van-stepper {
  margin: 165px 0 0 30px;
}
.cartName {
  width: 250px;
  font-size: 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: -2px 0 0 40px;
}
.money {
  font-size: 24px;
  margin: 60px 0 0 40px;
}
.sku {
  font-size: 24px;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 60px 0 0 40px;
}
</style>

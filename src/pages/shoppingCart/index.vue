<template>
  <div>
    <van-nav-bar title="购物车"
                 left-text=""
                 right-text="删除"
                 @click-right="deletes" />
    <div v-for="items in list"
         :key="items.merchantId"
         style="margin-bottom:15px;background:#fff;">
      <!-- 顶部的调试商铺部分 -->
      <van-row class="topBox">
        <van-divider span="12"
                     class="merchantName">{{ items.merchantName }}</van-divider>
      </van-row>
      <!-- 循环购物车的部分 -->
      <div>
        <van-row v-for="(item, j) in items.paramList"
                 :key="j"
                 class="listBox">
          <van-col span="4">
            <div class="radio">
              <van-checkbox v-model="item.status"
                            @click="checkedfun(item)" />
            </div>
          </van-col>
          <van-col span="6"
                   @click="jumperDetail(item)">
            <van-image :src="item.paramLogo"
                       width="100"
                       height="100" />
          </van-col>
          <van-col span="6">
            <div class="cartName">{{ item.productName }}</div>
            <div class="sku">{{ item.parameterName }}</div>
            <div class="money">￥{{ item.price }}</div>
          </van-col>
          <van-col span="8">
            <van-stepper v-model="item.productNum"
                         @plus="changeNumber('add', item, j)"
                         @minus="changeNumber('reduce', item, j)" />
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 为你推荐商品的列表视图部分 -->
    <div class="induceBox">
      <van-divider :style="{ color: '#000', borderColor: '#000', padding: '0 16px', fontSize: '22px' }">
        为你推荐
      </van-divider>
      <van-row>
        <div v-for="(ite, j) in recommend"
             :key="j"
             class="list"
             @click="jumperDetail(ite)">
          <div class="logoImg">
            <van-image :src="ite.imgLogo"
                       width="100"
                       height="100" />
          </div>
          <div class="pNameBox">{{ ite.productName }}</div>
          <div class="priceBox">￥{{ ite.priceExhibition }}</div>
        </div>
      </van-row>
    </div>
    <van-submit-bar :price="totalPrice"
                    button-text="立即购买"
                    @submit="onSubmit" />
  </div>

</template>
<script>
import shopCartApi from '@/api/shopCartApi'
import cache from '@/utils/cache'
import { Dialog } from 'vant'
import { Toast } from 'vant'
export default {
  data() {
    return {
      stepper: 1,
      page: 1,
      size: 20,
      list: [
        []
      ],
      orderlist: [],
      shoppingCartId: [],
      cartsList: [],
      recommend: [],
      totalPrices: 0
    }
  },
  computed: {
    /**
     * @desc 计算选择的商品总的价格
     * @date 20201201
     * */
    totalPrice() {
      let total = 0
      this.list.forEach((item, index) => {
        if (item.logo === undefined) {
          return false
        } else {
          item.paramList.forEach((foods, indexs) => {
            if (foods.status === true) {
              total += foods.price * foods.productNum
            }
          })
        }
      })
      return total * 100
    }
  },
  created() {
    this.getCartList()
    this.recommondGoods()
    this.addEventListennerScroll()
  },
  methods: {
    /**
     * @desc 解决选中了购物车后改变数量，最终提交订单数量不正确
     * @param [name] 判断是增加还是减少的标识
     * @param [date] 点击的时候传入的数据信息
     * @param [indexSub] 传入的点击的下标
     * @date 20201205
     * */
    changeNumber(name, date, indexSub) {
      const oList = this.orderlist.length
      if (oList === 0) {
        return false
      } else {
        this.orderlist.forEach((items, index) => {
          if (index === indexSub) {
            // empty
          } else {
            indexSub = indexSub - 1
          }
          if (name === 'add') {
            this.orderlist[indexSub].num = date.productNum + 1
          } else if (name === 'reduce') {
            this.orderlist[indexSub].num = date.productNum - 1
          }
        })
      }
    },
    /**
     * @desc 将选中商品加入到数组对象里面，方便提交订单的时候使用
     * @date 20201203
     * */
    creatOrderList(data) {
      const info = {
        name: data.productName,
        logo: data.paramLogo,
        parameterName: data.parameterName,
        num: data.productNum,
        productId: data.productId,
        paramId: data.productParamId,
        paramPrice: data.price * 100,
        merchantId: data.merchantId,
        shoppingCartId: data.shoppingCartId
      }
      this.orderlist.push(info)
    },
    /**
     * @desc 监听是否滚动到底部
     * @date 20201202
     * */
    addEventListennerScroll() {
      const that = this
      window.onscroll = function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        // 滚动条到底部的条件
        if (scrollTop + windowHeight === scrollHeight) {
          that.page++
          that.recommondGoods()
        }
      }
    },
    /**
     * @description 点击复选框改变status的值
     * @param {type} item 点击复选框的时候传入的商品的数据
     * @date 20201127
     * @funName checkedfun
    */
    checkedfun(item) {
      if (item.amount <= 0) {
        Toast('该商品没有库存了...')
        return false
      } else {
        // 将选中的商品的数据添加到数组中，方便后面提交订单使用
        if (item.status === true) {
          this.creatOrderList(item)
          this.shoppingCartId.push(item.shoppingCartId)
        }
        // 取消选中就将订单数组中删除
        if (item.status === false) {
          this.orderlist.forEach((list, index) => {
            if (list.productId === item.productId) {
              this.orderlist.splice(index, 1)
            }
          })
          this.orderlist = []
        }
        // 当前店铺有商品选中，其他店铺取消选中
        this.list.forEach((carlist, index) => {
          carlist.paramList.forEach((inner, indexs) => {
            if (inner.status === true) {
              if (item.merchantId === carlist.merchantId) {
                //
              } else {
                inner.status = false
              }
            }
          })
        })
      }
    },
    /**
     * @description 为你推荐商品
     * @date 20201126
     * @funName recommondGoods
    */
    recommondGoods() {
      const param = {
        page: this.page,
        size: this.size
      }
      shopCartApi.recommondGoods(param)
        .then(res => {
          this.recommend.push(...res.data)
        })
    },
    /**
     * @description 点击购物车列表跳转到商品详情页面
     * @date 20201124
     * @funName jumperDetail
    */
    jumperDetail(data) {
      this.$router.push({ name: 'productDetails', query: { id: data.productId }})
    },
    /**
     * @description 获取购物车列表的数据信息
     * @date 20201124
     * @funName getCartList
     */
    getCartList() {
      const param = {
        userId: cache.getCookie('userId')
      }
      shopCartApi.shopCartsList(param)
        .then(res => {
          this.list = res.data.map(param => {
            param.paramList.forEach(item => (item.status = false))
            return param
          })
        })
    },
    /**
     * @description 点击提交订单按钮
     * @date 20201124
     * @funName onSubmit
     */
    onSubmit() {
      if (this.totalPrice > 0) {
        // console.log(this.orderlist, '==========')
        sessionStorage.setItem('orderProductInfo', JSON.stringify(this.orderlist))
        this.$router.push({ path: '/createOrder' })
      } else {
        Toast('至少选择一件商品才能支付')
      }
    },
    /**
     * @description 点击删除按钮
     * @date 20201124
     * @funName deletes
     */
    deletes() {
      if (this.totalPrice > 0) {
        Dialog.confirm({
          title: '提示',
          message: '确认要删除操作吗？'
        })
          .then(() => {
            this.comfirmDelete()
          })
          .catch(() => {
            // on cancel
          })
      } else {
        Toast('至少选择一件商品才能删除')
      }
    },
    /**
     * @desc 当点击弹出的确认删除的按钮执行的操作
     * @date 20201128
     * */
    comfirmDelete() {
      const param = {
        shoppingCartId: this.shoppingCartId
      }
      shopCartApi.deleteCart(param)
        .then(res => {
          if (res === null) {
            this.getCartList()
            Toast('删除成功')
          }
        })
    }
  }
}
</script>
<style scoped>
.list {
  padding: 20px;
  margin: 10px 0 10px 30px;
  float: left;
  width: 45%;
  border-radius: 10px;
  background-color: #fff;
}
.list .logoImg {
  text-align: center;
}
.list .pNameBox {
  font-size: 36px;
  padding: 15px 0 0 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list .priceBox {
  font-size: 30px;
  color: #de0e3f;
  font-weight: 600;
  padding: 15px 0 0 30px;
}
.induceBox {
  background-color: rgb(247, 247, 247);
  margin-top: 15px;
  margin-left: 20px;
  width: 95%;
  margin-bottom: 150px;
}
.induceBox .titlesBox {
  padding: 5px 0;
  font-size: 50px;
  text-align: center;
}
.van-ellipsis {
  color: #fff;
}

.van-submit-bar {
  margin-bottom: 110px;
}
.listBox {
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
.van-nav-bar__text {
  color: #fff;
}
.topBox {
  height: 100px;
}
.topBox .merchantName {
  /*overflow: hidden;*/
  /*white-space: nowrap;*/
  /*text-overflow: ellipsis;*/
  text-align: center;
  font-size: 30px;
  line-height: 100px;
}
.topBox .vanicon {
  margin-top: 12px;
}
.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
.van-address-item__edit {
  display: none;
}
</style>

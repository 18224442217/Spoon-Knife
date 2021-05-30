<template>
  <div>
    <van-nav-bar
      title="我的订单"
      left-text="返回"
      left-arrow
      @click-left="onBack"
    />

    <van-tabs :active="index"
              animated
              @change="tabChange">
      <van-tab v-for="item in orders"
               :title="item.title"
               :key="item.status">
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="loadOrders"
        >

          <div v-for="orderItem in item.data"
               :key="orderItem.orderId"
               class="order-box"
               @click="gotoDetail(orderItem.orderId)">
            <div class="header">
              <div class="shop">
                <van-icon name="shop-o"/>
                <span>{{ orderItem.merchantName }}</span>
              </div>
              <div>{{ orderItem.statusName }}</div>
            </div>
            <van-divider/>
            <div class="content">
              <div v-if="orderItem.orderProducts.length > 1"
                   style="display: flex;">
                <div v-for="product in orderItem.orderProducts"
                     :key="product.paramId"
                     style="padding-right: 10px; display: flex;">
                  <van-image :src="product.imgUrl"
                             width="65"
                             height="65"/>
                </div>
              </div>
              <div v-else
                   style="display: flex;">
                <div>
                  <van-image :src="orderItem.orderProducts[0].imgUrl"
                             width="65"
                             height="65"/>
                </div>
                <div class="info">
                  <div>{{ orderItem.orderProducts[0].productName }}</div>
                  <div class="price">￥{{ orderItem.orderProducts[0].paramPrice }}</div>
                </div>
              </div>
            </div>
            <van-divider/>
            <div class="footer">
              <van-button
                v-if="item.status === -1 || item.status === 0 || item.status === 1 || item.status === 4"
                plain
                type="default"
                round
                size="mini"
                @click.stop="deleteOrder(index, orderItem.orderId)">删除订单
              </van-button>
              <van-button
                v-if="item.status === 2"
                plain
                type="default"
                round
                size="mini"
                @click.stop="gotorefund(orderItem.orderId)">申请退款
              </van-button>
              <van-button
                v-if="item.status === 2"
                plain
                type="default"
                round
                size="mini">查看物流
              </van-button>
              <van-button
                v-if="item.status === 3"
                plain
                type="default"
                round
                size="mini"
                @click.stop="gotoLogistics(orderItem.orderId)">查看物流
              </van-button>
            </div>
          </div>
          <!--          </div>-->
        </van-list>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { Dialog } from 'vant'
import orderApi from '@/api/orderApi'
import cache from '@/utils/cache'

export default {
  name: 'Index',
  comments: {},
  data() {
    return {
      index: 0,
      userId: '0',
      orders: [
        {
          title: '全部订单',
          status: -1,
          page: 0,
          pageNum: 10,
          data: [],
          finished: false,
          loading: false
        },
        {
          title: '待付款',
          status: 1,
          page: 0,
          pageNum: 10,
          data: [],
          finished: false,
          loading: false
        },
        {
          title: '待发货',
          status: 2,
          page: 0,
          pageNum: 10,
          data: [],
          finished: false,
          loading: false
        },
        {
          title: '待收货',
          status: 3,
          page: 0,
          pageNum: 10,
          data: [],
          finished: false,
          loading: false
        },
        {
          title: '已完成',
          status: 4,
          page: 0,
          pageNum: 10,
          data: [],
          finished: false,
          loading: false
        }
      ]
    }
  },
  mounted() {
    const localUserId = cache.getCookie('userId')
    if (localUserId !== 'undefined' && localUserId !== '') {
      this.userId = localUserId
    }
    // console.log(this.$route.params.index)
    this.index = this.$route.params.index || 0
  },
  methods: {
    onBack() {
      this.$router.push({ name: 'mine' })
    },
    loadOrders() {
      const current = this.orders[this.index]
      const status = current.status
      current.page = current.page + 1
      let data = 'userId=' + this.userId +
        '&page=' + current.page +
        '&pageNum=' + current.pageNum
      if (status !== -1) {
        data += '&status=' + status
      }
      orderApi.getOrders(data).then(res => {
        // 订单状态 0已取消 1待付款  2待发货  3 待收货  4 已完成
        res.data.forEach(item => {
          if (item.status === 0) {
            item.statusName = '已取消'
          } else if (item.status === 1) {
            item.statusName = '待付款'
          } else if (item.status === 2) {
            item.statusName = '待发货'
          } else if (item.status === 3) {
            item.statusName = '待收货'
          } else if (item.status === 4) {
            item.statusName = '已完成'
          }
        })
        current.data.push(...res.data)
        current.loading = false
        const count = parseInt(res.count)
        const length = current.data.length
        if (count <= length) {
          current.finished = true
        }
      })
    },
    tabChange(name, title) {
      this.index = name
    },
    // 删除订单
    deleteOrder(index, orderId) {
      const current = this.orders[this.index]
      Dialog.confirm({
        title: '删除订单',
        message: '确定删除该订单？'
      })
        .then(() => {
          const toast = this.$toast.loading({
            duration: 0,
            forbidClick: true,
            message: '删除中'
          })
          orderApi.deleteOrder(orderId).then(res => {
            current.data.splice(index, 1)
            toast.clear()
          })
        })
        .catch(() => {

        })
    },
    // 查看物流
    gotoLogistics(orderId) {
      this.$router.push({
        path: '/order/logistics',
        query: {
          orderId: orderId
        }
      })
    },
    //申请退款
    gotorefund(orderId){
      this.$router.push({
        path: '/order/refund',
        query: {
          orderId: orderId
        }
      })
    },
    // 前往订单详情页
    gotoDetail(orderId) {
      console.log(orderId)
      this.$router.push({
        path: '/order/detail',
        query: {
          orderId: orderId
        }
      })
    }
  }
}
</script>

<style scoped>
.order-box {
  background-color: #ffffff;
  margin: 10px 10px 0;
  border-radius: 3px;
}

.order-box .header {
  padding: 25px;
  display: flex;
  justify-content: space-between;
  font-size: 30px;
}

.order-box .header .shop {
  display: flex;
}

.order-box .header .shop * {
  margin: auto 0;
}

.order-box .header .shop span {
  padding-left: 10px;
}

.order-box .content {
  padding: 15px;
}

.order-box .content .info {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-left: 15px;
  font-size: 28px;
}

.info .price {
  color: red;
}

.order-box .footer {
  font-size: 14px;
  text-align: right;
  padding: 20px 10px;
}

.order-box .footer button {
  width: 180px;
}

.van-button--small {
  padding: 0 40px;
}

.van-divider {
  margin: 0;
}

.van-image {
  display: block;
}

</style>

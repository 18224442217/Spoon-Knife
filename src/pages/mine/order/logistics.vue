<template>
  <div class="container">
    <div class="title">
      <van-nav-bar
        title="订单跟踪"
        left-text="返回"
        left-arrow
        @click-left="onBack"
      />
    </div>


    <div style="padding: 20px">
      <div style="font-size: 16px" class="van-card">
        <!--        <div>订单编号：{{ orderId }}</div>-->
        <div style="padding-top: 10px">快递公司：{{ info.comName }}</div>
        <div style="padding-top: 10px">快递单号：{{ info.nu }}</div>
      </div>
      <div class="van-card">
        <div v-for="item in info.data" class="item">
          <div class="point-box">
            <div class="point"></div>
          </div>
          <div style="margin: auto 0; padding-left: 20px;">
            <div>{{ item.context }}</div>
            <div class="time">{{ item.ftime }}</div>
            <van-divider/>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import orderApi from '@/api/orderApi'
import cache from '@/utils/cache'
import shipping from '@/utils/shipping'

export default {
  name: 'logistics',
  data() {
    return {
      orderId: '',
      userId: '',
      info: {
        comName: ''
      }
    }
  },
  created() {
    this.orderId = this.$route.query.orderId
    this.userId = cache.getCookie('userId')
    // this.userId = '1316594274733502465'
    this.queryLogistics()
  },
  methods: {
    onBack() {
      this.$router.go(-1)
    },
    queryLogistics() {
      orderApi.queryLogistics({
        orderId: this.orderId,
        userId: this.userId
      }).then(res => {
        console.log(res)
        if (res.length > 0){
          this.info = res[0]
          for (let i = 0; i < shipping.length; i++) {
            const item = shipping[i]
            if (item.value === this.info.com) {
              this.info.comName = item.label
              break
            }
          }
        }
      })
    },
    queryOrderInfo() {
      orderApi.getOrderDetail(this.orderId).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

.item {
  font-size: 30px;
}

.van-card {
  background-color: white;
}

.item {
  padding-left: 20px;
  border-left: 1px solid #cccccc;
  color: #cccccc;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
}

.item .time {
  padding-top: 20px;
  padding-bottom: 20px;
}

.point-box {
  width: 30px;
  height: 30px;
  display: inline-block;
}

.point {
  width: 30px;
  height: 30px;
  background-color: #cccccc;
  border-radius: 100%;
  display: inline-block;
  margin-top: 12px;
  margin-left: -35px;
  z-index: 9999;
}

.van-divider {
  margin: 0;
}

</style>

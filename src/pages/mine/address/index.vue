<template>
  <div>
    <van-nav-bar
      title="收货地址"
      left-text="返回"
      left-arrow
      @click-left="onBack"
    />
    <van-address-list
      v-model="chosenAddressId"
      :list="address"
      :switchable="switchable"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script>
import addressApi from '@/api/addressApi'
import cache from '@/utils/cache'

export default {
  data() {
    return {
      chosenAddressId: '',
      address: [],
      userId: ''
    }
  },
  computed: {
    // 是否可选，判断路由地址在个人中心还是创建订单
    switchable() {
      return this.$route.name === 'createOrder'
    }
  },
  mounted() {
    const localUserId = cache.getCookie('userId')
    if (localUserId !== 'undefined' && localUserId !== '') {
      this.userId = localUserId
    }
    // this.userId = '1331165300909780994'
    this.getAddress()
  },
  methods: {
    getAddress() {
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      addressApi.getAddress(this.userId).then(res => {
        this.address = res.data.map(item => {
          if (item.isDefault) this.$store.commit('SET_ADDRESS', item)
          return {
            id: item.addrId,
            name: item.contactName,
            tel: item.contactPhone.replace(/^(\d{3})\d+(\d{4})$/, '\$1****\$2'),
            address: item.provinceName + item.districtName + item.fullAddress,
            isDefault: item.defaulted === 1,
            tag: item.addrLabelId,
            province: item.provinceName,
            provinceCode: item.provinceCode,
            city: item.cityName,
            cityCode: item.cityCode,
            county: item.districtName,
            addressDetail: item.fullAddress,
            areaCode: item.districtCode
          }
        })
        if (!this.$store.getters.address.id && this.address[0]) {
          this.$store.commit('SET_ADDRESS', this.address[0])
        }
        toast.clear()
      })
    },
    onAdd() {
      this.$router.push({
        path: '/address/edit',
        query: {
          userId: this.userId
        }
      })
    },
    onEdit(item, index) {
      this.$router.push({
        path: '/address/edit',
        query: {
          data: item
        }
      })
    },
    onBack() {
      if (this.switchable) this.$emit('closeAddressPopup')
      else this.$router.go(-1)
    },
    // 选中地址，设置用户选中的地址
    onSelect(val, index) {
      this.$store.commit('SET_ADDRESS', val)
    }
  }
}
</script>

<style scoped>

</style>

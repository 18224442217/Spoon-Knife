<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onBack"
    />
    <van-address-edit
      :area-list="areaList"
      :show-delete="showDelete"
      :address-info="currentAddress"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      show-set-default
      @save="onSave"
      @delete="onDelete"
      @change-area="onAreaChange"
    >
      <div class="tag-box van-cell van-field">
        <div class="van-cell__title van-field__label">
          <span>标签</span>
        </div>
        <div class="van-cell__value"
             style="text-align: left;">
          <van-tag :type="tag === 0?'danger':'warning'"
                   plain
                   @click="onTagSelected(0)">家</van-tag>
          <van-tag :type="tag === 1?'danger':'warning'"
                   plain
                   @click="onTagSelected(1)">公司</van-tag>
          <van-tag :type="tag === 2?'danger':'warning'"
                   plain
                   @click="onTagSelected(2)">学校</van-tag>

        </div>
      </div>
    </van-address-edit>
  </div>
</template>

<script>
import area from '@/utils/area'
import addressApi from '@/api/addressApi'

export default {
  data() {
    return {
      areaList: area,
      searchResult: [],
      currentArea: [],
      tag: 0,
      currentAddress: {},
      showDelete: false,
      title: '新增收货地址'
    }
  },
  mounted() {
    const address = this.$route.query.data
    if (address) {
      this.title = '修改/删除收货地址'
      this.currentAddress = address
      this.showDelete = true
      this.tag = parseInt(address.tag)
      this.currentArea.push({
        name: address.provinceName,
        code: address.provinceCode
      })
      this.currentArea.push({
        name: address.cityName,
        code: address.cityCode
      })
      this.currentArea.push({
        name: address.county,
        code: address.areaCode
      })
    }
  },
  methods: {
    // 新增或者修改
    onSave(data) {
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '保存中'
      })
      const params = {
        userId: this.$route.query.userId,
        defaulted: data.isDefault ? 1 : 0,
        provinceCode: this.currentArea[0].code,
        provinceName: data.province,
        cityCode: this.currentArea[1].code,
        cityName: data.city,
        districtCode: this.currentArea[2].code,
        districtName: data.county,
        fullAddress: data.addressDetail,
        contactPhone: data.tel,
        contactName: data.name,
        addrLabelId: this.tag
      }
      // 修改
      if (this.showDelete) {
        params.addrId = this.currentAddress.id
        addressApi.update(params).then(res => {
          toast.clear()
          this.onBack()
        })
      } else { // 新增
        addressApi.add(params).then(res => {
          toast.clear()
          this.onBack()
        })
      }
    },
    // 删除
    onDelete() {
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '删除中'
      })
      const id = this.$store.getters.address.id
      if (id === this.currentAddress.id) {
        this.$store.commit('SET_ADDRESS', {})
      }
      addressApi.delete(this.currentAddress.id).then(res => {
        toast.clear()
        this.onBack()
      })
    },
    // 地区改变
    onAreaChange(data) {
      this.currentArea = data
    },
    // 返回
    onBack() {
      this.$router.go(-1)
    },
    // 标签选中
    onTagSelected(value) {
      this.tag = value
    }
  }
}
</script>

<style scoped>

</style>

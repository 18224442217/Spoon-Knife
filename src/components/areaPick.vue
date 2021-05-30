<template>
  <div>
    <van-nav-bar left-text="返回"
                 left-arrow
                 @click-left="onClickAreaPickerLeft" />
    <van-list>
      <van-cell v-for="(item,index) in areaList"
                :key="index"
                @click="findRegoinList(item.id,item.name,+1)"
                style="text-align:center">
        {{item.name}}
      </van-cell>
    </van-list>

  </div>
</template>

<script>

import orderApi from '@/api/orderApi'

export default {
  data () {
    return {
      areaList: [],
      areaNameList: [],
      areaCodeList: [],

      showAreaListPicker: false,
      lockClick: false,
      waitBack: null
    }
  },

  mounted () {
    this.getRegoinList(0)
  },

  methods: {

    // 请求下级地址列表
    findRegoinList (id, name) {

      if (this.lockClick) return
      this.lockClick = true

      this.areaCodeList.push(id)
      this.areaNameList.push(name)
      this.getRegoinList(id)

    },

    // 请求上级地址列表
    onClickAreaPickerLeft () {

      const index = this.areaCodeList.length - 2
      const id = this.areaCodeList[index]
      this.areaCodeList.pop()
      this.areaNameList.pop()
      if (index === -2) {
        this.$emit('cancel')
        return
      }
      // 防抖
      clearTimeout(this.waitBack)
      this.waitBack = setTimeout(() => {
        this.getRegoinList(id)
      }, 250)

    },


    // 获取列表
    getRegoinList (id) {

      if (this.areaCodeList.length < 3) {
        orderApi.findRegoinList({ id })
          .then(res => {
            this.areaList = res.data
            this.lockClick = false
            this.$emit('change', {
              code: this.areaCodeList,
              name: this.areaNameList
            })
          })
      } else {
        this.lockClick = false
        this.$emit('cancel')
      }
    }
  },
  watch: {

  }
}

</script>
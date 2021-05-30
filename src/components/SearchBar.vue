<template>
  <van-row type="flex"
           align="center"
           class="content">
    <van-col class="search"
             span="20">
      <van-search v-model="searchValue"
                  placeholder="请输入搜索关键词"
                  background="tranparents"
                  shape="round"/>
    </van-col>
    <van-col span="4">
      <van-button type="primary"
                  color="#F8B500"
                  height="54"
                  @click="search">搜索</van-button>
    </van-col>

  </van-row>
</template>

<script>

export default {

  props: {
    keyword: String,
    default: ''
  },
  data() {
    return {
      searchValue: ''
    }
  },
  watch: {
    'keyword'(val) {
      this.searchValue = this.keyword
    }
  },
  methods: {
    search() {
      this.$router.push({
        name: 'searchResult',
        params: {
          keyword: this.searchValue
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
.content {
  background: #f8b500;
}
</style>

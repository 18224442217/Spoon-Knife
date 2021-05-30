<template>
  <div class="body">
    <van-tabs v-model="noticeTypeId"
              @change="changeTab">
      <van-tab
        v-for="item in typeList"
        :title="item.name"
        :name="item.id"
        :key="item.id"
      />
    </van-tabs>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="queryAnnouncement"
    >
      <div v-for="item in announcementList"
           :key="item.id"
           class="message_box">
        <p class="title">
          <span>{{ item.title }}</span>
          <span class="date">{{ dateTools.formatTime(item.createTime) }}</span>
        </p>
        <div>
          <p class="content">{{ item.content }}</p>

          <van-divider v-if="item.linkType"
                       :style="{ borderColor: '#E9E9E9' }" />
          <p v-if="item.linkType"
             class="btn"
             @click="navigator(item)">查看详情</p>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import homeApi from '@/api/homeApi'
import commonApi from '@/api/commonApi'
import cache from '@/utils/cache'
import dateTools from '@/utils/datetime'
export default {
  data() {
    return {
      announcementList: [],
      loading: false,
      finished: false,
      page: 1,
      noticeTypeId: '',
      typeList: [{ id: '', name: '全部' }],
      dateTools
    }
  },
  mounted() {
    this.queryAnnouncementType()
  },
  methods: {
    // 查询分类列表
    queryAnnouncementType() {
      homeApi.queryAnnouncementType().then((res) => {
        this.typeList.push(...res)
      })
    },
    // 搜索
    queryAnnouncement() {
      const data = {
        pageSize: 10,
        pageNum: this.page
      }
      if (this.noticeTypeId) data.noticeTypeId = this.noticeTypeId
      homeApi.queryAnnouncement(data).then((res) => {
        this.loading = false
        if (this.announcementList.length >= res.total * 1) this.finished = true
        else this.page++
        this.announcementList.push(...res.records)
      })
    },
    changeTab() {
      this.announcementList = []
      this.loading = true
      this.finished = false
      this.page = 1
      this.queryAnnouncement()
    },
    navigator(val) {
      switch (val.linkType) {
        case 1:
          this.$router.push({ name: 'shop', query: { merchantId: val.link }})
          break
        case 2:
          this.$router.push({ name: 'productDetails', query: { id: val.link }})
          break
        case 3:
          this.navigateUrl(val.link)
          break
        case 4:
          this.navigateUrl(val.link)
          break
        default:
          break
      }
    },
    // 链接跳转的处理
    async navigateUrl(url) {
      const user = this.$store.getters.user
      const phone = user.phone

      // 移动业务的跳转
      if (url.startsWith('http://wap.sc.10086.cn')) {
        if (!(cache.getCookie('isSiChuan') * 1)) {
          if ((await homeApi.checkIsYD()) !== 'yd') {
            this.$toast('亲，您不是四川移动用户暂不能正常使用哦！')
            return
          }
        }
        const sm4 = await commonApi.sm4({ plainText: phone })
        window.location.replace(`${url}&info=${sm4}`)
      } else if (url.startsWith('https://www.hsh.139sc.com/h5/')) {
        if (!(cache.getCookie('isSiChuan') * 1)) {
          if ((await homeApi.checkIsYd()) !== 'yd') {
            this.$toast('亲，您不是四川移动用户暂不能正常使用哦！')
            return
          }
        }
        const token = cache.getToken()
        const ac_id = 'h5mall_home'
        window.location.replace(`${url}?token=${token}&phone=${phone}&ac_id=${ac_id}`)
      } else {
        window.location.replace(`${url}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell {
  border-radius: 10px;
  margin-top: 20px;
}
.message_box {
  background: #fff;
  margin:20px 30px 0;
  border-radius: 20px;
  padding:20px 30px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-weight: bold;
      font-size: 40px;
    }
    .date {
      font-weight: normal;
      color: #999;
      font-size: 32px;
      text-align: end;
    }
  }

  .content {
    margin: 20px 0;
    color: #333;
    font-size: 36px;
    text-indent: 2rem;
  }

  .btn {
    color: #005fdb;
    text-align: center;
    font-size: 40px;
  }
}
.body {
  background: #f7f7f7;
}
</style>

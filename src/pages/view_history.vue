<template>
  <div class="page-view-history">
    <!-- 搜索区 -->
    <van-row>
      <van-nav-bar title="观看历史" left-text="" @click-left="$router.go(-1)" left-arrow>
      </van-nav-bar>
    </van-row>
    <div class="live-list">
      <template v-for="(item, index) in lives" >
        <van-row style="padding: 0 10px" :key="index">
          <router-link :to="{name: 'liveDetails', query: {id: item.liveId}}">
            <div class="live-notice">
              <div class="ln-cover" :style="'background:url(\''+ item.imgUrl +'\') center no-repeat'"></div>
              <div class="ln-info">
                <div class="ln-tt">{{item.name}}</div>
                <div class="ln-order">
                  <span class="ln-date">{{item.area}}</span>
                  <span class="ln-follow"></span>
                </div>
              </div>
            </div>
          </router-link>
        </van-row>
      </template>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex';
  import CommonApi from '../api/commonApi';

  export default {
    data() {
      return {
        lives: []
      }
    },
    computed: {

    },
    methods: {
      getLives() {
        let params = {
          id: 1
        }
        CommonApi.queryViewHistory(params).then(res => {
          console.log('观看历史',res)
          if (res.data &&  res.data.length) {
            this.lives = res.data
          } else {
            this.lives = []
          }
        })
      }
    },
    watch: {},
    directives: {},
    beforeCreate() {


    },
    created() {
      this.getLives()
    }
  }
</script>

<style lang="less">
  .page-view-history {
    .live-list{
      height: calc(100vh - 46px);
      background: #fff;
      padding: 10px 0;
    }
    .ln-tt{
      color: #333;
      margin: 10px 0;
      height: auto;
    }
    .ln-order{
      color: #666;
    }
  }

</style>


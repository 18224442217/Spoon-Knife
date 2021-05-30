<template>
  <div>
    <van-row>
      <van-col span="4">
        <van-icon style="margin:10px 0 0 10px;"
                  name="close"
                  size="25"
                  @click="closesd"/>
      </van-col>
      <van-col span="6">
        <van-image :src="require('../../static/images/icons.png')"
                   width="2.5rem"
                   height="2.5rem"
                   fit="scale-down"
                   style="margin-top: 5px;"/>
      </van-col>
      <van-col span="8"
               style="text-align: left;line-height: 3rem;">打开和生活APP</van-col>
      <van-col span="6"
               style="background: #E11E3E;height: 3rem;color: #fff;line-height: 3rem;text-align: center;"
               @click="openApps">立即打开</van-col>
    </van-row>
  </div>
</template>

<script>
import { Notify } from 'vant'
export default {
  name: 'OpenApp',
  props: {
    closes: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      u: navigator.userAgent
    }
  },
  mounted() {
    this.isIOS = !!this.u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    this.isAndroid = this.u.indexOf('Android') > -1 || this.u.indexOf('Linux') > -1
    this.isWeixin = this.u.toLowerCase().indexOf('micromessenger') !== -1
  },
  methods: {
    closesd() {
      this.closes()
    },
    openApps() {
      if (this.isWeixin) {
        if (this.isIOS) {
          Notify({
            message: '请在Safari浏览器上打开',
            type: 'danger',
            duration: 2000
          })
        } else {
          Notify({
            message: '请在浏览器上打开',
            type: 'danger',
            duration: 2000
          })
        }
      } else {
        // android端
        if (this.isAndroid) {
          // 安卓app的scheme协议
          window.location.href = `ydmall://com.equity.ydmall/h5open`
          setTimeout(function() {
            const hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden || window.document.webkitHidden
            if (typeof hidden === 'undefined' || hidden === false) {
              window.location.href = `market://details?id=com.equity.ydmall`
            }
          }, 2000)
        }
        // ios端
        if (this.isIOS) {
          // ios的scheme协议
          window.location.href = `ydmall://com.equity.ydmall/h5open`
          setTimeout(function() {
            const hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden || window.document.webkitHidden
            if (typeof hidden === 'undefined' || hidden === false) {
              // App store下载地址
              window.location.href = 'https://itunes.apple.com/app/id1524613152'
            }
          }, 5000)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>

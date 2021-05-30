<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        :value="currentType"
        readonly
        clickable
        name="picker"
        label="反馈类型"
        placeholder="点击选择反馈类型"
        @click="isShowSelectedType = true"
      />
      <van-field
        v-model="form.remarks"
        :rules="[{ required: true, message: '请填写意见内容' }]"
        name="意见内容"
        label="意见内容"
        placeholder="请输入意见内容"
      />
      <van-field
        v-model="form.phone"
        name="手机号码"
        label="手机号码"
        placeholder="请输入手机号码"
      />
      <van-field name="上传图片"
                 label="上传图片"
                 placeholder="请上传图片">
        <template #input>

          <van-uploader v-model="fileList"
                        :after-read="afterRead" />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="info"
                    native-type="submit">提交</van-button>
      </div>
    </van-form>
    <van-popup v-model="isShowSelectedType"
               :style="{ height: '50%' }"
               position="bottom" >
      <van-picker
        :columns="typeList.map(v=>v.val)"
        title="反馈类型"
        show-toolbar
        @confirm="handlerSelectedType"
        @cancel="isShowSelectedType=false"
      />
    </van-popup>
  </div>
</template>
<script>
import mineApi from '@/api/mineApi'
import merchantenterApi from '@/api/merchantenter'

export default {
  data() {
    return {
      isShowSelectedType: false,
      typeList: [],
      form: {
        feedbackType: 0,
        phone: '',
        pictureUrl: '',
        remarks: ''
      },
      currentType: '',
      fileList: [],
      pictureUrl: []
    }
  },
  mounted() {
    this.queryTypeList()
  },
  methods: {
    queryTypeList() {
      console.log('?')
      mineApi.queryFeedbackTypeList()
        .then(res => {
          console.log(res)
          this.typeList = res
        })
    },
    handlerSelectedType(value, index) {
      this.form.feedbackType = this.typeList[index].id
      this.currentType = value
      this.isShowSelectedType = false
    },
    onSubmit() {
      this.form.pictureUrl = this.pictureUrl.join(',')
      mineApi.confirmFeedback(this.form)
        .then(res => {
          this.$toast.success('提交成功')
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        })
    },
    afterRead(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('file', file.file)
      merchantenterApi.uploadefile(formData).then(res => {
        console.log(res.url)
        file.status = 'done '
        this.pictureUrl.push(res.url)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

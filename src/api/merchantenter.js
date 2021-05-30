import Request from '@/utils/request'
const Service = {
  // 手机号限制查询
  isMobilePhone(params = {}) {
    return Request.get('/merchant-user/ymBMerchantReview/isMobilePhone', {
      params
    })
  },
  // 查询分类接口
  queryclass(params = {}) {
    return Request.get('/merchant-user/ymBMerchantClassification/query', {
      params
    })
  },
  // 查询铭感词
  // queryname(data) {
  //   return Request.post('/approval/badWord/queryBadWord', data)
  // },
  queryname(data) {
    return Request.post('/ydrest/aiAbility/textDetect', data)
  },
  // 文件上传

  uploadefile(params = {}) {
    return Request.post('/file-center/files/upload', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'isUpload': true
      }
    })
  },
  // 查询上传文件类型
  queryimg(params = {}) {
    return Request.get(`/merchant-user/ymBMerchantQualification/query`, {
      params
    })
  },
  // 商户入驻提交
  submitform(data) {
    return Request.post(`/merchant-user/ymBMerchantBaseInfo/saveByH5`, data)
  },

  // 查询电话接口
  queryphone(data) {
    return Request.get('/merchant-user/ymBMerchantBaseInfo/getByPhone?phone=' + data.phone, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;'
      }
    })
  },

  // 身份证识别接口
  queryIdentity(data) {
    return Request.post(`/merchant-user/ymBMerchantBaseInfo/idCardReview`, data)
  }

}
export default Service

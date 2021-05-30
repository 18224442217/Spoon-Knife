import Request from '@/utils/request'

const Service = {
  // 登录
  login(data = {}) {
    return Request({
      url: '/api-auth/authentication/sms',
      method: 'post',
      data
    })
  },
  businessLogin(data = {}) {
    return Request({
      url: '/api-auth/oauth/user/pwd_msg_token',
      method: 'post',
      data
    })
  },
  // 获取验证码
  smsCode(params = {}) {
    return Request.post(`/sms-center/sms-internal/codes?phone=${params.phone}`)
  },
  // 一键登录加密
  resCode(params) {
    return Request.get(`/api-auth/oauth/cmpass/token4h5/sign`, { params })
  },
  // 一键登录
  token4h5(data) {
    return Request.post(`/api-auth/oauth/cmpass/token4h5`, data)
  },
  // 查询用户信息
  currentUser() {
    return Request.get(`/api-auth/oauth/current_user`)
  },
  merchantInfo(params) {
    return Request.get(`/merchant-user/ymBMerchantBaseInfo/${params.id}`)
  },
  queryMchId(params) {
    return Request.get(`/merchant-user/ymBMerchantBaseInfo/queryMerchantId?userId=${params.id}`)
  }

}

export default Service

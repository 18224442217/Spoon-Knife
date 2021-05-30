import Request from '@/utils/request'

const Service = {
  // 退出登录
  logout(access_token) {
    return Request({
      url: '/api-auth/oauth/remove/token?access_token=' + access_token,
      headers: {
        client_id: 'webApp',
        client_secret: 'webApp'
      },
      method: 'post'
    })
  },
  queryFeedbackTypeList() {
    return Request.get('/ydmall-user/ymBFeedback/listType')
  },
  confirmFeedback(data) {
    return Request.post('/ydmall-user/ymBFeedback', data)
  },
  // 获取用户中心首页信息
  getPageInfo() {
    return Request({
      url: '/ydmall-user/user/mine_page',
      headers: {
        client_id: 'webApp',
        client_secret: 'webApp'
      },
      method: 'get'
    })
  }
}

export default Service

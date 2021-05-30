import Request from '@/utils/request'
import user from '../store/Core_store/user'

const Service = {
  // 获取用户地址
  getAddress(userId) {
    return Request({
      url: '/ydmall-user/addr/' + userId + '/addrs',
      headers: {
        client_id: 'webApp',
        client_secret: 'webApp'
      },
      method: 'get'
    })
  },
  // 新增用户地址
  add(data = {}) {
    return Request({
      url: '/ydmall-user/addr',
      headers: {
        client_id: 'webApp',
        client_secret: 'webApp'
      },
      method: 'post',
      data
    })
  },
  // 修改用户地址
  update(data = {}) {
    return Request({
      url: '/ydmall-user/addr/put',
      headers: {
        client_id: 'webApp',
        client_secret: 'webApp'
      },
      method: 'post',
      data
    })
  },
  // 删除用户地址
  delete(id) {
    return Request({
      url: '/ydmall-user/addr/del/' + id,
      headers: {
        client_id: 'webApp',
        client_secret: 'webApp'
      },
      method: 'get'
    })
  }
}

export default Service

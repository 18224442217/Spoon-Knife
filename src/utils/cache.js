import Cookie from 'js-cookie'

const TOKEN_NAME = 'access_token'
const TYPE_NAME = 'type'
const AUDITSTATUS_NAME = 'auditStatus'

const Cache = {
  // 审核状态
  setStatus(auditStatus) {
    if (auditStatus !== undefined) {
      Cookie.set(AUDITSTATUS_NAME, auditStatus)
    }
  },
  getStatus() {
    return Cookie.get(AUDITSTATUS_NAME)
  },
  // 判断是否是商家
  setType(type) {
    if (type !== undefined) {
      Cookie.set(TYPE_NAME, type)
    }
  },
  getType() {
    return Cookie.get(TYPE_NAME)
  },
  setToken(token) {
    if (token !== undefined) {
      Cookie.set(TOKEN_NAME, token)
    }
  },
  getToken() {
    return Cookie.get(TOKEN_NAME)
  },
  clearToken() {
    Cookie.remove(TOKEN_NAME)
  },

  setCookie(name, value) {
    Cookie.set(name, value)
  },

  getCookie(name) {
    return Cookie.get(name)
  }
}

export default Cache

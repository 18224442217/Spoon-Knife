import { decode } from './crypto'
import Cache from './cache'
import Request from '@/utils/request'
import commonApi from '@/api/commonApi'
import store from '@/store/index'

export async function saveUrlParams(url) {
  // let urlParams = url.substring(url.indexOf('?') + 1).split('&')
  // let params
  // if (url.indexOf('cryptoParams') !== -1) {
  //   const value = /cryptoParams=\S+/.exec(url)[0]
  //   params = decode(value.substring(13))
  // } else {

  // }
  const urlParams = url.substring(url.indexOf('?') + 1).split('&')
  const index = url[0].indexOf('cryptoParams=')
  let params
  if (index !== -1) {
    params = decode(urlParams[0].substring(index + 1))
  } else {
    console.log(urlParams, 'params')
    params = urlParams.reduce((pre, cur) => {
      // const key = /\S+?(?==)/.exec(cur)
      // const value = /(?<==)\S+/.exec(cur)
      // pre[key[0]] = value[0]
      // const arr = cur.split('=')
      // pre[arr[0]] = arr
      const i = cur.indexOf('=')
      if (i !== -1) {
        pre[cur.substr(0, i)] = cur.substring(i + 1)
      }
      return pre
    }, {})
  }

  if (params.cryptoParams) params = decode(params.cryptoParams)

  // window.alert(urlParams)
  // if (params.cryptoParams) params = decode(params.cryptoParams)

  if (process.env.VUE_APP_MODE === 'development') {
    params = {
      ac_id: 'test',
      cid: 'test',
      phone: '18283982756',
      token: `996c6376-37dd-48e3-ad60-1995b5860e65`
    }
  }

  for (const key in params) {
    // sessionStorage.setItem(key, params[key])
    Cache.setCookie(key, params[key])
  }
  if (params.token) Cache.setToken(params.token)
  if (params.p) {
    Cache.clearToken()
    const dict = {
      '%20': '+',
      '%2F': '/',
      '%3F': '?',
      '%25': '%',
      '%23': '#',
      '%26': '&',
      '%3D': '='
    }
    for (const key in dict) {
      params.p = params.p.replace(new RegExp(key, 'g'), dict[key])
    }
    const res = await Request.post('/api-auth/oauth/zt/token', { p: params.p })
    Cache.setToken(res.accessToken.access_token)
    const { user } = await commonApi.userInfo()
    Cache.setCookie('userId', user.id)
    store.commit('SET_USER', user)
  }
}

export function getUrlParams(key) {
  return sessionStorage.getItem(key)
}


import BMap from 'BMap'
import { Toast } from 'vant'

export default function getGeolocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(async function a(val) {
      const { latitude: lat, longitude: lng } = val.coords
      const gpsPoint = new BMap.Point(lng, lat)
      const convertor = new BMap.Convertor()
      convertor.translate([gpsPoint], 1, 5, (p) => {
        const { lng, lat } = p.points[0]
        const myGeo = new BMap.Geocoder()
        myGeo.getLocation(new BMap.Point(lng, lat), data => {
          resolve(data)
        })
      })
      // const bMapGeolocation = new BMap.Geolocation()
      // bMapGeolocation.getCurrentPosition(function(r) {
      //   console.log(r)
      //   const myGeo = new BMap.Geocoder()
      //   myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), data => {
      //     resolve(data)
      //   })
      // })
    }, (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          Toast.fail('定位失败,用户拒绝请求地理定位')
          reject('定位失败,用户拒绝请求地理定位')
          break
        case error.POSITION_UNAVAILABLE:
          Toast.fail('定位失败,位置信息是不可用')
          reject('定位失败,位置信息是不可用')
          break
        case error.TIMEOUT:
          Toast.fail('定位失败,请求获取用户位置超时')
          reject('定位失败,请求获取用户位置超时')
          break
        case error.UNKNOWN_ERROR:
          Toast.fail('定位失败,定位系统失效')
          reject('定位失败,定位系统失效')
          break
      }
    }, {
      // 指示浏览器获取高精度的位置，默认为false
      enableHighAccuracy: true,
      // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
      timeout: 5000,
      // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
      maximumAge: 3000
    })
  })
}

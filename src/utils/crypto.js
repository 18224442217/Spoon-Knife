import CryptoJS from 'crypto-js'
const key = CryptoJS.enc.Utf8.parse('16BytesLengthKey')
const iv = CryptoJS.enc.Utf8.parse('16BytesLengthKey')

const encode = (data) => {
  const str = JSON.stringify(data)
  return CryptoJS.AES.encrypt(str, key, {
    iv: iv
  }).ciphertext.toString(CryptoJS.enc.Base64)
}

const decode = (data) => {
  const resStr = CryptoJS.AES.decrypt(data, key, {
    iv // mode 和 padding 的默认值分别为 CBC 和 Pkcs7，加解密时需要保持一致
  }).toString(CryptoJS.enc.Utf8)
  return JSON.parse(resStr)
}

export {
  encode,
  decode
}

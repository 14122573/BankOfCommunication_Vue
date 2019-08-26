import cryptoJs from 'crypto-js'
import Md5 from 'js-md5'
const CBCKEY = Md5('YUJIAdministration')
const CBCIV = CBCKEY.slice(0,8)

// DES加密 -- CBC模式
export const encryptDes = (message) => {
  var keyHex = cryptoJs.enc.Utf8.parse(CBCKEY)
  var ivHex = cryptoJs.enc.Utf8.parse(CBCIV)
  var option = { iv: ivHex, mode: cryptoJs.mode.CBC, padding: cryptoJs.pad.Pkcs7 }
  var encrypted = cryptoJs.DES.encrypt(message, keyHex, option)
  return encrypted.ciphertext.toString()
}

// DES解密 -- CBC模式
export const decryptDes = (message) => {
  var keyHex = cryptoJs.enc.Utf8.parse(CBCKEY)
  var ivHex = cryptoJs.enc.Utf8.parse(CBCIV)
  var decrypted = cryptoJs.DES.decrypt(
    {
      ciphertext: cryptoJs.enc.Hex.parse(message)
    },
    keyHex,
    {
      iv: ivHex,
      mode: cryptoJs.mode.CBC,
      padding: cryptoJs.pad.Pkcs7
    }
  )
  return decrypted.toString(cryptoJs.enc.Utf8)
}

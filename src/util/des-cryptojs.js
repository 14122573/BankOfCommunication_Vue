import cryptoJs from 'crypto-js'
import Md5 from 'js-md5'
const CBCKEY = Md5('YUJIAdministration')
const CBCIV = CBCKEY.slice(0, 8)

// DES加密 -- CBC模式
export const encryptDes = (message) => {
  const keyHex = cryptoJs.enc.Utf8.parse(CBCKEY)
  const ivHex = cryptoJs.enc.Utf8.parse(CBCIV)
  const option = { iv: ivHex, mode: cryptoJs.mode.CBC, padding: cryptoJs.pad.Pkcs7 }
  const encrypted = cryptoJs.DES.encrypt(message, keyHex, option)
  return encrypted.ciphertext.toString()
}

// DES解密 -- CBC模式
export const decryptDes = (message) => {
  const keyHex = cryptoJs.enc.Utf8.parse(CBCKEY)
  const ivHex = cryptoJs.enc.Utf8.parse(CBCIV)
  const decrypted = cryptoJs.DES.decrypt(
    {
      ciphertext: cryptoJs.enc.Hex.parse(message)
    },
    keyHex,
    {
      iv     : ivHex,
      mode   : cryptoJs.mode.CBC,
      padding: cryptoJs.pad.Pkcs7
    }
  )
  return decrypted.toString(cryptoJs.enc.Utf8)
}

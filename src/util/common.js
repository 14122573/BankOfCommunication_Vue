/** 公共方法 */
export default {
  /**
     * 在深层数据结构中取值（为了替代类似 res && res.data && res.data.content这种写法）
     * @param {Object} obj [必填-需要取值的目标对象（例：res）]
     * @param {String} path [必填-数据结构路径（例：'data.content'）]
     * @param {Any} defaultValue [可选-如果取不到值则默认返回该值]
     */
  confirm(obj, path, defaultValue = null) {
    if (!obj || typeof(obj) != 'object' || !path || typeof(path) != 'string') return
    const reducer = (accumulator, currentValue) =>
      (accumulator && accumulator[currentValue]) ?
        accumulator[currentValue] :
        defaultValue

    path = path.split('.')
    return path.reduce(reducer, obj)
  },
  /**
     *  -----  柯里化版本 （为了不再重复输入obj这个参数） -----
     * 在深层数据结构中取值（为了替代类似 res && res.data && res.data.content这种写法）
     * @param {Object} obj [必填-需要取值的目标对象（例：res）]
     */
  confirm_currying(obj) {
    if (!obj || typeof(obj) != 'object') return
    return (path, defaultValue = null) => {
      if (!path || typeof(path) != 'string') return
      const reducer = (accumulator, currentValue) =>
        (accumulator && accumulator[currentValue]) ?
          accumulator[currentValue] :
          defaultValue
      path = path.split('.')
      return path.reduce(reducer, obj)
    }
  },
  /**
     * 判断一维数组中是否存在某个值
     * @param {String} value 需要校验的字符串
     * @param {Array} validList 被查找的一维数组
     * @return {Boolean}   是否存在的结果
     */
  oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true
      }
    }
    return false
  },
  /**
     * 转换为金钱格式(千分位且保留两位小数)
     * @param {Number | String} num [需转换的数字或字符串]
     */
  toMoney(num) {
    if (!num) {
      return 0.00
    }
    num = this.toFloat(num).toFixed(2)
    const arr = num.toString().split('.')
    let int = (arr[0] || 0).toString(),
      result = ''
    while (int.length > 3) {
      result = ',' + int.slice(-3) + result
      int = int.slice(0, int.length - 3)
    }
    if (int) {
      result = int + result
    }
    return `${result}.${arr[1]}`
  },

  /**
     * 手机号码校验
     * @param {String} num [需校验的手机号码]
     */
  checkPhone(num) {
    if (!num) return false
    const filter = /^1[3-9][0-9]{9}$/
    return filter.test(num)
  },

  /**
     * 固定电话号码校验
     * @param {String} num [需校验的固话]
     */
  checkTel(num) {
    if (!num) return false
    const filter = /^(?:0[1-9][0-9]{1,2}-)?[2-8][0-9]{6,7}$/
    return filter.test(num)
  },

  /**
     * 身份证号码校验
     * @param {String} num [需校验的身份证号码]
     */
  checkID(num) {
    if (!num) return false
    const filter = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/
    return filter.test(num)
  },

  /**
     * 数字校验(整数或者小数)
     * @param {String} num [需校验的数字]
     */
  checkNumber(num) {
    if (!num && num != 0) return false
    const filter = /^[0-9]+\.{0,1}[0-9]{0,2}$/
    return filter.test(num)
  },

  /**
     * 文本校验(只能为中文、英文、数字组合，不允许其他特殊符号)
     * @param {String} txt [需校验的文本]
     */
  checkContent(txt) {
    const filter = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
    return filter.test(txt)
  },
}

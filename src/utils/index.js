import * as commonApi from '@/api/common'
import md5 from 'js-md5'

/**
 * 表单校验
 * @param target 当前Vue实例
 * @param form {String} 表单ref
 * @return Promise对象：可执行;false：不可执行
 * @author 张铭 2018/08/01
 */
export function checkForm (target, form) {
  return new Promise((resolve, reject) => {
    target.$refs[form].validate((valid) => {
      if (valid) {
        resolve()
      } else {
        return false
      }
    })
  })
}

/**
 * 值与文字之间的转换
 * @param val 需转换的值
 * @param arr {Array} 转换查询的数组对象
 * @param label {String} 数组对象中文字的key，默认值label
 * @param value {String} 数组对象中值的key，默认值value
 * @return {String} 传入值所对应的文字
 * @author 张铭 2018/08/01
 */
export function transformValueToLabel (val, arr, label = 'label', value = 'value') {
  const res = arr.filter(item => {
    return item[value] === val
  })
  if (res.length) {
    return res[0][label]
  }
}

/**
 * 格式化日期
 * @param date 日期，可接受时间戳或毫秒数
 * @param type {Number} 转换类型
 * @return {String} 时间戳
 * @author 张铭 2018/08/01
 */
export function formatDate (date, type = 1) {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date)
  }
  const y = date.getFullYear()
  const M = toDouble(date.getMonth() + 1)
  const d = toDouble(date.getDate())
  const h = toDouble(date.getHours())
  const m = toDouble(date.getMinutes())
  const s = toDouble(date.getSeconds())
  if (type === 1) {
    return `${y}-${M}-${d} ${h}:${m}:${s}`
  } else if (type === 2) {
    return `${y}-${M}-${d}`
  } else if (type === 3) {
    return `${h}:${m}`
  }
}

/**
 * 小于10的数值补0
 * @param num {Numbeer}
 * @return {String}
 * @author 张铭 2018/08/01
 */
export function toDouble (num) {
  return num < 10 ? '0' + num : num
}

/**
 * 增加时间
 * @param target {Date} 原时间
 * @param unit {String} 增加类型
 * @param value {Numbeer} 需要增加的时间
 * @return {Date} 计算后时间
 * @author 张铭 2018/08/01
 */
export function addDate (target, unit, value) {
  switch (unit) {
    case 'y':
      target.setFullYear(target.getFullYear() + value)
      break
    case 'M':
      target.setMonth(target.getMonth() + value)
      break
    case 'd':
      target.setDate(target.getDate() + value)
      break
    case 'h':
      target.setHours(target.getHours() + value)
      break
    case 'm':
      target.setMinutes(target.getMinutes() + value)
      break
    case 's':
      target.setSeconds(target.getSeconds() + value)
      break
  }
  return target
}

/**
 * 获取文件后缀
 * @param filename {String} 文件名
 * @return {String} 文件名后缀
 * @author 张铭 2018/08/01
 */
export function getSuffix (filename) {
  const pos = filename.lastIndexOf('.')
  let suffix = ''
  if (pos !== -1) {
    suffix = filename.substring(pos)
  }
  return suffix
}

/**
 * 生成随机数
 * @param len {Number} 随机数位数，默认32位
 * @return {String} 随机数
 * @author 张铭 2018/08/01
 */
export function randomString (len = 32) {
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

/**
 * 设置cookie
 * @param cname {String} cookie名
 * @param cvalue {String} cookie值
 * @param exdays {String} cookie保存时间（天）
 * @param path {String} cookie保存路径
 * @author 张铭 2018/08/01
 */
export function setCookie (cname, cvalue, exdays, path = '/') {
  let d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = 'expires=' + d.toUTCString()
  const cpath = 'path=' + path
  document.cookie = cname + '=' + cvalue + '; ' + expires + ';' + cpath
}

/**
 * 获取cookie
 * @param cname {String} cookie名
 * @return {String} cookie值
 * @author 张铭 2018/08/01
 */
export function getCookie (cname) {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}

/**
 * 清除cookie
 * @param cname {String} cookie名
 * @author 张铭 2018/08/01
 */
export function clearCookie (cname) {
  setCookie(cname, '', -1)
}

/**
 * 获取signature
 * @param name {String} 获取signature的api方法名
 * @author 张铭 2018/08/01
 */
export function getSignature (name) {
  return new Promise((resolve, reject) => {
    const res = getCookie('sign') ? JSON.parse(getCookie('sign')) : ''
    const timestamp = Date.parse(new Date()) / 1000
    if (res.expire - 3 * 60 > timestamp) {
      resolve(res)
    } else {
      commonApi[name]().then(res => {
        setCookie('sign', JSON.stringify(res.data))
        resolve(res.data)
      })
    }
  })
}
/**
 * url拼接参数转换为对象格式
 * @param data {String} url
 * @returns {Object} 转换后对象
 * @author 张铭 2018/08/01
 */
export function transformUrlToObject (data) {
  const arr = data.split('&')
  let obj = {}
  arr.forEach(item => {
    const pair = item.split('=')
    obj[pair[0]] = pair[1]
  })
  return obj
}

/**
 * 生成盐值
 * @returns {String} 盐值
 * @author 张铭 2018/08/01
 */
export function createSalt () {
  let result = Math.floor(Math.random() * 90 + 10).toString()
  for (let i = 0; i < 2; i++) {
    const ranNum = Math.ceil(Math.random() * 25)
    result += String.fromCharCode(65 + ranNum).toString()
  }
  return result
}

/**
 * 加密
 * @param param {String} 需加密密码
 * @returns {String} 加密后密码
 * @author 张铭 2018/08/01
 */
export function encryptPwd (param) {
  let password = ''
  for (let i in param) {
    password += i % 2 ? (param.charCodeAt(i) << 2).toString() + '*' : (param.charCodeAt(i) << 3).toString() + '*'
  }
  password = password.slice(0, password.length - 1)
  return password
}

/**
 * 解密
 * @param param {String} 需解密密码
 * @returns {String} 解密后密码
 * @author 张铭 2018/08/01
 */
export function decodwPwd (param) {
  let password = ''
  if (param && param.indexOf('*') !== -1) {
    const passwordObj = param.split('*')
    for (let i in passwordObj) {
      password += i % 2 ? String.fromCharCode(passwordObj[i] >> 2) : String.fromCharCode(passwordObj[i] >> 3)
    }
  } else {
    password = param
  }
  return password
}

/**
 * 生成加盐加密后密码
 * @param password {String} 需解密密码
 * @param salt {String} 盐值
 * @returns {String} 加盐加密后密码
 * @author 张铭 2018/08/01
 */
export function createNewPassword (password, salt) {
  return md5(encryptPwd(salt + password))
}

/**
 * 表单校验规则
 * @param val 需校验的值
 * @param type {Number} 校验规则类型
 * @returns {boolean}
 * @author 张铭 2018/08/01
 */
export function validateRule (val, type) {
  let regExp
  switch (type) {
    case 1: // 名称类（姓名、公司/团队名称、部门名称、班次名）
      regExp = /^[\u4e00-\u9fa5a-zA-Z\d\s]*$/
      break
    case 2: // 名称类（用户名/昵称、设备名称/昵称、社群/群组/分组名称、应用/回调/通知名称）
      regExp = /^[\u4e00-\u9fa5a-zA-Z\d\s_]*$/
      break
    case 3: // 名称类（职位/角色）、地址类（籍贯）
      regExp = /^[\u4e00-\u9fa5a-zA-Z]*$/
      break
    case 4: // 地址类（URL地址）
      regExp = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
      break
    case 5: // 密码类（一般密码）
      regExp = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%&*?/]+$/
      break
    case 6: // 号码类（手机号）
      regExp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      break
    case 7: // 号码类（座机）
      regExp = /0\d{2,3}-\d{7,8}/
      break
    case 8: // 号码类（邮箱）
      regExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      break
    case 9: // 号码类（卡号/工号/学号）
      regExp = /^[a-zA-Z\d]*$/
      break
    case 10: // 号码类（身份证号）
      regExp = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      break
    case 11: // 号码类（银行卡号）
      regExp = /^\d$/
      break
    case 12: // 号码类（订单号/流水号）
      regExp = /^[a-zA-Z\d_-]*$/
      break
    case 13: // 号码类（uface设备序列号）
      regExp = /^[a-zA-Z\d]*$/
      break
    case 14: // 号码类（IP地址）
      regExp = /(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))/
      break
    case 15: // 号码类（MAC地址）
      regExp = /^[A-F0-9]{2}(-[A-F0-9]{2}){5}$|^[A-F0-9]{2}(:[A-F0-9]{2}){5}$/
      break
  }
  return regExp.test(val)
}

// 手机号校验
export const validatePhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else if (!validateRule(value, 6)) {
    callback(new Error('请输入正确的手机号'))
  }
}

// 密码校验
export const validatePwd = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value.length < 6 || value.length > 18) {
    callback(new Error('密码长度为6-18位'))
  } else if (!validateRule(value, 5)) {
    callback(new Error('请输入6-18位数字、字母、符号任意两种及以上组合的密码'))
  }
}

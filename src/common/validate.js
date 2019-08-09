import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import VueI18n from 'vue-i18n'
import zhMessages from 'vee-validate/dist/locale/zh_CN'
import enMessages from 'vee-validate/dist/locale/en'

Vue.use(VueI18n)

// 配置中文
const i18n = new VueI18n()
i18n.locale = 'zh_CN'

Validator.extend('phone', {
  getMessage: {
    zh_CN: field => field + '必须是11位手机号码'
  },
  validate: value => {
    return value.length === 11 && /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)
  }
})

Validator.extend('IDNumber', {
  getMessage: {
    zh_CN: field => field + '必须是18位正确身份证'
  },
  validate: value => {
    return checkID(value)
  }
})
// 部分省份没办法验证，2月份不完美验证
let checkCode = function (value) {
  if (value.length !== 18) return false
  let p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
  let parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]
  let code = value.substring(17)
  if (p.test(value)) {
    let sum = 0
    for (let i = 0; i < 17; i++) {
      sum += value[i] * factor[i]
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      return true
    }
  }
  return false
}
// 再次验证月份
let checkDate = function (value) {
  let pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/
  if (pattern.test(value)) {
    let year = value.substring(0, 4)
    let month = value.substring(4, 6)
    let date = value.substring(6, 8)
    let date2 = new Date(year + '-' + month + '-' + date)
    if (date2 && date2.getMonth() === (parseInt(month) - 1)) {
      return true
    }
  }
  return false
}
// 验证省份
let checkProv = function (value) {
  let pattern = /^[1-9][0-9]/
  let province = { 11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门' }
  if (pattern.test(value)) {
    if (province[value]) {
      return true
    }
  }
  return false
}
// 综合起来验证
let checkID = function (value) {
  if (checkCode(value)) {
    console.log('[[[[[[[[[[[[')
    let date = value.substring(6, 14)
    if (checkDate(date)) {
      if (checkProv(value.substring(0, 2))) {
        return true
      } else return false
    } else return false
  } else {
    return false
  }
}

const config = {
  i18nRootKey: 'validations', // customize the root path for validation messages.
  i18n,
  dictionary: {
    zh_CN: zhMessages,
    en: enMessages
  }
}

Vue.use(VeeValidate, config)

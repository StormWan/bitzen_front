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
    return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
})

const config = {
  i18nRootKey: 'validations', // customize the root path for validation messages.
  i18n,
  dictionary: {
    zh_CN: zhMessages,
    en: enMessages
  }
}

Vue.use(VeeValidate, config)

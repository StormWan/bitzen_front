import base from '../base' // 导入接口域名列表
import axios from '@/common/utils/http' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

const account = {
  /*
  * @param {Object} params - {code, token}
  * **/
  oauth (params) {
    return axios.post(`${base.base_api}/account/oauth/`, qs.stringify(params))
  },
  auth (params) {
    return axios.post(`${base.base_api}/account/phone_auth/`, qs.stringify(params))
  },
  verify (params) {
    return axios.post(`${base.base_api}/account/verify/`, qs.stringify(params))
  }
}

export default account

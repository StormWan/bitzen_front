import base from '../base' // 导入接口域名列表
import axios from '@/common/utils/http' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

const otc = {
  // 验证码
  /**
   * @param {Object} params - {receiver, recaptcha_response}
   * */
  verificationCreate (params) {
    return axios.post(`${base.base_api}/account/verifications/`, qs.stringify(params))
  },
  /**
   * @param {int} id - id
   * @param {Object} params
   * */
  verificationDetail (id, params) {
    return axios.get(`${base.base_api}/account/verifications/${id}/`, {
      params: params
    })
  },
  /*
  * @param {Object} params - {code, token}
  * **/
  oauth (params) {
    return axios.post(`${base.base_api}/account/oauth/`, qs.stringify(params))
  },
  currency (params) {
    return axios.get(`${base.base_api}/otc/pairs/`, {
      params: params
    })
  },
  currency_id (id, params) {
    return axios.get(`${base.base_api}/otc/pairs/${id}/`, {
      params: params
    })
  },
  // 付款方式
  payment_patch (params) {
    return axios.patch(`${base.base_api}/otc/payment_method/`, qs.stringify(params))
  },
  // 购买金额数量
  orders_post (params) {
    return axios.post(`${base.base_api}/otc/orders/`, qs.stringify(params))
  },
  // 购买金额数量
  orders_get (id, params) {
    return axios.get(`${base.base_api}/otc/orders/${id}/`, {
      params: params
    })
  },
  // 列表
  orders_lis () {
    return axios.get(`${base.base_api}/otc/orders/`)
  },
  // 状态
  orders_patch (id, params) {
    return axios.patch(`${base.base_api}/otc/orders/${id}/`, qs.stringify(params))
  }
}

export default otc







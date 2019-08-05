import base from '../base' // 导入接口域名列表
import axios from '@/common/utils/http' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

const otc = {
  otcPairList (params) {
    return axios.get(`${base.base_api}/otc/pairs/`, {
      params: params
    })
  },
  otcPairDetail (id, params) {
    return axios.get(`${base.base_api}/otc/pairs/${id}/`, {
      params: params
    })
  },
  // 付款方式
  paymentUpdate (params) {
    return axios.patch(`${base.base_api}/otc/payment_method/`, qs.stringify(params))
  },
  // 购买金额数量
  orderCreate (params) {
    return axios.post(`${base.base_api}/otc/orders/`, qs.stringify(params))
  },
  // 购买金额数量
  orderDetail (id, params) {
    return axios.get(`${base.base_api}/otc/orders/${id}/`, {
      params: params
    })
  },
  // 列表
  orderList (params) {
    return axios.get(`${base.base_api}/otc/orders/${params}`)
  },
  // 状态
  orderUpdate (id, params) {
    return axios.patch(`${base.base_api}/otc/orders/${id}/`, qs.stringify(params))
  }
}

export default otc

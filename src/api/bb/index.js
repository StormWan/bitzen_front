import base from '../base' // 导入接口域名列表
import axios from '@/common/utils/http' // 导入http中创建的axios实例
// import qs from 'qs' // 根据需求是否导入qs模块

const bb = {
  /*
  * @param {Object} params - {code, token}
  * **/
  pairList (params) {
    return axios.get(`${base.base_api}/bb/pairs/`, {
      params: params
    })
  },
  pairDetail (id, params) {
    return axios.get(`${base.base_api}/bb/pairs/${id}/`, {
      params: params
    })
  }
}

export default bb

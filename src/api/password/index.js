import base from '../base' // 导入接口域名列表
import axios from '@/common/utils/http' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

const password = {
  /*
  * @param {Object} params - {code}
  * **/
  setup_pin (params) {
    return axios.post(`${base.base_api}/account/setup_pin/`, qs.stringify(params))
  },
  update_pin (params) {
    return axios.post(`${base.base_api}/account/update_pin/`, qs.stringify(params))
  }
}

export default password

import base from '../base' // 导入接口域名列表
import axios from '@/common/utils/http' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

const kyc = {
  kyc_list (params) {
    return axios.patch(`${base.base_api}/otc/kyc/`, { params: params })
  },
  kyc_get (params) {
    return axios.get(`${base.base_api}/otc/kyc/`, { params: params })
  }
}

export default kyc

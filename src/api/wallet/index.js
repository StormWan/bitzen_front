import base from '../base' // 导入接口域名列表
import axios from '@/common/utils/http' // 导入http中创建的axios实例

const wallet = {
  /*
  * @param {Object} params - {code, token}
  * **/
  walletAssets (params) {
    return axios.get(`${base.base_api}/asset/wallet/assets/`, {
      params: params
    })
  }
}

export default wallet

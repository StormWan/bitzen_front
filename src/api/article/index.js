import base from '../base' // 导入接口域名列表
import axios from '@/common/utils/http' // 导入http中创建的axios实例
// import qs from 'qs' // 根据需求是否导入qs模块

const article = {
  articleList (params) {
    return axios.get(`${base.base_api}/article/articles/`, {
      params: params
    })
  },
  articleDetail (id, params) {
    return axios.get(`${base.base_api}/article/articles/${id}/`, {
      params: params
    })
  }
}

export default article

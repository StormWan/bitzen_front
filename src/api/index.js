/**
 * api接口的统一出口
 */
import account from './account'
import bb from './bb'
import otc from './otc'
import kyc from './kyc'
import article from './article'
import wallet from './wallet'
import password from './password'

// 导出接口
export default {
  account,
  bb,
  otc,
  kyc,
  article,
  wallet,
  password
}

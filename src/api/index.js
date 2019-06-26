/**
 * api接口的统一出口
 */
import account from './account'
import bb from './bb'
import otc from './otc'
import wallet from './wallet'
import kyc from './kyc'
import pass from './pass'

// 导出接口
export default {
  account,
  bb,
  otc,
  wallet,
  kyc,
  pass
}

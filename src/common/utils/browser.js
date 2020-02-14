// 判断是否是微信环境
// 请关注附录：总结了判断 ios设备 QQ环境  Android环境 的js
export let isWeChat = function () {
  const ua = navigator.userAgent.toLowerCase()
  return /MicroMessenger/i.test(ua)
}

// 判断是否是iOS设备
export let isIos = () => {
  const ua = navigator.userAgent.toLowerCase()
  return /(iPhone|iPad|iPod|iOS)/i.test(ua)
}

// 判断是否是QQ环境
export let isQQ = function () {
  const ua = navigator.userAgent.toLowerCase()
  return ua.match(/\sQQ/i) !== null
}

// 判断是否是Android环境
export let isAndroid = function () {
  var ua = navigator.userAgent.toLowerCase()
  console.log('------------------------------')
  // console.log(ua)
  console.log(/Android/i.test(ua))
  console.log('------------------------------')
  return /Android/i.test(ua)
}

export let isNotPC = function () {
  const ua = navigator.userAgent.toLowerCase()
  console.log('------------------------------')
  console.log(ua)
  console.log(/Android/i.test(ua))
  console.log(/(iPhone|iPad|iPod|iOS)/i.test(ua))
  console.log('------------------------------')
  if (/Android/i.test(ua) === true || /(iPhone|iPad|iPod|iOS)/i.test(ua) === true) {
    return true
  } else return false
}

// 查看是什么userAgent
export let whatUserAgent = function () {
  var ua = navigator.userAgent.toLowerCase()
  console.log('------------------------------')
  console.log(ua)
  console.log('------------------------------')
}

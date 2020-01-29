/**
 * 默认所有aixuexi.com子域名
 * @type {String}
 * 
 * @example 
 * locahost:8080 | 172.0.0.1:8080 => locahost | 172.0.0.1
 * www.aixuexi.com => .aixuexi.com
 */
const DOMAIN = location.hostname.replace(/[a-z]+\./, '.')
/**
 * 默认为当前文档位置的路径
 * @type {String}
 */
const PATH = '/'

/**
 * 是否https协议, 默认否
 * @type {Boolean}
 */

/**
 * 过期的默认时间, 二年
 * @type {Number}
 */
const END_TIME = 60 * 60 * 24 * 365 * 2
export default {

  /**
   * 获取某个key的cookie
   * 
   * @param {String} sKey
   * @returns {String} cookie的值
   */
  getItem: function (sKey) {
    let arr, reg = new RegExp("(^| )" + sKey + "=([^;]*)(;|$)")
    if (document.cookie.match(reg)) {
      arr = document.cookie.match(reg)
      return unescape(arr[2])
    } else {
      return null
    }
  },
  /**
 * 设置克制
 * 
 * @param {String} sKey key值
 * @param {String} sValue value值
 * @param {String|Number|Date} vEnd 过期时间
 * @param {String} sPath 根路径
 * @param {String} sDomain 域名
 * @param {Boolean} bSecure 安全
 * @returns
 */
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    // if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false }

    let sExpires = ''
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd
          break
        case String:
          sExpires = '; expires=' + vEnd
          break
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString()
          break
      }
    } else {
      // 不传默认为2年
      sExpires = '; max-age=' + END_TIME
    }

    document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue)
      + sExpires
      + '; domain=' + (sDomain ? sDomain : DOMAIN)
      + '; path=' + (sPath || PATH)
      + (bSecure ? '; secure' : '')
    return true
  }
}
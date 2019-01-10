const utils = (function() {
  /**
   * 获取url params
   * @param {*} name
   * @param {*} url
   * @returns {String}
   */
  function getParameterByName(name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&')
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    let results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }

  /**
   * 是否是微信
   * @returns {Boolean}
   */
  function isWeixinBrowser() {
    var ua = navigator.userAgent.toLowerCase()
    return /micromessenger/.test(ua)
  }

  /**
   * 剪贴板
   */
  function copy(el, command) {
    // 获取元素并绑定点击事件
    let copyEl = el
    copyEl.addEventListener('click', () => {
      let fixedEl = document.getElementById('fixed')
      if (fixedEl.style.display === '') return
      // 创建input元素
      const inputEl = document.createElement('input')

      // 设置只读，防止键盘弹出
      inputEl.setAttribute('readonly', 'readonly')
      // 设置口令内容
      inputEl.setAttribute('value', command)
      document.body.appendChild(inputEl)
      // inputEl.select()
      inputEl.setSelectionRange(0, inputEl.value.length) // 兼容iOS
      if (document.execCommand('copy')) {
        document.execCommand('copy')
        fixedEl.style.display = ''
      }
      document.body.removeChild(inputEl)

      setTimeout(() => {
        fixedEl.style.display = 'none'
      }, 1500)
    })
  }

  /**
  * 判断对象是否为空
  */

  function isEmptyObject(obj) {
    return !Object.keys(obj).length
  }

  return {
    getParameterByName,
    isWeixinBrowser,
    copy,
    isEmptyObject
  }
})()

//# sourceMappingURL=../maps/utils.js.map

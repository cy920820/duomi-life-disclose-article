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
  // function copy(el, command) {
  //   // 获取元素并绑定点击事件
  //   let copyEl = el
  //   copyEl.addEventListener('click', () => {
  //     let fixedEl = document.getElementById('fixed')
  //     if (fixedEl.style.display === '') return
  //     // 创建input元素
  //     const inputEl = document.createElement('input')

  //     // 设置只读，防止键盘弹出
  //     inputEl.setAttribute('readonly', 'readonly')
  //     // 设置口令内容
  //     inputEl.setAttribute('value', command)
  //     document.body.appendChild(inputEl)
  //     // inputEl.select()
  //     inputEl.setSelectionRange(0, inputEl.value.length) // 兼容iOS
  //     if (document.execCommand('copy')) {
  //       document.execCommand('copy')
  //       fixedEl.style.display = ''
  //     }
  //     document.body.removeChild(inputEl)

  //     setTimeout(() => {
  //       fixedEl.style.display = 'none'
  //     }, 1500)
  //   })
  // }

  function copy(el) {
    let fixedEl = document.getElementById('fixed')
    if (fixedEl.style.display === '') return

    // 复制口令、链接
    var clipboard = new ClipboardJS(el)
    clipboard.on('success', function(e) {
      // console.info('Text:', e.text)
      fixedEl.style.display = ''
      e.clearSelection()
      setTimeout(() => {
        fixedEl.style.display = 'none'
      }, 1500)
    })

    clipboard.on('error', function(e) {
      alert('请稍后重试!')
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

// 用户跳转前拦截并将链接发送到客户端（与原生交互）
let bundlev2 = document.querySelectorAll('.bundlev2')

bundlev2.forEach(item => {
  // 首选要获取淘宝原生链接
  let preLink = item.querySelector('.item-img').querySelector('a').href

  // 拦截跳转, 后台静默跳转
  // item.querySelector('.item-img').querySelector('a').addEventListener('click', (e) => {
  //   e.preventDefault()
  //   // 将preLink发送到原生客户端
  //   console.log(preLink)
  // }, false)

  // item.querySelector('.item-info').querySelector('a').addEventListener('click', (e) => {
  //   e.preventDefault()
  //   // 将preLink发送到原生客户端
  //   console.log(preLink)
  // }, false)

  // 所有涉及用户跳转都要进行拦截, 阻止跳转
  item.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', (e) => {
      e = e || window.event
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
      let curTarget = e.currentTarget
      console.log(curTarget.href)
    }, false)
  })

  // ===== 特殊拦截 =====

  // 领券跳转拦截
  item.querySelector('.state').querySelectorAll('.state-cont')[0].style.display = 'none'

  // 点击所有checkbox
  item.querySelector('.shopcb').addEventListener('click', () => {
    console.log(preLink)
  }, false)

  item.querySelector('.item-cb').addEventListener('click', () => {
    console.log(preLink)
  }, false)
})

document.querySelector('.recommend-list-wrapper').style.display = 'none'

// 顶部增加状态搜索gif

// 获取主题内容

let contentBox = document.querySelector('.o-c-header').nextSibling

let banner = contentBox.querySelector('.banner')

let imgUrl = 'https://ws1.sinaimg.cn/large/006tNc79ly1fz3voap88qg309k01o0ss.gif'
let oImg = document.createElement('img')
oImg.src = imgUrl
let clientW = document.documentElement.clientWidth || document.body.clientWidth
oImg.style.width = `${clientW}px`
// oImg.style.height = 344 * clientW / 60
oImg.style.height = '1.6rem'
contentBox.insertBefore(oImg, banner)

// 拿到id之后替换图片
setTimeout(() => {
  imgUrl = 'https://ws4.sinaimg.cn/large/006tNc79ly1fz3w5fviz5j309k01odg9.jpg'
  oImg.src = imgUrl
  oImg.addEventListener('click', () => alert('点击了'))
}, 1500)

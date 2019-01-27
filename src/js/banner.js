function banner () {
  // 顶层对象限定
  let parentEl = document.querySelector('#J_cartBuy')
  if (!parentEl) return

  // 定义异常函数
  function warn() {
    alert('Error, 请重新加载页面')
  }

  // 获取原生js方法
  let JSTCartClick = window.jsContext && window.jsContext.JSTCartClick ? window.jsContext.JSTCartClick : warn

  // 获取下一个元素节点
  function getNextElement(node) {
    if (node.nodeType === 1) return node
    if (node.nextSibling) return getNextElement(node.nextSibling)
    return null
  }

  function getParentEl (el) {
    return el.parentElement || el.parentNode
  }

  // === 顶部增加状态搜索gif ===

  // 获取商品列表顶层元素节点 listWrapper 始终存在
  let listWrapper = getParentEl(document.querySelector('.allItemv2'))

  // 配置顶部gif图
  let imgUrl = 'https://ws1.sinaimg.cn/large/006tNc79ly1fz3voap88qg309k01o0ss.gif'
  let oImg = document.createElement('img')
  oImg.src = imgUrl
  oImg.classList.add('duomi-top-banner')
  let clientW = document.documentElement.clientWidth || document.body.clientWidth
  oImg.style.width = `${clientW}px`
  oImg.style.height = `${clientW / 344 * 60}px`
  // oImg.style.height = '1.6rem'

  let banner = listWrapper.querySelector('.banner')

  if (banner) {
    listWrapper.insertBefore(oImg, banner)
  } else {
    let el = listWrapper.querySelector('div')
    listWrapper.insertBefore(oImg, el)
  }

  // 拿到id之后替换图片
  setTimeout(() => {
    imgUrl = 'https://ws4.sinaimg.cn/large/006tNc79ly1fz3w5fviz5j309k01odg9.jpg'
    oImg.src = imgUrl
  }, 1500)

  // === 顶部banner交互 ===
  document.querySelector('.duomi-top-banner').addEventListener('click', () => {
    JSTCartClick(JSON.stringify({
      cStyle: 6,
      url: '',
      num_iids: ''
    }))
  }, false)
}

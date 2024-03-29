function shoppingCart() {
  /**
   * cStyle
   * = 1 点击商品
   * = 2 点击复选框
   * = 3 点击全选购买
   * = 4 点击购买下单按钮
   * = 5 点击顶部广告栏（url为空）
   */

  // 顶层对象限定
  let parentEl = document.querySelector('#J_cartBuy')

  if (!parentEl) return

  // === 删除底部推荐列表 ===
  document.querySelector('.recommend-list-wrapper').style.display = 'none'
  // 解决底部商品显示异常
  document.querySelector('.cartbuy').style.marginBottom = '3rem'

  // === 初始化变量 ===

  // 定义异常函数
  function warn() {
    alert('Error, 请重新加载页面')
  }

  // 获取原生js方法
  let JSTCartClick = window.jsContext && window.jsContext.JSTCartClick ? window.jsContext.JSTCartClick : warn

  // let cStyle = null
  // let url = null
  // let num_iids = null

  // ids 数组

  let ids = []

  // 用户跳转前拦截并将链接发送到客户端（与原生交互）
  let bundlev2 = document.querySelectorAll('.bundlev2')

  if (bundlev2.length) {
    bundlev2.forEach(item => {
      // 首选要获取淘宝原生链接(每个店铺默认只获取第一个商品链接和id)
      let preLink = item.querySelector('.item-img').querySelector('a').href
      console.log(preLink)

      // 获取商品id
      let id = /id=(\d+)/.exec(preLink) ? /id=(\d+)/.exec(preLink)[1] : ''
      console.log(id)

      // 获取所有商品链接
      let allImg = item.querySelectorAll('.item-img')

      allImg.forEach(item => {
        let link = item.querySelector('a').href
        let id = /id=(\d+)/.exec(link) ? /id=(\d+)/.exec(link)[1] : ''
        ids.push(id)
      })
      console.log(ids)

      // 所有涉及用户跳转都要进行拦截, 阻止跳转
      item.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', (e) => {
          e = e || window.event
          if (e.preventDefault) {
            e.preventDefault()
          } else {
            e.returnValue = false
          }
        }, false)
      })

      // === 点击商品跳转拦截交互 ===

      // 当前商铺下所有商品图片跳转a标签
      item.querySelectorAll('.item-img').forEach(img => {
        img.addEventListener('click', () => {
          JSTCartClick(JSON.stringify({
            cStyle: 1,
            url: preLink,
            num_iids: id
          }))
        }, false)
      })

      // 当前商铺下所有商品标题跳转a标签
      item.querySelectorAll('.item-info').forEach(info => {
        info.addEventListener('click', () => {
          JSTCartClick(JSON.stringify({
            cStyle: 1,
            url: preLink,
            num_iids: id
          }))
        }, false)
      })

      // ===== 特殊拦截 =====

      // 领券跳转拦截
      // item.querySelector('.state').querySelectorAll('.state-cont')[0].style.display = 'none'

      // === 点击checkbox交互 ===

      // 点击全选checkbox
      item.querySelector('.shopcb').addEventListener('click', (e) => {
        e = e || window.event
        if (e.target.tagName !== 'INPUT') return
        JSTCartClick(JSON.stringify({
          cStyle: 3,
          url: preLink,
          num_iids: id
        }))
      }, false)

      // 点击单选checkbox
      item.querySelectorAll('.item-cb').forEach(cb => {
        cb.addEventListener('click', (e) => {
          e = e || window.event
          if (e.target.tagName !== 'INPUT') return
          JSTCartClick(JSON.stringify({
            cStyle: 2,
            url: preLink,
            num_iids: id
          }))
        }, false)
      })

      // === 点击商铺跳转交互 ===
      item.querySelector('.contact').querySelector('a').addEventListener('click', (e) => {
        JSTCartClick(JSON.stringify({
          cStyle: 5,
          url: preLink,
          num_iids: id
        }))
      }, false)
    })

    // === 点击购买下单交互 ===
    // 处理未选择任何商品
    let footerBtnSpansAry = document.querySelector('.footer').querySelector('.btn').querySelector('p').querySelectorAll('span')

    let selectNum = null

    footerBtnSpansAry.forEach((item, index) => {
      if (index === 2) {
        selectNum = parseInt(item.innerText)
      }
    })

    document.querySelector('.footer').querySelector('.btn').addEventListener('click', () => {
      if (selectNum > 0) {
        JSTCartClick(JSON.stringify({
          cStyle: 4,
          url: '',
          num_iids: ids
        }))
      }
    }, false)
  }
}

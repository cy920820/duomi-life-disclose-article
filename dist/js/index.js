(function($) {
  // ===========> 数据渲染交互之外的逻辑（环境判断）<===========
  // 统一管理url
  let url = {
    articlelist: 'https://shiziquan.com/shiziquan/learn?action=articlelist&accountId=1000036&artId=132',
    getitemdetail: 'https://shiziquan.com/shiziquan/learn?action=getitemdetail'
  }
  // 首先判断顶层window对象 getAppInfo
  // 默认是app环境
  let env = 'app'
  if (!window.getAppInfo) {
    env = 'browser'
  }

  // 加载时判断是否是微信页面
  function load() {
    if (utils.isWeixinBrowser) {
      // 引导用户到浏览器中打开h5
      // ...
    }
  }

  load()

  // 唤醒app 采用urlScheme
  let openApp = () => {
    /* eslint-disable no-unused-vars */
    let urlScheme = 'duomi://'
    let hasApp = true
    let timeoutTimer = null
    let downloadTimer = null
    let t = 1000
    let t1 = null
    let t2 = null
    /* eslint-enable no-unused-vars */

    downloadTimer = setTimeout(() => {
      if (!hasApp) {
        window.location = 'download://'
      }
    }, 2000)

    // 记录初始时间
    t1 = Date.now()

    // 生成iframe(iOS9需要兼容)
    let ifr = document.createElement('iframe')
    ifr.setAttribute('style', 'display:none')
    ifr.setAttribute('src', urlScheme)
    document.body.appendChild(ifr)

    // timeout
    timeoutTimer = setTimeout(() => {
      t2 = Date.now()
      if (t2 - t1 < t + 300) {
        hasApp = false
        // 移除iframe
        document.body.removeChild(ifr)
      }
    }, t)
  }

  // =============> 前端交互逻辑start <=============

  // 数据请求前显示loading
  $('.loading').show()

  // 请求文章内容
  $.ajax({
    type: 'GET',
    url: url.articlelist,
    dataType: 'json',
    success: function(res) {
      $('.wrapper').show()
      $('.loading').hide()
      let data = res.data
      if (data && data.items) {
        let dataAry = data.items
        if (dataAry && dataAry.length) {
          renderArticleInfo(dataAry[0])
          renderGoodsList(dataAry[0].content)
          renderRelatedGoods(dataAry[0].numInfos)
        }
      } else {
        alert('文章不存在,请刷新重试')
      }
    },
    error: function(xhr, type) {
      alert('服务器繁忙!')
      $('.loading').hide()
    }
  })

  // 渲染文章相关信息
  function renderArticleInfo(data) {
    let createTime = data.createTime
    let title = data.title
    let descTitle = data.desc_title
    let headerBg = data.pict_url
    let artSource = data.artSource
    $('.label').text(artSource)
    $('.content-source .date').text(createTime)
    $('.header-bg').attr('src', headerBg)
    $('.content-title span').text(title)
    $('.content-desc p').text(descTitle)
  }

  // 商品卡片点击处理函数
  function goodsCardHandler(el) {
    // 浏览器环境
    if (env === 'browser') {
      // 获取用户id
      let accountID = utils.getParameterByName('accountID')
      let numIid = el.data('commodityid')
      // 请求跳转链接
      $.ajax({
        url: url.getitemdetail,
        type: 'POST',
        data: {
          accountID,
          num_iid: numIid
        },
        dataType: 'json',
        success(res) {
          let data = res.data
          if (data && data.tbkItemInfo) {
            let tbkItemInfo = data.tbkItemInfo
            let taoCommand = tbkItemInfo.tpwd
            let taoUrl = tbkItemInfo.coupon_click_url
            $('.modal-content .password').text(taoCommand)
            utils.copy($('.modal-content .tip')[0], taoCommand)
            utils.copy($('.modal-content .url')[0], taoUrl)
          }
          dialogShow()
        },
        error() {
          alert('服务器繁忙!')
        }
      })
    } else { // app环境

    }
  }

  // 渲染商品列表
  function renderGoodsList(data) {
    $('.rich-text-editor').html(data)

    // 卡片绑定点击事件, 根据运行环境不同而进行不同的操作处理
    $('.commodityCard').click(function() {
      goodsCardHandler($(this))
    })
  }

  // 显示dialog
  function dialogShow () {
    $('.dialog-modal').show()
  }

  // 关闭dialog
  $('.modal-content--btn').click(() => {
    $('.dialog-modal').hide()
  })

  // 渲染相关商品
  function renderRelatedGoods(data) {
    let htmlAry = []
    let goodsLength = data.length
    // 相关商品 >= 1
    if (goodsLength) {
      for (let i = 0; i <= data.length; i++) {
        let cur = data[i]
        if (cur) {
          let str = `
          <li>
            <a class="relatedGoods" data-commodityid="${cur.num_iid}">
              <div class="left"><img src="${cur.pict_url}"></div>
              <div class="right">
                <div class="product-title">${cur.title}</div>
                <div class="bottom">
                  <div class="price">￥29.8</div>
                  <div class="btn">去购买</div>
                </div>
              </div>
            </a>
          </li>
          `
          htmlAry.push(str)

          // 当相关商品大于1时渲染actionSheet
          if (data.length > 1) {
            renderActionSheet(data)
          }
        }
      }
      $('.related-goods').append(htmlAry.join(''))

      // 点击相关商品卡片弹出对话框
      $('.relatedGoods').click(function() {
        goodsCardHandler($(this))
      })

      // 点击相关商品购买显示dialog
      $('.related-goods li .btn').click(() => {
        dialogShow()
      })

      // 底部显示 直达链接 | 返利模式购买 按钮
      let str = `
      <a href="javascript:void(0)" class="through-link">直达链接</a>
      <a href="javascript:void(0)" class="rebate">返利模式购买</a>
      `

      $('.bottom-btns-container .btns').append(str)

      // 初始化dom变量
      let $througnLink = $('.through-link')
      let $rebate = $('.rebate')

      // 如果商品数量大于1
      if (goodsLength > 1) {
        $througnLink.click((e) => {
          actionSheetShow(e)
        })

        // 跳转到下载链接
        $rebate.click(() => {
          window.location = ''
        })
      } else if (goodsLength === 1) {
        $througnLink.click((e) => {
          dialogShow()
          // actionSheetShow(e)
        })

        // 跳转到下载链接
        $rebate.click(() => {
          window.location = ''
        })
      }
    } else { // 相关商品数量为0
      $('.related-products').hide()

      // 显示按钮：打开APP看更多爆料文章
      let str = `<a href="javascript:void(0)" class="view-more-detail">打开APP看更多爆料文章</a>`
      $('.bottom-btns-container .btns').append(str)
      $('.activity-desc').css('marginBottom', '.8rem')
      // 点击按钮跳转到下载链接
    }
  }

  // 渲染actionSheet列表
  function renderActionSheet(goods) {
    let htmlAry = []
    for (let i = 0; i < goods.length; i++) {
      let cur = goods[i]
      let str = `
      <li>
        <p class="title">${cur.title}</p>
        <a class="btn" data-link="${cur.click_url}">直达链接</a>
      </li>
      `
      htmlAry.push(str)
    }
    $('.action-sheet--list').append(htmlAry.join(''))

    // 隐藏actionsheet, 显示弹框
    $('.action-sheet--list li .btn').click((e) => {
      actionSheetHide(e)
      dialogShow()
    })
  }

  function actionSheetShow(e) {
    $('.action-sheet-modal').show()
    $('.action-sheet').addClass('up')
    e.stopPropagation()
  }

  function actionSheetHide(e) {
    $('.action-sheet-modal').hide()
    $('.action-sheet').removeClass('up')
    e.stopPropagation()
  }

  $('.action-sheet').click((e) => {
    e.stopPropagation()
  })

  $(document).click(() => {
    $('.action-sheet-modal').hide()
    $('.action-sheet').removeClass('up')
  })
})(Zepto)

//# sourceMappingURL=../maps/index.js.map

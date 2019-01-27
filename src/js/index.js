(function($) {
  $(function($) {
    // 解决300ms延迟
    FastClick.attach(document.body)

    // ===========> 数据渲染交互之外的逻辑（环境判断）<===========
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
    // 通过url获取用户accountId
    let accountId = utils.getParameterByName('accountId')

    // 统一管理url
    let url = {
      // 文章商品列表
      articlelist: 'https://shiziquan.com/shiziquan/learn?action=articlelist&accountId=1000036&artId=136',
      // 点击商品卡片获取真实的linkurl 和 淘口令
      getitemdetail: 'https://shiziquan.com/shiziquan/learn?action=getitemdetail',
      // 文章内淘宝链或者天猫链点击获取真实linkurl 和 淘口令
      urlpidformat: 'https://shiziquan.com/shiziquan/learn?action=urlpidformat'
    }

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
        if (!utils.isEmptyObject(data)) {
          let dataAry = data.items
          if (dataAry && dataAry.length) {
            // 渲染数据
            renderArticleInfo(dataAry[0])
            renderGoodsList(dataAry[0].content)
            renderRelatedGoods(dataAry[0].numInfos)

            // 取消a标签的默认行为
            articleLink()
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

    // 当文章内容出现带有天猫或者淘宝的链接时阻止跳转并发送请求
    function articleLink() {
      $('a').each((index, item) => {
        let href = item.href
        if (href.indexOf('taobao') > -1 || href.indexOf('tmall') > -1) {
          item.addEventListener('click', (e) => {
            e = e || window.event
            if (e.preventDefault) {
              e.preventDefault()
            } else {
              e.returnValue = false
            }
            $.ajax({
              url: url.urlpidformat,
              type: 'POST',
              data: {
                accountId,
                linkUrl: href
              },
              dataType: 'json',
              success(res) {
                let data = res.data
                if (!utils.isEmptyObject(data)) {
                  let linkUrl = data.linkUrl
                  let tpwd = data.tpwd
                  showTKLDialog(tpwd, linkUrl)
                }
              },
              error() {
                alert('服务器繁忙!')
              }
            })
          })
        }
      })
    }

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

    // 显示淘口令对话框
    function showTKLDialog(taoCommand, taoUrl) {
      $('.modal-content .password').text(taoCommand)
      $('.modal-content .tip').attr('data-clipboard-text', taoCommand)
      $('.modal-content .url').attr('data-clipboard-text', taoUrl)
      utils.copy('.modal-content .tip')
      utils.copy('.modal-content .url')
      dialogShow()
    }

    // 商品卡片点击处理函数 (包含环境判断)
    function goodsCardHandler(el) {
      // 浏览器环境
      if (env === 'browser') {
        // 获取用户id
        let numIid = el.data('commodityid')
        // 请求跳转链接
        $.ajax({
          url: url.getitemdetail,
          type: 'POST',
          data: {
            accountId,
            num_iid: numIid
          },
          dataType: 'json',
          success(res) {
            let data = res.data
            if (!utils.isEmptyObject(data)) {
              let tbkItemInfo = data.tbkItemInfo
              let taoCommand = tbkItemInfo.tpwd
              let taoUrl = tbkItemInfo.coupon_click_url
              showTKLDialog(taoCommand, taoUrl)
            }
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

    // 渲染相关商品 及 actionSheet options
    function renderRelatedGoods(data) {
      let htmlAry = []
      let goodsLength = data.length
      // 有相关商品时
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
          }
        }

        $('.related-goods').append(htmlAry.join(''))

        // 当相关商品大于1时渲染actionSheet
        if (goodsLength > 1) {
          renderActionSheet(data)
        }

        // 点击相关商品卡片弹出对话框
        $('.relatedGoods').click(function() {
          goodsCardHandler($(this))
        })

        // 底部按钮渲染处理
        let btnStr = ''

        if (env === 'browser') {
          btnStr = `
          <a href="javascript:void(0)" class="through-link">直达链接</a>
          <a href="javascript:void(0)" class="rebate">返利模式购买</a>
          `
        } else {
          btnStr = '<a href="javascript:void(0)" class="through-link">直达链接</a>'
        }

        // 渲染底部按钮
        $('.bottom-btns-container .btns').append(btnStr)

        // 获取el 直达链接
        let $througnLink = $('.through-link')

        // 底部按钮交互处理
        if (env === 'browser') {
          // 初始化dom变量
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
            })

            // 跳转到下载链接
            $rebate.click(() => {
              window.location = ''
            })
          }
        } else { // app环境下
          if (goodsLength > 1) {
            $througnLink.click((e) => {
              actionSheetShow(e)
            })
          } else if (goodsLength === 1) {
            $througnLink.click((e) => {
              // 调取原生方法跳到商品详情
              // ...
            })
          }
        }
      } else { // 相关商品数量为0
        $('.related-products').hide()
        let str = `<a href="javascript:void(0)" class="view-more-detail">打开APP看更多爆料文章</a>`
        // 浏览器下显示按钮：打开APP看更多爆料文章
        // app下没有按钮显示
        if (env === 'browser') {
          $('.bottom-btns-container .btns').append(str)
          $('.activity-desc').css('marginBottom', '.8rem')
        }
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
          <a class="btn" href="javascript:;" data-commodityid="${cur.num_iid}">直达链接</a>
        </li>
        `
        htmlAry.push(str)
      }
      $('.action-sheet--list').append(htmlAry.join(''))

      $('.action-sheet--list li .btn').click(function(e) {
        goodsCardHandler($(this))
        actionSheetHide(e)
      })
    }

    // ======> actionsheet 显示隐藏逻辑 <=======
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
  })
})(Zepto)

"use strict";Zepto(function(d){FastClick.attach(document.body);var u="app";window.getAppInfo||(u="browser"),utils.isWeixinBrowser;var n={articlelist:"https://shiziquan.com/shiziquan/learn?action=articlelist&accountId=1000036&artId=132",getitemdetail:"https://shiziquan.com/shiziquan/learn?action=getitemdetail"};function p(t){if("browser"===u){var i=utils.getParameterByName("accountID"),a=t.data("commodityid");d.ajax({url:n.getitemdetail,type:"POST",data:{accountID:i,num_iid:a},dataType:"json",success:function(t){var i=t.data;if(i&&i.tbkItemInfo){var a=i.tbkItemInfo,n=a.tpwd,e=a.coupon_click_url;d(".modal-content .password").text(n),utils.copy(d(".modal-content .tip")[0],n),utils.copy(d(".modal-content .url")[0],e),h()}},error:function(){alert("服务器繁忙!")}})}}function h(){d(".dialog-modal").show()}function m(t){d(".action-sheet-modal").show(),d(".action-sheet").addClass("up"),t.stopPropagation()}d(".loading").show(),d.ajax({type:"GET",url:n.articlelist,dataType:"json",success:function(t){d(".wrapper").show(),d(".loading").hide();var i,a,n,e,o,c,s,l=t.data;if(l&&l.items){var r=l.items;r&&r.length&&(a=r[0],n=a.createTime,e=a.title,o=a.desc_title,c=a.pict_url,s=a.artSource,d(".label").text(s),d(".content-source .date").text(n),d(".header-bg").attr("src",c),d(".content-title span").text(e),d(".content-desc p").text(o),i=r[0].content,d(".rich-text-editor").html(i),d(".commodityCard").click(function(){p(d(this))}),function(t){var i=[],a=t.length;if(a){for(var n=0;n<=t.length;n++){var e=t[n];if(e){var o='\n            <li>\n              <a class="relatedGoods" data-commodityid="'+e.num_iid+'">\n                <div class="left"><img src="'+e.pict_url+'"></div>\n                <div class="right">\n                  <div class="product-title">'+e.title+'</div>\n                  <div class="bottom">\n                    <div class="price">￥29.8</div>\n                    <div class="btn">去购买</div>\n                  </div>\n                </div>\n              </a>\n            </li>\n            ';i.push(o)}}d(".related-goods").append(i.join("")),1<a&&function(t){for(var i=[],a=0;a<t.length;a++){var n=t[a],e='\n        <li>\n          <p class="title">'+n.title+'</p>\n          <a class="btn" href="javascript:;" data-commodityid="'+n.num_iid+'">直达链接</a>\n        </li>\n        ';i.push(e)}d(".action-sheet--list").append(i.join("")),d(".action-sheet--list li .btn").click(function(t){var i;p(d(this)),i=t,d(".action-sheet-modal").hide(),d(".action-sheet").removeClass("up"),i.stopPropagation()})}(t),d(".relatedGoods").click(function(){p(d(this))});var c="";c="browser"===u?'\n          <a href="javascript:void(0)" class="through-link">直达链接</a>\n          <a href="javascript:void(0)" class="rebate">返利模式购买</a>\n          ':'<a href="javascript:void(0)" class="through-link">直达链接</a>',d(".bottom-btns-container .btns").append(c);var s=d(".through-link");if("browser"===u){var l=d(".rebate");1<a?(s.click(function(t){m(t)}),l.click(function(){window.location=""})):1===a&&(s.click(function(t){h()}),l.click(function(){window.location=""}))}else 1<a?s.click(function(t){m(t)}):1===a&&s.click(function(t){})}else d(".related-products").hide(),"browser"===u&&(d(".bottom-btns-container .btns").append('<a href="javascript:void(0)" class="view-more-detail">打开APP看更多爆料文章</a>'),d(".activity-desc").css("marginBottom",".8rem"))}(r[0].numInfos))}else alert("文章不存在,请刷新重试")},error:function(t,i){alert("服务器繁忙!"),d(".loading").hide()}}),d(".modal-content--btn").click(function(){d(".dialog-modal").hide()}),d(".action-sheet").click(function(t){t.stopPropagation()}),d(document).click(function(){d(".action-sheet-modal").hide(),d(".action-sheet").removeClass("up")})});
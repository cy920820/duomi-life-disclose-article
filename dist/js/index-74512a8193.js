"use strict";!function(d){function r(t){for(var i=[],n=0;n<t.length;n++){var e=t[n],a='\n      <li>\n        <p class="title">'+e.title+'</p>\n        <a class="btn" href="'+e.click_url+'">直达链接</a>\n      </li>\n      ';i.push(a)}d(".action-sheet--list").append(i.join(""))}function v(t){d(".action-sheet-modal").show(),d(".action-sheet").addClass("up"),t.stopPropagation()}d.ajax({type:"GET",url:"https://shiziquan.com/shiziquan/learn?action=articlelist&accountId=1000036&artId=123",dataType:"json",success:function(t){if(t.data){var i=t.data.items;i.length&&(e=i[0],a=e.createTime,s=e.title,c=e.desc_title,l=e.pict_url,o=e.artSource,d(".label").text(o),d(".content-source .date").text(a),d(".header-bg").attr("src",l),d(".content-title span").text(s),d(".content-desc p").text(c),n=i[0].content,d(".rich-text-editor").html(n),function(t){var i=[];if(t.length){for(var n=0;n<=t.length;n++){var e=t[n];if(e){var a=1===t.length?'\n          <li>\n            <a class="multiRelatedGoods">\n              <div class="left"><img src="'+e.pict_url+'"></div>\n              <div class="right">\n                <div class="product-title">'+e.title+'</div>\n                <div class="bottom">\n                  <div class="price">￥29.8</div>\n                  <div class="btn">去购买</div>\n                </div>\n              </div>\n            </a>\n          </li>\n          ':"\n          <li>\n            <a href="+e.click_url+'>\n              <div class="left"><img src="'+e.pict_url+'"></div>\n              <div class="right">\n                <div class="product-title">'+e.title+'</div>\n                <div class="bottom">\n                  <div class="price">￥29.8</div>\n                  <div class="btn">去购买</div>\n                </div>\n              </div>\n            </a>\n          </li>\n          ';i.push(a),1==t.length&&r(t)}}d(".related-goods").append(i.join("")),d(".multiRelatedGoods").click(v)}else d(".related-products").hide()}(i[0].numInfos))}var n,e,a,s,c,l,o},error:function(t,i){alert("Ajax error!")}}),d(".action-sheet").click(function(t){t.stopPropagation()}),d(document).click(function(){d(".action-sheet-modal").hide(),d(".action-sheet").removeClass("up")})}(Zepto);
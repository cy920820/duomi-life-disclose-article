"use strict";var utils={getParameterByName:function(e,n){n||(n=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var t=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(n);return t?t[2]?decodeURIComponent(t[2].replace(/\+/g," ")):"":null},isWeixinBrowser:function(){var e=navigator.userAgent.toLowerCase();return/micromessenger/.test(e)},copy:function(e){var n=document.getElementById("fixed");if(""!==n.style.display){var t=new ClipboardJS(e);t.on("success",function(e){n.style.display="",e.clearSelection(),setTimeout(function(){n.style.display="none"},1500)}),t.on("error",function(e){alert("请稍后重试!")})}},isEmptyObject:function(e){return!Object.keys(e).length}};
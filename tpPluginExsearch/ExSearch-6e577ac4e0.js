$("body").append('<div class="ins-search"><div class="ins-search-overlay"></div><div class="ins-search-container"><div class="ins-input-wrapper"><input type="text" class="ins-search-input" placeholder="搜索点什么吧..." /><span class="ins-close ins-selectable"><i class="iconfont icon-close"></span></div><div class="ins-section-wrapper"><div class="ins-section-container"></div></div></div></div>'),function(n){var e={TRANSLATION:{POSTS:"文章",PAGES:"页面",CATEGORIES:"分类",TAGS:"标签",UNTITLED:"（未命名）"},ROOT_URL:ExSearchConfig.root,CONTENT_URL:ExSearchConfig.api};n.INSIGHT_CONFIG=e}(window);var ModalHelper={scrollTop:0,beforeModal:function(){ModalHelper.scrollTop=document.scrollingElement.scrollTop,document.body.classList.add("es-modal-open"),document.body.style.top=-ModalHelper.scrollTop+"px"},closeModal:function(){document.body.classList.remove("es-modal-open"),document.scrollingElement.scrollTop=ModalHelper.scrollTop}};!function(i,c){var t=i(".ins-search"),n=t.find(".ins-search-input"),r=t.find(".ins-section-wrapper"),o=t.find(".ins-section-container");function l(n,e,t,a,r){return i("<div>").addClass("ins-selectable").addClass("ins-search-item").append(i("<div>").addClass("header").append(i("<i>").addClass("iconfont").addClass("icon-"+n)).append(null!=e&&""!=e?e:c.TRANSLATION.UNTITLED).append(t?i("<span>").addClass("ins-slug").text(t):null)).append(a?i("<p>").addClass("ins-search-preview").html(a):null).attr("data-url",r)}function a(n,e,t){var a,r,o,s=d(n);if(0===t.length)return null;switch(a=c.TRANSLATION[e],e){case"POSTS":case"PAGES":r=t.map(function(t){var n=20<t.firstOccur?t.firstOccur-20:0,a="";return delete t.firstOccur,s.forEach(function(n){var e=new RegExp(n,"gi");a=t.text.replace(e,'<mark class="search-keyword"> '+n+" </mark>")}),a=a?a.slice(n,n+80):t.text.slice(0,80),l("file",t.title,null,a,c.ROOT_URL+t.path)});break;case"CATEGORIES":case"TAGS":r=t.map(function(n){return l("CATEGORIES"===e?"folder":"tag",n.name,n.slug,null,n.permalink)});break;default:return null}return(o=a,i("<section>").addClass("ins-section").append(i("<div>").addClass("ins-section-header").text(o))).append(r)}function u(n,e){var t={};n.pages.concat(n.posts).forEach(function(n){n[e]&&n[e].forEach(function(n){t[n.name]=n})});var a=[];for(var e in t)a.push(t[e]);return a}function d(n){return n.split(" ").filter(function(n){return!!n}).map(function(n){return n.toUpperCase()})}function p(n,a,e){var t=d(n);return t.filter(function(t){return 0<e.filter(function(n){if(!a.hasOwnProperty(n))return!1;var e=a[n].toUpperCase().indexOf(t);return-1<e?("text"==n&&(a.firstOccur=e),!0):void 0}).length}).length===t.length}function f(n,r,e,o){var s=0;return d(n).forEach(function(n){var a=new RegExp(n,"img");e.forEach(function(n,e){if(r.hasOwnProperty(n)){var t=r[n].match(a);s+=t?t.length*o[e]:0}})}),s}function s(n,e){var t,a,r=(t=e,{POST:function(n){return f(t,n,["title","text"],[3,1])},PAGE:function(n){return f(t,n,["title","text"],[3,1])},CATEGORY:function(n){return f(t,n,["name","slug"],[1,1])},TAG:function(n){return f(t,n,["name","slug"],[1,1])}}),o=(a=e,{POST:function(n){return p(a,n,["title","text"])},PAGE:function(n){return p(a,n,["title","text"])},CATEGORY:function(n){return p(a,n,["name","slug"])},TAG:function(n){return p(a,n,["name","slug"])}}),s=n.posts,i=n.pages,c=u(n,"tags"),l=u(n,"categories");return{posts:s.filter(o.POST).sort(function(n,e){return r.POST(e)-r.POST(n)}),pages:i.filter(o.PAGE).sort(function(n,e){return r.PAGE(e)-r.PAGE(n)}),categories:l.filter(o.CATEGORY).sort(function(n,e){return r.CATEGORY(e)-r.CATEGORY(n)}),tags:c.filter(o.TAG).sort(function(n,e){return r.TAG(e)-r.TAG(n)})}}function h(n){var e=i.makeArray(o.find(".ins-selectable")),t=-1;e.forEach(function(n,e){i(n).hasClass("active")&&(t=e)});var a=(e.length+t+n)%e.length;i(e[t]).removeClass("active"),i(e[a]).addClass("active"),function(n){if(0!==n.length){var e=r[0].clientHeight,t=n.position().top-r.scrollTop(),a=n[0].clientHeight+n.position().top;a>e+r.scrollTop()&&r.scrollTop(a-r[0].clientHeight),t<0&&r.scrollTop(n.position().top)}}(i(e[a]))}function v(n){n&&n.length&&(location.href=n.attr("data-url"))}t.parent().remove(".ins-search"),i("body").append(t),i.getJSON(c.CONTENT_URL,function(e){"#ins-search"===location.hash.trim()&&(t.addClass("show"),ModalHelper.beforeModal()),n.on("input",function(){var n=i(this).val();!function(n,e){for(var t in o.empty(),e)o.append(a(n,t.toUpperCase(),e[t]))}(n,s(e,n))}),n.trigger("input")}),i(document).on("click focus",".search-form-input",function(){t.addClass("show"),ModalHelper.beforeModal(),document.scrollingElement.scrollTop=0,t.find(".ins-search-input").focus()}).on("click",".ins-search-item",function(){"function"==typeof ExSearchCall?ExSearchCall(i(this)):v(i(this))}).on("click",".ins-close,.ins-search-overlay",function(){t.removeClass("show"),ModalHelper.closeModal()}).on("keydown",function(n){if(t.hasClass("show"))switch(n.keyCode){case 27:t.removeClass("show"),ModalHelper.closeModal();break;case 38:h(-1);break;case 40:h(1);break;case 13:var e=o.find(".ins-selectable.active").eq(0);"function"==typeof ExSearchCall?ExSearchCall(e):v(e)}})}(jQuery,window.INSIGHT_CONFIG);
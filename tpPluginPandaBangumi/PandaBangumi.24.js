function loadMoreBgm(loader){
    if (loader === 'all') {
        $.each($('.loader'), function(i, item){
            loadMoreBgm(item);
        })
        return;
    }

    $(loader).html('<div class="dot"></div><div class="dot"></div><div class="dot"></div>');
    
    var listEl = $($(loader).attr('data-ref'));
    var type = listEl.attr('data-type');
    var cate = listEl.attr('data-cate');
    if (type === 'watched') {
        if(cate === 'seenanime') {
            var seenPart = listEl.attr('seenPart');
            seenPart = typeof seenPart === 'string' ? parseInt(seenPart) : 0;
            var url = 'https://cdn.monsterx.cn/API/seen.anime.'+ seenPart +'.json';
            if (seenPart > animeAll - 1)
                url = 'https://cdn.monsterx.cn/API/null.json';
        }
        if(cate === 'seenreal') {
            var seenPart = listEl.attr('seenPart');
            seenPart = typeof seenPart === 'string' ? parseInt(seenPart) : 0;
            var url = 'https://cdn.monsterx.cn/API/seen.real.'+ seenPart +'.json';
            if (seenPart > realAll - 1)
                url = 'https://cdn.monsterx.cn/API/null.json';
        }
    }
    else {
        var bgmCur = listEl.attr('bgmCur');
        bgmCur = typeof bgmCur === 'string' ? parseInt(bgmCur) : 0;
        var url = bgmBase+'?from=' + String(bgmCur) + '&type=' + type + '&cate=' + cate;
    };
    
    $.getJSON(url, function(data){
        $(loader).html('再来一点');
        if(data.length<1) $(loader).html('一滴不剩');
        
        $.each(data, function (i, item) {
            var name_cn = item.name_cn ? item.name_cn : item.name;
            var status;
            var total;
            if(!item.count || item.count==null) {
                status=100;
                total='?';
            }
            else {
                status=item.status/item.count*100;
                total=String(item.count);
            };
            var html=`<a class="bgm-item" data-id="`+item.id+`" href="`+item.url+`" target="_blank">
                        <div class="bgm-item-thumb" style="background-image:url(`+item.img+`)"></div>
                        <div class="bgm-item-info">
                            <span class="bgm-item-title main">`+item.name+`</span>
                            <span class="bgm-item-title">`+name_cn+`</span>
                            {{status-bar}}
                        </div>
                    </a>`;
            if (type === 'watching') {
                html = html.replace('{{status-bar}}', `
                            <div class="bgm-item-statusBar-container">
                                <div class="bgm-item-statusBar" style="width:`+String(status)+`%"></div>
                                进度 `+String(item.status)+` / `+total+`
                            </div>`);
            } else {
                html = html.replace('{{status-bar}}', '');
            }
            listEl.append(html);

            if (type === 'watching') bgmCur++;
        })
        if (type === 'watched') {
            seenPart++;
            listEl.attr('seenPart', String(seenPart));
        }
        else {
            listEl.attr('bgmCur', String(bgmCur));
        };
        
    })
}

function initCollection(){
    var bgmIndex = 0;
    $.each($('.bgm-collection'), function(i, item) {
        bgmIndex++;
        $(item).attr('id', 'bgm-collection-' + String(bgmIndex));
        $(item).after(
                '<div class="loader" data-ref="' + '#bgm-collection-' + String(bgmIndex) + '" onclick="loadMoreBgm(this);"></div>');
    });

    loadMoreBgm('all');
}

$(document).ready(function(){
    initCollection();
})

$(document).on('pjax:complete', function () {
    initCollection();
})
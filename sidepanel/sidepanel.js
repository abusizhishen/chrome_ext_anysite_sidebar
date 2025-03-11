const iframe = document.getElementById('webview');
const urlInput = document.getElementById('urlInput');
const goButton = document.getElementById('go');
// 监听存储变化
chrome.storage.onChanged.addListener((changes) => {
    if (changes.currentUrl) {
        // document.getElementById('webview').src = changes.currentUrl.newValue;
        // iframe.style.display = 'block';
        // urlInput.value = changes.currentUrl.newValue;
        go(changes.currentUrl.newValue)
    }
});

// 初始化加载
chrome.storage.local.get('currentUrl', ({currentUrl}) => {
    console.log('currentUrl', currentUrl);
    if (currentUrl) {
        console.log('hide input');
        iframe.src = currentUrl;
        iframe.style.display = 'block';
        // urlInput.style.display = 'none'
        urlInput.value = currentUrl;
        iframe.style.display = 'block';
    } else {
        console.log('hide iframe');
        iframe.style.display = 'none';
    }

});

urlInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        console.log('Enter key pressed');
        // Place your custom code here
        const url = event.target.value
        if (url) {
            iframe.src = url;
            iframe.style.display = 'block';
            // urlInput.style.display = 'none';
            // urlInput.style.visibility = 'hidden';
        }
    }
})

urlInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        console.log('Enter key pressed');
        // Place your custom code here
        const url = event.target.value
        go(url)
    }
})

goButton.addEventListener('click', () => {
    go(urlInput.value);
})

function go(url) {
    if (url) {
        const startWithHttp = url.indexOf('http') === 0
        console.log('start with http: ', startWithHttp)
        if (startWithHttp) {
            console.log(url, url.includes('://'))
            url = url.includes('://') ? url : `https://${url}`;
            url = url.replace('http:', 'https:');
            console.log(url);
        } else {
            url = 'https://' + url;
        }
        iframe.src = url;
        iframe.style.display = 'block';
        urlInput.value = url
        // urlInput.style.display = 'none';
        // urlInput.style.visibility = 'hidden';
    }
}

function isLikelyUrl(input) {
    // 如果输入包含空格，则很可能是搜索词
    if (!input) {
        return false
    }

    const startWithHttp = input.indexOf('http') === 0
    console.log('start with http: ', startWithHttp)
    if (startWithHttp) {
        input = input.includes('://') ? input : `https://${input}`;
        input = input.replace(/^(http:\/\/)?/, 'https://');
    } else {
        input = 'https://' + input;
    }

    try {
        // 直接尝试构造 URL 对象（输入可能已经带有协议）
        new URL(input);
        console.log(new URL(input));
        return input;
    } catch (e) {
        return false
        // 如果报错，再尝试加上 https:// 前缀
        // try {
        //     new URL("https://" + input);
        //     return true;
        // } catch (e2) {
        //     return false;
        // }
    }
}

// 示例测试
console.log(isLikelyUrl("https://www.google.com")); // true
console.log(isLikelyUrl("www.google.com"));         // true
console.log(isLikelyUrl("google"));                  // false
console.log(isLikelyUrl("hello world"));             // false

document.addEventListener('DOMContentLoaded', async () => {
    urlInput.placeholder = chrome.i18n.getMessage("urlInputPlaceholder");

})

// 监听存储变化
chrome.storage.onChanged.addListener((changes) => {
    if (changes.currentUrl) {
        document.getElementById('webview').src = changes.currentUrl.newValue;
    }
});

const iframe = document.getElementById('webview');

// 初始化加载
chrome.storage.local.get('currentUrl', ({currentUrl}) => {
    console.log('currentUrl', currentUrl);
    if (currentUrl) {
        console.log('hide input');
        iframe.src = currentUrl;
        iframe.style.display = 'block';
        keywordOrUrl.style.display = 'none'
        iframe.style.visibility = 'true';
    } else {
        console.log('hide iframe');
        iframe.style.visibility = 'false';
    }

});

const keywordOrUrl = document.getElementById('keywordOrUrl');
keywordOrUrl.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        console.log('Enter key pressed');
        // Place your custom code here
        const url = event.target.value
        if (iframe.src !== url) iframe.src = url;
    }
})

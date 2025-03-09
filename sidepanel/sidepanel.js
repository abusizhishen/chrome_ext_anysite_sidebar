let isResizing = false;

document.addEventListener('mousemove', (e) => {
    if (isResizing) {
        const newWidth = window.innerWidth - e.clientX + 10;
        document.documentElement.style.width = `${newWidth}px`;
    }
});

document.addEventListener('mouseup', () => {
    isResizing = false;
    document.documentElement.style.cursor = 'auto';
});

// 监听存储变化
chrome.storage.onChanged.addListener((changes) => {
    if (changes.currentUrl) {
        document.getElementById('webview').src = changes.currentUrl.newValue;
    }
});

// 初始化加载
chrome.storage.local.get('currentUrl', ({currentUrl}) => {
    const iframe = document.getElementById('webview');
    iframe.src = currentUrl || 'https://example.com';

    // 动态调整高度
    iframe.onload = () => {
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
    };
});

// popup.js
const urlInput = document.getElementById('url')
const goto = document.getElementById('goto')
goto.addEventListener('click', openSidepanel)

async function openSidepanel() {
    let url = urlInput.value.trim();
    if (!url) {
        console.log(`url is empty`)
        return
    }

    if (!url.startsWith('http')) url = `https://${url}`;
    await chrome.runtime.sendMessage({action: "updateSidebar", url});

    // 保存历史记录
    const {history = []} = await chrome.storage.local.get('history');
    if (!history.includes(url)) {
        chrome.storage.local.set({history: [url, ...history.slice(0, 4)]});
    }
    chrome.storage.local.set({customSidebarUrl: url});
    console.log("侧边栏地址已更新为:", url);
}

// 显示历史记录
chrome.storage.local.get('history', ({history}) => {
    console.log(history)
    const historyList = document.getElementById('historyList');
    history?.forEach(url => {
        const item = document.createElement('div');
        item.textContent = url;
        item.onclick = () => chrome.runtime.sendMessage({action: "updateSidebar", url});
        historyList.appendChild(item);
    });
});

chrome.runtime.sendMessage({action: "getCurrentUrl"}, (res) => {
    urlInput.value = res || ''
})

const input = document.getElementById('input')

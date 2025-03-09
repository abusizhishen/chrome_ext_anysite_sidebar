// background.js
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "openSidebar",
        title: "侧边栏打开",
        contexts: ["page"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openSidebar") {
        console.log(info)
        openSidePanel(info.pageUrl)
    }
});

chrome.runtime.onMessage.addListener((message, sender, response) => {
    console.log('got message', message)
    const {action, url} = message
    if (action === "updateSidebar") {
        openSidePanel(url)
    } else if (action === "getCurrentUrl") {
        chrome.storage.local.get('currentUrl', (val) => {
            response(val.currentUrl)
        });
        return true
    }
});

function openSidePanel(url) {

    if (!url.startsWith('http')) {
        url = url.includes('://') ? url : `https://${url}`;
        url = url.replace(/^(http:\/\/)?/, 'https://');
        e.target.value = url;
    }

    if (!url) {
        console.log("url is empty")
        return
    }


    chrome.storage.local.set({currentUrl: url});
    chrome.windows.getCurrent({populate: true}, (window) => {
        chrome.sidePanel.open({windowId: window.id});
    });
}

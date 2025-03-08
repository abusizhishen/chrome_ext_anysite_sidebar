// background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openSidebar",
    title: "打开自定义侧边栏",
    contexts: ["page"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openSidebar") {
    // 读取之前存储的自定义地址，如果没有则使用默认侧边栏页面
    chrome.storage.local.get("customSidebarUrl", (data) => {
      let url = data.customSidebarUrl || "sidepanel.html";
      chrome.sidePanel.setOptions({ path: url }, () => {
        console.log("通过右键菜单更新侧边栏地址为:", url);
      });
    });
  }
});


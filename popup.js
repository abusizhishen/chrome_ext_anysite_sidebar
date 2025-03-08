// popup.js
document.getElementById('sidebar-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const url = document.getElementById('url').value.trim();
  if (url) {
    chrome.sidePanel.setOptions({ path: url }, () => {
      console.log("侧边栏地址已更新为:", url);
      // 可选：将地址存入存储，便于右键菜单调用
      chrome.storage.local.set({ customSidebarUrl: url });
    });
  }
});

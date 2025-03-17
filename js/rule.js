// 生成动态规则函数
const createCspRule = (extensionId) => ({
  id: 1001,
  priority: 1001,
  action: {
    type: "modifyHeaders",
    responseHeaders: [
      {
        header: "Content-Security-Policy",
        operation: "set",
        value: `frame-ancestors 'self' chrome-extension://${extensionId}`
      },
      { header: "X-Frame-Options", operation: "remove" }
    ]
  },
  condition: {
    urlFilter: "|*://*/*",
    resourceTypes: ["main_frame", "sub_frame", "xmlhttprequest", "websocket"]
  }
});

// 安装时更新规则
chrome.runtime.onInstalled.addListener(async () => {
  const extensionId = chrome.runtime.id;

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1001],
    addRules: [createCspRule(extensionId)]
  });

  console.log('动态规则已更新，当前扩展ID:', extensionId);
});

// 运行时获取状态
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'get-frame-policy') {
    sendResponse({
      csp: `frame-ancestors 'self' chrome-extension://${chrome.runtime.id}`
    });
  }
});

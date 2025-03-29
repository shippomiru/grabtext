// 页面访问事件
export const trackPageView = (page) => {
  window.gtag('event', 'page_view', {
    page_title: page,
    page_location: window.location.href
  });
};

// 按钮点击事件
export const trackButtonClick = (buttonName) => {
  window.gtag('event', 'button_click', {
    button_name: buttonName
  });
};

// 文件上传事件
export const trackFileUpload = (fileCount, fileTypes) => {
  window.gtag('event', 'file_upload', {
    file_count: fileCount,
    file_types: fileTypes.join(',')
  });
};

// 文本提取事件
export const trackTextExtraction = (success, error) => {
  window.gtag('event', 'text_extraction', {
    success,
    error: error || undefined
  });
};

// 文本复制事件
export const trackTextCopy = (success) => {
  window.gtag('event', 'text_copy', {
    success
  });
};

// 清除操作事件
export const trackClear = () => {
  window.gtag('event', 'clear_operation');
};

// 会话完成事件（用户完成一次完整的提取和复制流程）
export const trackSessionComplete = (duration) => {
  window.gtag('event', 'session_complete', {
    duration_seconds: duration
  });
};

// 多次操作事件
export const trackMultipleOperations = (operationCount) => {
  window.gtag('event', 'multiple_operations', {
    operation_count: operationCount
  });
}; 
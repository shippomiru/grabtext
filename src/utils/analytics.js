// Clarity 初始化检查
export const isClarityLoaded = () => {
  return typeof window !== 'undefined' && typeof window.clarity === 'function';
};

// Clarity 自定义事件追踪
export const trackClarityEvent = (eventName, data = {}) => {
  if (isClarityLoaded()) {
    try {
      window.clarity('event', eventName, data);
      console.log('Clarity事件已追踪:', eventName, data);
    } catch (error) {
      console.warn('Clarity事件追踪失败:', error);
    }
  } else {
    console.warn('Clarity未加载，无法追踪事件:', eventName);
  }
};

// Clarity 用户标识设置
export const setClarityUserId = (userId) => {
  if (isClarityLoaded()) {
    try {
      window.clarity('identify', userId);
      console.log('Clarity用户ID已设置:', userId);
    } catch (error) {
      console.warn('Clarity用户ID设置失败:', error);
    }
  }
};

// Clarity 自定义标签
export const setClarityTag = (key, value) => {
  if (isClarityLoaded()) {
    try {
      window.clarity('set', key, value);
      console.log('Clarity标签已设置:', key, value);
    } catch (error) {
      console.warn('Clarity标签设置失败:', error);
    }
  }
};

// 页面访问事件
export const trackPageView = (page) => {
  // Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: page,
      page_location: window.location.href
    });
  }
  
  // Clarity 页面访问
  trackClarityEvent('page_view', {
    page: page,
    url: window.location.href
  });
};

// 按钮点击事件
export const trackButtonClick = (buttonName) => {
  // Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'button_click', {
      button_name: buttonName
    });
  }
  
  // Clarity 按钮点击
  trackClarityEvent('button_click', {
    button_name: buttonName
  });
};

// 文件上传事件
export const trackFileUpload = (fileCount, fileTypes) => {
  // Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'file_upload', {
      file_count: fileCount,
      file_types: fileTypes.join(',')
    });
  }
  
  // Clarity 文件上传
  trackClarityEvent('file_upload', {
    file_count: fileCount,
    file_types: fileTypes.join(',')
  });
};

// 文本提取事件
export const trackTextExtraction = (success, error) => {
  // Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'text_extraction', {
      success,
      error: error || undefined
    });
  }
  
  // Clarity 文本提取
  trackClarityEvent('text_extraction', {
    success,
    error: error || undefined
  });
};

// 文本复制事件
export const trackTextCopy = (success) => {
  // Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'text_copy', {
      success
    });
  }
  
  // Clarity 文本复制
  trackClarityEvent('text_copy', {
    success
  });
};

// 清除操作事件
export const trackClear = () => {
  // Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'clear_operation');
  }
  
  // Clarity 清除操作
  trackClarityEvent('clear_operation');
};

// 会话完成事件（用户完成一次完整的提取和复制流程）
export const trackSessionComplete = (duration) => {
  // Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'session_complete', {
      duration_seconds: duration
    });
  }
  
  // Clarity 会话完成
  trackClarityEvent('session_complete', {
    duration_seconds: duration
  });
};

// 多次操作事件
export const trackMultipleOperations = (operationCount) => {
  // Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'multiple_operations', {
      operation_count: operationCount
    });
  }
  
  // Clarity 多次操作
  trackClarityEvent('multiple_operations', {
    operation_count: operationCount
  });
};

// 初始化分析工具
export const initializeAnalytics = () => {
  // 设置Clarity标签，标识应用类型
  setClarityTag('app_type', 'image_text_extractor');
  setClarityTag('version', '1.0.0');
  
  // 检查分析工具加载状态
  console.log('分析工具状态检查:');
  console.log('- Google Analytics:', typeof window.gtag === 'function' ? '已加载' : '未加载');
  console.log('- Microsoft Clarity:', isClarityLoaded() ? '已加载' : '未加载');
}; 
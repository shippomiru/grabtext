# 图片文字提取工具

一个现代化的图片文字提取工具，支持中英文识别，具有简洁优雅的用户界面。

## 功能特点

- 支持拖拽和选择文件两种方式批量上传图片
- 支持 PNG、JPG、JPEG 格式图片
- 智能识别中英文文字
- 保持原有段落格式
- 一键导出所有提取的文字
- 支持中英文界面切换
- 响应式设计，适配各种屏幕尺寸

## 技术栈

- React
- Material-UI
- Tesseract.js
- React Dropzone
- i18next
- React Router

## 开始使用

1. 克隆项目
```bash
git clone https://github.com/yourusername/image-text-extractor.git
cd image-text-extractor
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm start
```

4. 构建生产版本
```bash
npm run build
```

## 使用说明

1. 打开网站后，您可以通过拖拽或点击选择文件的方式上传图片
2. 上传完成后，点击"提取文字"按钮开始处理
3. 等待处理完成后，可以查看提取的文字结果
4. 点击复制按钮可以复制提取的文字

## 注意事项

- 建议上传清晰的图片以获得更好的识别效果
- 支持的文件格式：PNG、JPG、JPEG
- 图片大小建议不超过 10MB

## 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目。

## 许可证

MIT License 
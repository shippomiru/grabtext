import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  zh: {
    translation: {
      header: {
        home: '首页',
        features: '功能',
        pricing: '价格',
        faq: '常见问题',
        language: '语言',
      },
      hero: {
        title: '图片文字批量提取',
        subtitle: '批量上传图片，一键导出所有文字内容，截图整理更轻松',
        cta: '开始使用',
      },
      uploader: {
        title: '上传图片',
        dragDrop: '拖拽图片到这里，或点击选择文件',
        supportedFormats: '支持的格式：PNG、JPG、JPEG',
        extractText: '提取文字',
        extractProgress: '提取进度',
        copyText: '复制文字',
        fileList: '已上传文件',
        textCopied: '文字已复制到剪贴板',
        unsupportedFormat: '不支持的文件格式，请上传 PNG、JPG 或 JPEG 格式的图片',
        clearAll: '清除所有',
        clearResult: '清除结果',
        extractedText: '提取结果',
        extracting: '正在提取文字，请等待...',
        pleaseReset: '请点击"清除所有"以重新开始上传',
        dragAndDrop: '拖拽图片到此处',
        clickToUpload: '点击上传',
      },
      features: {
        title: '核心功能',
        items: [
          {
            title: '批量上传',
            description: '按截图时间顺序处理图片',
          },
          {
            title: '文字识别',
            description: '保持原有段落格式',
          },
          {
            title: '一键导出',
            description: '快速提取所有文字合并导出',
          },
        ],
      },
      howItWorks: {
        title: '使用流程',
        steps: [
          {
            title: '上传图片',
            description: '拖拽或选择图片文件上传',
          },
          {
            title: '等待处理',
            description: '系统自动处理并提取文字',
          },
          {
            title: '导出结果',
            description: '一键导出所有提取的文字',
          },
        ],
      },
      testimonials: {
        title: '用户评价',
      },
      pricing: {
        title: '价格方案',
        subtitle: '选择最适合您的方案',
        mostPopular: '最受欢迎',
        select: '选择方案',
        selected: '已选择',
        basic: {
          title: '基础版',
          price: '免费',
          features: [
            '每月100次图片处理',
            '支持中英文识别',
            '基础文字提取',
            '在线使用'
          ]
        },
        pro: {
          title: '专业版',
          price: '¥99/月',
          features: [
            '无限次图片处理',
            '支持中英文识别',
            '高级文字提取',
            '批量处理'
          ]
        },
        enterprise: {
          title: '企业版',
          price: '联系我们',
          features: [
            '无限次图片处理',
            '支持中英文识别',
            '高级文字提取',
            '批量处理'
          ]
        }
      },
      faq: {
        title: '常见问题',
        items: [
          {
            question: '适合什么场景？解决什么问题？',
            answer: '尤其适合阅读文档、网页时随手截图重点内容，结束后一次性汇总整理笔记的场景，帮助提升笔记整理效率'
          },
          {
            question: '有什么特点？',
            answer: '支持一次性上传多张图片，系统会自动按顺序处理、合并汇总，并保留原有段落格式。识别完成后支持一键复制文字。'
          },
          {
            question: '文字识别的准确率如何？',
            answer: '采用 OCR 技术，对清晰的图片可以达到很高的识别准确率。建议上传清晰的图片以获得最佳效果，目前更适配网页等格式规范文档的截图。'
          },
          {
            question: '支持哪些图片格式？',
            answer: '目前支持 PNG、JPG、JPEG 格式的图片文件。'
          }
        ]
      },
      footer: {
        about: '关于我们',
        description: '批量提取截图文字，笔记整理小帮手',
        links: '导航',
        contact: '联系我们',
        address: 'shipporun@gmail.com',
        contactLink: '点此留言',
        copyright: '© 2025 GrabText.org. All rights reserved',
      },
    },
  },
  en: {
    translation: {
      header: {
        home: 'Home',
        features: 'Features',
        pricing: 'Pricing',
        faq: 'FAQ',
        language: 'Language',
      },
      hero: {
        title: 'Extract Text from Image',
        subtitle: 'A powerful tool to extract text from pictures and images. Upload multiple images and get all text content with one click.',
        cta: 'Start Extracting Text',
      },
      uploader: {
        title: 'Upload Images',
        dragDrop: 'Drag and drop images here, or click to upload',
        supportedFormats: 'Supported formats: PNG, JPG, JPEG',
        extractText: 'Extract Text',
        extractProgress: 'Progress',
        copyText: 'Copy Text',
        fileList: 'Uploaded Files',
        textCopied: 'Text copied to clipboard',
        unsupportedFormat: 'Unsupported file format, please upload PNG, JPG or JPEG images',
        clearAll: 'Clear All',
        clearResult: 'Clear Result',
        extractedText: 'Results',
        extracting: 'Extracting text from your images, please wait...',
        pleaseReset: 'Please click "Clear All" to start uploading again',
        dragAndDrop: 'Drag and drop images here',
        clickToUpload: 'Click to Upload',
      },
      features: {
        title: 'Core Features',
        items: [
          {
            title: 'Batch Upload',
            description: 'Support drag-and-drop and file selection for batch upload',
          },
          {
            title: 'Text Recognition',
            description: 'Maintain original paragraph formatting',
          },
          {
            title: 'One-Click Export',
            description: 'Quickly extract and merge text from all images',
          },
        ],
      },
      howItWorks: {
        title: 'How It Works',
        steps: [
          {
            title: 'Upload Images',
            description: 'Drag and drop or select image files',
          },
          {
            title: 'Processing',
            description: 'System automatically processes and extracts text',
          },
          {
            title: 'Export Results',
            description: 'One-click export all extracted text',
          },
        ],
      },
      testimonials: {
        title: 'Testimonials',
      },
      pricing: {
        title: 'Pricing Plans',
        subtitle: 'Choose the plan that best fits your needs',
        mostPopular: 'Most Popular',
        select: 'Select Plan',
        selected: 'Selected',
        basic: {
          title: 'Basic',
          price: 'Free',
          features: [
            '100 images per month',
            'Chinese & English support',
            'Basic text extraction',
            'Online usage'
          ]
        },
        pro: {
          title: 'Professional',
          price: '$99/month',
          features: [
            'Unlimited images',
            'Chinese & English support',
            'Advanced text extraction',
            'Batch processing'
          ]
        },
        enterprise: {
          title: 'Enterprise',
          price: 'Contact Us',
          features: [
            'Unlimited images',
            'Chinese & English support',
            'Advanced text extraction',
            'Batch processing'
          ]
        }
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            question: 'What is this website designed for?',
            answer: 'Perfect for turning your screenshots into notes. Just take screenshots while reading documents or browsing websites, then quickly combine them into organized text notes.'
          },
          {
            question: 'What makes it special?',
            answer: 'It supports extracting text from multiple images all at once, processes them in order, combines the text, and keeps the original formatting. Just one click to copy all the text.'
          },
          {
            question: 'How well does it recognize text?',
            answer: 'We use good OCR technology that works best with clear screenshots, especially from web pages and documents. The clearer your image, the better the results.'
          },
          {
            question: 'What kind of image files does it support?',
            answer: 'PNG, JPG, and JPEG files.'
          }
        ]
      },
      footer: {
        about: 'About Us',
        description: 'A reliable tool for extracting text from pictures and images all at once.',
        links: 'Navigation',
        contact: 'Contact Us',
        address: 'shipporun@gmail.com',
        contactLink: 'Feedback',
        copyright: '© 2025 GrabText.org. All rights reserved',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // 设置默认语言为英文
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 
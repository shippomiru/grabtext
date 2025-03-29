import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  LinearProgress,
  useTheme,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { createWorker } from 'tesseract.js';

const ImageUploader = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractProgress, setExtractProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);

  const handleFileChange = (event) => {
    if (isExtracting || extractedText) return;
    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles.filter(file => {
      const isValid = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type);
      if (!isValid) {
        alert(t('uploader.unsupportedFormat'));
      }
      return isValid;
    });
    setFiles(prev => {
      const newFiles = [...prev];
      validFiles.forEach(file => {
        // 检查是否存在重复文件
        const isDuplicate = newFiles.some(existingFile => 
          existingFile.name === file.name
        );
        if (!isDuplicate) {
          newFiles.push(file);
        }
      });
      return newFiles.sort((a, b) => a.name.localeCompare(b.name));
    });
  };

  const handleDrop = (event) => {
    if (isExtracting || extractedText) return;
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => {
      const isValid = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type);
      if (!isValid) {
        alert(t('uploader.unsupportedFormat'));
      }
      return isValid;
    });
    setFiles(prev => {
      const newFiles = [...prev];
      validFiles.forEach(file => {
        // 检查是否存在重复文件
        const isDuplicate = newFiles.some(existingFile => 
          existingFile.name === file.name
        );
        if (!isDuplicate) {
          newFiles.push(file);
        }
      });
      return newFiles.sort((a, b) => a.name.localeCompare(b.name));
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDelete = (index) => {
    if (isExtracting || extractedText) return;
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleExtract = async () => {
    if (files.length === 0) return;

    setIsExtracting(true);
    setExtractProgress(0);
    setExtractedText('');

    const worker = await createWorker('chi_sim+eng');
    
    const totalFiles = files.length;
    let allText = '';

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      
      try {
        console.log('开始处理文件:', file.name);
        // 使用recognize获取原始文本，保持原始段落格式
        const { data: { text } } = await worker.recognize(imageUrl);
        console.log('原始文本:', text);

        // 标点符号映射表
        const punctuationMap = {
          '"': '\u201C', // "
          '"': '\u201D', // "
          ':': '\uFF1A', // ：
          ';': '\uFF1B', // ；
          ',': '\uFF0C', // ，
          '?': '\uFF1F', // ？
          '(': '\uFF08', // （
          ')': '\uFF09'  // ）
        };

        // 优化的文本处理逻辑
        const processedText = text
          // 首先处理标点符号和空格
          .replace(/["":;,\?()]/g, char => punctuationMap[char] || char) // 转换指定标点符号
          .replace(/([，、])\s*/g, '$1') // 移除逗号和顿号后的空格
          // 先处理所有中文字符之间的空格
          .replace(/([^\s\n\w])\s+([^\s\n\w])/g, '$1$2')
          // 然后处理英文单词与中文之间的空格
          .replace(/([\u4e00-\u9fa5])([a-zA-Z]+)([\u4e00-\u9fa5])/g, '$1 $2 $3')
          .replace(/([\u4e00-\u9fa5])([a-zA-Z]+)([^a-zA-Z\u4e00-\u9fa5])/g, '$1 $2$3')
          .replace(/([^a-zA-Z\u4e00-\u9fa5])([a-zA-Z]+)([\u4e00-\u9fa5])/g, '$1$2 $3')
          // 处理段落格式
          .split('\n') // 分割成行
          .map(line => {
            // 对每一行再次处理中文之间的空格
            return line.trim()
              .replace(/([^\s\n\w])\s+([^\s\n\w])/g, '$1$2');
          })
          .filter(line => line.length > 0) // 移除空行
          // 处理段落合并
          .reduce((acc, curr, index, arr) => {
            if (acc.length === 0) return [curr];

            const lastParagraph = acc[acc.length - 1];
            const shouldMerge = (
              // 上一段没有结束标点
              !/[。！？]$/.test(lastParagraph) &&
              // 当前段落以句号结尾
              /[。！？]/.test(curr) &&
              // 上一段加当前段的长度适中（避免过长合并）
              (lastParagraph.length + curr.length) < 100 &&
              // 上一段不是标题（避免合并标题）
              lastParagraph.length > 5
            );

            if (shouldMerge) {
              // 合并段落
              acc[acc.length - 1] = lastParagraph + curr;
            } else {
              acc.push(curr);
            }
            return acc;
          }, [])
          .join('\n\n') // 重新组合，段落之间加空行
          .trim();

        console.log('处理后的文本:', processedText);
        
        // 添加图片之间的分隔
        if (i > 0) {
          allText += '\n\n\n';
        }
        allText += processedText;
        console.log('当前累积文本:', allText);

        // 每处理完一个文件就更新一次状态
        setExtractedText(allText.trim());
      } catch (error) {
        console.error('Error extracting text:', error);
      }

      URL.revokeObjectURL(imageUrl);
      setExtractProgress(((i + 1) / totalFiles) * 100);
    }

    await worker.terminate();
    // 最后处理一次，确保格式正确
    const finalText = allText
      .replace(/\n{4,}/g, '\n\n\n') // 确保图片之间最多只有三个换行
      .trim();

    console.log('最终文本:', finalText);
    setExtractedText(finalText);
    setIsExtracting(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
  };

  const handleClear = () => {
    setFiles([]);
    setExtractedText('');
    setExtractProgress(0);
    setIsExtracting(false);
    // 重置文件输入框
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <Box
      id="uploader"
      sx={{
        py: 8,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          {t('uploader.title')}
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 4, md: 6 },
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.background.paper,
            border: `2px dashed ${isExtracting || extractedText ? theme.palette.grey[300] : theme.palette.primary.main}`,
            borderRadius: 2,
            cursor: isExtracting || extractedText ? 'not-allowed' : 'pointer',
            opacity: isExtracting || extractedText ? 0.7 : 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: isExtracting || extractedText ? theme.palette.grey[300] : theme.palette.primary.dark,
              backgroundColor: isExtracting || extractedText ? theme.palette.background.paper : theme.palette.background.default,
            },
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => !isExtracting && !extractedText && document.getElementById('fileInput').click()}
        >
          <input
            type="file"
            id="fileInput"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            disabled={isExtracting || extractedText}
          />
          <Typography variant="h6" gutterBottom align="center">
            {isExtracting ? t('uploader.extracting') : 
             extractedText ? t('uploader.pleaseReset') : 
             t('uploader.dragAndDrop')}
          </Typography>
          {!isExtracting && !extractedText && (
            <>
              <Typography variant="body1" color="text.secondary" gutterBottom align="center">
                {t('uploader.supportedFormats')}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1rem',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                  '&.Mui-disabled': {
                    backgroundColor: theme.palette.grey[300],
                    color: theme.palette.grey[500],
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById('fileInput').click();
                }}
                disabled={isExtracting || extractedText}
              >
                {t('uploader.clickToUpload')}
              </Button>
            </>
          )}
        </Paper>

        {files.length > 0 && (
          <Paper sx={{ 
            mb: 4, 
            overflow: 'hidden',
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}>
            <List>
              {files.map((file, index) => (
                <ListItem 
                  key={index}
                  sx={{
                    borderBottom: index < files.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    },
                  }}
                >
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{
                      sx: { fontSize: '0.9rem', color: 'text.primary' }
                    }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(index)}
                      disabled={isExtracting || extractedText}
                      sx={{
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'error.main',
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {files.length > 0 && (
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleExtract}
              disabled={extractProgress > 0}
              sx={{
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              {t('uploader.extractText')}
            </Button>
            <Button
              variant="outlined"
              onClick={handleClear}
              sx={{
                borderColor: 'error.main',
                color: 'error.main',
                '&:hover': {
                  borderColor: 'error.dark',
                  backgroundColor: 'error.light',
                  opacity: 0.1,
                },
              }}
            >
              {t('uploader.clearAll')}
            </Button>
            {extractProgress > 0 && (
              <Box sx={{ flexGrow: 1, ml: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {t('uploader.extractProgress')}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={extractProgress}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(10, 132, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 3,
                      backgroundColor: 'primary.main',
                    },
                  }}
                />
              </Box>
            )}
          </Box>
        )}

        {extractedText && (
          <Paper sx={{ 
            p: 3,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 2 
            }}>
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 500 }}>
                {t('uploader.extractedText')}
              </Typography>
            </Box>
            <Paper
              sx={{
                p: 3,
                maxHeight: 400,
                overflow: 'auto',
                backgroundColor: 'background.default',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'background.paper',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'divider',
                  borderRadius: '4px',
                },
              }}
            >
              <Typography 
                variant="body1" 
                sx={{ 
                  whiteSpace: 'pre-wrap',
                  color: 'text.primary',
                  lineHeight: 1.6,
                }}
              >
                {extractedText}
              </Typography>
            </Paper>
            <Button
              variant="outlined"
              onClick={handleCopy}
              sx={{ 
                mt: 2,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'primary.light',
                  opacity: 0.1,
                },
              }}
            >
              {t('uploader.copyText')}
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default ImageUploader; 
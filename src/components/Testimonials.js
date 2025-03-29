import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const TestimonialCard = ({ name, role, content, avatar }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={avatar}
            alt={name}
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography variant="h6" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {role}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" color="text.secondary">
          "{content}"
        </Typography>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const testimonials = [
    {
      name: '张先生',
      role: '企业用户',
      content: '这个工具非常实用，帮助我们快速处理了大量图片文字提取的工作。',
      avatar: '/avatars/user1.jpg',
    },
    {
      name: '李女士',
      role: '个人用户',
      content: '界面简洁美观，使用起来非常方便，支持中英文识别很实用。',
      avatar: '/avatars/user2.jpg',
    },
    {
      name: '王先生',
      role: '教育工作者',
      content: '批量处理功能很强大，节省了我们很多时间。',
      avatar: '/avatars/user3.jpg',
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 6,
          }}
        >
          {t('testimonials.title')}
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <TestimonialCard {...testimonial} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials; 
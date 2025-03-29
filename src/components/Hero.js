import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const handleClick = () => {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetElement = document.querySelector('#uploader');
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.1) 100%)',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h1"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            mb: 3,
            letterSpacing: '-0.02em',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          {t('hero.title')}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          sx={{
            mb: 6,
            opacity: 0.9,
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
            fontSize: { xs: '1.1rem', md: '1.25rem' },
          }}
        >
          {t('hero.subtitle')}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleClick}
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 500,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                transform: 'scale(1.02)',
              },
            }}
          >
            {t('hero.cta')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero; 
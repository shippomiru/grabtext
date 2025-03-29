import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const handleScroll = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        py: 6,
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid 
          container 
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <Grid item xs={12} md={4}>
            <Box sx={{ maxWidth: '100%' }}>
              <Typography
                variant="h6"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    backgroundColor: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                  }}
                >
                  G
                </Box>
                GrabText
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('footer.description')}
              </Typography>
            </Box>
          </Grid>
          <Grid 
            item 
            xs={12} 
            md={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Box sx={{ maxWidth: '100%' }}>
              <Typography variant="h6" gutterBottom align="left">
                {t('footer.links')}
              </Typography>
              <Box>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => handleScroll('features')}
                  sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}
                >
                  {t('header.features')}
                </Link>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => handleScroll('faq')}
                  sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}
                >
                  {t('header.faq')}
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid 
            item 
            xs={12} 
            md={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'flex-start', md: 'flex-end' },
            }}
          >
            <Box sx={{ maxWidth: '100%' }}>
              <Typography variant="h6" gutterBottom align="left">
                {t('footer.contact')}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="left">
                {t('footer.address')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 6, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}
        >
          {t('footer.copyright')}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Menu as MenuIcon, Language as LanguageIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [languageAnchor, setLanguageAnchor] = React.useState(null);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenu = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setLanguageAnchor(null);
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  const menuItems = [
    { label: t('header.home'), onClick: handleScrollToTop },
    { label: t('header.features'), onClick: () => handleScroll('features') },
    { label: t('header.faq'), onClick: () => handleScroll('faq') },
  ];

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontWeight: 600,
            }}
            onClick={handleScrollToTop}
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

          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {menuItems.map((item) => (
                  <MenuItem key={item.label} onClick={item.onClick}>
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  onClick={item.onClick}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          <IconButton
            color="inherit"
            onClick={handleLanguageMenu}
            sx={{ ml: 2 }}
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={languageAnchor}
            open={Boolean(languageAnchor)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleLanguageChange('zh')}>中文</MenuItem>
            <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 
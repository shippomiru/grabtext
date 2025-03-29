import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';
import i18n from './i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A84FF', // iOS 风格的蓝色
      dark: '#0066CC',
      light: '#5AA9FF',
    },
    secondary: {
      main: '#32D74B', // iOS 风格的绿色
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F7',
    },
    text: {
      primary: '#1D1D1F',
      secondary: '#86868B',
    },
    divider: '#D2D2D7',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '3.5rem',
      letterSpacing: '-0.015em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 500,
      letterSpacing: '-0.005em',
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: '-0.003em',
    },
    body2: {
      fontSize: '0.875rem',
      letterSpacing: '-0.003em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            transform: 'scale(1.02)',
            transition: 'transform 0.2s ease-in-out',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid',
          borderColor: '#D2D2D7',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 600px)': {
            paddingLeft: 32,
            paddingRight: 32,
          },
        },
      },
    },
  },
});

function App() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Extract Text from Images",
    "applicationCategory": "Utility",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Convert images and screenshots into editable text with high accuracy",
    "featureList": [
      "Batch image processing",
      "Automatic text extraction",
      "Original formatting preservation"
    ]
  };

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <main>
                  <Hero />
                  <ImageUploader />
                  <Features />
                  <HowItWorks />
                  <FAQ />
                </main>
              }
            />
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App; 
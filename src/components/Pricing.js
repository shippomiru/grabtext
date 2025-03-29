import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Check as CheckIcon } from '@mui/icons-material';

const PricingCard = ({ title, price, features, isPopular, isSelected, onSelect }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: isSelected ? `2px solid ${theme.palette.primary.main}` : 'none',
        boxShadow: isSelected ? `0 0 0 2px ${theme.palette.primary.main}` : 'none',
      }}
    >
      {isPopular && (
        <Box
          sx={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: 'primary.main',
            color: 'white',
            px: 2,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.875rem',
          }}
        >
          {t('pricing.mostPopular')}
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" color="primary" gutterBottom>
          {price}
        </Typography>
        <List>
          {features.map((feature, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant={isSelected ? "contained" : "outlined"}
          color="primary"
          onClick={onSelect}
        >
          {isSelected ? t('pricing.selected') : t('pricing.select')}
        </Button>
      </CardActions>
    </Card>
  );
};

const Pricing = () => {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      title: t('pricing.basic.title'),
      price: t('pricing.basic.price'),
      features: [
        t('pricing.basic.features.0'),
        t('pricing.basic.features.1'),
        t('pricing.basic.features.2'),
        t('pricing.basic.features.3'),
      ],
      isPopular: false,
    },
    {
      title: t('pricing.pro.title'),
      price: t('pricing.pro.price'),
      features: [
        t('pricing.pro.features.0'),
        t('pricing.pro.features.1'),
        t('pricing.pro.features.2'),
        t('pricing.pro.features.3'),
      ],
      isPopular: true,
    },
    {
      title: t('pricing.enterprise.title'),
      price: t('pricing.enterprise.price'),
      features: [
        t('pricing.enterprise.features.0'),
        t('pricing.enterprise.features.1'),
        t('pricing.enterprise.features.2'),
        t('pricing.enterprise.features.3'),
      ],
      isPopular: false,
    },
  ];

  return (
    <Box
      id="pricing"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
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
          {t('pricing.title')}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 8 }}
        >
          {t('pricing.subtitle')}
        </Typography>
        <Grid container spacing={4} alignItems="stretch">
          {plans.map((plan, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <PricingCard
                {...plan}
                isSelected={selectedPlan === index}
                onSelect={() => setSelectedPlan(index)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing; 
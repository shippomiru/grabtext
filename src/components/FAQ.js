import React from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQItem = ({ question, answer }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
      >
        <Typography variant="h6">{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography color="text.secondary">{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const FAQ = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      id="faq"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="md">
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
          {t('faq.title')}
        </Typography>
        <Box sx={{ mt: 4 }}>
          {t('faq.items', { returnObjects: true }).map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ; 
'use client';

import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Backdrop,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import { InvoiceForm } from '~/components/invoices/add/invoice-form';
import { useInvoiceForm } from '~/hooks/use-invoice-form';

const statusOptions = ['Paid', 'Unpaid', 'Pending'];

export default function AddInvoicePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    control,
    errors,
    isLoading,
    isSubmitting,
    showSuccess,
    submitError,
    invoiceError,
    handleSubmit,
    onSubmit,
    setSubmitError,
  } = useInvoiceForm();

  if (invoiceError) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Failed to initialize invoice form
        </Typography>
        <Typography variant="body2">
          {invoiceError.message ||
            'An unexpected error occurred. Please try again.'}
        </Typography>
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: { sm: '100%', md: 1200 }, mx: 'auto' }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
        Add Invoice
      </Typography>

      {submitError && (
        <Alert
          severity="error"
          onClose={() => setSubmitError(null)}
          sx={{ mb: 3 }}
        >
          <Typography variant="subtitle2">Failed to add invoice</Typography>
          <Typography variant="body2">
            {submitError.message ||
              'An unexpected error occurred. Please try again.'}
          </Typography>
        </Alert>
      )}

      <Paper>
        <Typography
          variant="h6"
          sx={{
            p: 2,
            borderBottom: '1px solid #E2E8F0',
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Invoice Form
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InvoiceForm
            control={control}
            errors={errors}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            isMobile={isMobile}
            statusOptions={statusOptions}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'stretch', sm: 'flex-end' },
              mt: 3,
              p: 4,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              size={isMobile ? 'medium' : 'large'}
              disabled={isLoading || isSubmitting}
              sx={{
                width: { xs: '100%', sm: 'auto' },
                minWidth: { sm: 200 },
                textTransform: 'capitalize',
                px: 8,
                bgcolor: '#3C50E0',
                '&:hover': {
                  bgcolor: '#3C50E0',
                },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                '+ Add Invoice'
              )}
            </Button>
          </Box>
        </form>
      </Paper>

      {showSuccess && (
        <Alert
          severity="success"
          sx={{
            mt: 3,
            backgroundColor: '#E5F6E5',
            color: '#1F7A1F',
            '& .MuiAlert-icon': {
              color: '#1F7A1F',
            },
          }}
        >
          <Typography variant="subtitle2">
            Invoice added successfully!
          </Typography>
          <Typography variant="body2">
            You can view and manage your invoice in the &apos;My Invoices&apos;
            section.
          </Typography>
        </Alert>
      )}

      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

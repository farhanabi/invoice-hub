'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Alert,
  InputAdornment,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import { invoiceSchema } from '~/lib/schemas/invoice';
import { useInvoices } from '~/hooks/use-invoices';
import type { InvoiceStatus } from '~/lib/types/invoice';

type FormInputs = {
  name: string;
  dueDate: Date;
  amount: number;
  status: InvoiceStatus;
};

const statusOptions: InvoiceStatus[] = ['Paid', 'Unpaid', 'Pending'];

export default function AddInvoicePage() {
  const router = useRouter();
  const { addInvoice, isLoading, error } = useInvoices();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<Error | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      name: '',
      dueDate: new Date(),
      amount: 0,
      status: 'Pending',
    },
  });

  const onSubmit = async (data: FormInputs) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      addInvoice(data);
      setShowSuccess(true);

      // Redirect to list page after 2 seconds
      setTimeout(() => {
        router.push('/invoices/list');
      }, 2000);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err : new Error('Failed to add invoice')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Failed to initialize invoice form
        </Typography>
        <Typography variant="body2">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </Typography>
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
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

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Invoice Form
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  placeholder="Enter your invoice name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  required
                  fullWidth
                  disabled={isLoading || isSubmitting}
                />
              )}
            />

            <TextField
              label="Number"
              placeholder="Auto-generated"
              disabled
              fullWidth
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Due Date"
                    disabled={isLoading || isSubmitting}
                    slotProps={{
                      textField: {
                        required: true,
                        error: !!errors.dueDate,
                        helperText: errors.dueDate?.message,
                        placeholder: 'DD/MM/YYYY',
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Amount"
                  type="number"
                  placeholder="Enter your invoice amount"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography color="text.secondary">Rp</Typography>
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                  required
                  fullWidth
                  disabled={isLoading || isSubmitting}
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Status"
                  placeholder="Choose the status"
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  required
                  fullWidth
                  disabled={isLoading || isSubmitting}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading || isSubmitting}
              sx={{
                minWidth: 200,
                bgcolor: '#4F46E5',
                '&:hover': {
                  bgcolor: '#4338CA',
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

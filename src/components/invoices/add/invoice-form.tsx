import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import { InputWrapper } from './input-wrapper';
import type { FormInputs } from './types';

interface InvoiceFormProps {
  control: Control<FormInputs>;
  errors: FieldErrors<FormInputs>;
  isLoading: boolean;
  isSubmitting: boolean;
  isMobile: boolean;
  statusOptions: string[];
}

const baseInputProps = {
  InputLabelProps: { shrink: true },
  variant: 'outlined' as const,
  sx: { '& .MuiInputLabel-root': { display: 'none' }, height: 50 },
};

export const InvoiceForm = ({
  control,
  errors,
  isLoading,
  isSubmitting,
  isMobile,
  statusOptions,
}: InvoiceFormProps) => {
  const size = isMobile ? 'small' : 'medium';
  const disabled = isLoading || isSubmitting;

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(2, 1fr)',
        },
        p: { xs: 2, sm: 3 },
      }}
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <InputWrapper
            label="Name"
            required
            error={!!errors.name}
            helperText={errors.name?.message}
          >
            <TextField
              {...field}
              {...baseInputProps}
              placeholder="Enter your invoice name"
              error={!!errors.name}
              fullWidth
              disabled={disabled}
              size={size}
            />
          </InputWrapper>
        )}
      />

      <InputWrapper label="Number" required>
        <TextField
          {...baseInputProps}
          placeholder="Auto-generated"
          disabled
          fullWidth
          size={size}
        />
      </InputWrapper>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <InputWrapper
              label="Due Date"
              required
              error={!!errors.dueDate}
              helperText={errors.dueDate?.message}
            >
              <DatePicker
                {...field}
                disabled={disabled}
                slotProps={{
                  textField: {
                    ...baseInputProps,
                    placeholder: 'DD/MM/YYYY',
                    size,
                    fullWidth: true,
                    error: !!errors.dueDate,
                  },
                }}
              />
            </InputWrapper>
          )}
        />
      </LocalizationProvider>

      <Controller
        name="amount"
        control={control}
        render={({ field: { value, onChange, ...field } }) => (
          <InputWrapper
            label="Amount"
            required
            error={!!errors.amount}
            helperText={errors.amount?.message}
          >
            <TextField
              {...field}
              {...baseInputProps}
              type="number"
              value={value ?? ''}
              onChange={(e) =>
                onChange(
                  e.target.value === '' ? undefined : Number(e.target.value)
                )
              }
              placeholder="Enter your invoice amount"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography color="text.secondary">Rp</Typography>
                  </InputAdornment>
                ),
              }}
              error={!!errors.amount}
              fullWidth
              disabled={disabled}
              size={size}
            />
          </InputWrapper>
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { value, ...field } }) => (
          <InputWrapper
            label="Status"
            required
            error={!!errors.status}
            helperText={errors.status?.message}
          >
            <TextField
              {...field}
              {...baseInputProps}
              select
              value={value ?? ''}
              slotProps={{
                select: {
                  displayEmpty: true,
                  renderValue: (selected) => {
                    if (!selected) {
                      return (
                        <Typography color="text.secondary">
                          Choose the status
                        </Typography>
                      );
                    }
                    return <>{selected}</>;
                  },
                },
              }}
              error={!!errors.status}
              fullWidth
              disabled={disabled}
              size={size}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </InputWrapper>
        )}
      />
    </Box>
  );
};

import { Box, FormHelperText } from '@mui/material';

import { FormLabel } from './form-label';

interface InputWrapperProps {
  label: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  children: React.ReactNode;
}

export const InputWrapper = ({
  label,
  required,
  error,
  helperText,
  children,
}: InputWrapperProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <FormLabel required={required}>{label}</FormLabel>
    {children}
    {helperText && (
      <FormHelperText error={error} sx={{ mx: 0, mt: 1 }}>
        {helperText}
      </FormHelperText>
    )}
  </Box>
);

import { Typography } from '@mui/material';

interface FormLabelProps {
  required?: boolean;
  children: React.ReactNode;
}

export const FormLabel = ({ required, children }: FormLabelProps) => (
  <Typography
    component="label"
    sx={{
      mb: 1,
      display: 'block',
      color: 'text.primary',
      fontSize: 12,
      fontWeight: 500,
    }}
  >
    {children}
    {required && (
      <Typography component="span" color="error.main" sx={{ ml: 0.5 }}>
        *
      </Typography>
    )}
  </Typography>
);

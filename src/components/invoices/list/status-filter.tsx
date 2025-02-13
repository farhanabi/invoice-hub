import { Select, MenuItem } from '@mui/material';

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const StatusFilter = ({
  value,
  onChange,
  disabled,
}: StatusFilterProps) => (
  <Select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    sx={{
      minWidth: { xs: '100%', sm: 200 },
      height: 40,
      background: 'white',
      border: '0px',
      borderRadius: 2,
      fontSize: 12,
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
      },
    }}
  >
    <MenuItem value="All Status">All Status</MenuItem>
    <MenuItem value="Paid">Paid</MenuItem>
    <MenuItem value="Unpaid">Unpaid</MenuItem>
    <MenuItem value="Pending">Pending</MenuItem>
  </Select>
);

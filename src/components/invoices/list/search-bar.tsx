import { TextField, InputAdornment } from '@mui/material';
import Image from 'next/image';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const SearchBar = ({ value, onChange, disabled }: SearchBarProps) => (
  <TextField
    placeholder="Search"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    fullWidth
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <Image src="/icons/magnifying.svg" alt="" width={18} height={18} />
          </InputAdornment>
        ),
        sx: {
          height: 40,
          borderStyle: 'none',
          borderRadius: 2,
          fontSize: 12,
          '.MuiTextField-root': {
            borderRadius: 2,
          },
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
        },
      },
    }}
    sx={{
      background: 'white',
    }}
  />
);

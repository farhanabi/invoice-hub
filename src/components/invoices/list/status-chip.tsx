import { Chip } from '@mui/material';

const statusColors = {
  Paid: { bg: '#E5F6E5', color: '#1F7A1F' },
  Unpaid: { bg: '#FFEBEB', color: '#D92D20' },
  Pending: { bg: '#FFF5E5', color: '#B88217' },
} as const;

interface StatusChipProps {
  status: keyof typeof statusColors;
}

export const StatusChip = ({ status }: StatusChipProps) => {
  const statusColor = statusColors[status];

  return (
    <Chip
      label={status}
      sx={{
        bgcolor: statusColor.bg,
        color: statusColor.color,
        borderRadius: '16px',
        fontWeight: 500,
      }}
    />
  );
};

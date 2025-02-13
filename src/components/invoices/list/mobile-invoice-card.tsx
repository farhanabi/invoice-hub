import { Paper, Box, Typography, IconButton, Skeleton } from '@mui/material';
import Image from 'next/image';
import { StatusChip } from './status-chip';
import type { Invoice } from '~/lib/types/invoice';
import { formatCurrency } from '~/lib/utils/format';

interface MobileInvoiceCardProps {
  invoice: Invoice;
  onActionClick: (
    event: React.MouseEvent<HTMLElement>,
    invoice: Invoice
  ) => void;
}

export const MobileInvoiceCardSkeleton = () => (
  <Paper sx={{ p: 2, mb: 2 }}>
    <Box sx={{ mb: 2 }}>
      <Skeleton variant="text" width="60%" height={24} />
      <Skeleton variant="text" width="40%" height={20} />
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Skeleton variant="text" width="30%" />
      <Skeleton variant="rounded" width={80} height={32} />
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="circular" width={32} height={32} />
    </Box>
  </Paper>
);

export const MobileInvoiceCard = ({
  invoice,
  onActionClick,
}: MobileInvoiceCardProps) => (
  <Paper sx={{ p: 2, mb: 2 }}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        mb: 2,
      }}
    >
      <Box>
        <Typography variant="subtitle1">{invoice.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {invoice.number}
        </Typography>
      </Box>
      <IconButton
        onClick={(e) => onActionClick(e, invoice)}
        sx={{ mt: -1, mr: -1 }}
      >
        <Image src="/icons/three-bars.svg" width={20} height={20} alt="" />
      </IconButton>
    </Box>

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Due{' '}
        {invoice.dueDate.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })}
      </Typography>
      <StatusChip status={invoice.status} />
    </Box>

    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
      {formatCurrency(invoice.amount)}
    </Typography>
  </Paper>
);

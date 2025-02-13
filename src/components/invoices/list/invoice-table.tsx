import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Button,
} from '@mui/material';
import Image from 'next/image';

import { StatusChip } from './status-chip';
import { TableRowSkeleton } from './table-row-skeleton';
import type { Invoice } from '~/lib/types/invoice';
import { formatCurrency } from '~/lib/utils/format';

interface InvoiceTableProps {
  invoices: Invoice[];
  isLoading: boolean;
  onActionClick: (
    event: React.MouseEvent<HTMLElement>,
    invoice: Invoice
  ) => void;
  onCreateClick: () => void;
  showCreateButton: boolean;
  searchActive: boolean;
}

export const InvoiceTable = ({
  invoices,
  isLoading,
  onActionClick,
  onCreateClick,
  showCreateButton,
  searchActive,
}: InvoiceTableProps) => (
  <TableContainer
    component={Paper}
    sx={{
      display: { xs: 'none', md: 'block' },
      boxShadow: 'none',
      p: { xs: 2, sm: 4 },
    }}
  >
    <Table>
      <TableHead
        sx={{
          background: '#F7F9FC',
          '.MuiTableCell-root': {
            borderBottom: 'none',
          },
        }}
      >
        <TableRow>
          <TableCell>Invoice</TableCell>
          <TableCell>Due Date</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {isLoading ? (
          [...Array(5)].map((_, index) => <TableRowSkeleton key={index} />)
        ) : invoices.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No invoices found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {searchActive
                  ? "Try adjusting your search or filter to find what you're looking for"
                  : 'Get started by creating your first invoice'}
              </Typography>
              {showCreateButton && (
                <Button
                  variant="contained"
                  onClick={onCreateClick}
                  sx={{ mt: 2 }}
                >
                  Create Invoice
                </Button>
              )}
            </TableCell>
          </TableRow>
        ) : (
          invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <Typography>{invoice.name}</Typography>
                  <Typography
                    variant="body2"
                    color="#64748B"
                    sx={{ fontWeight: 600 }}
                  >
                    {invoice.number}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                {invoice.dueDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </TableCell>
              <TableCell>
                <StatusChip status={invoice.status} />
              </TableCell>
              <TableCell>{formatCurrency(invoice.amount)}</TableCell>
              <TableCell align="right">
                <IconButton onClick={(e) => onActionClick(e, invoice)}>
                  <Image
                    src="/icons/three-bars.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

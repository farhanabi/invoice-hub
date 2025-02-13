'use client';

import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Skeleton,
  Alert,
} from '@mui/material';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { useInvoices } from '~/hooks/use-invoices';
import type { Invoice } from '~/lib/types/invoice';

const formatCurrency = (amount: number) => {
  return `Rp ${amount.toLocaleString('id-ID')}`;
};

const StatusChip = ({ status }: { status: string }) => {
  const colors = {
    Paid: { bg: '#E5F6E5', color: '#1F7A1F' },
    Unpaid: { bg: '#FFEBEB', color: '#D92D20' },
    Pending: { bg: '#FFF5E5', color: '#B88217' },
  };

  const statusColor = colors[status as keyof typeof colors];

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

const TableRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Box>
        <Skeleton variant="text" width={200} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={120} />
      </Box>
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={100} />
    </TableCell>
    <TableCell>
      <Skeleton variant="rounded" width={80} height={32} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={120} />
    </TableCell>
    <TableCell align="right">
      <Skeleton variant="circular" width={40} height={40} />
    </TableCell>
  </TableRow>
);

export default function InvoiceListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { invoices, isLoading, error, deleteInvoice } = useInvoices();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || 'All Status';

  const updateFilters = (newSearch: string, newStatus: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set('search', newSearch);
    if (newStatus !== 'All Status') params.set('status', newStatus);

    const queryString = params.toString();
    router.push(
      queryString ? `/invoices/list?${queryString}` : '/invoices/list'
    );
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      search === '' ||
      invoice.name.toLowerCase().includes(search.toLowerCase()) ||
      invoice.number.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === 'All Status' || invoice.status === status;

    return matchesSearch && matchesStatus;
  });

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    invoice: Invoice
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoice(invoice);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInvoice(null);
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedInvoice) {
      deleteInvoice(selectedInvoice.id);
      setDeleteDialogOpen(false);
    }
  };

  const handleEditClick = (invoice: Invoice) => {
    handleMenuClose();
    // TODO: Implement edit functionality
    router.push(`/invoices/edit/${invoice.id}`);
  };

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              startIcon={<ReplayIcon />}
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          }
          sx={{ mb: 3 }}
        >
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Failed to load invoices
          </Typography>
          <Typography variant="body2">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
          My Invoices
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <TextField
            placeholder="Search"
            value={search}
            onChange={(e) => updateFilters(e.target.value, status)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Image
                      src="/icons/magnifying.svg"
                      alt=""
                      width={18}
                      height={18}
                    />
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
            disabled={isLoading}
            fullWidth
          />
          <Select
            value={status}
            onChange={(e) => updateFilters(search, e.target.value)}
            disabled={isLoading}
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
        </Box>
      </Box>

      {/* ... (rest of component code) */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {isLoading ? (
          [...Array(3)].map((_, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="40%" height={20} />
              </Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Skeleton variant="text" width="30%" />
                <Skeleton variant="rounded" width={80} height={32} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="circular" width={32} height={32} />
              </Box>
            </Paper>
          ))
        ) : filteredInvoices.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No invoices found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {search || status !== 'All Status'
                    ? "Try adjusting your search or filter to find what you're looking for"
                    : 'Get started by creating your first invoice'}
                </Typography>
                {!search && status === 'All Status' && (
                  <Button
                    variant="contained"
                    onClick={() => router.push('/invoices/add')}
                    sx={{ mt: 2 }}
                  >
                    Create Invoice
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </Paper>
        ) : (
          filteredInvoices.map((invoice) => (
            <Paper key={invoice.id} sx={{ p: 2, mb: 2 }}>
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
                  onClick={(e) => handleMenuOpen(e, invoice)}
                  sx={{ mt: -1, mr: -1 }}
                >
                  <MoreVertIcon />
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
          ))
        )}
      </Box>

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
              // Show 5 skeleton rows while loading
              [...Array(5)].map((_, index) => <TableRowSkeleton key={index} />)
            ) : filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No invoices found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {search || status !== 'All Status'
                      ? "Try adjusting your search or filter to find what you're looking for"
                      : 'Get started by creating your first invoice'}
                  </Typography>
                  {!search && status === 'All Status' && (
                    <Button
                      variant="contained"
                      onClick={() => router.push('/invoices/add')}
                      sx={{ mt: 2 }}
                    >
                      Create Invoice
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map((invoice) => (
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
                    <IconButton onClick={(e) => handleMenuOpen(e, invoice)}>
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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => selectedInvoice && handleEditClick(selectedInvoice)}
        >
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <DeleteOutlineIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Invoice</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this invoice? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

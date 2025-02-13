'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
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
} from '@mui/material';

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

export default function InvoiceListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { invoices, deleteInvoice } = useInvoices();

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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h1">
          My Invoices
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            placeholder="Search"
            value={search}
            onChange={(e) => updateFilters(e.target.value, status)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
          />
          <Select
            value={status}
            onChange={(e) => updateFilters(search, e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="All Status">All Status</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Unpaid">Unpaid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Box>
                    <Typography>{invoice.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
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
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
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

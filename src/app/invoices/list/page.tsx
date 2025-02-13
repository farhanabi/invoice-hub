'use client';

import {
  Box,
  Typography,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import { useRouter } from 'next/navigation';

import { SearchBar } from '~/components/invoices/list/search-bar';
import { StatusFilter } from '~/components/invoices/list/status-filter';
import { InvoiceTable } from '~/components/invoices/list/invoice-table';
import {
  MobileInvoiceCard,
  MobileInvoiceCardSkeleton,
} from '~/components/invoices/list/mobile-invoice-card';
import { useInvoices } from '~/hooks/use-invoices';
import { useInvoiceFilters } from '~/hooks/use-invoice-filters';
import { useInvoiceActions } from '~/hooks/use-invoice-actions';
import { filterInvoices } from '~/lib/utils/filter';

export default function InvoiceListPage() {
  const router = useRouter();
  const { invoices, isLoading, error, deleteInvoice } = useInvoices();
  const { search, status, updateFilters, isSearchActive } = useInvoiceFilters();
  const {
    anchorEl,
    selectedInvoice,
    deleteDialogOpen,
    handleMenuOpen,
    handleMenuClose,
    handleDeleteClick,
    handleDeleteConfirm,
    handleEditClick,
    setDeleteDialogOpen,
  } = useInvoiceActions(deleteInvoice);

  const filteredInvoices = filterInvoices(invoices, search, status);

  const handleCreateClick = () => router.push('/invoices/add');

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
      {/* Header and Search Section */}
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
          <SearchBar
            value={search}
            onChange={(value) => updateFilters(value, status)}
            disabled={isLoading}
          />
          <StatusFilter
            value={status}
            onChange={(value) => updateFilters(search, value)}
            disabled={isLoading}
          />
        </Box>
      </Box>

      {/* Mobile View */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {isLoading ? (
          [...Array(3)].map((_, index) => (
            <MobileInvoiceCardSkeleton key={index} />
          ))
        ) : filteredInvoices.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No invoices found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isSearchActive
                ? "Try adjusting your search or filter to find what you're looking for"
                : 'Get started by creating your first invoice'}
            </Typography>
            {!isSearchActive && (
              <Button
                variant="contained"
                onClick={handleCreateClick}
                sx={{ mt: 2 }}
              >
                Create Invoice
              </Button>
            )}
          </Paper>
        ) : (
          filteredInvoices.map((invoice) => (
            <MobileInvoiceCard
              key={invoice.id}
              invoice={invoice}
              onActionClick={handleMenuOpen}
            />
          ))
        )}
      </Box>

      {/* Desktop View */}
      <InvoiceTable
        invoices={filteredInvoices}
        isLoading={isLoading}
        onActionClick={handleMenuOpen}
        onCreateClick={handleCreateClick}
        showCreateButton={!isSearchActive}
        searchActive={isSearchActive}
      />

      {/* Action Menu */}
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

      {/* Delete Confirmation Dialog */}
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

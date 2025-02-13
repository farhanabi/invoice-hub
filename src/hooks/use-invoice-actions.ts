import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Invoice } from '~/lib/types/invoice';

export const useInvoiceActions = (deleteInvoice: (id: string) => void) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<Error | null>(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    invoice: Invoice
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoice(invoice);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // Only clear selected invoice if we're not about to show the delete dialog
    if (!deleteDialogOpen) {
      setSelectedInvoice(null);
    }
  };

  const handleDeleteClick = () => {
    setAnchorEl(null); // Just close the menu, don't clear selection yet
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedInvoice) return;

    try {
      setIsDeleting(true);
      setDeleteError(null);

      // Perform deletion
      deleteInvoice(selectedInvoice.id);

      // Show success message
      setShowDeleteSuccess(true);

      // Close dialog
      setDeleteDialogOpen(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setShowDeleteSuccess(false);
      }, 3000);
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err : new Error('Failed to delete invoice')
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteError(null);
    setSelectedInvoice(null); // Clean up selected invoice when dialog is actually closed
  };

  const handleEditClick = (invoice: Invoice) => {
    handleMenuClose();
    router.push(`/invoices/edit/${invoice.id}`);
  };

  return {
    anchorEl,
    selectedInvoice,
    deleteDialogOpen,
    isDeleting,
    deleteError,
    showDeleteSuccess,
    handleMenuOpen,
    handleMenuClose,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleEditClick,
    setShowDeleteSuccess,
  };
};

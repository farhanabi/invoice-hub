import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Invoice } from '~/lib/types/invoice';

export const useInvoiceActions = (deleteInvoice: (id: string) => void) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
    router.push(`/invoices/edit/${invoice.id}`);
  };

  return {
    anchorEl,
    selectedInvoice,
    deleteDialogOpen,
    handleMenuOpen,
    handleMenuClose,
    handleDeleteClick,
    handleDeleteConfirm,
    handleEditClick,
    setDeleteDialogOpen,
  };
};

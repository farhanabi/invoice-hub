import type { Invoice } from '~/lib/types/invoice';

export const filterInvoices = (
  invoices: Invoice[],
  search: string,
  status: string
) => {
  return invoices.filter((invoice) => {
    const matchesSearch =
      search === '' ||
      invoice.name.toLowerCase().includes(search.toLowerCase()) ||
      invoice.number.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === 'All Status' || invoice.status === status;

    return matchesSearch && matchesStatus;
  });
};

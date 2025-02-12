import { useState, useEffect } from 'react';

import type { Invoice } from '~/lib/types/invoice';

const STORAGE_KEY = 'invoices';

interface UseInvoices {
  invoices: Invoice[];
  isLoading: boolean;
  error: Error | null;
  addInvoice: (invoice: Omit<Invoice, 'id' | 'number' | 'createdAt'>) => void;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  getInvoiceById: (id: string) => Invoice | undefined;
}

export function useInvoices(): UseInvoices {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load invoices from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const hydrated = parsed.map((invoice: Invoice) => ({
          ...invoice,
          dueDate: new Date(invoice.dueDate),
          createdAt: new Date(invoice.createdAt),
        }));
        setInvoices(hydrated);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to load invoices')
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever invoices change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    }
  }, [invoices, isLoading]);

  const generateInvoiceNumber = () => {
    const prefix = 'INV';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  };

  const addInvoice = (
    invoiceData: Omit<Invoice, 'id' | 'number' | 'createdAt'>
  ) => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: crypto.randomUUID(),
      number: generateInvoiceNumber(),
      createdAt: new Date(),
    };
    setInvoices((prev) => [...prev, newInvoice]);
  };

  const updateInvoice = (id: string, updatedData: Partial<Invoice>) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === id ? { ...invoice, ...updatedData } : invoice
      )
    );
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
  };

  const getInvoiceById = (id: string) => {
    return invoices.find((invoice) => invoice.id === id);
  };

  return {
    invoices,
    isLoading,
    error,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceById,
  };
}

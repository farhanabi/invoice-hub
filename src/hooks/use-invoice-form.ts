import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import type { FormInputs } from '~/components/invoices/add/types';
import { invoiceSchema } from '~/lib/schemas/invoice';
import { useInvoices } from './use-invoices';

export const useInvoiceForm = () => {
  const router = useRouter();
  const { addInvoice, isLoading, error: invoiceError } = useInvoices();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<Error | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      name: '',
      dueDate: undefined,
      amount: undefined,
      status: undefined,
    },
  });

  const onSubmit = async (data: FormInputs) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      addInvoice(data);
      setShowSuccess(true);

      // Reset form after successful submission
      reset({
        name: '',
        dueDate: undefined,
        amount: undefined,
        status: undefined,
      });

      // Redirect to list page after delay
      setTimeout(() => {
        router.push('/invoices/list');
      }, 2000);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err : new Error('Failed to add invoice')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    control,
    errors,
    isLoading,
    isSubmitting,
    showSuccess,
    submitError,
    invoiceError,
    handleSubmit,
    onSubmit,
    setSubmitError,
  };
};

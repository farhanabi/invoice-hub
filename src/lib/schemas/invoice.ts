import { z } from 'zod';

export const invoiceSchema = z.object({
  name: z
    .string()
    .min(1, 'Invoice name is required')
    .max(100, 'Invoice name must be less than 100 characters'),
  dueDate: z.date({
    required_error: 'Due date is required',
    invalid_type_error: 'Due date must be a valid date',
  }),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: 'Amount must be a number',
    })
    .refine((val) => val > 0, {
      message: 'Amount must be greater than 0',
    }),
  status: z.enum(['Paid', 'Unpaid', 'Pending'], {
    required_error: 'Status is required',
    invalid_type_error: 'Invalid status selected',
  }),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;

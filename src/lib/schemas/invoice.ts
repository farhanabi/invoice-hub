import { z } from 'zod';

export const invoiceSchema = z.object({
  name: z.string().min(1, 'Invoice name is required'),
  dueDate: z.date({
    required_error: 'Due date is required',
  }),
  amount: z.number().min(0, 'Amount must be positive'),
  status: z.enum(['Paid', 'Unpaid', 'Pending']),
});

export type InvoiceStatus = 'Paid' | 'Unpaid' | 'Pending';

export interface Invoice {
  id: string;
  name: string;
  number: string;
  dueDate: Date;
  amount: number;
  status: InvoiceStatus;
  createdAt: Date;
}

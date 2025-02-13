export type FormInputs = {
  name: string;
  dueDate: Date;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Pending';
};

export interface ExpenseEntry {
  id: number;
  expenseName: string;
  value: number;
  payPeriodType?: PayPeriod;
  [key: string]: string | number | PayPeriod;
}

export interface HandleChange {
  [type: string]: string | number | PayPeriod | ExpenseEntry | ExpenseEntry[];
}

interface ExpenseTag {
  id: number;
  tagName: string;
  total: number;
  identifier: string; // Color
  expenses: ExpenseEntry[];
}

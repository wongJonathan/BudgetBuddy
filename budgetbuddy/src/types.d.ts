export interface ExpenseEntry {
  expenseName: string;
  value: number;
  payPeriodType?: PayPeriod;
  [key: string]: string | number | PayPeriod;
}


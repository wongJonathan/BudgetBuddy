export interface ExpenseEntry {
  expenseName: string;
  value: number;
  payPeriodType?: PayPeriod;
  [key: string]: string | number | PayPeriod;
}

export interface HandleChange {
  [type: string]: string | number | PayPeriod | ExpenseEntry | ExpenseEntry[];
}

// This is how onChange is typed for some reason
export interface ISelectOnChagne {
  name?: string | undefined; 
  value: unknown; 
}

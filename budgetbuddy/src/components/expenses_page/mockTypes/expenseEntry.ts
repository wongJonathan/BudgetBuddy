import {ExpenseEntry} from "../../../types";
import {PayPeriod} from "../../../enum";

const expenseEntry = (partial: Partial<ExpenseEntry>): ExpenseEntry => (
  {
    id: 1,
    expenseName: 'entry1',
    value: 1,
    payPeriodType: PayPeriod.Year,
    ...partial
  }
);

export default expenseEntry;
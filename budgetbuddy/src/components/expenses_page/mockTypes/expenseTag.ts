import {ExpenseTag} from "../../../types";

const expenseTag = (partial: Partial<ExpenseTag>): ExpenseTag => (
  {
    id: 1,
    tagName: 'tag1',
    total: 0,
    identifier: '#000000',
    expenses: [],
    ...partial
  }
);

export default expenseTag;
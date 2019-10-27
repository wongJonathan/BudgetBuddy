import React, { ReactElement, useRef, useState, useCallback, useMemo } from "react";
import { ExpenseEntry } from '../../types';
import ExpenseForm from './expenseForm';
import ExpenseCard from './expenseCard';
import { Typography } from "@material-ui/core";

interface Expenses {
  [type: string]: {
    recurrence: number;
    expenses: ExpenseEntry[];
  }
}

//@todo: Figure out how to update toatl spent when deleting button

const addExpenses = (expenses: Expenses): number => {
  return Reflect.ownKeys(expenses)
    .reduce((total: number, type: string | number | symbol) => {
      const expenseType = type as string;
      console.log(expenseType);
      return total + expenses[expenseType]['recurrence'] * expenses[expenseType]['expenses']
        .reduce((acc: number, expense: ExpenseEntry) => +expense.value + acc, 0);
    }, 0);
}

const ExpensePage = (): ReactElement => {

  const income = useRef(100000);
  const [totalSpent, setTotalSpent] = useState(0);
  console.log('load');
  const basicExpenses: Expenses = {
    Year: {recurrence: 1, expenses: []},
    Monthly: {recurrence: 12, expenses: []},
    Weekly: {recurrence: 52, expenses: []},
    // @todo: should consider how to handle leap years
    Daily: { recurrence: 365, expenses: []},
  };

  const allExpenses = useRef<Expenses>(basicExpenses);

  const handleSubmit = (expenses: ExpenseEntry[], type: string) => {
    allExpenses.current[type]['expenses'] = expenses;

    setTotalSpent(addExpenses(allExpenses.current));
  }

  return (
    <div>
      <div>
        <Typography variant="h5">{`Total income: ${income.current}`}</Typography>
        <Typography variant="h6">{`Total spent: ${totalSpent}`}</Typography>
        <Typography variant="h6">{`Left over: ${income.current - totalSpent}`}</Typography>
      </div>
      {/* {Reflect.ownKeys(allExpenses.current).map(type => {
        return <ExpenseForm type={type as string} handleSubmit={handleSubmit} />
      })} */}
      <ExpenseCard />
    </div>
  )
}

export default ExpensePage;

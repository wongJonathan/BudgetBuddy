import React, { ReactElement, useRef, useState, useCallback, useMemo } from "react";
import { ExpenseEntry, HandleChange } from '../../types';
import ExpenseCard from './expenseCard';
import { Button, Typography } from "@material-ui/core";

interface Expenses {
  [type: string]: {
    recurrence: number;
    expenses: ExpenseEntry[];
  }
}

interface IExpenseCard {
  tagName: string;
  expenses: ExpenseEntry[];
  total: number;
  [key: string]: string | ExpenseEntry[] | number;

}

const ExpensePage = (): ReactElement => {

  const income = useRef(100000);
  const [expenseTypes, setExpenseTypes] = useState<IExpenseCard[]>([]);

  const totalSpent = useMemo(() => {
    let total = 0;
    expenseTypes.forEach((expenseCard: IExpenseCard) => {
      total += expenseCard.total;
    });
    return total;
  }, [expenseTypes]);

  const addCard = () => {
    let updatedExpenses = [...expenseTypes];
    updatedExpenses.push({tagName: '', expenses: [], total: 0});
    setExpenseTypes(updatedExpenses);
  }

  const handleCardChange = (indexPosition: number) => {
    // Instead of passing the index position within the component pass it before and return 
    // the callback function
    return (change: HandleChange) => {
      let updatedExpenses = [...expenseTypes];
      Object.keys(change).forEach((key: string) => {
        updatedExpenses[indexPosition][key] = change[key];
      });

      console.log(expenseTypes);
      setExpenseTypes(updatedExpenses);
    }
  }

  console.log(expenseTypes);
  return (
    <div>
      <div>
        <Typography variant="h5">{`Total income: ${income.current}`}</Typography>
        <Typography variant="h6">{`Total spent: ${totalSpent}`}</Typography>
        <Typography variant="h6">{`Left over: ${income.current - totalSpent}`}</Typography>
      </div>
      <Button onClick={addCard} > Add Expense Type </Button>
      <div>
        {
          expenseTypes.map((type: IExpenseCard, index: number) => {
            return <ExpenseCard total={type.total} tagName={type.tagName} expenses={type.expenses} handleChange={handleCardChange(index)} />;
          })
        }
      </div>
    </div>
  )
}

export default ExpensePage;

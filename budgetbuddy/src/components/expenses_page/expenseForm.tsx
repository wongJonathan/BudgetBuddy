import React, { useState, ReactElement } from 'react';
import { Button, IconButton } from '@material-ui/core';
import ExpenseInput from './expenseInput';
import { ExpenseEntry } from '../../types';

interface ExpenseForm {
  type: string;
  handleSubmit: (expenseEntries: ExpenseEntry[], type: string) => void;
}

const ExpenseForm = ({type, handleSubmit}: ExpenseForm): React.ReactElement => {
  const blankExpense = { expenseName: '', value: 0 }
  const [expenses, setExpenses] = useState<ExpenseEntry[]>([]);
  const addExpnese = () => {
    setExpenses([...expenses, { ...blankExpense }]);
  }

  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log(expenses);
    handleSubmit(expenses, type);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[id][e.target.className] = e.target.value;
    setExpenses(updatedExpenses);
  }

  // @todo: Removing without submitting updates the total spent. Can submit empty labels
  const onRemove = (index: number) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
    handleSubmit(updatedExpenses, type);
  }
  

  return (
    <div>
      {`${type.toUpperCase()} Expenses:`}
            <Button onClick={addExpnese}>Add Expense</Button>
      <form onSubmit={onSubmit}>
        {expenses.map((expense, index) => 
          <ExpenseInput 
            key={index} 
            expense={expense} 
            onChange={onChange} 
            index={index} 
            onRemove={onRemove} 
          />)}

        <Button type="submit">Enter</Button>
      </form>
    </div>

  );
}

export default ExpenseForm;
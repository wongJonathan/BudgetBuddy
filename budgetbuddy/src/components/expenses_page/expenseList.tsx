import React, {ReactElement, useRef, useState, useCallback, useMemo, useEffect} from "react";
import { Button, Typography, List } from "@material-ui/core";
import axios from 'axios';

import {ExpenseEntry, HandleChange, TagListItem} from '../../types';
import ExpenseCard from './expenseCard';
import ExpenseListItem from "./expenseListItem";
import AddTagDialog from "./AddTagDialog";

interface IExpenseCard {
  tagName: string;
  expenses: ExpenseEntry[];
  total: number;
  [key: string]: string | ExpenseEntry[] | number;
}

interface IExpenseListItem {
  tagName: string;
  total: number;
  identifier: string; // Color
  checked: boolean
}

const getExpenseData = (): Promise<ExpenseEntry[]> => {
  return axios.get('http://localhost:8000/api/expenses/')
      .then(response => response.data);
};

const ExpenseList = (): ReactElement => {
  const income = useRef(100000);
  const [expenseKeys, setExpenseKeys] = useState<IExpenseListItem[]>([]);
  const [currentDialog, setCurrentDialog] = useState<ReactElement>(<></>);

  const handleCreateTag = ({tagName, identifier}: TagListItem) => {
    let updatedExpenses = [...expenseKeys];
    updatedExpenses.push({
      tagName,
      total: 0,
      identifier,
      checked: false,
    });
    setExpenseKeys(updatedExpenses);
  };

  const handleCancelDialog = () => {
    setCurrentDialog(<></>);
  };

  const addExpenseKey = () => {
    setCurrentDialog(
      <AddTagDialog
        createTag={handleCreateTag}
        cancelTag={handleCancelDialog}
      />
    );
  };

  const handleCheckbox = (index: number) => {
    return (checked: boolean) => {
      let updatedExpenses = [...expenseKeys];
      updatedExpenses[index].checked = checked;
      setExpenseKeys(updatedExpenses);
    };
  };

  useEffect(() => {
    // getExpenseData()
    //   .then(initialExpenses => {
    //     const initialExpenseCards = [
    //       {
    //         tagName: 'initial',
    //         expenses: initialExpenses,
    //         total: initialExpenses.reduce(
    //             (acc, cur) => acc + cur.value * cur.payPeriodType,
    //             0
    //         )
    //       }
    //     ];
    //     setExpenseTypes(initialExpenseCards);
    //   })
  }, []);

  console.log(expenseKeys);
  return (
    <div>
      {currentDialog}
      <div>
        <Typography variant="h5">{`Total income: ${income.current}`}</Typography>
        <Typography variant="h6">{`Total spent: ${0}`}</Typography>
        <Typography variant="h6">{`Left over: ${income.current - 0}`}</Typography>
      </div>
      <Button onClick={addExpenseKey} > Add Expense Type </Button>
      <List>
        {
          expenseKeys.map((expenseKey, index) => (
            <ExpenseListItem
              key={index.toString(10)}
              tagName={expenseKey.tagName}
              total={expenseKey.total}
              color={expenseKey.identifier}
              checked={expenseKey.checked}
              handleCheckbox={handleCheckbox(index)}
            />
          ))
        }
      </List>
    </div>
  )
};

export default ExpenseList;

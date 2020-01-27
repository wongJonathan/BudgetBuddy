import React, {ReactElement, useRef, useState, useCallback, useMemo, useEffect} from "react";
import {Button, Typography} from "@material-ui/core";
import axios from 'axios';

import {ExpenseEntry, HandleChange, IExpenseTag} from '../../types';
import ExpenseTable from "./expenseTable";


const getExpenseTags = (): Promise<IExpenseTag[]> => {
  return axios.get('http://localhost:8000/api/expenseTags/')
    .then(response => response.data);
};

const getExpenseEntries = (expenseId: number): Promise<ExpenseEntry[]> => {
  return axios.get(`http://localhost:8000/api/expenses/?expenseTagId=${expenseId}`)
    .then(response => response.data);
};

/**
 * Displays all the expense tags and their individual expense entries.
 */
const ExpensePage = (): ReactElement => {
  const income = useRef(100000);
  const [expenseKeys, setExpenseKeys] = useState<IExpenseTag[]>([]);
  const [currentDialog, setCurrentDialog] = useState<ReactElement>(<></>);

  const totalExpense = useMemo(() => (
    expenseKeys.reduce((prev, curr) => (
      prev + curr.total
    ), 0)
  ), [expenseKeys]);

  const handleCreate = (newTag: IExpenseTag) => {
    axios.post('http://localhost:8000/api/expenseTags/', {
      tagName: newTag.tagName,
      total: 0,
      identifier: newTag.identifier,
      expenses: [],
    }).then((response) => {
      if (response.status === 201) {
        setExpenseKeys(prevState => [...prevState, response.data]);
      }
    });
  };

  const handleEdit = (newTag: IExpenseTag, oldTag: IExpenseTag | undefined) => {
    if (oldTag) {
      axios.patch(`http://localhost:8000/api/expenseTags/${newTag.id}/`, {
        id: newTag.id,
        tagName: newTag.tagName,
        total: newTag.total,
        identifier: newTag.identifier,
        expenses: newTag.expenses,
      }).then((response) => {
        console.log(response)
        if (response.status === 200) {
          const index = expenseKeys.indexOf(oldTag);
          const updatedList = [...expenseKeys];
          console.log(response.data);
          updatedList[index] = response.data;
          setExpenseKeys(updatedList);
        }
      });
    }
  };

  const handleDelete = (deletedTag: IExpenseTag) => {
    const index = expenseKeys.indexOf(deletedTag);
    const updatedList = [...expenseKeys];

    updatedList.splice(index, 1);
    setExpenseKeys(updatedList);
  };

  useEffect(() => {
    getExpenseTags()
      .then(initialExpenses => {
        const newExpenseKeys = initialExpenses.map((expenseTag) => {
          return getExpenseEntries(expenseTag.id).then(expenseEntries => (
            {
              id: expenseTag.id,
              tagName: expenseTag.tagName,
              total: expenseEntries.reduce((acc, cur) => cur.value * cur.payPeriodType + acc, 0),
              identifier: expenseTag.identifier,
              expenses: expenseEntries,
            }
          ));
        });

        Promise.all(newExpenseKeys).then(value => {
          console.log(value);
          setExpenseKeys(value);
        });
      });
  }, []);

  console.log(expenseKeys);
  return (
    <div>
      {currentDialog}
      <div>
        <Typography variant="h5">{`Total income: ${income.current}`}</Typography>
        <Typography variant="h6">{`Total spent: ${totalExpense}`}</Typography>
        <Typography variant="h6">{`Left over: ${income.current - totalExpense}`}</Typography>
      </div>
      <ExpenseTable
        data={expenseKeys}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  )
};

export default ExpensePage;

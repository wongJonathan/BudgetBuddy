import React, {ReactElement, useRef, useState, useCallback, useMemo, useEffect} from "react";
import {Button, Typography} from "@material-ui/core";
import axios from 'axios';

import {ExpenseEntry, HandleChange, IExpenseTag} from '../../types';
import ExpenseTable from "./expenseTable";
import {PayPeriod} from "../../enum";


// const mockData: IExpenseTag[] = [
//   {tagName: 'Tag 1', total: 0, identifier: '#FFFF00', expenses: []},
//   {tagName: 'Tag 2', total: 0, identifier: '#808000', expenses: []},
//   {tagName: 'Tag 3', total: 0, identifier: '#17A589', expenses: []},
// ];

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

  const handleCreate = (newTag: IExpenseTag) => {
    setExpenseKeys(prevState => [...prevState, {
      id: 5,
        tagName: newTag.tagName,
        total: 0,
        identifier: newTag.identifier,
        expenses: [],
      }]
    );
  };

  const handleEdit = (newTag: IExpenseTag, oldTag: IExpenseTag | undefined) => {
    if (oldTag) {
      const index = expenseKeys.indexOf(oldTag);
      const updatedList = [...expenseKeys];
      updatedList[index] = newTag;
      setExpenseKeys(updatedList);
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
        <Typography variant="h6">{`Total spent: ${0}`}</Typography>
        <Typography variant="h6">{`Left over: ${income.current - 0}`}</Typography>
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

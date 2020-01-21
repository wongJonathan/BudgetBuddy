import React, {ReactElement, useRef, useState, useCallback, useMemo, useEffect} from "react";
import {Button, Typography} from "@material-ui/core";
import axios from 'axios';

import {ExpenseEntry, HandleChange, IExpenseTag} from '../../types';
import ExpenseCard from './expenseCard';
import ExpenseTable from "./expenseTable";


const mockData: IExpenseTag[] = [
  {tagName: 'Tag 1', total: 0, identifier: '#FFFF00', expenses: []},
  {tagName: 'Tag 2', total: 0, identifier: '#808000', expenses: []},
  {tagName: 'Tag 3', total: 0, identifier: '#17A589', expenses: []},
];

const getExpenseData = (): Promise<ExpenseEntry[]> => {
  return axios.get('http://localhost:8000/api/expenses/')
    .then(response => response.data);
};

const ExpensePage = (): ReactElement => {
  const income = useRef(100000);
  const [expenseKeys, setExpenseKeys] = useState<IExpenseTag[]>(mockData);
  const [currentDialog, setCurrentDialog] = useState<ReactElement>(<></>);

  const handleCreate = (newTag: IExpenseTag) => {
    setExpenseKeys(prevState => [...prevState, {
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

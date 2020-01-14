import React, {ReactElement, useRef, useState, useCallback, useMemo, useEffect} from "react";
import {Button, Typography, List, Fab, Zoom, Divider, makeStyles} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

import {ExpenseEntry, HandleChange, TagListItem} from '../../types';
import ExpenseCard from './expenseCard';
import ExpenseListItem from "./expenseListItem";
import AddTagDialog from "./AddTagDialog";
import ExpenseListToolBar from "./ExpenseListToolbar";

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

const useStyles = makeStyles(theme => ({
  addButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: '50%',
  },
}));

const getExpenseData = (): Promise<ExpenseEntry[]> => {
  return axios.get('http://localhost:8000/api/expenses/')
      .then(response => response.data);
};

const ExpenseList = (): ReactElement => {
  const classes = useStyles();

  const income = useRef(100000);
  const [expenseKeys, setExpenseKeys] = useState<IExpenseListItem[]>([]);
  const [currentDialog, setCurrentDialog] = useState<ReactElement>(<></>);
  const [checkbox, setCheckbox] = useState('none');

  const [checkNumb, setCheckNumb] = useState(0);

  const handleCreateTag = ({tagName, identifier}: TagListItem) => {
    setExpenseKeys(prevState => [...prevState, {
        tagName,
        total: 0,
        identifier,
        checked: false,
      }]
    );
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
      setCheckNumb(prevCheckNumb => {
        const change = checked ? 1 : -1;
        return prevCheckNumb + change;
      });
      setExpenseKeys(updatedExpenses);
    };
  };

  const handleAllCheckbox = (checkboxValue: string) => {
    switch(checkboxValue) {
      case 'checked':
        expenseKeys.forEach(expenseKey => expenseKey.checked = true);
        setCheckNumb(expenseKeys.length);
        break;
      case 'none':
       expenseKeys.forEach(expenseKey => expenseKey.checked = false);
       setCheckNumb(0);
      break;
    };

    setCheckbox(checkboxValue);
  };

  useEffect(() => {
    if (checkNumb === 0) {
      setCheckbox('none');
    } else if (checkNumb === expenseKeys.length) {
      setCheckbox('checked');
    } else {
      setCheckbox('indeterminate')
    }
  }, [checkNumb, expenseKeys]);

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
      <List>
        <Divider />
        <ExpenseListToolBar handleCheckbox={handleAllCheckbox} checkboxValue={checkbox}/>
        <Divider />
        {
          expenseKeys.map((expenseKey, index) => (
            <>
              <ExpenseListItem
                key={index.toString(10)}
                tagName={expenseKey.tagName}
                total={expenseKey.total}
                color={expenseKey.identifier}
                checked={expenseKey.checked}
                handleCheckbox={handleCheckbox(index)}
              />
              <Divider variant="inset" />
            </>
          ))
        }
      </List>
      <Fab
        className={classes.addButton}
        color="primary"
        variant="extended"
        onClick={addExpenseKey}
      >
        <AddIcon />
        Add Key
      </Fab>
    </div>
  )
};

export default ExpenseList;

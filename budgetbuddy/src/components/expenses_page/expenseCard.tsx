import React, { ReactElement, useState, useRef } from "react";
import { ExpenseEntry, HandleChange, ISelectOnChange } from "../../types";
import { Button, Input, Card, CardContent, CardActions, Divider, Typography } from "@material-ui/core";
import ExpenseInput from "./expenseInput";
import { makeStyles } from "@material-ui/styles";
import AddIcon from '@material-ui/icons/Add';
import {PayPeriod} from '../../enum';

interface ExpenseCardProps {
  total: number;
  tagName: string;
  expenses: ExpenseEntry[];
  handleChange: (change: HandleChange) => void;
}

const styles = makeStyles({
  root: {
    maxWidth: '700px',
    padding: '10px'
  },
  card: {
    flexGrow: 1
  },
  titleDiv: {
    width: '100%',
    '& > input': {
      textAlign: 'center',
    }
  },
  addExpenseButton: {
    width: '100%',
  },
  cardActionButton: {
    padding: 0,
  }
});

const ExpenseCard = ({total, tagName, expenses,  handleChange}: ExpenseCardProps): ReactElement => {
  // Cant get rid of 0
  const blankExpense: ExpenseEntry = { tagName: tagName, expenseName: '', value: 0, payPeriodType: PayPeriod.Year }

  const [cardExpenses, setExpenses] = useState<ExpenseEntry[]>(expenses);
  const [totalExpense, setTotalExpense] = useState<number>(total);
  const [title, setTitle] = useState<string>(tagName);
  const classes = styles();

  const addExpense = () => {
    const updatedExpenses = [...cardExpenses, blankExpense];
    handleChange({ expenses: updatedExpenses });

    setExpenses(updatedExpenses);
  };


  const onChange = (id: number) => {
    return (e: React.FormEvent<HTMLInputElement> ) => {
      const updatedExpenses = [...cardExpenses];
      if (e.currentTarget.className === 'value') {
        const newValue: number = +e.currentTarget.value;

        updateTotal(id, 'value', newValue);
        updatedExpenses[id].value = newValue;
      } else {
        updatedExpenses[id][e.currentTarget.className] = e.currentTarget.value;
      }
      handleChange({ expenses: updatedExpenses });
      setExpenses(updatedExpenses);
    }
  };

  const onChangeSelect = (id: number) => (
    (event: any, child?: object) => {
      const updatedExpenses = [...cardExpenses];
      const newValue: number = event.target.value;

      updateTotal(id, 'payPeriodType', newValue);
      updatedExpenses[id].payPeriodType = newValue;
      handleChange({ expenses: updatedExpenses });
      setExpenses(updatedExpenses);
      console.log(cardExpenses);
    }
  );
  
  const onRemove = (index: number) => (
    () => {
      const updatedExpenses = [...expenses];

      updateTotal(index, 'remove');
      updatedExpenses.splice(index, 1);
      handleChange({ expenses: updatedExpenses });
      setExpenses(updatedExpenses);
    }
  );

  const updateTotal = (id: number, type: string, newValue: number = 0 ) => {
    let diff = 0;

    switch(type) {
      case 'value':
        diff = cardExpenses[id].payPeriodType * (newValue - cardExpenses[id].value);
        break;
      case 'payPeriodType':
        diff = cardExpenses[id].value * (newValue - cardExpenses[id].payPeriodType);
        break;
      case 'remove':
        diff = -cardExpenses[id].value * cardExpenses[id].payPeriodType;
        break;
    }
    handleChange({ total: totalExpense + diff });
    setTotalExpense(totalExpense + diff);
  };

  const setCardTitle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange({tagName: e.target.value});
    setTitle(e.target.value);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5">
            {title}
          </Typography>
          <Typography color="textSecondary">
            {`$${total}`}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActionButton}>
          <Button className={classes.addExpenseButton} onClick={addExpense}><AddIcon /></Button>
        </CardActions>
      </Card>
    </div>

  );
  return (
    <div />
  )
};

export default ExpenseCard;
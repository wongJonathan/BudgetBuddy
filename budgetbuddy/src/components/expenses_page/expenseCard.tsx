import React, { ReactElement, useState, useRef } from "react";
import { ExpenseEntry, HandleChange } from "../../types";
import { Button, Input, Card, CardContent, CardActions, Divider } from "@material-ui/core";
import ExpenseInput from "./expenseInput";
import { makeStyles } from "@material-ui/styles";
import AddIcon from '@material-ui/icons/Add';
import {PayPeriod} from '../../enum';

interface ExpenseCardProps {
  tagName: string;
  expenses: ExpenseEntry[];
  handleChange: (change: HandleChange) => void;
}

const styles = makeStyles({
  root: {
    maxWidth: '700px',
    // display: 'z',
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

const ExpenseCard = ({tagName, expenses,  handleChange}: ExpenseCardProps): ReactElement => {
  const blankExpense: ExpenseEntry = { expenseName: '', value: 0, payPeriodType: PayPeriod.Year }

  const [cardExpenses, setExpenses] = useState<ExpenseEntry[]>(expenses);
  const title = useRef('');
  const classes = styles();

  const addExpnese = () => {
    // const blankExpense: ExpenseEntry = {};
    // blankExpense.expenseName = '';
    // blankExpense.value = 0;
    // blankExpense.payPeriod = PayPeriod.Year;

    setExpenses([...cardExpenses, blankExpense]);
    if (cardExpenses.length >= 1)
    console.log(cardExpenses[0].payPeriodType + '');
  }

  // Have it activate on clickaway
  // const onSubmit = (event: any) => {
  //   event.preventDefault();
  //   console.log(expenses);
  //   handleSubmit(expenses, type);
  // }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any, id: number) => {
    const updatedExpenses = [...cardExpenses];
    updatedExpenses[id][e.target.className] = e.target.value;
    handleChange({ expenses: updatedExpenses });

    setExpenses(updatedExpenses);
  }

  const onChangeSelect = (e: any, id: number) => {
    console.log(e.target.value);
    const updatedExpenses = [...cardExpenses];
    updatedExpenses[id]['payPeriodType'] = e.target.value;
    handleChange({ expenses: updatedExpenses });
    setExpenses(updatedExpenses);
    console.log(cardExpenses);
  }  
  
  // @todo: Removing without submitting updates the total spent. Can submit empty labels
  // const onRemove = (index: number) => {
  //   const updatedExpenses = [...expenses];
  //   updatedExpenses.splice(index, 1);
  //   setExpenses(updatedExpenses);
  //   handleSubmit(updatedExpenses, type);
  // }dfsd


  const setTitle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange({tagName: e.target.value});
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Input className={classes.titleDiv} placeholder="Enter Name of Type" onChange={setTitle} disableUnderline />
        </CardContent>
        <Divider />
        <CardContent>
          <div>
            {cardExpenses.map((expense, index) =>
              <ExpenseInput
                key={index}
                expense={expense}
                onChange={onChange}
                index={index}
                onRemove={() => { }}
                onChangeSelect={onChangeSelect}
              />)}
          </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.cardActionButton}>
          <Button className={classes.addExpenseButton} onClick={addExpnese}><AddIcon /></Button>
        </CardActions>
      </Card>
    </div>

  );
  return (
    <div />
  )
};

export default ExpenseCard;
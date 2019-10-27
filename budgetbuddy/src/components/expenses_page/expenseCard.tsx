import React, { ReactElement, useState, useRef } from "react";
import { ExpenseEntry } from "../../types";
import { Button, Input, Card, CardContent, CardActions, Divider } from "@material-ui/core";
import ExpenseInput from "./expenseInput";
import { makeStyles } from "@material-ui/styles";
import AddIcon from '@material-ui/icons/Add';

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

const ExpenseCard = (): ReactElement => {
  const blankExpense = { expenseName: '', value: 0 }
  const [expenses, setExpenses] = useState<ExpenseEntry[]>([]);
  const title = useRef('');
  const classes = styles();

  const addExpnese = () => {
    setExpenses([...expenses, { ...blankExpense }]);
  }

  // Have it activate on clickaway
  // const onSubmit = (event: any) => {
  //   event.preventDefault();
  //   console.log(expenses);
  //   handleSubmit(expenses, type);
  // }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any, id: number) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[id][e.target.className] = e.target.value;
    setExpenses(updatedExpenses);
  }

  const onChangeSelect = (e: any, id: number) => {
    console.log(e.target.value);
    const updatedExpenses = [...expenses];
    updatedExpenses[id]['payPeriodType'] = e.target.value;
    setExpenses(updatedExpenses);
    console.log(expenses);
  }  
  
  // @todo: Removing without submitting updates the total spent. Can submit empty labels
  // const onRemove = (index: number) => {
  //   const updatedExpenses = [...expenses];
  //   updatedExpenses.splice(index, 1);
  //   setExpenses(updatedExpenses);
  //   handleSubmit(updatedExpenses, type);
  // }


  const setTitle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    title.current = e.target.value;
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
            {expenses.map((expense, index) =>
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
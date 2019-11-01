import React, { ReactElement, useState, useRef } from "react";
import { ExpenseEntry, HandleChange, ISelectOnChagne } from "../../types";
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

const ExpenseCard = ({total, tagName, expenses,  handleChange}: ExpenseCardProps): ReactElement => {
  const blankExpense: ExpenseEntry = { expenseName: '', value: 0, payPeriodType: PayPeriod.Year }

  const [cardExpenses, setExpenses] = useState<ExpenseEntry[]>(expenses);
  const [totalExpense, setTotalExpense] = useState<number>(total);
  const title = useRef('');
  const classes = styles();

  const addExpense = () => {
    const updatedExpenses = [...cardExpenses, blankExpense];
    handleChange({ expenses: updatedExpenses });

    setExpenses(updatedExpenses);
  }


  // const changeEvent = (id: number, type: string) => {
  //   const updatedExpenses = [...cardExpenses];

  //   switch(type) {
  //     case 'input':
  //       break;
  //     case 'select':
  //       break;
  //     case 'remove':
  //       break;
  //   }
  // };

  const onChange = (id: number) => {
    return (e: React.FormEvent<HTMLInputElement> ) => {
      const updatedExpenses = [...cardExpenses];
      if (e.currentTarget.className === 'value') {
        updatedExpenses[id][e.currentTarget.className] = +e.currentTarget.value;
      } else {
        updatedExpenses[id][e.currentTarget.className] = e.currentTarget.value;
      }
      handleChange({ expenses: updatedExpenses });
      setExpenses(updatedExpenses);
    }
  }

  const onChangeSelect = (id: number) => (
    (event: any, child?: object) => {
      const updatedExpenses = [...cardExpenses];
      updatedExpenses[id].payPeriodType = event.target.value;
      handleChange({ expenses: updatedExpenses });
      setExpenses(updatedExpenses);
      console.log(cardExpenses);
    }
  );
  
  const onRemove = (index: number) => (
    () => {
      const updatedExpenses = [...expenses];
      updatedExpenses.splice(index, 1);
      handleChange({ expenses: updatedExpenses });
      setExpenses(updatedExpenses);
    }
  );

  const setTitle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange({tagName: e.target.value});
  }

 // Might calculate total in each section first

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Input className={classes.titleDiv} placeholder="Enter Name of Type" onChange={setTitle} disableUnderline />
        </CardContent>
        <Divider />
        <CardContent>
          <div>
            <Typography> {`Total: ${totalExpense}`} </Typography>
            {cardExpenses.map((expense, index) =>
              <ExpenseInput
                key={index}
                expense={expense}
                onChange={onChange(index)}
                onRemove={onRemove(index)}
                onChangeSelect={onChangeSelect(index)}
              />)}
          </div>
        </CardContent>
        <Divider />
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
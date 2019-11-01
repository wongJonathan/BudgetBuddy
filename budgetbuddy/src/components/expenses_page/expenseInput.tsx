import React, { ReactElement, useState } from "react";
import { IconButton, Select, MenuItem } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close"
import { ExpenseEntry } from '../../types';
import {PayPeriod} from '../../enum';

interface ExpenseInput {
  expense: ExpenseEntry;
  onChange: (event: React.FormEvent<HTMLInputElement> ) => void;
  onRemove: (idx: number) => void;
  onChangeSelect?: (e: any) => void;
}



const ExpenseInput = ({ expense, onChange, onRemove, onChangeSelect }: ExpenseInput): ReactElement => {

  const selector = (): ReactElement => {
    // Gets the keys of all the PayPeriod enum
    const payPeriods: string[] = Object.keys(PayPeriod)
      .filter(payperiod => typeof PayPeriod[payperiod as keyof typeof PayPeriod] === 'number') as string[];
    const selectValue = expense.payPeriodType !== undefined? expense.payPeriodType : 1;

    return (
      <Select 
        value={selectValue} 
        onChange={e => (onChangeSelect !== undefined) ? onChangeSelect(e as any) : null } 
        className="payPeriodType"
      >
        {payPeriods.map(payPeriodValue => {
          return (
            <MenuItem 
              key={payPeriodValue} 
              value={PayPeriod[payPeriodValue as keyof typeof PayPeriod]}
            >
              {payPeriodValue}
            </MenuItem>
          )
        })}
      </Select>
    )
  }

  return (
    <div>
      <label>Expense Name</label>
      <input
        type="text"
        name="expenseName"
        className="expenseName"
        onChange={onChange}
        value={expense.expenseName}
        placeholder="Enter expense label"
        required />
      <label>Value</label>
      <input
        type="number"
        name="value"
        className="value"
        onChange={onChange}
        value={expense.value}
        required />
      {onChangeSelect !== undefined && selector()}
      <IconButton>
        <CloseIcon />
      </IconButton>
    </div>
  )
}

export default ExpenseInput;
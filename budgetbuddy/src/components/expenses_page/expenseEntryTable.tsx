import React, {ReactElement, useState} from "react";
import MaterialTable, {EditComponentProps} from "material-table";
import {makeStyles, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import axios from 'axios';

import {PayPeriod} from "../../enum";
import {ExpenseEntry, ExpenseTag} from "../../types";


interface ExpenseEntryTableProps {
  currentTag: ExpenseTag;
  handleEdit: (newExpenseTag: ExpenseTag) => void;
  updateTotal: (addValue: number, tagId: number) => void;
}

const useStyle = makeStyles(theme => ({
  tableContainer: {
    margin: theme.spacing(0, 3),
  },
}));

const payPeriods: string[] = Object.keys(PayPeriod)
  .filter(payperiod => typeof PayPeriod[payperiod as keyof typeof PayPeriod] === 'number') as string[];

const createTag = (newExpense: ExpenseEntry, tagId: number): Promise<ExpenseEntry> => (
  axios.post('http://localhost:8000/api/expenses/', {
    expenseName: newExpense.expenseName,
    value: newExpense.value,
    payPeriodType: newExpense.payPeriodType,
    expenseTag: tagId,
  })
);

/**
 * Table that displays expense entries. Can create, edit, and delete entries.
 */
const ExpenseEntryTable = ({currentTag, handleEdit, updateTotal}: ExpenseEntryTableProps): ReactElement => {
  const classes = useStyle();

  const [expenses, setExpenses] = useState<ExpenseEntry[]>(currentTag.expenses || []);

  const handleCreate = (newExpense: ExpenseEntry): Promise<void> => (
    new Promise((resolve, reject) => {
      if (!('expenseName' in newExpense)) {
        newExpense.expenseName = '';
      }

      if (!('value' in newExpense)) {
        newExpense.value = 0;
      }

      console.log(currentTag);
      console.log(expenses);
      createTag(newExpense, currentTag.id).then(response => {
        console.log(response);
        if (response.status === 201) {
          setExpenses(prevState => [...prevState, response.data]);
          // currentTag.total += response.data.value * response.data.payPeriodType;
          updateTotal(response.data.value * response.data.payPeriodType, currentTag.id);
          resolve();
        } else {
          reject();
        }
      });
    })
  );

  const handleCostEdit = (props: EditComponentProps<ExpenseEntry>): ReactElement => (
    <TextField
      inputProps={{ "aria-label": "cost-input" }}
      aria-label="cost"
      type="number"
      value={props.value || ''}
      onChange={(e): void => props.onChange(parseInt(e.target.value))}
    />
  );

  const handlePayPeriodEdit = (props: EditComponentProps<ExpenseEntry>): ReactElement => {
    const selectValue = props.value === undefined ? 1 : props.value;
    return (
      <Select
        value={selectValue}
        onChange={(e): void => props.onChange(e.target.value)}
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
    );
  };

  const renderPayPeriodData = (rowData: ExpenseEntry): ReactElement => (
    <Typography>{PayPeriod[rowData.payPeriodType]}</Typography>
  );

  return (
    <div style={{
      backgroundColor: currentTag.identifier,
    }}>
      <div className={classes.tableContainer}>
        <MaterialTable
          title={`${currentTag.tagName} expenses`}
          options={{
            sorting: true,
            selection: true,
            paging: false,
          }}
          columns={[
            {title: 'Name', field: 'expenseName'},
            {
              title: 'Cost',
              field: 'value',
              editComponent: handleCostEdit,
            },
            {
              title: 'Pay Period',
              field: 'payPeriodType',
              initialEditValue: 1,
              editComponent: handlePayPeriodEdit,
              render: renderPayPeriodData,
            }
          ]}
          data={expenses}
          editable={{
            onRowAdd: handleCreate,
            onRowUpdate: (newData, oldData): Promise<void> =>
              new Promise((resolve) => {
                if (oldData) {
                  const diffValue = newData.value * newData.payPeriodType - oldData.value * oldData.payPeriodType;
                  const index = currentTag.expenses.indexOf(oldData);
                  currentTag.expenses[index] = newData;
                  currentTag.total += diffValue;
                  handleEdit(currentTag);
                }
                resolve();
              }),
            onRowDelete: (oldData): Promise<void> => {
              return new Promise((resolve) => {
                const index = currentTag.expenses.indexOf(oldData);
                currentTag.expenses.splice(index, 1);
                currentTag.total -= oldData.value * oldData.payPeriodType;
                handleEdit(currentTag);
                resolve();
              })
            }
            ,
          }
          }
        />
      </div>
    </div>
  );
};

export default ExpenseEntryTable;
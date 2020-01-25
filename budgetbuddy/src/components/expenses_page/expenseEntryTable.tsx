import React, {ReactElement, useState} from "react";
import MaterialTable from "material-table";
import {makeStyles, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import axios from 'axios';

import {PayPeriod} from "../../enum";
import {ExpenseEntry, IExpenseTag} from "../../types";


interface expenseEntryTableProps {
  currentTag: IExpenseTag;
  handleEdit: (newExpenseTag: IExpenseTag) => void;
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
const ExpenseEntryTable = ({currentTag, handleEdit, updateTotal}: expenseEntryTableProps): ReactElement => {
  const classes = useStyle();

  const [expenses, setExpenses] = useState<ExpenseEntry[]>(currentTag.expenses);

  const handleCreate = (newExpense: ExpenseEntry): Promise<any> => (
    new Promise((resolve, reject) => {
      if (!newExpense.hasOwnProperty('expenseName')) {
        newExpense.expenseName = '';
      }

      if (!newExpense.hasOwnProperty('value')) {
        newExpense.value = 0;
      }

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
              editComponent: props => (
                <TextField
                  type="number"
                  value={props.value || ''}
                  onChange={e => props.onChange(parseInt(e.target.value))}
                />
              )
            },
            {
              title: 'Pay Period',
              field: 'payPeriodType',
              initialEditValue: 1,
              editComponent: props => {

                const selectValue = props.value === undefined ? 1 : props.value;
                return (
                  <Select
                    value={selectValue}
                    onChange={e => props.onChange(e.target.value)}
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
              },
              render: rowData => <Typography>{PayPeriod[rowData.payPeriodType]}</Typography>
            }
          ]}
          data={expenses}
          editable={{
            onRowAdd: handleCreate,
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                if (oldData) {
                  const diffValue = newData.value * newData.payPeriodType - oldData.value * oldData.payPeriodType;
                  const index = currentTag.expenses.indexOf(oldData);
                  currentTag.expenses[index] = newData;
                  currentTag.total += diffValue;
                  handleEdit(currentTag);
                }
                resolve();
              }),
            onRowDelete: oldData => {
              console.log('deletesd')
              return new Promise((resolve, reject) => {
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
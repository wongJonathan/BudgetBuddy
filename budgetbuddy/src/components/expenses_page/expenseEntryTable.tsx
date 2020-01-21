// Gets the keys of all the PayPeriod enum
import {PayPeriod} from "../../enum";
import {IExpenseTag} from "../../types";
import React, {ReactElement} from "react";
import MaterialTable from "material-table";
import {makeStyles, MenuItem, Select, TextField, Typography} from "@material-ui/core";


interface expenseEntryTableProps {
  data: IExpenseTag;
  handleEdit: (newExpenseTag: IExpenseTag) => void;
}

const useStyle = makeStyles(theme => ({
  tableContainer: {
    margin: theme.spacing(0, 2),
  },
}));

const payPeriods: string[] = Object.keys(PayPeriod)
  .filter(payperiod => typeof PayPeriod[payperiod as keyof typeof PayPeriod] === 'number') as string[];

const ExpenseEntryTable = ({data, handleEdit}: expenseEntryTableProps): ReactElement => {
  const classes = useStyle();

  return(
    <div style={{
      backgroundColor: data.identifier,
    }}>
      <div className={classes.tableContainer}>
        <MaterialTable
          title={`${data.tagName} expenses`}
          options={{
            sorting: true,
            selection: true,
          }}
          columns={[
            { title: 'Name', field: 'expenseName' },
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
          data={data.expenses}
          editable={{
            onRowAdd: newTag =>
              new Promise((resolve, reject) => {
                data.expenses.push(newTag);
                handleEdit(data);
                resolve();
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                if (oldData) {
                  const index = data.expenses.indexOf(oldData);
                  data.expenses[index] = newData;
                  handleEdit(data);
                }
                resolve();
              }),
            onRowDelete: oldData =>
              {
                console.log('deletesd')
                return new Promise((resolve, reject) => {
                  const index = data.expenses.indexOf(oldData);
                  data.expenses.splice(index, 1);
                  handleEdit(data);
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
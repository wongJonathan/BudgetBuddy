import React, {ReactElement, useState, useRef, } from "react";
import MaterialTable, { Column} from "material-table";
import LensIcon from '@material-ui/icons/Lens';

import {IExpenseTag} from "../../types";

interface expenseTableProps {
  data: IExpenseTag[];
  handleCreate: (newTag: IExpenseTag) => void;
  handleEdit: (newTag: IExpenseTag, oldTag: IExpenseTag | undefined) => void;
  handleDelete: (deletedTag: IExpenseTag) => void;
}

const ExpenseTable = (
  {
    data,
    handleCreate,
    handleEdit,
    handleDelete
  }: expenseTableProps
): ReactElement => {

  return (
    <>
      <MaterialTable
        options={{
          sorting: true,
          selection: true,
        }}
        columns={[
          {
            title: 'Label',
            field: 'identifier',
            render: rowData => (
              <LensIcon style={{color: rowData.identifier}} />
            ),
            cellStyle: {
              width: '128px',
            },
            headerStyle: {
              width: '128px',
            },
          },
          { title: 'Tag Name', field: 'tagName'},
          { title: 'Total', field: 'total'}
        ]}
        data={data}
        editable={{
          onRowAdd: newTag =>
            new Promise((resolve, reject) => {
              handleCreate(newTag);
              resolve();
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              handleEdit(newData, oldData);
              resolve();
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              handleDelete(oldData);
              resolve();
            }),
          }
        }
      />
    </>
  )
};

export default ExpenseTable;

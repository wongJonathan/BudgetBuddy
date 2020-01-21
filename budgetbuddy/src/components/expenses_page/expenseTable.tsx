import React, {ReactElement, useState, useRef, createRef,} from "react";
import MaterialTable from "material-table";
import LensIcon from '@material-ui/icons/Lens';

import {IExpenseTag} from "../../types";
import ExpenseEntryTable from "./expenseEntryTable";
import ColorPickerEditComponent from './colorPickerEditComponent';

type handleEdit = (newTag: IExpenseTag, oldTag: IExpenseTag | undefined) => void;

interface expenseTableProps {
  data: IExpenseTag[];
  handleCreate: (newTag: IExpenseTag) => void;
  handleEdit: handleEdit;
  handleDelete: (deletedTag: IExpenseTag) => void;
}

/**
 * Displays all expense tags. Allows to create, edit, and delete of tags.
 * Clicking a row shows the tag's expenses.
 */
const ExpenseTable = (
  {
    data,
    handleCreate,
    handleEdit,
    handleDelete
  }: expenseTableProps
): ReactElement => {
  const handleEntryEdit = (currentTag: IExpenseTag): ((newExpenseTag: IExpenseTag) => void) => {
    return (newExpenseTag: IExpenseTag): void => {
      handleEdit(newExpenseTag, currentTag);
    };
  };

  return (
    <>
      <MaterialTable
        title="Expense Tags"
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
            editComponent: props => <ColorPickerEditComponent props={props} />,
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
        detailPanel={
          rowData =>
            <ExpenseEntryTable data={rowData} handleEdit={handleEntryEdit(rowData)} />
        }
        onRowClick={(event, rowData, togglePanel) => {
          if(togglePanel) {
            togglePanel();
          }
        }}
      />
    </>
  )
};

export default ExpenseTable;

import React, {ReactElement, useState, useRef, createRef, useEffect,} from "react";
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
  const [tags, setTags] = useState<IExpenseTag[]>(data);

  const updateTotal = (addValue: number, tagId: number): void => {
    const tagIndex = tags.findIndex((tag) => tag.id === tagId);
    if (tagIndex !== -1) {
      const updatedTags = [...tags];
      updatedTags[tagIndex].total += addValue;
      setTags(updatedTags);
    }
  };

  const handleEntryEdit = (currentTag: IExpenseTag): ((newExpenseTag: IExpenseTag) => void) => {
    return (newExpenseTag: IExpenseTag): void => {
      handleEdit(newExpenseTag, currentTag);
    };
  };

  useEffect(() => {
    setTags(data);
  }, [data]);
  
  return (
    <>
      <MaterialTable
        title="Expense Tags"
        options={{
          sorting: true,
          selection: true,
          paging: false,
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
              paddingLeft: 0,
              paddingRight: 0,
              width: 64,
            },
            headerStyle: {
              paddingLeft: 0,
              paddingRight: 0,
              width: 64,
            },
          },
          { title: 'Tag Name', field: 'tagName'},
          {
            title: 'Total',
            field: 'total',
            editable: 'never',
          }
        ]}
        data={tags}
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
            <ExpenseEntryTable
              currentTag={rowData}
              handleEdit={handleEntryEdit(rowData)}
              updateTotal={updateTotal}
            />
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

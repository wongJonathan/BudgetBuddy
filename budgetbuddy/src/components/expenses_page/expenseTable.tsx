import React, 
{
  ReactElement, 
  useState, 
  useEffect,
} from 'react';
import MaterialTable, {EditComponentProps} from 'material-table';
import LensIcon from '@material-ui/icons/Lens';

import {ExpenseTag} from '../../types';
import ExpenseEntryTable from './expenseEntryTable';
import ColorPickerEditComponent from './colorPickerEditComponent';

type handleEdit = (newTag: ExpenseTag, oldTag: ExpenseTag | undefined) => void;

interface ExpenseTableProps {
  data: ExpenseTag[];
  handleCreate: (newTag: ExpenseTag) => void;
  handleEdit: handleEdit;
  handleDelete: (deletedTag: ExpenseTag) => void;
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
  }: ExpenseTableProps
): ReactElement => {
  const [tags, setTags] = useState<ExpenseTag[]>(data);

  const updateTotal = (addValue: number, tagId: number): void => {
    const tagIndex = tags.findIndex((tag) => tag.id === tagId);
    if (tagIndex !== -1) {
      const updatedTags = [...tags];
      updatedTags[tagIndex].total += addValue;
      setTags(updatedTags);
    }
  };

  const handleEntryEdit = (currentTag: ExpenseTag): ((newExpenseTag: ExpenseTag) => void) => {
    return (newExpenseTag: ExpenseTag): void => {
      handleEdit(newExpenseTag, currentTag);
    };
  };

  const labelRender = (rowData: ExpenseTag): ReactElement => (
    <LensIcon style={{color: rowData.identifier}} />
  );

  const labelEdit = (props: EditComponentProps<ExpenseTag>): ReactElement => (
    <ColorPickerEditComponent props={props} />
  );

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
            render: labelRender,
            editComponent: labelEdit,
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
          onRowAdd: (newTag): Promise<void> =>
            new Promise((resolve) => {
              handleCreate(newTag);
              resolve();
            }),
          onRowUpdate: (newData, oldData): Promise<void> =>
            new Promise((resolve) => {
              handleEdit(newData, oldData);
              resolve();
            }),
          onRowDelete: (oldData): Promise<void> =>
            new Promise((resolve) => {
              handleDelete(oldData);
              resolve();
            }),
          }
        }
        detailPanel={
          (rowData): ReactElement =>
            <ExpenseEntryTable
              currentTag={rowData}
              handleEdit={handleEntryEdit(rowData)}
              updateTotal={updateTotal}
            />
        }
        onRowClick={(event, rowData, togglePanel): void => {
          if(togglePanel) {
            togglePanel();
          }
        }}
      />
    </>
  )
};

export default ExpenseTable;

import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import ColorPickerEditComponent from '../colorPickerEditComponent';
import ColorPickerDialog from "../colorPickerDialog";
import {EditComponentProps} from "material-table";
import {ExpenseTag} from "../../../types";
import expenseTag from "../mockTypes/expenseTag";

jest.mock('../colorPickerDialog');

const mockProp: EditComponentProps<ExpenseTag> = {
  rowData: expenseTag({}),
  value: 1,
  onChange: jest.fn(),
  columnDef: {
    field: 'testField',
    title: 'testTitle',
    tableData: {
      filterValue: 0,
      groupOrder: 0,
      groupSort: 'testSort',
      id: 1,
    }
  }
};

describe('ColorPickerEditComponent', () => {

  afterEach(cleanup);

  test('Should be able to open dialog', () => {
    const { getByLabelText, getByText } = render(<ColorPickerEditComponent props={mockProp} />)
    const button = getByLabelText("edit label color");
    fireEvent.click(button);
    expect('Select tag color').not.toBeFalsy();
  });
});
import React from 'react';
import {cleanup, fireEvent, render, wait} from '@testing-library/react';
import ColorPickerEditComponent from '../colorPickerEditComponent';
import {EditComponentProps} from "material-table";
import {ExpenseTag} from "../../../types";
import expenseTag from "../mockTypes/expenseTag";


describe('ColorPickerEditComponent', () => {
  const mockProp: EditComponentProps<ExpenseTag> = {
    rowData: expenseTag({}),
    value: 1,
    onChange: jest.fn().mockImplementation((val: string) => {
      console.log('pressed');
      console.log(val);
    }),
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

  afterEach(cleanup);


  test('Should be able to open and close dialog', () => {
    const {getByLabelText, getByText} = render(<ColorPickerEditComponent props={mockProp}/>);
    const button = getByLabelText("edit label color");
    fireEvent.click(button);
    expect(getByText('Select tag color')).not.toBeFalsy();
  });
  //
  // test('Should be able to select a color',  async () => {
  //   const mockProp2: EditComponentProps<ExpenseTag> = {
  //     rowData: expenseTag({}),
  //     value: 1,
  //     onChange: jest.fn((val: string) => {
  //       console.log('pressed');
  //       console.log(val);
  //     }),
  //     columnDef: {
  //       field: 'testField',
  //       title: 'testTitle',
  //       tableData: {
  //         filterValue: 0,
  //         groupOrder: 0,
  //         groupSort: 'testSort',
  //         id: 1,
  //       }
  //     }
  //   };
  //
  //
  //   const {getByLabelText, debug, getByTitle, getByText } = render(<ColorPickerEditComponent props={mockProp2}/>);
  //
  //   const button = getByLabelText("edit label color");
  //   const testColor = '#f44336';
  //
  //   fireEvent.click(button);
  //   const colorButton = getByText('color button');
  //
  //   fireEvent.click(colorButton
  //   );
  //
  //   await wait();
  //   debug();
  //
  //   expect(mockProp2.onChange).toBeCalledTimes(1);
  //   expect(mockProp2.onChange).lastCalledWith(testColor);
  // });
});
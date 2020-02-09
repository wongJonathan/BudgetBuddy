import React from 'react';
import {cleanup, fireEvent, render, wait} from '@testing-library/react';
import axios from 'axios';

import {ExpenseTag} from "../../../types";
import expenseTag from "../mockTypes/expenseTag";
import expenseEntry from "../mockTypes/expenseEntry";
import ExpenseEntryTable from "../expenseEntryTable";


jest.mock('axios');

beforeEach(cleanup);

describe('Expense Entry Table', () => {

  test('Should display entries on table', () => {
    const mockExpenses = [expenseEntry({})];
    const mockTag: ExpenseTag = expenseTag({expenses: mockExpenses});
    const mockEdit = jest.fn();
    const mockUpdateTotal = jest.fn();

    const { getByText } = render(
      <ExpenseEntryTable
        currentTag={mockTag}
        handleEdit={mockEdit}
        updateTotal={mockUpdateTotal}
      />
    );

    expect(getByText('entry1')).not.toBeFalsy();
  });

  test('Should be able to create an entry', async () => {
    const mockTag: ExpenseTag = expenseTag({});
    const mockEdit = jest.fn();
    const mockUpdateTotal = jest.fn();

    axios.post.mockImplementationOnce(() => (
      Promise.resolve({
        data: {
          expenseName: 'new entry',
          value: 1,
          payPeriodType: 1,
        },
        status: 201
      })
    ));

    const { getByPlaceholderText, getByText, getByLabelText } = render(
      <ExpenseEntryTable
        currentTag={mockTag}
        handleEdit={mockEdit}
        updateTotal={mockUpdateTotal}
      />
    );

    const addButton = getByText('add_box');

    fireEvent.click(addButton);

    const tagName = getByPlaceholderText('Name');
    const costInput = getByLabelText('cost-input');
    const saveButton = getByText('check');

    fireEvent.change(tagName, { target: { value: 'new entry'}});
    fireEvent.change(costInput, { target: { value: 1 }});
    fireEvent.click(saveButton);

    await wait();

    expect(mockUpdateTotal).toBeCalledWith(1, 1);
    expect(getByText('new entry')).not.toBeFalsy();
    expect(getByText('1')).not.toBeFalsy();
    expect(getByText('Year')).not.toBeFalsy();
  });

  test('Should be able to edit an entry', async () => {
    // const mockExpenses = [expenseEntry({})];
    // const mockTag: ExpenseTag = expenseTag({expenses: mockExpenses});
    // const mockEdit = jest.fn();
    // const mockUpdateTotal = jest.fn();
    //
    // const { getByText, getByPlaceholderText } = render(
    //   <ExpenseEntryTable
    //     currentTag={mockTag}
    //     handleEdit={mockEdit}
    //     updateTotal={mockUpdateTotal}
    //   />
    // );
    //
    // const editButton = getByText('edit');
    //
    // fireEvent.click(editButton);
    //
    // const tagName = getByPlaceholderText('Name');
    // const saveButton = getByText('check');
    //
    // fireEvent.change(tagName, { target: { value: 'edit entry'}});
    //
    // await wait();

  });

  test('Should be able to delete an entry', () => {});
});
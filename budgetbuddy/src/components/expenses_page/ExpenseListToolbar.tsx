import React, {ReactElement, useState} from "react";
import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import CompareIcon from '@material-ui/icons/Compare';
import DeleteIcon from '@material-ui/icons/Delete';


interface ExpenseListToolbar {
  handleCheckbox: (checkboxValue: string) => void;
  checkboxValue: string;
}

const ExpenseListToolBar = ({checkboxValue, handleCheckbox}: ExpenseListToolbar): ReactElement => {

  const handleToggle = () => {
    switch(checkboxValue) {
      case 'checked':
        handleCheckbox('none');
        break;
      case 'indeterminate':
        handleCheckbox('checked');
        break;
      case 'none':
        handleCheckbox('checked');
      break;
    }
  };

  return (
    <ListItem key="Toolbar">
      <ListItemSecondaryAction>
        {
          checkboxValue !== 'none' && (
            <>
              <CompareIcon />
              <DeleteIcon />
            </>
          )
        }
        <Checkbox
          edge="end"
          onChange={handleToggle}
          indeterminate={checkboxValue === 'indeterminate'}
          checked={checkboxValue === 'checked'}
        />
      </ListItemSecondaryAction>
    </ListItem>
  )
};

export default ExpenseListToolBar;
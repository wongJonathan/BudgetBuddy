import React, {ReactElement, useRef, useState, useCallback, useMemo, useEffect} from 'react';
import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import LensIcon from '@material-ui/icons/Lens';


interface ExpenseListItemProps {
  key: string;
  tagName: string;
  total: number;
  color: string;
  checked: boolean;
  handleCheckbox: (selected: boolean) => void;
}

const ExpenseListItem = (
  {
    key,
    tagName,
    total,
    color,
    checked,
    handleCheckbox
  }: ExpenseListItemProps
): ReactElement => {
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handleCheckbox(event.target.checked);
  };

  return (
    <ListItem key={key}>
      <ListItemIcon>
        <LensIcon style={{color: '#008000'}}/>
      </ListItemIcon>
      <ListItemText
        primary={tagName}
        secondary={`$${total}`}
      />
      <ListItemSecondaryAction>
        <Checkbox
          edge="end"
          onChange={handleToggle}
          checked={checked}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ExpenseListItem;

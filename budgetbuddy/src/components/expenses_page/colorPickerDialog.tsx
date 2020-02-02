import React, {ReactElement, useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
   makeStyles,
} from '@material-ui/core';
import {CirclePicker, ColorResult} from 'react-color';
import {DialogProps} from "@material-ui/core/Dialog";


interface ColorPickerDialog {
  props: DialogProps;
  selectPicker: (colorCode: string) => void;
}

const useStyle = makeStyles(theme => ({
  colorPicker: {
    paddingBottom: theme.spacing(2),
    overflow: 'hidden',
  },
}));

const ColorPickerDialog = ({props, selectPicker}: ColorPickerDialog): ReactElement => {
  const classes = useStyle();

  const handleCreate = (color: ColorResult): void => {
    selectPicker(color.hex);
  };

  return (
    <Dialog
      {...props}
    >
      <DialogTitle>
        Select tag color
      </DialogTitle>
      <DialogContent className={classes.colorPicker}>
        <CirclePicker onChangeComplete={handleCreate}/>
      </DialogContent>
    </Dialog>
  );
};

export default ColorPickerDialog;
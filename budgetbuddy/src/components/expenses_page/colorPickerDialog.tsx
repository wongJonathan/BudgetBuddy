import React, {ReactElement, useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input, makeStyles, TextField,
} from "@material-ui/core";
import {CirclePicker, ColorResult} from "react-color";


interface ColorPickerDialog {
  selectPicker: (color: string) => void;
  cancel: () => void;
}

const useStyle = makeStyles(theme => ({
  colorPicker: {
    paddingBottom: theme.spacing(2),
    overflow: 'hidden',
  },
}));

const ColorPickerDialog = ({selectPicker, cancel}: ColorPickerDialog): ReactElement => {
  const classes = useStyle();

  const [open, setOpen] = useState(true);
  const [tagName, setTagName] = useState('');
  const [identifier, setIdentifier] = useState('#f44e3b');

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(event.target.value);
  };

  const handleCreate = (color: ColorResult) => {
    selectPicker(color.hex);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onExited={cancel}
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
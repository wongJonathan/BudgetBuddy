import React, {ReactElement, useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input, TextField,
} from "@material-ui/core";
import {TagListItem} from "../../types";


interface AddTagDialogProps {
  createTag: ({tagName, identifier}: TagListItem) => void;
  cancelTag: () => void;
}

const AddTagDialog = ({createTag, cancelTag}: AddTagDialogProps): ReactElement => {
  const [open, setOpen] = useState(true);
  const [tagName, setTagName] = useState('');
  const [identifier, setIdentifier] = useState('#f44e3b');

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(event.target.value);
  };

  const handleCreate = () => {
    createTag({tagName, identifier});

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onExited={cancelTag}
    >
      <DialogTitle>
        Create Expense Key
      </DialogTitle>
      <DialogContent>
        <TextField
          placeholder="Enter Tag Name Here"
          autoFocus
          value={tagName}
          onChange={handleKeyChange}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          color="primary"
          disabled={tagName === ''}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTagDialog;

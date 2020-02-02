import React, {ReactElement, useState} from 'react';
import ColorPickerDialog from './colorPickerDialog';
import {IconButton} from '@material-ui/core';
import LensIcon from '@material-ui/icons/Lens';
import {EditComponentProps} from 'material-table';

interface ColorPickerProps {
  props: EditComponentProps<object>;
}

/**
 * Edit component for the material table label field
 */
const ColorPickerEditComponent = ({props}: ColorPickerProps): ReactElement => {
  const [open, setOpen] = useState(false);

  const selectColor = (color: string): void => {
    props.onChange(color);
    setOpen(false);
  };

  const openColorPicker = (): void => {
    setOpen(true);
  };

  const closeColorPicker = (): void => {
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="edit label color" onClick={openColorPicker} >
        <LensIcon style={{color: props.value}} />
      </IconButton>
      <ColorPickerDialog
        props={{
          open,
          onClose: closeColorPicker,
          onExited: closeColorPicker,
        }}
        selectPicker={selectColor}
      />
    </>
  )
};

export default ColorPickerEditComponent;

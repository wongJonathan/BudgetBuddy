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
  const [colorPickerDialog, setColorPickerDialog] = useState<ReactElement>(<></>);

  const selectColor = (color: string): void => {
    props.onChange(color);
  };

  const closeColorPicker = (): void => {
    setColorPickerDialog(<></>);
  };

  const openColorPicker = (): void => {
    setColorPickerDialog(<ColorPickerDialog selectPicker={selectColor} cancel={closeColorPicker}/>)
  };

  return (
    <>
      <IconButton onClick={openColorPicker} >
        <LensIcon style={{color: props.value}} />
      </IconButton>
      { colorPickerDialog }
    </>
  )
};

export default ColorPickerEditComponent;
import React, {ReactElement, useState} from "react";
import ColorPickerDialog from "./colorPickerDialog";
import {IconButton} from "@material-ui/core";
import LensIcon from "@material-ui/icons/Lens";
import {EditComponentProps} from "material-table";

interface colorPickerProps {
  props: EditComponentProps<object>;
}

const ColorPickerEditComponent = ({props}: colorPickerProps): ReactElement => {
  const [colorPickerDialog, setColorPickerDialog] = useState<ReactElement>(<></>);

  const selectColor = (color: string) => {
    props.onChange(color);
  };

  const closeColorPicker = () => {
    setColorPickerDialog(<></>);
  };

  const openColorPicker = () => {
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
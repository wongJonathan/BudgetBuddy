import React, {ReactElement, useState} from "react";


const ColorPickerDialog = jest.fn().mockImplementation(() => (
  <div>
    Select tag color
  </div>
));

export default ColorPickerDialog;
import * as React from "react";
import {ColorResult} from "react-color";
import {Button} from "@material-ui/core";


const colorResult: ColorResult = {
  hex: 'selected color',
  hsl: {
    h: 0,
    l: 0,
    s: 0,
  },
  rgb: {
    r: 0,
    g: 0,
    b: 0,
  }
};

const CirclePicker = jest.fn().mockImplementation((onChangeComplete: (color: ColorResult) => void) => (
  <Button onClick={() => onChangeComplete(colorResult)}>
    color button
  </Button>
));



export default CirclePicker;
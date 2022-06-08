import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Component } from "react";

class Controls extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.minorSwitchHandler = props.minorSwitchHandler;
    this.majorSwitchHandler = props.majorSwitchHandler;
  }

  render() {
    return (
      <Box>
        <FormGroup>
          <FormControlLabel
            className={"jankCenter"}
            control={
              <Switch defaultChecked onChange={this.majorSwitchHandler} />
            }
            label="Major scale"
          />
          <FormControlLabel
            className={"jankCenter"}
            control={<Switch onChange={this.minorSwitchHandler} />}
            label="Minor scale"
          />
        </FormGroup>
      </Box>
    );
  }
}

export default Controls;

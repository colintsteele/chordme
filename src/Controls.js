import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Component } from "react";

class Controls extends Component {
  constructor(props) {
    super(props);

    this.minorSwitchHandler = props.minorSwitchHandler;
    this.majorSwitchHandler = props.majorSwitchHandler;
    this.quizSwitchHandler = props.quizSwitchHandler;
  }

  render() {
    return (
      <Box p={1} display="flex" justifyContent="center">
        <Box>
          <FormGroup>
            <FormControlLabel
              className={"jankCenter"}
              control={
                <Switch
                  name="major"
                  defaultChecked
                  onChange={this.majorSwitchHandler}
                />
              }
              label="Major scale"
            />
            <FormControlLabel
              className={"jankCenter"}
              control={
                <Switch name="minor" onChange={this.minorSwitchHandler} />
              }
              label="Minor scale"
            />
          </FormGroup>
        </Box>
        <Box>
          <FormGroup>
            <FormControlLabel
              label="Quiz Mode"
              onChange={this.quizSwitchHandler}
              control={<Switch defaultChecked />}
            />
          </FormGroup>
        </Box>
      </Box>
    );
  }
}

export default Controls;

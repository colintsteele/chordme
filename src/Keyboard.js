import "./App.css";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "./Theory";
import Controls from "./Controls";
import { randomChord, randomNote } from "./Theory";
import { Component } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

class Keyboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chord: props.chord,
      minorScaleEnabled: props.minorScaleEnabled,
      majorScaleEnabled: props.majorScaleEnabled,
    };
  }

  minorSwitchHandler = (event) => {
    console.log(event.target.checked);
    this.setState({ minorScaleEnabled: event.target.checked });
  };

  majorSwitchHandler = (event) => {
    console.log(event.target.checked);
    this.setState({ majorScaleEnabled: event.target.checked });
  };

  scaleSwitches() {
    return (
      <Box>
        <FormGroup alignItems="center">
          <FormControlLabel
            control={
              <Switch
                checked={this.state.majorScaleEnabled}
                onChange={this.majorSwitchHandler}
              />
            }
            label="Major scale"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.minorScaleEnabled}
                onChange={this.minorSwitchHandler}
              />
            }
            label="Minor scale"
          />
        </FormGroup>
      </Box>
    );
  }

  setKeys(chord) {
    if (chord.name == this.state.chord.name) {
      var note2 = randomNote();
      var chord = randomChord(note2, "major", 12);
    }
    this.setState({ chord: chord });
  }

  piano() {
    var firstNote = MidiNumbers.fromNote("c0"); //48
    var lastNote = MidiNumbers.fromNote("b1"); //71
    var keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: firstNote,
      lastNote: lastNote,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    return (
      <Piano
        activeNotes={this.state.chord.notes}
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber) => {
          // Play a given note - see notes below
        }}
        stopNote={(midiNumber) => {
          // Stop playing a given note - see notes below
        }}
        width={1000}
        keyboardShortcuts={keyboardShortcuts}
      />
    );
  }

  boxProps() {
    return {
      display: "flex",
      justify: "center",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "2vh",
    };
  }

  chipProps() {
    return {
      fontWeight: "bold",
      fontWeight: "20px",
      size: "large",
      color: "primary",
    };
  }

  render() {
    var note2 = randomNote();
    var chord2 = randomChord(note2, "major", 12);

    return (
      <Container display="flex">
        <Box display="flex" justifyContent="center">
          <Chip {...this.chipProps()} label={`${this.state.chord.name}`} />
        </Box>
        <Box {...this.boxProps}>
          <Controls
            minorSwitchHandler={this.minorSwitchHandler}
            majorSwitchHandler={this.majorSwitchHandler}
          />
        </Box>
        <Box>{this.piano()}</Box>
        <Box {...this.boxProps()}>
          <Button
            variant="contained"
            gap={2}
            onClick={() => {
              this.setKeys(chord2);
            }}
          >
            Chord me!
          </Button>
        </Box>
      </Container>
    );
  }
}

export default Keyboard;

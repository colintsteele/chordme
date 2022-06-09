import "./App.css";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "./Theory";
import Controls from "./Controls";
import { midiToNote, randomChord, randomNote, sample } from "./Theory";
import { Component } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Soundfont from "soundfont-player";
import Switch from "@mui/material/Switch";

class Keyboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chord: props.chord,
      minorScaleEnabled: props.minorScaleEnabled,
      majorScaleEnabled: props.majorScaleEnabled,
      scalesEnabled: ["major"],
      soundOn: false,
    };
  }

  powerButtonHandler = (_event, onOff) => {
    this.setState({ soundOn: onOff });
  };

  switchHandler = (event, onOff) => {
    console.log(event.target.name);
    var newScalesEnabled = this.state.scalesEnabled;

    if (onOff) {
      if (!this.state.scalesEnabled.includes(event.target.name)) {
        newScalesEnabled.push(event.target.name);
        this.setState({ scalesEnabled: newScalesEnabled });
      }
    } else {
      if (this.state.scalesEnabled.includes(event.target.name)) {
        newScalesEnabled = this.state.scalesEnabled.filter(function (item) {
          return item !== event.target.name;
        });
        this.setState({ scalesEnabled: newScalesEnabled });
      }
    }
  };

  setKeys(chord) {
    if (chord.name === this.state.chord.name) {
      var note2 = randomNote();
      var newChord = randomChord(note2, "major", 12);
    }
    this.setState({ chord: newChord || chord });
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
          if (!this.state.soundOn) {
            return null;
          }
          Soundfont.instrument(new AudioContext(), "acoustic_grand_piano").then(
            function (piano) {
              piano.play(midiToNote(midiNumber));
            }
          );
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
      size: "large",
      color: "primary",
    };
  }

  render() {
    var note2 = randomNote();
    var chord2 = randomChord(note2, sample(this.state.scalesEnabled)[0], 12);

    return (
      <Container display="flex">
        <Box display="flex" justifyContent="center">
          <Chip {...this.chipProps()} label={`${this.state.chord.name}`} />
        </Box>
        <Box {...this.boxProps}>
          <Controls
            minorSwitchHandler={this.switchHandler}
            majorSwitchHandler={this.switchHandler}
          />
        </Box>
        <Box sx={{ display: "inline-flex" }}>
          {this.piano()} <Switch onChange={this.powerButtonHandler} />
          {"Sound On"}
        </Box>
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

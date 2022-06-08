import "./App.css";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "./Theory";
import { randomChord, randomNote } from "./Theory";
import { Component } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";

class Keyboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chord: props.chord,
    };
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

  render() {
    var note2 = randomNote();
    var chord2 = randomChord(note2, "major", 12);

    return (
      <Container
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="2vh"
        >
          <Chip
            fontWeight="bold"
            fontWeight="20px"
            size="large"
            label={`${this.state.chord.name}`}
            color="primary"
          />
        </Box>
        <Box>{this.piano()}</Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="10vh"
        >
          <Button
            variant="contained"
            onClick={() => {
              this.setKeys(chord2);
            }}
          >
            HI MOM
          </Button>
        </Box>
      </Container>
    );
  }
}

export default Keyboard;

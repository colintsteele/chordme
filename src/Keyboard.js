import "./App.css";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "./Theory";
import { randomChord, randomNote } from "./Theory";
import { Component } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

class Keyboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNotes: props.activeNotes,
    };
  }

  setKeys(keys) {
    console.log("setKeys called");
    console.log(this.state.activeNotes);
    this.setState({ activeNotes: keys });
  }

  render() {
    const firstNote = MidiNumbers.fromNote("c0"); //48
    const lastNote = MidiNumbers.fromNote("b1"); //71
    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: firstNote,
      lastNote: lastNote,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    var note = randomNote();
    var chord = randomChord(note, "major", 12);

    var note2 = randomNote();
    var chord2 = randomChord(note2, "major", 12);

    console.log(`active notes ${this.state.activeNotes}`);

    return (
      <Container
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box>
          <Piano
            activeNotes={this.state.activeNotes}
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
        </Box>
        <Box
          justifyContent="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="10vh"
        >
          <Button
            variant="contained"
            onClick={() => {
              this.setKeys(chord2.notes);
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

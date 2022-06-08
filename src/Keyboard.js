import "./App.css";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "./Theory";
import { randomChord, randomNote } from "./Theory";
import { Component } from "react";

class Keyboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNotes: props.activeNotes,
    };
  }

  setKeys(keys) {
    console.log("setKeys called");
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
      <div>
        <Piano
          // activeNotes={this.props.activeNotes}
          activeNotes={[...chord["notes"]]}
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
        <button
          onClick={() => {
            // console.log(chord2.notes);
            this.setKeys(chord2.notes);
          }}
        >
          HI MOM
        </button>
      </div>
    );
  }
}

export default Keyboard;

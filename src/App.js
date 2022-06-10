import "./App.css";
import { Piano, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "./Theory";
import { randomChord, randomNote } from "./Theory";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    var firstNote = MidiNumbers.fromNote("c0"); //48
    var lastNote = MidiNumbers.fromNote("b1"); //71
    var note = randomNote();
    var chord = randomChord(note, "major", 12);

    this.state = {
      activeNotes: [...chord["notes"]],
      noteRange: { first: firstNote, last: lastNote },
    };
  }

  renderApp() {
    return (
      <Piano
        activeNotes={this.props.activeNotes}
        noteRange={this.props.noteRange}
        playNote={(midiNumber) => {
          // Play a given note - see notes below
        }}
        stopNote={(midiNumber) => {
          // Stop playing a given note - see notes below
        }}
        width={1000}
        keyboardShortcuts={this.props.keyboardShortcuts}
      />
    );
  }
}

// function App() {
//   const firstNote = MidiNumbers.fromNote("c0"); //48
//   const lastNote = MidiNumbers.fromNote("b1"); //71
//   const keyboardShortcuts = KeyboardShortcuts.create({
//     firstNote: firstNote,
//     lastNote: lastNote,
//     keyboardConfig: KeyboardShortcuts.HOME_ROW,
//   });

//   var note = randomNote();
//   var chord = randomChord(note, "major", 12);
//   console.log(chord["root"]["note"]);
//   console.log(chord["notes"]);

//   return (
//     <Piano
//       activeNotes={[...chord["notes"]]}
//       noteRange={{ first: firstNote, last: lastNote }}
//       playNote={(midiNumber) => {
//         // Play a given note - see notes below
//       }}
//       stopNote={(midiNumber) => {
//         // Stop playing a given note - see notes below
//       }}
//       width={1000}
//       keyboardShortcuts={keyboardShortcuts}
//     />
//   );
// }

export default App;

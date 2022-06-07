import logo from "./logo.svg";
import "./App.css";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "./Theory";

function App() {
  const firstNote = MidiNumbers.fromNote("c3"); //48
  const lastNote = MidiNumbers.fromNote("b4"); //71
  const notes = {};
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  //console.log(sample(twoOctave)); sample might work in es6

  return (
    <Piano
      activeNotes={[48, 71]}
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

export default App;

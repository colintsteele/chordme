import "./App.css";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "./Theory";
import Controls from "./Controls";
import { midiToNote, randomChord, randomNote, randomScale, sample } from "./Theory";
import { Component } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Soundfont from "soundfont-player";
import Switch from "@mui/material/Switch";
import audio from "./Ding-sound-effect.mp3";
import MidiController from "./MidiController";

class Keyboard extends Component {
  pressedKeysvar = [];

  constructor(props) {
    super(props);

    this.state = {
      objective: props.chord,
      chord: props.chord,
      nextChord: props.nextChord,
      nextObjective: props.nextChord,
      // activeNotes: props.chord.notes,
      activeNotes: [],
      minorScaleEnabled: props.minorScaleEnabled,
      majorScaleEnabled: props.majorScaleEnabled,
      scalesEnabled: ["major"],
      soundOn: false,
      quizMode: true,
      quizTime: 2,
      // pressedKeys: [],
      objectiveMet: false,
    };
  }

  componentDidMount() {
    new MidiController(this.midiMessageHandler.bind(this));
  }

  // Handlers

  midiMessageHandler = (event, onOff, midiNote, velocity) => {

    var [pressOn, midiNumber, _something] = [...event.data];

    // if (pressOn == 144) {
    if (onOff) {
      this.addActiveNote(midiNumber - 36);
    } else {
      this.removeActiveNote(midiNumber - 36);
    }
  };

  powerButtonHandler = (_event, onOff) => {
    this.setState({ soundOn: onOff });
  };

  scaleSwitchHandler = (event, onOff) => {
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

  quizSwitchHandler = (_event, onOff) => {
    this.setState({ quizMode: onOff });
  };

  // State changing/checking wrappers

  changeChord(chord) {
    this.setState({ objectiveMet: false });
    this.setKeys(this.state.nextObjective);
    this.setActiveNotes([]);

    if (this.state.quizMode) {
      this.setState({ activeNotes: [] });
    } else {
      this.setActiveNotes(chord);
    }
  }

  checkSuccess() {
    var pk = this.pressedKeysvar.map((n) => {
      return n.slice(0, -1);
    });
    var objectiveNumbers = this.state.objective.notes;
    var objectiveNotes = objectiveNumbers.map((n) => {
      return midiToNote(n).slice(0, -1);
    });

    if (JSON.stringify(pk.sort()) === JSON.stringify(objectiveNotes.sort())) {
      this.setState({ objectiveMet: true });
      new Audio(audio).play();

      setTimeout(() => {
        this.setState({ objectiveMet: false });
        this.changeChord(this.state.nextObjective);
      }, this.state.quizTime * 1_000);
    }
  }

  press(note, onOff) {
    if (onOff) {
      this.pressedKeysvar = [...this.pressedKeysvar, note];
      this.checkSuccess();
    } else {
      this.pressedKeysvar = this.removeElement(this.pressedKeysvar, note);
    }
  }

  setKeys(chord) {
    var note = randomNote();
    var newChord = randomChord(note, sample(this.state.scalesEnabled)[0], 12);
    var newObjective = randomScale(note, sample(this.state.scalesEnabled)[0], 12);

    if (newChord.name === chord) {
      var newNote = randomNote();
      newChord = randomChord(newNote, sample(this.state.scalesEnabled)[0], 12);
    }

    this.setState({ objective: chord, nextObjective: newObjective });
  }

  addActiveNote(midiNumber) {
    this.setState({ activeNotes: [...this.state.activeNotes, midiNumber] });
  }

  removeActiveNote(midiNumber) {
    this.setState({
      activeNotes: this.removeElement(this.state.activeNotes, midiNumber),
    });
  }

  setActiveNotes(chord) {
    this.setState({ activeNotes: chord.notes });
  }

  // helpers
  removeElement = (array, element) => {
    return array.filter(function (item) {
      return item !== element;
    });
  };

  piano() {
    // var firstNote = MidiNumbers.fromNote("c0"); //48
    // var lastNote = MidiNumbers.fromNote("b1"); //71
    var firstNote = MidiNumbers.fromNote("F0"); //43
    var lastNote = MidiNumbers.fromNote("E2"); //66

    var keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: firstNote,
      lastNote: lastNote,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    return (
      <Piano
        activeNotes={this.state.activeNotes}
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber) => {
          this.press(midiToNote(midiNumber), true);

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
          this.press(midiToNote(midiNumber), false);
        }}
        width={1000}
        keyboardShortcuts={keyboardShortcuts}
      />
    );
  }

  boxProps() {
    return {
      display: "flex",
      p: 4,
      justify: "center",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "2vh",
    };
  }

  chipProps() {
    return {
      fontWeight: "bold",
      justify: "center",
      size: "large",
      color: "primary",
    };
  }

  render() {
    return (
      <Container display="flex">
        {/* Chord/Scale name chips */}
        <Box display="flex" justify-center justifyContent="center">
          <Box p={1}>
            <Chip
              p={2}
              size="medium"
              {...this.chipProps()}
              color={this.state.objectiveMet ? "success" : "primary"}
              // label={`${this.state.chord.name}`}
              label={`${this.state.objective.name} ${this.state.objective.type}`}
            />
          </Box>
          <Box p={1}>
            <Chip
              p={2}
              size="small"
              {...this.chipProps()}
              disabled
              label={`${this.state.nextObjective.name} ${this.state.nextObjective.type}`}
            />
          </Box>
        </Box>
        {/* Controls */}
        <Box {...this.boxProps}>
          <Controls
            minorSwitchHandler={this.scaleSwitchHandler}
            majorSwitchHandler={this.scaleSwitchHandler}
            quizSwitchHandler={this.quizSwitchHandler}
          />
        </Box>
        {/* Keyboard */}
        <Box sx={{ display: "inline-flex" }}>
          <Box>{this.piano()}</Box>
          <Box display="inline-flex" alignItems="center">
            <Switch onChange={this.powerButtonHandler} color="error" />
            {"Sound On"}
          </Box>
        </Box>
        <Box {...this.boxProps()}>
          <Button
            variant="contained"
            onClick={() => {
              // this.setKeys(this.state.nextChord);
              this.changeChord(this.state.nextChord);
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

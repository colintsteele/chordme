class MidiController {
  constructor(midiMessageHandler) {
    if (navigator.requestMIDIAccess) {
      //   navigator.requestMIDIAccess().then(this.success, this.failure);
      navigator.requestMIDIAccess().then(
        (midiAccess) => {
          var inputs = midiAccess.inputs;

          inputs.forEach((input) => {
            input.onmidimessage = midiMessageHandler;
          });
          return true;
        },
        () => {
          return console.log("midi access failure");
        }
      );
    }
  }

  success(midiAccess) {
    midiAccess.addEventListener("statechange", updateDevices);

    var inputs = midiAccess.inputs;

    inputs.forEach((input) => {
      input.onmidimessage = handleMidiMessage;
    });
  }

  updateDevices(event) {
    console.log(event);
  }

  failure() {
    console.log("midi request failed");
  }
}

function updateDevices(event) {
  console.log(`port: ${event.port.name}, brand: ${event.port.manufacturer}`);
}

function handleMidiMessage(event) {
  var [pressOn, midiNumber, _something] = [...event.data];

  console.log(pressOn);
  console.log(midiNumber);
}

export default MidiController;

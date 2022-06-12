class MidiController {
  constructor(midiMessageHandler) {
    const deviceValues = {
      default: { on: 1 },
      "OP-1 Midi Device": { on: 144 },
    };

    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(
        (midiAccess) => {
          var inputs = midiAccess.inputs;

          inputs.forEach((input) => {
            input.onmidimessage = function (event) {
              var deviceKey, onOff, midiNote, velocity;

              if (Object.keys(deviceValues).includes(event.target.name)) {
                deviceKey = event.target.name;
              } else {
                deviceKey = "default";
              }

              onOff = deviceValues[deviceKey].on === event.data[0];
              midiNote = event.data[1];
              velocity = event.data[2];

              midiMessageHandler(event, onOff, midiNote, velocity);
            };
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
      input.onmidimessage = function (event) {
        console.log(event);
      };

      //   input.onmidimessage = handleMidiMessage;
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

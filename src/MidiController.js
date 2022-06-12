class MidiController {
  constructor(midiMessageHandler) {
    // this object is required because different midi devices define
    // data for 'keypress' events differently
    const deviceValues = {
      default: { on: 1 },
      "OP-1 Midi Device": { on: 144 },
      "Arturia KeyLab Essential 49": { on: 144 },
    };

    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(
        (midiAccess) => {
          var inputs = midiAccess.inputs;

          console.log(inputs)
          inputs.forEach((input) => {
            input.onmidimessage = function (event) {
              var deviceKey, onOff, midiNote, velocity;

              if (Object.keys(deviceValues).includes(event.target.name)) {
                deviceKey = event.target.name;
              } else {
                deviceKey = "default";
              }

              console.log(deviceValues[deviceKey].on)
              console.log(`device on: ${deviceValues[deviceKey].on}, midiData0: ${event.data[0]}`)
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
    console.log('end of MidiController constructor')
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

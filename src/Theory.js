export const octave = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

export const scales = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 6, 7, 9],
};

export const twoOctaves = [...octave, ...octave];

export const chords = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  major7: [0, 4, 7, 11],
  minor7: [0, 3, 7, 10],
};

export function sample(list) {
  var i = Math.floor(Math.random() * list.length);
  return [list[i], i];
}

export function randomNote() {
  var note = sample(octave);
  return {
    note: note[0],
    index: note[1],
  };
}

export function midiToNote(midiNumber) {
  var num = midiNumber % 24;
  var octave = num > 11 ? 3 : 4;
  return `${twoOctaves[num]}${octave}`;
}

export function randomScale(root, scale, offset) {
  var notes = scales[scale].map(function (i) {
    return i + root["index"] + offset;
  })

  var name = `${root.note} ${scale} scale`
  return { root: root, notes: notes, name: name, type: 'scale' };
}

export function randomChord(root, scale, offset) {
  var notes = chords[scale].map(function (i) {
    return i + root["index"] + offset;
  });

  var name = `${root.note} ${scale}`;

  return { root: root, notes: notes, name: name, type: 'chord' };
}

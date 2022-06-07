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
export const twoOctaves = [...octave, ...octave];

// export const twoOctave = {
//   C: 48,
//   Db: 49,
//   D: 50,
//   Eb: 51,
//   E: 52,
//   F: 53,
//   Gb: 54,
//   G: 55,
//   Ab: 56,
//   A: 57,
//   Bb: 58,
//   B: 59,
//   C: 60,
//   Db: 61,
//   D: 62,
//   Eb: 63,
//   E: 64,
//   F: 65,
//   Gb: 66,
//   G: 67,
//   Ab: 68,
//   A: 69,
//   Bb: 70,
//   B: 57,
// };

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

export function randomChord(root, scale, offset) {
  var notes = chords[scale].map(function (i) {
    return i + root["index"] + offset;
  });

  return { root: root, notes: notes };
}

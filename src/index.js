import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Keyboard from "./Keyboard";
import Circle from "./Circle";
import reportWebVitals from "./reportWebVitals";
import { randomChord, randomNote } from "./Theory";
import Container from "@mui/material/Container";

const firstChords = () => {
  var firstChord = randomChord(randomNote(), "major", 12);
  var secondChord = randomChord(randomNote(), "major", 12);

  while (firstChord.name === secondChord.name) {
    secondChord = randomChord(randomNote(), "major", 12);
  }

  return [firstChord, secondChord];
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Container>
      <Circle />
      <Keyboard chord={firstChords()[0]} nextChord={firstChords()[1]} />
    </Container>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

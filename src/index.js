import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Keyboard from "./Keyboard";
import Circle from "./Circle";
import reportWebVitals from "./reportWebVitals";
import { randomChord, randomNote } from "./Theory";
import Container from "@mui/material/Container"

var note = randomNote();
var chord = randomChord(note, "major", 12);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Container>
      <Circle />
      <Keyboard chord={chord} />
    </Container>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

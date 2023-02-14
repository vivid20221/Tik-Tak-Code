import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
//import NavBar from "./NavBar";

const root = createRoot(document.querySelector("#root"));

root.render(<App />);

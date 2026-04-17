import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);

//This act as a entry point of react app.
//It connects my react app to index.html file and renders my App component inside root div of index.html file.

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// window.addEventListener("DOMContentLoaded", () => {
//   const root = document.getElementById("workflow-root");

//   if (root) {
//     ReactDOM.createRoot(root).render(<App />);
//   }
// });

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const el =
  document.getElementById("workflow-root") || 
  document.getElementById("root");

if (el) {
  ReactDOM.createRoot(el).render(<App />);
}
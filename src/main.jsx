import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MasterProvider from "./Providers/index.jsx";
import App from "./App.jsx";

import "./assets/css/_default.css";
import "react-phone-input-2/lib/material.css";
import 'react-quill/dist/quill.snow.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <MasterProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MasterProvider>
);

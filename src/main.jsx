import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MasterProvider from "./Providers/index.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MasterProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MasterProvider>
);

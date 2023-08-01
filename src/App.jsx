import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FinalContextProvider from "./Context/FinalContext";
import Router from "./Router";
import Private from "./Components/Private";
import theme from "./Theme";

import "./assets/css/_default.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FinalContextProvider>
        <Private>
          <Router />
        </Private>
      </FinalContextProvider>
    </ThemeProvider>
  );
}

export default App;

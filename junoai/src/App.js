import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HeyJuno from "./pages/HeyJuno.tsx";

const theme = createTheme();

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <HeyJuno />
      </ThemeProvider>
    </div>
  );
};

export default App;

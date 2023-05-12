import "./App.css";
import Layout from "./layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </>
  );
}

export default App;

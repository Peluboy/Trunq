import "./App.css";
import Layout from "./layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import QrCodeProvider from "./contexts/QrCodeProvider";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <QrCodeProvider>
          <Layout />
        </QrCodeProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

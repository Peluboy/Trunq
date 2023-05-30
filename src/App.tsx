import "./App.css";
import Layout from "./layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import QrCodeProvider from "./contexts/QrCodeProvider";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <ErrorBoundary>
        <HelmetProvider>
          <ThemeProvider theme={theme}>
            <QrCodeProvider>
              <Layout />
            </QrCodeProvider>
          </ThemeProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;

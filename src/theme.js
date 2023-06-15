import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    mode: "light", // Set the default mode to light
    primary: {
      main: "#1463FF",
    },
    secondary: {
      main: "#fff",
    },
    info: {
      main: "#1D2A36",
    },
    success: {
      main: "#a1a1a1",
    },
    // Update the colors for dark mode
    dark: {
      primary: {
        main: "#FF6F00", // Update the primary color for dark mode
      },
      secondary: {
        main: "#212121", // Update the secondary color for dark mode
      },
      info: {
        main: "#E0E0E0", // Update the info color for dark mode
      },
      success: {
        main: "#757575", // Update the success color for dark mode
      },
    },
  },
  typography: {
    // Typography styles remain the same
    h1: {
      color: "#1D2A36",
      fontFamily: "Stagnan, sans-serif",
    },
    h2: {
      color: "#1D2A36",
      fontWeight: 700,
      fontFamily: "Stagnan, sans-serif",
    },
    h3: {
      color: "#1D2A36",
      textTransform: "uppercase",
      fontFamily: "Stagnan, sans-serif",
    },
    h4: {
      color: "#1D2A36",
      fontFamily: "Stagnan, sans-serif",
      fontWeight: 600,
    },
    h5: {
      textTransform: "capitalize",
      fontWeight: 600,
      fontFamily: "Stagnan, sans-serif",
      color: "#1D2A36",
    },
    h6: {
      textTransform: "lowercase",
      fontWeight: 400,
      color: "#767676",
      fontSize: "13px",
    },
    body2: {
      color: "#a1a1a1",
      fontSize: "14px",
      fontWeight: 400,
    },
    body1: {
      color: "#d0d0d0",
      fontSize: "12px",
      fontWeight: 400,
      textTransform: "capitalize",
    },
    overline: {
      color: "#767676",
      fontSize: "11px",
      fontWeight: 500,
    },
    button: {
      textTransform: "inherit",
      fontSize: "12px",
      fontWeight: 500,
    },
  },
});

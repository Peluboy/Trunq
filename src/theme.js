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
  },
  typography: {
    // fontFamily: "Stagnan, sans-serif",
    h4: {
      color: "#1D2A36",
      fontWeight: 600,
    },
    h5: {
      textTransform: "capitalize",
      fontWeight: 600,
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
      // textTransform: "capitalize",
    },

    body1: {
      color: "#d0d0d0",
      fontSize: "12px",
      fontWeight: 400,
      textTransform: "caipitalize",
    },

    overline: {
      color: "#767676",
      fontSize: "11px",
      fontWeight: 500,
    },
    button: {
      textTransform: "capitalize",
      fontSize: "12px",
      fontWeight: 500,
    },
  },
});

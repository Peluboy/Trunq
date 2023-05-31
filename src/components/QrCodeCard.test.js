import { render, screen, waitFor } from "@testing-library/react";
import QrCodeCard from "./QrCodeCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import { saveAs } from "file-saver";
import userEvent from "@testing-library/user-event";
import * as useQrCodeContext from "../contexts/QrCodeProvider";
import { QrCodeProvider } from "../contexts/QrCodeProvider";

expect.extend({ toBeInTheDocument });

jest.mock("axios", () => ({
  get: jest.fn().mockResolvedValue({
    data: new Blob(),
  }),
}));
jest.mock("file-saver", () => ({
  saveAs: jest.fn(),
}));

describe("QrCodeCard", () => {
  test("generates QR code and allows download", async () => {
    // Mock the context values
    const generateQrCode = jest.fn();
    const setLink = jest.fn();
    const qrCodeResponse = "https://example.com/qrcode.png";
    const loading = false;
    jest.spyOn(useQrCodeContext, "useQrCodeContext").mockReturnValue({
      link: "",
      setLink,
      generateQrCode,
      qrCodeResponse,
      loading,
    });

    // Create a mock theme
    const theme = createTheme({
      breakpoints: {
        up: jest.fn().mockReturnValue(""),
      },
    });

    render(
      <ThemeProvider theme={theme}>
        <QrCodeProvider>
          <QrCodeCard />
        </QrCodeProvider>
      </ThemeProvider>
    );

    const generateButton = screen.getByRole("button", { name: /generate/i });
    userEvent.click(generateButton);

    await waitFor(() => {
      const downloadButton = screen.getByRole("button", {
        name: /download png/i,
      });
      userEvent.click(downloadButton);
    });

    expect(saveAs).toHaveBeenCalledTimes(1);
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), "qrcode.png");
  });
});

import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Barcode from "../assets/images/barcode.png";
import { useQrCodeContext } from "../contexts/QrCodeProvider";
import { saveAs } from "file-saver";
import axios from "axios";

const QrCodeCard = () => {
  const { link, setLink, generateQrCode, qrCodeResponse, loading } =
    useQrCodeContext();

  const [generateButtonDisabled, setGenerateButtonDisabled] = useState(false);

  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  const handleGenerateClick = () => {
    generateQrCode();
    setGenerateButtonDisabled(true);
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleDownloadClick = () => {
    axios
      .get(qrCodeResponse, {
        responseType: "blob",
      })
      .then((response) => {
        saveAs(response.data, "qrcode.png");
      })
      .catch((error) => {
        console.error("Error downloading QR code:", error);
      });
  };

  useEffect(() => {
    setGenerateButtonDisabled(false);
  }, [qrCodeResponse]);

  return (
    <Box width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="#fff"
        borderRadius="8px"
        mb="1rem"
        p={3}
        boxShadow="rgba(0, 0, 0, 0.04) 0px 3px 5px;"
      >
        <Grid container spacing={matches ? 2 : 4}>
          <Grid item xs={12} sm={10} pr={matches ? 6 : 0}>
            <Typography variant="h5" pb={2}>
              Paste your Link
            </Typography>
            <Box display="flex" gap={0.5}>
              <TextField
                fullWidth
                size="small"
                name="longUrl"
                type="text"
                placeholder="https://webinar.online/example?:hgbe123pp"
                value={link}
                onChange={handleLinkChange}
              />
              <Button
                variant="contained"
                disableElevation
                onClick={handleGenerateClick}
                disabled={generateButtonDisabled || loading}
              >
                <Box display="flex" alignItems="center">
                  Generate
                  <Box ml=".5rem">
                    <AiOutlinePlus />
                  </Box>
                </Box>
              </Button>
            </Box>
            <Typography variant="body1" pt={3}>
              Create QR codes easily with our QR Code Generator. Just paste your
              link, click 'Generate,' and get your QR code instantly. Download
              it as a PNG image to use it anywhere you want. Share your links
              effortlessly and connect with your audience in a snap. Try our QR
              Code Generator now!
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              justifyContent="center"
              gap={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <Box pr={5}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {qrCodeResponse ? (
                    <img
                      src={qrCodeResponse}
                      alt="QR Code"
                      className="qrcode"
                    />
                  ) : (
                    <img src={Barcode} alt="Barcode" className="barcode" />
                  )}
                  {qrCodeResponse && (
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={handleDownloadClick}
                    >
                      Download PNG
                    </Button>
                  )}
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default QrCodeCard;

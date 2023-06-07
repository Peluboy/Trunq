import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  useMediaQuery,
  Snackbar,
} from "@mui/material";
import { BsArrowRight } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { nanoid } from "nanoid";

const Shorten = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [longUrl, setLongUrl] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [newLinkToaster, setNewLinkToaster] = useState(false);
  const [longUrlName, setLongUrlName] = useState("");
  const [longUrlDescription, setLongUrlDescription] = useState("");

  const shortenUrl = async () => {
    try {
      const apiKey = "71a22934f225474e94a90447a9203245";
      const domainId = "9fcbd290ea844b8ebb077f2af57c86dd";
      const shortcode = nanoid(6);

      const response = await fetch("https://api.rebrandly.com/v1/links", {
        method: "POST",
        headers: {
          apikey: apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: longUrl,
          domain: { id: domainId },
          slashtag: shortcode,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // const { shortUrl } = data;

        const { shortUrl, destinationName, destinationDescription } = data;

        setShortLink(shortUrl);
        setLongUrlName(destinationName);
        setLongUrlDescription(destinationDescription);

        setShortLink(shortUrl);
      } else {
        console.error("Error shortening URL:", response.statusText);
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortLink);
    setNewLinkToaster(true);
  };

  return (
    <>
      <Snackbar
        open={newLinkToaster}
        onClose={() => setNewLinkToaster(false)}
        autoHideDuration={2000}
        message="Link copied to the clipboard"
      />
      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            gap: "1rem",
            pt: "3rem",
          }}
        >
          <Typography variant="h4" color="white">
            SHORTEN YOUR LINK NOW
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            gap={1}
            justifyContent="flex-end"
            alignItems="center"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Box sx={{ width: { xs: "100%", sm: "500px" }, maxWidth: "500px" }}>
              <TextField
                name="name"
                type="text"
                variant="filled"
                fullWidth
                hiddenLabel
                size="small"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
              />
            </Box>
            <Box sx={{ width: { xs: "50%", sm: "auto" }, maxWidth: "500px" }}>
              <Button
                variant="contained"
                disableElevation
                // size="large"
                onClick={shortenUrl}
              >
                {isMobile ? "Shorten" : "Shorten Url"}{" "}
                <Box ml=".2rem" display="flex" alignItems="center">
                  <BsArrowRight />
                </Box>
              </Button>
            </Box>
          </Box>
        </Box>

        {shortLink && (
          <>
            <Box
              bgcolor="#444E56"
              px={2}
              sx={{
                width: { xs: "100%", sm: "650px" },
                borderRadius: 1,
                ml: "auto",
                mr: { xs: 4, sm: 0 },
                mt: 2,
                py: 1,
              }}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>{shortLink}</Typography>
              <Button size="small" variant="text" onClick={copyToClipboard}>
                Copy
                <Box ml=".5rem" display="flex" alignItems="center">
                  <IoCopyOutline color="#a1a1a1" cursor="pointer" />
                </Box>
              </Button>
            </Box>
            {longUrlName && (
              <Box mt={2}>
                <Typography variant="body1" fontWeight="bold">
                  Preview:
                </Typography>
                <Typography variant="body1">{longUrlName}</Typography>
                {longUrlDescription && (
                  <Typography variant="body2">{longUrlDescription}</Typography>
                )}
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default Shorten;

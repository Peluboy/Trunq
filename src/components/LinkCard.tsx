import { Box, Typography, useMediaQuery, Tooltip } from "@mui/material";
import { BsBarChartLine } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LinkCardProps } from "../components/TopBar";
import format from "date-fns/format";
import { isValid } from "date-fns";
import { useState, useEffect, memo } from "react";

const LinkCard = ({
  id,
  name,
  longURL,
  shortCode,
  totalClicks,
  deleteLink,
  copyLink,
  customURL,
}: LinkCardProps) => {
  const [createdAt, setCreatedAt] = useState<Date | null>(null);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleDeleteLink = async () => {
    await deleteLink(id);
  };

  const shortUrl = customURL
    ? `${window.location.host}/${customURL}`
    : `${window.location.host}/${shortCode}`;

  const formatCreatedAt = (createdAt: Date) => {
    if (isValid(createdAt)) {
      return format(createdAt, "d MMM, HH:mm");
    }
    return "";
  };

  useEffect(() => {
    const storedCreatedAt = localStorage.getItem(`createdAt_${id}`);
    if (storedCreatedAt) {
      const parsedCreatedAt = new Date(storedCreatedAt);
      if (isValid(parsedCreatedAt)) {
        setCreatedAt(parsedCreatedAt);
      }
    } else {
      const currentCreatedAt = new Date();
      localStorage.setItem(`createdAt_${id}`, currentCreatedAt.toISOString());
      setCreatedAt(currentCreatedAt);
    }
  }, [id]);

  useEffect(() => {
    // Update the document title dynamically
    const updateDocumentTitle = () => {
      if (longURL) {
        document.title = `${name} - ${longURL}`;
      }
    };

    updateDocumentTitle();
  }, [longURL, name]);

  return (
    <>
      {/* <Helmet>
        {updateOGPTags(name, longURL, shortCode).map(
          ({ property, content }) => (
            <meta key={property} property={property} content={content} />
          )
        )}
      </Helmet> */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="#fff"
        p={isMobile ? "1rem" : "1.5rem 2rem"}
        borderRadius="8px"
        mb="1rem"
        boxShadow="rgba(0, 0, 0, 0.04) 0px 3px 5px;"
      >
        <Box width="50%">
          <Typography
            variant="overline"
            color="textSecondary"
            fontSize={isMobile ? "10px" : "12px"}
          >
            {" "}
            Created at {createdAt ? formatCreatedAt(createdAt) : ""}
          </Typography>
          <Box>
            <Typography variant="h5">{name}</Typography>{" "}
            <Typography
              variant="body2"
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              pt={0.5}
            >
              {longURL}
            </Typography>
          </Box>

          <Box mt={isMobile ? ".8rem" : "1rem"}>
            <Tooltip title={longURL} arrow placement="top">
              <Typography
                variant="body2"
                color="primary"
                fontSize={isMobile ? "11px" : "14px"}
              >
                {shortUrl}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
        <Box display="flex" gap=".5rem">
          <Typography variant="body2" fontSize={isMobile ? "16px" : "16px"}>
            {totalClicks}
          </Typography>{" "}
          <BsBarChartLine color="#a1a1a1" size={isMobile ? "18px" : "18px"} />
          <IoCopyOutline
            color="#a1a1a1"
            cursor="pointer"
            onClick={() => copyLink(shortUrl)}
            size={isMobile ? "18px" : "18px"}
            data-testid="copy-link"
          />
          <RiDeleteBin6Line
            color="#a1a1a1"
            onClick={handleDeleteLink}
            cursor="pointer"
            size={isMobile ? "18px" : "18px"}
          />
        </Box>
      </Box>
      {/* <Markdown shortcode={shortCode} /> */}
    </>
  );
};

export default memo(LinkCard);

import {
  Box,
  Typography,
  useMediaQuery,
  Tooltip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { LinkCardProps } from "../components/TopBar";
import format from "date-fns/format";
import { isValid } from "date-fns";
import { useState, useEffect, memo, useContext } from "react";
import { LinkContext } from "../contexts/LinkContext";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../utils/Firebase";

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
  const { totalClicks: updateTotalClicks } = useContext(LinkContext);
  const [linkTotalClicks, setLinkTotalClicks] = useState<number | null>(null);
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
    const fetchLinkTotalClicks = async () => {
      const linkDocRef = doc(firestore, "links", shortCode);
      const linkDocSnapshot = await getDoc(linkDocRef);

      if (linkDocSnapshot.exists()) {
        const { totalClicks } = linkDocSnapshot.data();
        setLinkTotalClicks(totalClicks);
      }
    };

    fetchLinkTotalClicks();
  }, [shortCode]);

  const displayTotalClicks = linkTotalClicks || totalClicks;

  return (
    <>
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
              textTransform="none"
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
                textTransform="none"
                fontSize={isMobile ? "11px" : "14px"}
              >
                {shortUrl}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" fontSize={isMobile ? "16px" : "20px"}>
            {displayTotalClicks}
          </Typography>{" "}
          <IconButton sx={{ marginRight: isMobile ? "-10px" : "-8px" }}>
            <SignalCellularAltIcon fontSize="small" color="success" />
          </IconButton>
          <IconButton
            onClick={() => copyLink(shortUrl)}
            sx={{ marginRight: isMobile ? "-10px" : "-8px" }}
          >
            <ContentCopyIcon fontSize="small" color="success" />
          </IconButton>
          <IconButton onClick={handleDeleteLink}>
            <DeleteIcon fontSize="small" color="success" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default memo(LinkCard);

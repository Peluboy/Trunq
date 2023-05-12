import { Box, Typography } from "@mui/material";
import { BsBarChartLine } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LinkCardProps } from "../components/TopBar";
import format from "date-fns/format";

const LinkCard = ({
  id,
  createdAt,
  name,
  longURL,
  shortCode,
  totalClicks,
}: LinkCardProps) => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="#fff"
        p="1.5rem 2rem"
        borderRadius="8px"
        mb="1rem"
        boxShadow="rgba(0, 0, 0, 0.04) 0px 3px 5px;"
      >
        <Box>
          <Typography variant="overline" color="textSecondary" component="p">
            Created at {format(createdAt, "d MMM, HH:mm")}
          </Typography>
          <Box>
            <Typography variant="h5" component="h5">
              {name}
            </Typography>
            <Typography variant="body2" component="p">
              {longURL}
            </Typography>
          </Box>

          <Box mt="1rem">
            <Typography variant="body2" component="p" color="primary">
              {window.location.host}/{shortCode}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" gap=".5rem">
          <Typography variant="body2">{totalClicks}</Typography>
          <BsBarChartLine color="#a1a1a1" />
          <IoCopyOutline color="#a1a1a1" />
          <RiDeleteBin6Line color="#a1a1a1" />
        </Box>
      </Box>
    </>
  );
};

export default LinkCard;

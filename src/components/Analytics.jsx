import { Box, Typography, Grid } from "@mui/material";
import "../styles/account.css";
import {
  AiOutlineLink,
  AiOutlineEye,
  AiOutlinePieChart,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { TbHandClick } from "react-icons/tb";

const Analytics = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={8}>
        <Box mt="3rem">
          <Box mb="1.5rem">
            <Typography variant="body2" color="success">
              STATS
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" flexDirection="column">
              <Box display="flex" alignContent="flex-start">
                <Box pt=".2rem" mr=".8rem">
                  <AiOutlineLink size="18px" color="#A1A1A1" />
                </Box>
                <Typography variant="h4">71</Typography>
              </Box>
              <Box ml="2rem">
                <Typography variant="body2">Total Links</Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="column">
              <Box display="flex" alignContent="flex-start">
                <Box pt=".2rem" mr=".8rem">
                  <AiOutlineEye size="18px" color="#A1A1A1" />
                </Box>
                <Typography variant="h4">249</Typography>
              </Box>
              <Box ml="2rem">
                <Typography variant="body2">Total Views</Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="column">
              <Box display="flex" alignContent="flex-start">
                <Box pt=".2rem" mr=".8rem">
                  <TbHandClick size="18px" color="#A1A1A1" />
                </Box>
                <Typography variant="h4">53</Typography>
              </Box>
              <Box ml="2rem">
                <Typography variant="body2">Total Clicks</Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="column">
              <Box display="flex" alignContent="flex-start">
                <Box pt=".2rem" mr=".8rem">
                  <AiOutlinePieChart size="18px" color="#A1A1A1" />
                </Box>
                <Typography variant="h4">21%</Typography>
              </Box>
              <Box ml="2rem">
                <Typography variant="body2">Avg. CTR</Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="column">
              <Box display="flex" alignContent="flex-start">
                <Box pt=".2rem" mr=".8rem">
                  <AiOutlineClockCircle size="18px" color="#A1A1A1" />
                </Box>
                <Typography variant="h4">6.37s</Typography>
              </Box>
              <Box ml="2rem">
                <Typography variant="body2">Avg. Time</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box my="3rem">{/* <Divider /> */}</Box>
      </Grid>
    </Grid>
  );
};

export default Analytics;

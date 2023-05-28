import { Box, Typography, Grid } from "@mui/material";
import "../styles/account.css";
import {
  AiOutlineLink,
  AiOutlineEye,
  AiOutlinePieChart,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { TbHandClick } from "react-icons/tb";

export interface AnalyticsProps {
  totalClicks: number;
  totalLinks: number;
}

const Analytics = ({ totalClicks, totalLinks }: AnalyticsProps) => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8}>
        <Box mt="3rem" p={2}>
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
                <Typography variant="h4">{totalLinks}</Typography>
              </Box>
              <Box ml="2rem">
                <Typography variant="body2">Total Links</Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="column">
              <Box display="flex" alignContent="flex-start">
                <Box pt=".2rem" mr=".8rem">
                  <TbHandClick size="18px" color="#A1A1A1" />
                </Box>
                <Typography variant="h4">{totalClicks}</Typography>
              </Box>
              <Box ml="2rem">
                <Typography variant="body2">Total Clicks</Typography>
              </Box>
            </Box>

            {/* <Box display="flex" flexDirection="column">
              <Box display="flex" alignContent="flex-start">
                <Box pt=".2rem" mr=".8rem">
                  <AiOutlinePieChart size="18px" color="#A1A1A1" />
                </Box>
                <Typography variant="h4">21%</Typography>
              </Box>
              <Box ml="2rem">
                <Typography variant="body2">Avg. CTR</Typography>
              </Box>
            </Box> */}

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

import { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import "../styles/account.css";
import { AiOutlineLink } from "react-icons/ai";
import { collection, getDocs } from "firebase/firestore";
import { firestore, auth } from "../utils/Firebase";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

export interface AnalyticsProps {
  totalClicks: number;
  totalLinks: number;
}

const Analytics = ({ totalLinks }: AnalyticsProps) => {
  const [totalClicksSum, setTotalClicksSum] = useState(0);
  const [topLocation, setTopLocation] = useState("");

  useEffect(() => {
    const fetchTotalClicksSum = async () => {
      try {
        const linksRef = collection(firestore, "links");
        const linksSnapshot = await getDocs(linksRef);

        const promises = linksSnapshot.docs.map(async (doc) => {
          const { totalClicks, userID } = doc.data();
          if (userID === auth.currentUser?.uid) {
            const parsedClicks = parseInt(totalClicks);
            return isNaN(parsedClicks) ? 0 : parsedClicks;
          } else {
            return 0;
          }
        });

        const totalClicksArray = await Promise.all(promises);
        const sum = totalClicksArray.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );

        setTotalClicksSum(sum);

        setTopLocation(sum === 0 ? "No Data" : "Nigeria");
      } catch (error) {
        console.error("Error fetching total clicks:", error);
      }
    };

    fetchTotalClicksSum();
  }, []);

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
                  <AiOutlineLink size="18px" color="#a1a1a1" />
                </Box>
                <Typography variant="h4" fontSize="1.6rem">
                  {totalLinks}
                </Typography>
              </Box>
              <Box ml="2rem">
                <Typography variant="body2">Total Links</Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="column">
              <Box display="flex" alignContent="flex-start">
                <Box pt=".2rem" mr=".8rem">
                  <AdsClickIcon fontSize="small" color="success" />
                </Box>
                <Typography variant="h4" fontSize="1.6rem">
                  {totalClicksSum}
                </Typography>
              </Box>
              <Box ml="2rem">
                <Typography variant="body2">Total Clicks</Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="column">
              <Box display="flex" alignContent="flex-start">
                <Box pt=".2rem" mr=".8rem">
                  <FmdGoodOutlinedIcon fontSize="small" color="success" />
                </Box>
                <Typography variant="h4" fontSize="1.6rem">
                  {topLocation}
                </Typography>
              </Box>
              <Box ml="2rem">
                <Typography variant="body2">Top Location</Typography>
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

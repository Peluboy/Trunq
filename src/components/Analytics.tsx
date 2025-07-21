import { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import "../styles/account.css";
import { AiOutlineLink } from "react-icons/ai";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
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
    const linksRef = collection(firestore, "links");
    const unsubscribe = onSnapshot(linksRef, (linksSnapshot) => {
      let sum = 0;
      let allLocations: string[] = [];
      linksSnapshot.docs.forEach((doc) => {
        const { totalClicks, userID, clickLocation } = doc.data();
        if (userID === auth.currentUser?.uid) {
          const parsedClicks = parseInt(totalClicks);
          sum += isNaN(parsedClicks) ? 0 : parsedClicks;
          if (Array.isArray(clickLocation)) {
            allLocations = allLocations.concat(
              clickLocation.map((loc: any) => loc.country || "Unknown")
            );
          }
        }
      });
      setTotalClicksSum(sum);
      // Compute top location
      if (allLocations.length === 0) {
        setTopLocation("No Data");
      } else {
        const locationCounts = allLocations.reduce((acc: Record<string, number>, country: string) => {
          acc[country] = (acc[country] || 0) + 1;
          return acc;
        }, {});
        const top = Object.entries(locationCounts).sort((a, b) => b[1] - a[1])[0][0];
        setTopLocation(top);
      }
    });
    return () => unsubscribe();
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

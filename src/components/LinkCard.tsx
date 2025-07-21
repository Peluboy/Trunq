import { useState, useEffect, memo } from "react";
import format from "date-fns/format";
import { isValid } from "date-fns";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import {
  Box,
  Typography,
  useMediaQuery,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import BarChartIcon from '@mui/icons-material/BarChart';
import {
  getDocs,
  getDoc,
  doc,
  collection,
  query,
  orderBy,
  limit,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../utils/Firebase";
import { LinkCardProps } from "../types/types";
import { auth } from "../utils/Firebase";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip } from "recharts";

const LinkCard = ({
  id,
  name,
  longURL,
  shortCode,
  deleteLink,
  copyLink,
  customURL,
  expiresAt,
  clickLocation = [],
}: LinkCardProps) => {
  const [createdAt, setCreatedAt] = useState<Date | null>(null);
  const [ , setLinkTotalClicks] = useState<number | null>(null);
  const [topLocation, setTopLocation] = useState("Nigeria");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [displayTotalClicks, setDisplayTotalClicks] = useState<number | null>(
    null
  );
  const [fetchedClickLocation, setFetchedClickLocation] = useState<any[]>([]);

  const [longUrlPreview, ] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editUrl, setEditUrl] = useState(longURL);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const handleAnalyticsOpen = () => setAnalyticsOpen(true);
  const handleAnalyticsClose = () => setAnalyticsOpen(false);

  const handleDeleteLink = async () => {
    await deleteLink(id);
  };

  const handleEdit = () => setEditOpen(true);
  const handleEditClose = () => {
    setEditOpen(false);
    setEditError("");
    setEditUrl(longURL);
  };
  const handleEditSubmit = async () => {
    if (!editUrl.trim()) {
      setEditError("URL cannot be empty");
      return;
    }
    setEditLoading(true);
    try {
      // Update in Firestore (both user and global)
      const userUid = auth.currentUser?.uid;
      if (userUid) {
        const userLinkRef = doc(firestore, `users/${userUid}/links`, id);
        await updateDoc(userLinkRef, { longURL: editUrl });
      }
      const globalLinkRef = doc(firestore, "links", shortCode);
      await updateDoc(globalLinkRef, { longURL: editUrl });
      setEditOpen(false);
    } catch (err) {
      setEditError("Failed to update link");
    } finally {
      setEditLoading(false);
    }
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
        setDisplayTotalClicks(totalClicks);
      }
    };

    fetchLinkTotalClicks();
  }, [shortCode]);
  console.log(clickLocation)
  useEffect(() => {
    const fetchTopLocation = async () => {
      const locationQuery = query(
        collection(firestore, "locations"),
        orderBy("clicks", "desc"),
        limit(1)
      );
      const locationSnapshot = await getDocs(locationQuery);

      if (!locationSnapshot.empty) {
        const topLocationData = locationSnapshot.docs[0].data();
        console.log("Top Location Data:", topLocationData);
        setTopLocation(topLocationData.name);
      } else {
        console.log("No location data found.");
      }
    };

    fetchTopLocation();
  }, []);

  useEffect(() => {
    const fetchClickLocation = async () => {
      try {
        const linkDocRef = doc(firestore, "links", shortCode);
        const linkDocSnapshot = await getDoc(linkDocRef);
        if (linkDocSnapshot.exists()) {
          const data = linkDocSnapshot.data();
          if (data.clickLocation && Array.isArray(data.clickLocation)) {
            setFetchedClickLocation(data.clickLocation);
          } else {
            setFetchedClickLocation([]);
          }
        }
      } catch (error) {
        console.error("Error fetching click location:", error);
      }
    };
  
    fetchClickLocation();
  }, [shortCode]);
  

  // Analytics summary and chart data
  const totalClicks = fetchedClickLocation.length;
  const countryCounts = fetchedClickLocation.reduce((acc: Record<string, number>, loc: any) => {
    const country = loc.country || 'Unknown';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});
  const uniqueCountries = Object.keys(countryCounts);
  const chartData = uniqueCountries.map(country => ({ country, clicks: countryCounts[country] }));
console.log('fetched country:',countryCounts)
  return (
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
          {longUrlPreview ? (
            <LinkPreview url={longURL} />
          ) : (
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
          )}
        </Box>
        <Box mt=".5rem">
        {expiresAt && (
          <Typography variant="caption" color="textSecondary">
            Expires: {isValid(new Date(expiresAt)) ? format(new Date(expiresAt), "d MMM yyyy, HH:mm") : "-"}
          </Typography>
        )}
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Tooltip title="Copy" arrow placement="top">
          <IconButton
            onClick={() => copyLink(shortUrl)}
            sx={{ marginRight: isMobile ? "-10px" : "-8px" }}
          >
            <ContentCopyIcon fontSize="small" color="success" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" arrow placement="top">
          <IconButton onClick={handleDeleteLink}>
            <DeleteIcon fontSize="small" color="success" />
          </IconButton>
        </Tooltip>
        <Tooltip title="View Analytics" arrow placement="top">
          <IconButton onClick={handleAnalyticsOpen}>
            <BarChartIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
        <Button size="small" variant="outlined" onClick={handleEdit} sx={{ ml: 1 }}>
          Edit
        </Button>
      </Box>
      <Dialog open={editOpen} onClose={handleEditClose} fullWidth>
        <DialogTitle style={{ textTransform: 'none' }}>Edit Link</DialogTitle>
        <DialogContent>
          <TextField
            label="Long URL"
            value={editUrl}
            onChange={e => setEditUrl(e.target.value)}
            fullWidth
       error={!!editError}
            helperText={editError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} disabled={editLoading}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" disabled={editLoading}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* Analytics Modal */}
      <Dialog open={analyticsOpen} onClose={handleAnalyticsClose} fullWidth maxWidth="sm">
        <DialogTitle style={{ textTransform: 'none' }}>Click Analytics</DialogTitle>
        <DialogContent>
          <Box mb={2}>
          <Typography variant="subtitle2">
            Total Clicks: {typeof totalClicks === 'number' ? totalClicks : 0}
          </Typography>
            <Typography variant="subtitle2">Unique Countries: {uniqueCountries.length}</Typography>
          </Box>
          {chartData.length > 0 && (
            <Box mb={2} height={200}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis dataKey="country" type="category" width={100} />
                  <RechartsTooltip />
                  <Bar dataKey="clicks" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          )}
          {fetchedClickLocation.length === 0 ? (
            <Typography variant="body2">No click data yet.</Typography>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Country</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {fetchedClickLocation.slice().reverse().map((loc: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell>{loc.country || "Unknown"}</TableCell>
              <TableCell>{loc.city || ""}</TableCell>
              <TableCell>
                {loc.timestamp
                  ? new Date(
                      loc.timestamp.seconds
                        ? loc.timestamp.seconds * 1000
                        : loc.timestamp
                    ).toLocaleDateString()
                  : ""}
              </TableCell>
            </TableRow>
          ))}

                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAnalyticsClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default memo(LinkCard);

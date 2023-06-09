import { useState, useEffect } from "react";
import "../styles/account.css";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";

import { BsArrowRight } from "react-icons/bs";
import { GrClose } from "react-icons/gr";

export interface ShortenURLModalProps {
  open: boolean;
  handleClose: (
    event: React.MouseEvent<SVGElement>,
    reason: "backdropClick" | "escapeKeyDown"
  ) => void;
  createShortenLink: (name: string, longUrl: string, customUrl: string) => void;
  customUrl: string;
  setCustomUrl: React.Dispatch<React.SetStateAction<string>>;
}

const ShortenURLModal = ({
  handleClose,
  createShortenLink,
  customUrl,
  setCustomUrl,
}: ShortenURLModalProps) => {
  const [form, setForm] = useState({
    name: "",
    longUrl: "",
    customUrl: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    longUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((oldform) => ({
      ...oldform,
      [event.target.name]: event.target.value,
    }));

  const handleCustomUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomUrl(event.target.value);
    setForm((oldForm) => ({
      ...oldForm,
      customUrl: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    const errors = {} as { name: string; longUrl: string };

    const tName = form.name.trim();
    const tLongUrl = form.longUrl.trim();
    const expression =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    if (tName.length < 3 || tName.length > 15) {
      errors.name = "The name should be between 3 and 15 characters long";
    }

    if (!regex.test(tLongUrl)) {
      errors.longUrl = "URL is invalid";
    }

    if (Object.keys(errors).length > 0) {
      return setErrors(errors);
    }
    setLoading(true);
    try {
      setTimeout(
        () => createShortenLink(tName, tLongUrl, form.customUrl),
        1000
      );
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setCustomUrl("");
    };
  }, [setCustomUrl]);

  return (
    <Dialog open={true} onClose={handleClose} fullWidth>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={3}
        pt={3}
      >
        <Typography variant="h5">Shorten URL</Typography>
        <GrClose
          cursor="pointer"
          onClick={(event: React.MouseEvent<SVGElement>) =>
            handleClose(event, "backdropClick")
          }
        />
      </Box>
      <DialogContent sx={{ px: 3, pb: 2 }}>
        <Box
          sx={{
            display: "grid",
            gap: "0.5rem",
            gridTemplateColumns: "1fr",
          }}
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="overline">URL Name</Typography>
            <TextField
              error={!!errors.name}
              helperText={errors.name}
              value={form.name}
              name="name"
              onChange={handleChange}
              type="text"
              size="small"
              placeholder="New Sample"
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="overline">Enter Long URL</Typography>
            <TextField
              error={!!errors.longUrl}
              helperText={errors.longUrl}
              value={form.longUrl}
              name="longUrl"
              size="small"
              onChange={handleChange}
              type="text"
              placeholder="https://webinar.online/example?:hgbe123pp"
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="overline">Your Custom URL</Typography>
            <Box display="flex" alignItems="stretch" gap={0.5}>
              <Button
                variant="contained"
                disabled
                disableElevation
                size="small"
              >
                <Typography variant="h6">trunq.xyz/</Typography>
              </Button>
              <TextField
                value={customUrl}
                size="small"
                name="customUrl"
                onChange={handleCustomUrlChange}
                type="text"
                placeholder="e.g kolohub (optional)"
                sx={{
                  flex: 1,
                  borderRadius: "0 4px 4px 0 !important",
                }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box mb={1} mr={1.5}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disableElevation
            autoFocus
            color="primary"
            disabled={loading || !form.name || !form.longUrl}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Shorten Link"
            )}
            <Box ml=".2rem" display="flex" alignItems="center">
              <BsArrowRight />
            </Box>
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ShortenURLModal;

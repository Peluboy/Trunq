import { useState } from "react";
import "../styles/account.css";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
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
}

const ShortenURLModal = ({
  handleClose,
  createShortenLink,
}: ShortenURLModalProps) => {
  const [form, setForm] = useState({
    name: "",
    longUrl: "",
    customUrl: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((oldform) => ({
      ...oldform,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = () => {
    createShortenLink(form.name, form.longUrl, form.customUrl);
  };

  return (
    <Dialog open={true} onClose={handleClose} fullWidth>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle>
          <Typography>Shorten URL</Typography>
        </DialogTitle>
        <Box mr={2}>
          <GrClose
            onClick={(event: React.MouseEvent<SVGElement>) =>
              handleClose(event, "backdropClick")
            }
          />
        </Box>
      </Box>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="overline">URL Name</Typography>
            <input
              value={form.name}
              name="name"
              onChange={handleChange}
              type="text"
              placeholder="New Sample"
              className="form-input"
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="overline">Enter Long URL</Typography>
            <input
              value={form.longUrl}
              name="longUrl"
              onChange={handleChange}
              type="text"
              placeholder="https://webinar.online/example?:hgbe123pp"
              className="form-input"
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="overline">Your Custom URL</Typography>
            <div className="custom-form-input">
              <button>trunq.com/</button>
              <input
                value={form.customUrl}
                name="customUrl"
                onChange={handleChange}
                type="text"
                placeholder="e.g kolohub (optional)"
              />
            </div>
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
          >
            Shorten Link
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

import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";

interface PasswordPromptProps {
  onSubmit: (password: string) => void;
  loading?: boolean;
  error?: string;
}

const PasswordPrompt: React.FC<PasswordPromptProps> = ({ onSubmit, loading, error }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <Box minHeight="60vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h5" gutterBottom>
        This link is password protected
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Please enter the password to continue
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 320 }}>
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          disabled={loading}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading || !password}
          sx={{ mt: 2 }}
        >
          {loading ? "Checking..." : "Submit"}
        </Button>
      </form>
    </Box>
  );
};

export default PasswordPrompt; 
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PasswordPrompt from "./PasswordPrompt";

const Redirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!shortCode) return;
    const url = `/api/redirect.js?shortCode=${shortCode}`;
    setApiUrl(url);
    fetch(url)
      .then(async (res) => {
        if (res.status === 401) {
          setPasswordRequired(true);
          setLoading(false);
        } else if (res.status === 301 || res.redirected) {
          window.location.href = res.url;
        } else if (res.status === 410) {
          navigate("/expired");
        } else if (!res.ok) {
          setError("Link not found");
          setLoading(false);
        } else {
          // fallback: try to redirect
          const data = await res.json();
          if (data && data.longURL) {
            window.location.href = data.longURL;
          } else {
            setError("Link not found");
            setLoading(false);
          }
        }
      })
      .catch(() => {
        setError("Link not found");
        setLoading(false);
      });
  }, [shortCode, navigate]);

  const handlePasswordSubmit = async (password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.status === 301 || res.redirected) {
        window.location.href = res.url;
      } else if (res.status === 403) {
        setError("Incorrect password");
        setLoading(false);
      } else if (res.status === 410) {
        navigate("/expired");
      } else {
        setError("Something went wrong");
        setLoading(false);
      }
    } catch {
      setError("Network error");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (passwordRequired) {
    return <PasswordPrompt onSubmit={handlePasswordSubmit} loading={loading} error={error || undefined} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return null;
};

export default Redirect;
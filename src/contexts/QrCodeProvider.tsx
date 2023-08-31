import React, { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";

interface QrCodeContextProps {
  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  qrCodeResponse: string;
  generateQrCode: () => Promise<void>;
  loading: boolean;
  error: any;
}

const QrCodeContext = createContext<QrCodeContextProps | undefined>(undefined);

export const useQrCodeContext = (): QrCodeContextProps => {
  const context = useContext(QrCodeContext);
  if (!context) {
    throw new Error("useQrCodeContext must be used within a QrCodeProvider");
  }
  return context;
};

const QrCodeProvider = ({ children }: { children: ReactNode }) => {
  const [link, setLink] = useState("");
  const [qrCodeResponse, setQrCodeResponse] = useState("");
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateQrCode = async () => {
    try {
      setLoading(true);
      const size = window.innerWidth < 600 ? 200 : 120;
      const bodyParameters = {
        size,
        qrData: "pattern4",
        colorDark: "#1b1b1b",
        qrCategory: "url",
        text: link,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_QR_API_KEY}`,
        },
      };

      const response = await axios.post(
        "https://qrtiger.com/api/qr/static",
        bodyParameters,
        config
      );

      setQrCodeResponse(response.data.url);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue: QrCodeContextProps = {
    link,
    setLink,
    qrCodeResponse,
    generateQrCode,
    loading,
    error,
  };

  return (
    <QrCodeContext.Provider value={contextValue}>
      {children}
    </QrCodeContext.Provider>
  );
};

export default QrCodeProvider;

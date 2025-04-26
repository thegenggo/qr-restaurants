import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface QRScannerProps {
  onSuccess?: (tableId: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onSuccess }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scannerInstance, setScannerInstance] = useState<Html5Qrcode | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (scannerInstance) {
        scannerInstance.stop().catch(console.error);
      }
    };
  }, [scannerInstance]);

  const startScanner = async () => {
    try {
      setIsScanning(true);
      setError(null);

      const html5QrCode = new Html5Qrcode("qr-reader");
      setScannerInstance(html5QrCode);

      const qrCodeSuccessCallback = (decodedText: string) => {
        try {
          // Stop scanning once we get a result
          // html5QrCode.stop().catch(console.error);

          // Check if the QR code contains a valid table ID
          // Format expected: "https://example.com/menu/T1" or just "T1"
          let tableId;

          if (decodedText.includes("/menu/")) {
            const urlParts = decodedText.split("/");
            tableId = urlParts[urlParts.length - 1];
          } else {
            tableId = decodedText;
          }

          if (tableId) {
            if (onSuccess) {
              onSuccess(tableId);
            } else {
              navigate(`/menu/${tableId}`);
            }
          } else {
            setError("Invalid QR code. Please scan a valid table QR code.");
            setIsScanning(false);
          }
        } catch {
          setError("Failed to process QR code.");
          setIsScanning(false);
        }
      };

      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback,
        (errorMessage) => {
          // Handle QR code scanning errors silently
          console.log(errorMessage);
        }
      );
    } catch {
      setError("Unable to access camera.");
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (scannerInstance) {
      setScannerInstance(null);
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        id="qr-reader"
        className="w-full max-w-sm rounded-lg overflow-hidden bg-white shadow-md"
      ></div>

      {error && (
        <div className="mt-4 p-3 bg-error-100 text-error-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mt-6 flex space-x-4">
        {!isScanning ? (
          <button
            onClick={startScanner}
            className="btn btn-primary flex items-center"
          >
            Start Scanning
          </button>
        ) : (
          <>
            <button onClick={stopScanner} className="btn btn-outline">
              Stop
            </button>
            <div className="flex items-center text-neutral-600">
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Scanning...
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QRScanner;

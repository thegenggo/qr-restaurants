import React from 'react';
import { QrCode, AlertCircle } from 'lucide-react';
import QRScanner from '../components/QRScanner';
import { useCart } from '../contexts/useCart';
import { useNavigate } from 'react-router-dom';

const ScanPage = () => {
  const { setTable } = useCart();
  const navigate = useNavigate();

  const handleSuccessfulScan = (tableId: string) => {
    setTable(tableId);
    navigate(`/menu/${tableId}`);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-4">
          <QrCode className="h-8 w-8 text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Scan QR Code</h1>
        <p className="text-neutral-600">
          Position the QR code on your table within the camera frame to start ordering
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <QRScanner onSuccess={handleSuccessfulScan} />
        
        <div className="mt-8 p-4 bg-neutral-50 border border-neutral-200 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-neutral-800 mb-1">Can't scan?</h3>
            <p className="text-sm text-neutral-600">
              Make sure the QR code is well-lit and your camera is uncovered. If you're still having trouble, ask your server for assistance.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg bg-white shadow-sm border border-neutral-200">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-primary-600">1</span>
            </div>
            <p className="text-sm text-neutral-700">Scan the QR code on your table</p>
          </div>
          <div className="p-4 rounded-lg bg-white shadow-sm border border-neutral-200">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-primary-600">2</span>
            </div>
            <p className="text-sm text-neutral-700">Browse menu and add items to cart</p>
          </div>
          <div className="p-4 rounded-lg bg-white shadow-sm border border-neutral-200">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-primary-600">3</span>
            </div>
            <p className="text-sm text-neutral-700">Place your order and wait for delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
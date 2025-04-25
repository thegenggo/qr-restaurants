import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="h-10 w-10 text-primary-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">Page Not Found</h1>
        <p className="text-neutral-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary flex-1 flex items-center justify-center">
            <Home className="h-5 w-5 mr-2" />
            Go Home
          </Link>
          <Link to="/scan" className="btn btn-outline flex-1 flex items-center justify-center">
            <QrCode className="h-5 w-5 mr-2" />
            Scan QR Code
          </Link>
        </div>
      </div>
    </div>
  );
};

// Helper component for QrCode
const QrCode = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="5" height="5" x="3" y="3" rx="1"></rect>
    <rect width="5" height="5" x="16" y="3" rx="1"></rect>
    <rect width="5" height="5" x="3" y="16" rx="1"></rect>
    <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path>
    <path d="M21 21v.01"></path>
    <path d="M12 7v3a2 2 0 0 1-2 2H7"></path>
    <path d="M3 12h.01"></path>
    <path d="M12 3h.01"></path>
    <path d="M12 16v.01"></path>
    <path d="M16 12h1"></path>
    <path d="M21 12v.01"></path>
    <path d="M12 21v-1"></path>
  </svg>
);

export default NotFoundPage;
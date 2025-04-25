import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-neutral-600 text-sm">
              © {new Date().getFullYear()} QRDine. All rights reserved.
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-neutral-600 text-sm flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-primary-500" /> by QRDine Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
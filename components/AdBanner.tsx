
import React from 'react';

interface AdBannerProps {
  children: React.ReactNode;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`w-full h-24 bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center text-gray-500 ${className}`}
    >
      {/* Example: <div id="ad-banner-top">{children}</div> */}
      {children}
    </div>
  );
};

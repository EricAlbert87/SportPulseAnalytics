import React from "react";

function LoadingSpinner({ text }) {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-navy-900"></div>
      <p className="ml-4 text-lg font-open-sans">{text}</p>
    </div>
  );
}

export default LoadingSpinner;
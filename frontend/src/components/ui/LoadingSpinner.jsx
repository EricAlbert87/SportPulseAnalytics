// frontend/src/components/ui/LoadingSpinner.jsx

import React from "react";

function LoadingSpinner({ size = 8, text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div
        className={`w-${size} h-${size} border-4 border-accent border-t-transparent rounded-full animate-spin`}
        role="status"
      ></div>
      <span className="mt-4 text-gray-600 dark:text-gray-300 text-sm">{text}</span>
    </div>
  );
}

export default LoadingSpinner;

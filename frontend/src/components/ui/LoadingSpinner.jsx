import React from "react";

const sizeMap = {
  4: "w-4 h-4",
  6: "w-6 h-6",
  8: "w-8 h-8",
  10: "w-10 h-10",
  12: "w-12 h-12",
  16: "w-16 h-16",
};

function LoadingSpinner({ size = 8, text = "Loading..." }) {
  const sizeClass = sizeMap[size] || "w-8 h-8";
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div
        className={`${sizeClass} border-4 border-gold-500 border-t-transparent rounded-full animate-spin`}
        role="status"
      ></div>
      <span className="mt-4 text-gray-600 font-open-sans text-base">{text}</span>
    </div>
  );
}

export default LoadingSpinner;
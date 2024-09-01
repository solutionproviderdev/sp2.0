import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-white font-bold mr-2">Activity {progress} %</span>
      <div className="flex items-center space-x-1">
        <div className="w-4 h-4 rounded-full flex items-center justify-center mr-2">
          <span role="img" aria-label="heart" className="text-white text-3xl">
            ❤️
          </span>
        </div>
        <div className="w-40 bg-gray-200 rounded-full h-3">
          <div
            className="bg-red-500 h-3 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

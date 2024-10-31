import React, { useState, useEffect } from "react";

// Define the props interface for TextInput component-- ensures type safety
export interface ProgressBarProps {
  progressValue: number; // The label for the input field (required)
}

// Define the TextInput component variable as a functional component -- pass interface props
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progressValue = 0
}) => {
  // State hook for managing the input value
  // useState returns an array with the current state value and a function to update it
  const [value, setValue] = useState(0);
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    setValue(progressValue);
    setIsFinished(progressValue >= 100);
  }, [progressValue]);

  // component's JSX structure
  return (
    <div className="font-mono w-full">
      <div className="flex flex-col bg-custom-pale-green p-6 rounded-lg w-full">
        <div className="flex w-full flex-col space-y-2">
          <div className="relative">
            <div className={`h-10 appearance-none w-full overflow-hidden text-slate-400 bg-sky-50 rounded-2xl ${isFinished ? "border-2 border-slate-200 shadow-[0_0_20px_rgba(0,255,0,0.3)]" : ""}`}>
              <div
                style={{
                  width: `${Math.max(value, 0)}%`
                }}
                className="h-full bg-rose-300 transition-all duration-1000 ease-in-out rounded-2xl"
              >
              </div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                {`${value}%`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

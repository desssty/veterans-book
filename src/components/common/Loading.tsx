import { forwardRef } from "react";

interface LoadingProps {
  text: string;
  fullScreen?: boolean;
}

const Loading = forwardRef<HTMLDivElement, LoadingProps>(
  ({ text, fullScreen = false }, ref) => {
    return (
      <div
        ref={ref}
        className={`min-w-[8rem] flex items-center justify-center ${
          fullScreen ? "h-screen" : ""
        }`}
      >
        <p className="text-gray-500 text-5xl">
          {text}
          <span className="animate-dot-blink delay-0">.</span>
          <span className="animate-dot-blink delay-1">.</span>
          <span className="animate-dot-blink delay-2">.</span>
        </p>
      </div>
    );
  }
);

export default Loading;

import React from 'react';

interface BottomGradientProps {
  primaryColor?: string;
  secondaryColor?: string;
}

export const BottomGradient: React.FC<BottomGradientProps> = ({
  primaryColor = '#06b6d4', // cyan-500
  secondaryColor = '#6366f1', // indigo-500
}) => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full opacity-0 transition duration-500 group-hover/btn:opacity-100"
        style={{
          background: `linear-gradient(to right, transparent, ${primaryColor}, transparent)`,
        }}
      />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"
        style={{
          background: `linear-gradient(to right, transparent, ${secondaryColor}, transparent)`,
        }}
      />
    </>
  );
};

export default BottomGradient;

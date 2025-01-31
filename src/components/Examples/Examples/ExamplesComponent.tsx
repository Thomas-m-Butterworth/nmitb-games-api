import React, { ReactNode } from "react";

export const ExamplesComponent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
      {children}
    </div>
  );
};

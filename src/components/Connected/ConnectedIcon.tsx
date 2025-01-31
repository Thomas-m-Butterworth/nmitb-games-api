import React from "react";

export const ConnectedIcon = ({ isConnected }: { isConnected: boolean }) => {
  return (
    <>
      <div
        className={`w-4 h-4 rounded-full ${
          isConnected ? "bg-green-500" : "bg-red-500"
        }`}
      ></div>
    </>
  );
};

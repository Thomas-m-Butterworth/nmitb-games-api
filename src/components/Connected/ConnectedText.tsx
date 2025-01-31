import React from "react";

export const ConnectedText = ({ isConnected }: { isConnected: boolean }) => {
  return (
    <>
      <p className="text-lg text-gray-700">
        {isConnected
          ? "Connected to NMitB Games Database"
          : "Not connected to NMitB Games Database."}
      </p>
    </>
  );
};

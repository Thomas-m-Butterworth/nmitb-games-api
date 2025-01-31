import React from "react";
import { ConnectedIcon } from "./ConnectedIcon";
import { ConnectedText } from "./ConnectedText";

export const Connected = ({ isConnected }: { isConnected: boolean }) => {
  return (
    <div className="flex items-center gap-2 mb-8">
      <ConnectedIcon isConnected={isConnected} />
      <ConnectedText isConnected={isConnected} />
    </div>
  );
};

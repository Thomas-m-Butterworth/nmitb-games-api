import React from "react";
import { ConnectedIcon } from "../../Connected";
import { AuthRequirementProps } from "./types";

export const AuthRequirement = ({ isAuthenticated }: AuthRequirementProps) => {
  return (
    <div className="flex items-center gap-2 w-28 justify-between">
      <ConnectedIcon isConnected={!isAuthenticated} />
      <p className="text-sm text-gray-800">
        {isAuthenticated ? "Need API Key" : "Free For All"}
      </p>
    </div>
  );
};

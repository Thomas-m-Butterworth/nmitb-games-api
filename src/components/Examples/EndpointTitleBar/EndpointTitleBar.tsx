import React from "react";
import { EndpointTitleBarProps } from "./types";
import { EndpointTitle } from "./EndpointTitle";
import { AuthRequirement } from "./AuthRequirement";

export const EndpointTitleBar = ({
  isAuthenticated,
  apiTitle,
}: EndpointTitleBarProps) => {
  return (
    <div className="flex justify-between items-center">
      <EndpointTitle apiTitle={apiTitle} />
      <AuthRequirement isAuthenticated={isAuthenticated} />
    </div>
  );
};

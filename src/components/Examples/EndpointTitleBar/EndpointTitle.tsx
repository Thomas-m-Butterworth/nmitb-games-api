import React from "react";
import { EndpointTitleProps } from "./types";

export const EndpointTitle = ({ apiTitle }: EndpointTitleProps) => {
  return (
    <>
      <h3 className="text-lg font-medium text-gray-800">{apiTitle}</h3>
    </>
  );
};

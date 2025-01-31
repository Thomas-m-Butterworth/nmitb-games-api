import React from "react";
import { EndpointLinkProps } from "./types";

export const EndpointLink = ({
  defaultHref,
  apiType,
  apiLink,
}: EndpointLinkProps) => {
  return (
    <>
      <a
        href={defaultHref}
        className="text-blue-500 text-mono tracking-widest bg-gray-100 hover:text-blue-700 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {`${apiType} ${apiLink}`}
      </a>
    </>
  );
};

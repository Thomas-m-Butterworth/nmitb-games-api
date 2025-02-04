import React from "react";
import { EndpointLinkProps } from "./types";

export const EndpointLink = ({
  defaultHref,
  apiType,
  apiLink,
  isAuthenticated,
}: EndpointLinkProps) => {
  const linkString = `${apiType} ${apiLink}`;

  if (isAuthenticated) {
    return (
      <>
        <p className="text-black text-mono tracking-widest m-2 p-2 bg-gray-100">
          {linkString}
        </p>
      </>
    );
  }

  return (
    <>
      <a
        href={defaultHref}
        className="text-blue-500 text-mono tracking-widest bg-gray-100 m-2 hover:text-blue-700 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkString}
      </a>
    </>
  );
};

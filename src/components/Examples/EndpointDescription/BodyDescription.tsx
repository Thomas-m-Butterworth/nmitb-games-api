import React from "react";

export interface EndpointDescriptionProps {
  bodyDescription: string;
}

export const BodyDescription = ({
  bodyDescription,
}: EndpointDescriptionProps) => {
  return (
    <>
      <p className="text-xs text-gray-500 m-1">Body Example:</p>
      <pre className="font-mono text-xs text-gray-800 bg-gray-100 p-4 rounded tracking-wider whitespace-pre-wrap">
        {bodyDescription}
      </pre>
    </>
  );
};

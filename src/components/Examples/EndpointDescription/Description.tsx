import React from "react";

export interface EndpointDescriptionProps {
  description: string;
}

export const Description = ({ description }: EndpointDescriptionProps) => {
  return (
    <>
      <p className="text-sm text-gray-600">{description}</p>
    </>
  );
};

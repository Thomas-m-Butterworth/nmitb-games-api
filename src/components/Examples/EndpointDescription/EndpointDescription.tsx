import React from "react";
import { BodyDescription } from "./BodyDescription";
import { Description } from "./Description";

export interface EndpointDescriptionProps {
  description: string;
  bodyDescription?: string;
}

export const EndpointDescription = ({
  description,
  bodyDescription,
}: EndpointDescriptionProps) => {
  return (
    <>
      <Description description={description} />
      {!!bodyDescription && (
        <BodyDescription bodyDescription={bodyDescription} />
      )}
    </>
  );
};

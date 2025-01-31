import React from "react";
import { EndpointTitleBar } from "../EndpointTitleBar";
import { EndpointDescription } from "../EndpointDescription";
import { EndpointLink } from "./EndpointLink";
import { EndpointInfoProps } from "./types";

export const EndpointInfo = ({ examples }: EndpointInfoProps) => {
  return (
    <>
      {examples.map((example) => {
        const {
          apiTitle,
          apiType,
          bodyDescription,
          description,
          isAuthenticated,
        } = example;
        const apiLink = example.argType
          ? `${example.link}/:${example.argType}`
          : example.link;
        const defaultHref = example.argType
          ? `${example.link}/bingo`
          : example.link;

        return (
          <div className="mb-4" key={apiTitle}>
            <EndpointTitleBar
              isAuthenticated={isAuthenticated}
              apiTitle={apiTitle}
            />
            <EndpointDescription
              description={description}
              bodyDescription={bodyDescription}
            />
            <EndpointLink
              defaultHref={defaultHref}
              apiLink={apiLink}
              apiType={apiType}
            />
          </div>
        );
      })}
    </>
  );
};

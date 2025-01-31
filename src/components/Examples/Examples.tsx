import React from "react";
import { apiExamples } from "./utils";
import { ExampleType } from "./types";
import { ConnectedIcon } from "../Connected";

export interface EnpointInfoProps {
  examples: ExampleType[];
}

export const AuthRequirement = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  return (
    <div className="flex items-center gap-2 w-28 justify-between">
      <ConnectedIcon isConnected={!isAuthenticated} />
      <p className="text-sm text-gray-800">
        {isAuthenticated ? "Need API Key" : "Free For All"}
      </p>
    </div>
  );
};

export const EndpointInfo = ({ examples }: EnpointInfoProps) => {
  return (
    <>
      {examples.map((example) => {
        const apiLink = example.argType
          ? `${example.link}/:${example.argType}`
          : example.link;
        const defaultHref = example.argType
          ? `${example.link}/bingo`
          : example.link;

        return (
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800 m-0">
                {example.apiTitle}
              </h3>
              <AuthRequirement isAuthenticated={example.isAuthenticated} />
            </div>

            <p className="text-sm text-gray-600">{example.description}</p>
            <a
              href={defaultHref}
              className="text-blue-500 text-mono tracking-widest bg-gray-100 hover:text-blue-700 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {`${example.apiType} ${apiLink}`}
            </a>
          </div>
        );
      })}
    </>
  );
};

export const Examples = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        {apiExamples.title}
      </h2>
      <p className="text-sm text-gray-600 mb-3">
        <span className="text-xs text-gray-500">Accepted Games: </span>
        <span className="font-mono bg-gray-100 p-1 rounded tracking-wider">
          {apiExamples.typeDescription}
        </span>
      </p>
      <EndpointInfo examples={apiExamples.examples} />
    </div>
  );
};

import React from "react";
import { apiExamples } from "../utils";

export const GamesTypesExamples = () => {
  return (
    <>
      <p className="text-sm text-gray-600 mb-3">
        <span className="text-xs text-gray-500">Accepted Games: </span>
        <span className="font-mono bg-gray-100 p-1 rounded tracking-wider">
          {apiExamples.typeDescription}
        </span>
      </p>
    </>
  );
};

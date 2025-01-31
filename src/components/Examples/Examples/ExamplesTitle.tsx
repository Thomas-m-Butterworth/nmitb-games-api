import React from "react";
import { apiExamples } from "../utils";

export const ExamplesTitle = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        {apiExamples.title}
      </h2>
    </>
  );
};

import React from "react";
import { apiExamples } from "../utils";
import { ExamplesTitle } from "./ExamplesTitle";
import { GamesTypesExamples } from "./GamesTypesExamples";
import { EndpointInfo } from "./EndpointInfo";
import { ExamplesComponent } from "./ExamplesComponent";

export const Examples = () => {
  return (
    <ExamplesComponent>
      <ExamplesTitle />
      <GamesTypesExamples />
      <EndpointInfo examples={apiExamples.examples} />
    </ExamplesComponent>
  );
};

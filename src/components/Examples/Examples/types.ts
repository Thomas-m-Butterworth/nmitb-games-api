import { ExampleType } from "../types";

export interface EndpointInfoProps {
  examples: ExampleType[];
}

export interface EndpointLinkProps {
  defaultHref: string;
  apiType: string;
  apiLink: string;
}

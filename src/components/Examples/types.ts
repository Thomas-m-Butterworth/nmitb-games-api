export interface ExampleType {
  apiTitle: string;
  apiType: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  description: string;
  argType?: "game";
  bodyDescription?: string;
  isAuthenticated: boolean;
  link: string;
}
export interface APIExamplesType {
  title: string;
  typeDescription: string;
  examples: ExampleType[];
}

import { APIExamplesType } from "./types";

export const apiExamples: APIExamplesType = {
  title: "API Examples",
  typeDescription:
    "anagrams, bantz182, bingo, celebsHeight, daylist, emopinions, nameThatTune, skankovich, superNintemo, whatsappAge, wrestlemania",
  examples: [
    {
      apiTitle: "GET games",
      apiType: "GET",
      description: "Retrieve all games collections from the database.",
      link: "/api/games",
      isAuthenticated: false,
    },
    {
      apiTitle: "GET game",
      apiType: "GET",
      description: "Retrieve a specificed game collection.",
      argType: "game",
      link: "/api/games",
      isAuthenticated: false,
    },
    {
      apiTitle: "POST game",
      apiType: "POST",
      description: "Add a game answer to a game collection",
      argType: "game",
      bodyDescription: `{
    "night": ["sfc", "swamp"],
    "quote": "Bodily fluids"
}`,
      isAuthenticated: true,
      link: "/api/games",
    },
    {
      apiTitle: "DELETE game",
      apiType: "DELETE",
      description: "Remove a game from a game collection by ID",
      argType: "game",
      bodyDescription: `{
    "collectionName": "bingo",
    "id": "835y649365782015875r6205"
}`,
      isAuthenticated: true,
      link: "/api/games",
    },
  ],
};

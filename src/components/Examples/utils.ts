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
      bodyDescription: `{ "id": "big-long-id" }`,
      isAuthenticated: true,
      link: "/api/games",
    },
    {
      apiTitle: "PUT game",
      apiType: "PUT",
      description: "Replace a game from a game collection",
      argType: "game",
      bodyDescription: `{
  "id": "big-long-id",
  "data": {
    "night": ["scratch", "sfc"],
    "quote": "Balthazar Dark's joke doesn't land - he looks sad"
  }
}`,
      isAuthenticated: true,
      link: "/api/games",
    },
    {
      apiTitle: "PATCH game",
      apiType: "PATCH",
      description: "Replace a game from a game collection",
      argType: "game",
      bodyDescription: `{
  "id": "big-long-id",
  "data": {
    "night": ["scratch", "sfc", "swamp", "matesfest"],
  }
}`,
      isAuthenticated: true,
      link: "/api/games",
    },
  ],
};

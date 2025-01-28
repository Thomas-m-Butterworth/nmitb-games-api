import { Schema, model, models } from "mongoose";
import {
  RealOrNotSchema,
  BingoSchema,
  WhatsappAgeSchema,
  CelebsHeightSchema,
  NameTuneSchema,
  MultipleChoiceSchema,
} from "./schemas";

const GamesSchema = new Schema({
  games: {
    skankovich: { type: [RealOrNotSchema], required: true },
    superNintemo: { type: [RealOrNotSchema], required: true },
    celebsHeight: { type: [CelebsHeightSchema], required: true },
    whatsappAge: { type: [WhatsappAgeSchema], required: true },
    nameThatTune: { type: [NameTuneSchema], required: true },
    emopinions: { type: [MultipleChoiceSchema], required: true },
    bantz182: { type: [MultipleChoiceSchema], required: true },
    wrestlemania: { type: [RealOrNotSchema], required: true },
    daylist: { type: [RealOrNotSchema], required: true },
    bingo: { type: [BingoSchema], required: true },
  },
});

const Games = models.Games || model("Games", GamesSchema);

export default Games;

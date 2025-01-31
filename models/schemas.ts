import mongoose, { Schema } from "mongoose";

export const RealOrNotSchema = new Schema({
  name: { type: String, required: true },
  real: { type: Boolean, required: true },
  band: { type: String },
});

export const BingoSchema = new Schema({
  night: {
    type: [String],
    enum: ["scratch", "sfc", "matesfest", "swamp", "danpowell"],
    required: true,
  },
  quote: { type: String, required: true },
});

export const WhatsappAgeSchema = new Schema({
  quote: { type: String, required: true },
  sender: { type: String },
  band: { type: String },
  song: { type: String },
  emo: { type: Boolean, required: true },
});

export const CelebsHeightSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  meters: { type: Number, required: true },
  inches: { type: Number, required: true },
  image: { type: String },
});

export const NameTuneSchema = new Schema({
  song: { type: String, required: true },
  artist: { type: String, required: true },
  length: { type: String, required: true },
  sound: { type: String, required: true },
});

export const MultipleChoiceSchema = new Schema({
  asker: { type: String, enum: ["thom", "andrew"] },
  question: { type: String, required: true },
  answers: {
    a: { type: String, required: true },
    b: { type: String, required: true },
    c: { type: String, required: true },
    d: { type: String },
  },
  correct: { type: String, enum: ["a", "b", "c", "d"], required: true },
});

export const AnagramSchema = new Schema({
  anagram: { type: String, required: true },
});

export const schemaMap: Record<string, mongoose.Schema> = {
  skankovich: RealOrNotSchema,
  superNintemo: RealOrNotSchema,
  celebsHeight: CelebsHeightSchema,
  whatsappAge: WhatsappAgeSchema,
  nameThatTune: NameTuneSchema,
  emopinions: MultipleChoiceSchema,
  bantz182: MultipleChoiceSchema,
  wrestlemania: RealOrNotSchema,
  daylist: RealOrNotSchema,
  bingo: BingoSchema,
  anagrams: AnagramSchema,
};

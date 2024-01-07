import { Schema, model, models } from "mongoose";

const dataSchema = new Schema(
  {
    name: { type: String },

    inscriptionId: { type: String },
    image: { type: String },
    values: { type: Object },
    total: { type: String },
    rank: { type: String },
  },
  { timestamps: true }
);

export const Data = models.Data || model("Data", dataSchema);


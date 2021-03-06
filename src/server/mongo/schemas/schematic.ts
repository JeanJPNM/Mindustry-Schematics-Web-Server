import type { ItemCost } from 'mindustry-schematic-parser';
import type mongodb from 'mongodb';
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true, default: [] },

  image: { Data: Buffer, ContentType: String },
  requirements: { type: Object, required: true },
  powerProduction: { type: Number, required: true },
  powerConsumption: { type: Number, required: true },

  text: { type: String, required: true },

  views: { type: Number, required: true, default: 0 },

  encoding_version: { type: String, required: true },
});
export interface SchematicDocument extends mongoose.Document {
  creator: string;
  description: string;
  // eslint-disable-next-line camelcase
  encoding_version: string;
  image: { Data: mongodb.Binary; ContentType: string };
  name: string;
  powerConsumption: number;
  powerProduction: number;
  requirements: ItemCost;
  tags: string[];
  text: string;
  views: number;
}

export const SchematicSchema: mongoose.Model<SchematicDocument> =
  mongoose.models.Schematics || mongoose.model('Schematics', schema);

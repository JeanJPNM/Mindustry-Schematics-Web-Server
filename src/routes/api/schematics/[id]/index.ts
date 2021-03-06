import { SchematicDocument, SchematicSchema } from '@/server/mongo';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (req) => {
  let schematic: SchematicDocument | null;
  if (req.query.get('increment')) {
    schematic = await SchematicSchema.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { views: 1 },
      },
      {
        projection: '-image',
      },
    );
  } else {
    schematic = await SchematicSchema.findOne({ _id: req.params.id }, '-image');
  }
  if (!schematic)
    return {
      status: 404,
    };
  return {
    status: 200,
    body: schematic,
  };
};

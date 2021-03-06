import type { Context } from '@/interfaces/app';
import { UserAccess } from '@/lib/auth/access';
import {
  SchematicChangeSchema,
  SchematicDocument,
  SchematicSchema,
} from '@/server/mongo';
import webhooks from '@/server/webhooks';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler<Context> = async (req) => {
  const access = UserAccess.from(req.context.access);
  if (!access.can({ schematics: { delete: 'all', update: 'all' } }))
    return {
      status: 403,
      body: 'Forbidden',
    };
  const change = await SchematicChangeSchema.findOne({ _id: req.params.id });
  if (!change)
    return {
      status: 404,
      body: 'Change not found',
    };
  if (change.Delete != undefined) {
    const schematic = (await SchematicSchema.findOneAndDelete({
      _id: change.id,
    })) as SchematicDocument;
    await SchematicChangeSchema.deleteMany({
      id: change.id,
    });
    webhooks.deleteSchematic({
      triggeredAt: new Date().getTime(),
      reason: change.Description || '',
      schematicId: schematic._id,
      schematicName: schematic.name,
    });
  } else {
    const schematic = (await SchematicSchema.findOneAndUpdate(
      {
        _id: change.id,
      },
      change.Changed,
    )) as SchematicDocument;
    await SchematicChangeSchema.deleteOne({
      _id: change._id,
    });
    webhooks.editSchematic({
      changes: change.Description || '',
      schematicId: schematic._id,
      schematicName: schematic.name,
      triggeredAt: new Date().getTime(),
    });
  }
  return {
    status: 200,
    headers: {
      location: '/admin/schematic_changes',
    },
    body: 'Success',
  };
};

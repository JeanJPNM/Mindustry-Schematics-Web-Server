import type { SchematicParseErrorJSON, SchematicParseJSON } from '@/interfaces/json';
import { parseForm } from '@/server/parse_body';
import type { RequestHandler } from '@sveltejs/kit';
import { Schematic } from 'mindustry-schematic-parser';

class SchematicSizeError extends Error {}
type RequestBody = { text: string };
export const post: RequestHandler = async (req) => {
  const { text } = parseForm<RequestBody>(req.body);
  if (!text || text === '') {
    return {
      status: 400,
      body: {
        error: "This isn't a valid schematic",
      },
    };
  }
  try {
    const decoded = decodeURIComponent(text);
    const schematic = Schematic.decode(decoded);
    const maxSize = 90;
    if (schematic.width > maxSize || schematic.height > maxSize) {
      const { height, width } = schematic;
      throw new SchematicSizeError(
        `The schematic size (${width}x${height}) is bigger than the allowed size (${maxSize}x${maxSize})`,
      );
    }
    const body: SchematicParseJSON = {
      name: schematic.name,
      description: schematic.description,
      image: (await schematic.toImageBuffer()).toString('base64'),
    };
    return {
      status: 200,
      body,
    };
  } catch (error) {
    let status = 500;
    let message: string | undefined;
    if (error instanceof Error) {
      if (error.message.includes('valid')) status = 400;
      else if (error instanceof SchematicSizeError) {
        status = 400;
      }
      ({ message } = error);
    } else if (typeof error === 'string') {
      if (error.includes('valid')) status = 400;
    }
    const body: SchematicParseErrorJSON = {
      error: { message },
    };
    return {
      status,
      body,
    };
  }
};

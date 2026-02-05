import { z } from 'zod';
import { insertMessageSchema, messages, portfolioItems } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  contact: {
    create: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertMessageSchema,
      responses: {
        201: z.custom<typeof messages.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  portfolio: {
    list: {
      method: 'GET' as const,
      path: '/api/portfolio',
      responses: {
        200: z.array(z.custom<typeof portfolioItems.$inferSelect>()),
      },
    },
  },
  instagram: {
    list: {
      method: 'GET' as const,
      path: '/api/instagram',
      responses: {
        200: z.array(z.object({
          id: z.string(),
          media_url: z.string(),
          permalink: z.string(),
          caption: z.string().optional(),
          media_type: z.string(),
          thumbnail_url: z.string().optional(),
        })),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

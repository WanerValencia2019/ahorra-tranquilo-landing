import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // Soporta tanto .md como .mdx
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Waner Valencia'),
    category: z.enum([
      'Educación Financiera',
      'Presupuestos',
      'Ahorro',
      'Inversión',
      'Deudas',
      'Herramientas',
      'Tips',
    ]),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    readTime: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};

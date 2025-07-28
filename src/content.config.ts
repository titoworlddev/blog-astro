import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  // This schema works for posts in any subfolder structure (2024/, 2025/, etc.)
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      image: image().optional(),
      category: z.string()
    })
});

export const collections = {
  blog
};

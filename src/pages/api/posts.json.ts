import type { APIRoute } from 'astro';
import { getAllPosts } from '../../utils/posts';

export const GET: APIRoute = async () => {
  try {
    const posts = await getAllPosts();
    
    // Return posts data for client-side search
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching posts for API:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

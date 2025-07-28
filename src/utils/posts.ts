import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/**
 * Get all blog posts from all year folders, sorted by date (newest first)
 */
export async function getAllPosts(): Promise<CollectionEntry<'blog'>[]> {
  const allPosts = await getCollection('blog');
  
  // Sort by publication date (newest first)
  return allPosts.sort((a, b) => {
    return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
  });
}

/**
 * Get posts filtered by category from all year folders, sorted by date (newest first)
 */
export async function getPostsByCategory(category: string): Promise<CollectionEntry<'blog'>[]> {
  const allPosts = await getAllPosts();
  
  // Filter posts by category with robust comparison
  return allPosts.filter(post => {
    if (!post.data.category) return false;
    
    const postCategory = String(post.data.category).trim().toLowerCase();
    const targetCategory = String(category).trim().toLowerCase();
    
    // Also try without quotes in case they're included
    const cleanPostCategory = postCategory.replace(/['"`]/g, '');
    const cleanTargetCategory = targetCategory.replace(/['"`]/g, '');
    
    return cleanPostCategory === cleanTargetCategory;
  });
}

/**
 * Get the year from a post's ID (useful for organizing by year)
 */
export function getPostYear(post: CollectionEntry<'blog'>): string {
  // If the post is in a year folder like "2024/post-name", extract the year
  const pathParts = post.id.split('/');
  if (pathParts.length > 1 && /^\d{4}$/.test(pathParts[0])) {
    return pathParts[0];
  }
  // If not in a year folder, use the publication date year
  return post.data.pubDate.getFullYear().toString();
}

/**
 * Group posts by year for display purposes
 */
export async function getPostsByYear(): Promise<Record<string, CollectionEntry<'blog'>[]>> {
  const allPosts = await getAllPosts();
  const postsByYear: Record<string, CollectionEntry<'blog'>[]> = {};
  
  allPosts.forEach(post => {
    const year = getPostYear(post);
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });
  
  return postsByYear;
}

// src/sanityClient.js
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2025-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // use edge cache for faster reads
});

// Helper for building image URLs from Sanity image fields
const builder = createImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

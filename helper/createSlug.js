export const createSlug = (title) => {
  // Convert to lowercase and replace spaces with hyphens
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  // Remove special characters except hyphens
  const cleanSlug = slug.replace(/[^a-z0-9-]/g, "");

  // Remove consecutive hyphens
  const finalSlug = cleanSlug.replace(/-+/g, "-");

  return finalSlug;
};

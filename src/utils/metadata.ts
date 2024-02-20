import matter from 'gray-matter';

export const fetchMetadataJSON = async <T = any>(url: string) => {
  const response = await fetch(`${url}/metadata.json`);
  const data = (await response.json()) as T;
  return data;
};

export const fetchMetadataMarkdown = async <T = Record<string, any>>(
  url: string
) => {
  const response = await fetch(`${url}/INFO.md`);
  const data = await response.text();
  const { data: frontmatterObj } = matter(data);

  return frontmatterObj as T;
};

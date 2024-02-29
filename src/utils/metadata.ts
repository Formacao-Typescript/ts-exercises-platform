/* 
  Dev note: parsing frontmatter locally, so we don't have to inject node global polyfills on the client, since 'gray-matter' module uses Buffer.
  In case we decide to do it in the future: https://github.com/jonschlinkert/gray-matter/issues/143.
  Reason for not doing it now: it'd unnecessarily increase the bundle size just for parsing a text.
  */
export const extractFrontmatter = (
  markdownContent: string
): Record<string, any> => {
  const frontmatter: Record<string, any> = {};
  const separatorIndex = markdownContent.indexOf('---', 4); // Find the second '---'

  if (separatorIndex !== -1) {
    const frontmatterString = markdownContent.slice(4, separatorIndex).trim();
    const frontmatterLines = frontmatterString.split('\n');

    frontmatterLines.forEach(line => {
      const [key, value] = line.split(':').map(item => item.trim());
      frontmatter[key] = value;
    });
  }

  return frontmatter;
};

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

  const frontmatterObj = extractFrontmatter(data);

  return frontmatterObj as T;
};

export const removeFrontmatter = (markdownContent: string): string => {
  const frontmatterRegex = /^---\s*[\s\S]*?\n---\s*\n*/;
  const textWithoutFrontmatter = markdownContent.replace(frontmatterRegex, '');
  return textWithoutFrontmatter;
};

interface ImageSize {
  source_url: string;
  width: number;
  height: number;
  mime_type: string;
}

interface WordPressMedia {
  id: number;
  media_type: string;
  mime_type: string;
  source_url: string;
  media_details: {
    width: number;
    height: number;
    sizes?: {
      [key: string]: ImageSize;
    };
  };
}

interface UseImageResult {
  full: string;
  fullWebp?: string;
  thumbnail?: string;
  thumbnailWebp?: string;
  medium?: string;
  mediumWebp?: string;
  large?: string;
  largeWebp?: string;
  [size: string]: string | undefined;
}

const toWebpExpressUrl = (url: string): string => {
  if (!url) return "";
  return (
    url.replace(
      "/wp-content/uploads/",
      "/wp-content/webp-express/webp-images/uploads/"
    ) + ".webp"
  );
};

export const useImage = async (
  mediaId: number
): Promise<UseImageResult | null> => {

  const { data, error } = await useFetch<WordPressMedia>(
    `/wp-json/wp/v2/media/${mediaId}`,
    { baseURL: <YOUR_WP_BASE_URL> }
  );

  if (error.value) {
    console.error(
      `Fehler beim Laden des Bildes mit ID ${mediaId}:`,
      error.value
    );
    return null;
  }

  const media = data.value;
  if (!media || media.media_type !== "image") {
    console.warn(`Media ID ${mediaId} ist kein Bild.`);
    return null;
  }

  const sizes = media.media_details.sizes || {};

  const full = media.source_url;
  const fullWebp = toWebpExpressUrl(full);

  const result: UseImageResult = {
    full,
    fullWebp,
  };

  for (const [key, size] of Object.entries(sizes)) {
    result[key] = size.source_url;
    result[`${key}Webp`] = toWebpExpressUrl(size.source_url);
  }

  return result;
};

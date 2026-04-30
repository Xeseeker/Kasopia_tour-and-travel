import { useEffect } from 'react';

const SITE_NAME = 'Kasopia Tour & Travel';
const SITE_URL = 'https://kasopiatour.com';
const DEFAULT_DESCRIPTION =
  'Kasopia Tour & Travel creates cultural, adventure, and tailor-made journeys across Ethiopia, from Lalibela and Simien to Danakil and Axum.';

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = [],
  path = '/',
  image,
  type = 'website',
  noIndex = false,
}) {
  useEffect(() => {
    const canonicalUrl = new URL(path, SITE_URL).toString();
    const resolvedTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const keywordContent = Array.isArray(keywords) ? keywords.join(', ') : keywords;

    document.title = resolvedTitle;

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: description,
    });

    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: noIndex ? 'noindex, nofollow' : 'index, follow',
    });

    if (keywordContent) {
      upsertMeta('meta[name="keywords"]', {
        name: 'keywords',
        content: keywordContent,
      });
    }

    upsertMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: type,
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: SITE_NAME,
    });
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: resolvedTitle,
    });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: canonicalUrl,
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: image ? 'summary_large_image' : 'summary',
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: resolvedTitle,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });

    if (image) {
      upsertMeta('meta[property="og:image"]', {
        property: 'og:image',
        content: image,
      });
      upsertMeta('meta[name="twitter:image"]', {
        name: 'twitter:image',
        content: image,
      });
    }

    upsertLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: canonicalUrl,
    });
  }, [description, image, keywords, noIndex, path, title, type]);

  return null;
}

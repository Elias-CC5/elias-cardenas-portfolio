import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  /** Ruta a una imagen en /public para las tarjetas sociales. */
  image?: string;
}

function upsertMeta(key: string, content: string, asProperty = false) {
  const attr = asProperty ? 'property' : 'name';
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement('link');
    tag.rel = 'canonical';
    document.head.appendChild(tag);
  }
  tag.href = href;
}

/**
 * Metadatos por página.
 *
 * El `<link rel="canonical">` estático del index.html apuntaba a
 * `eliascardenas.dev`, un dominio que no sirve este sitio. Un canonical
 * equivocado le dice a Google que la página real está en otro sitio, así
 * que se sustituyó por uno derivado de la URL efectiva: siempre correcto,
 * en local y en producción.
 */
export default function SEO({ title, description, image = '/images/elias-profile.jpg' }: SEOProps) {
  useEffect(() => {
    const url = window.location.origin + window.location.pathname;
    const absoluteImage = new URL(image, window.location.origin).toString();

    document.title = title;
    upsertCanonical(url);
    upsertMeta('description', description);

    upsertMeta('og:title', title, true);
    upsertMeta('og:description', description, true);
    upsertMeta('og:url', url, true);
    upsertMeta('og:image', absoluteImage, true);
    upsertMeta('og:type', 'website', true);

    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', title);
    upsertMeta('twitter:description', description);
    upsertMeta('twitter:image', absoluteImage);
  }, [title, description, image]);

  return null;
}

import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  type?: string;
  name?: string;
  image?: string;
}

export function SEO({ title, description, type = 'website', name = 'Star Wars Explorer', image }: SEOProps) {
  const siteUrl = window.location.origin;
  const currentUrl = window.location.href;
  const defaultImage = `${siteUrl}/og-image.jpg`; // We'll need to add this image

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{`${title} | ${name}`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content={name} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Additional SEO-friendly meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#000000" />
    </Helmet>
  );
} 
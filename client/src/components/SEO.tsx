import { Helmet } from "react-helmet-async";

const SITE_URL = "https://tahiradamu.vercel.app";
const DEFAULT_IMAGE =
  "https://raw.githubusercontent.com/t4hir9/tahir-photography-portfolio1/main/client/public/photos/1.jpg";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  structuredData?: Record<string, unknown>;
}

export function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  structuredData,
}: SEOProps) {
  const fullUrl = `${SITE_URL}${path}`;
  const fullTitle = title.includes("Tahir")
    ? title
    : `${title} | Tahir Adamu`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

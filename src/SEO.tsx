import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  url: string;
  image: string;
  lang?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  url,
  image,
  lang = "de-DE",
}) => {
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Made in Germany",
    url: "https://made-in-germany.global",
    logo: "https://made-in-germany.global/assets/logo.png",
    description:
      "Showcasing the finest German-made products and services, renowned for quality, craftsmanship, and innovation.",
    sameAs: [
      "https://twitter.com/MadeInGermanyGL",
      "https://www.facebook.com/MadeInGermanyGlobal",
      "https://www.linkedin.com/company/made-in-germany-global",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "DE",
      addressLocality: "Berlin",
      postalCode: "10115",
      streetAddress: "Example Str. 123",
    },
  };

  const hreflangLinks = [
    { href: "https://made-in-germany.world", lang: "en" },
    { href: "https://made-in-germany-first.com", lang: "de-DE" },
    { href: "https://made-in-germany.asia", lang: "en-SG" },
    { href: "https://made-in-germany.africa", lang: "en-ZA" },
    { href: "https://made-in-germany.lat", lang: "es-ES" },
    { href: "https://made-in-germany-arab.com", lang: "ar-SA" },
    { href: "https://made-in-germany-arabia.com", lang: "ar-SA" },
    { href: "https://made-in-germany.my", lang: "ms-MY" },
    { href: "https://made-in-germany.com.in", lang: "en-IN" },
    { href: "https://madeingermany.in", lang: "en-IN" },
    { href: "https://made-in-germany.china", lang: "zh-CN" },
    { href: "https://made-in-germany.global/de", lang: "de-DE" },
    { href: "https://made-in-germany.global/fr", lang: "fr-FR" },
    { href: "https://made-in-germany.global/es", lang: "es-ES" },
    { href: "https://made-in-germany.global/it", lang: "it-IT" },
    { href: "https://made-in-germany.global/nl", lang: "nl-NL" },
    { href: "https://made-in-germany.global/pl", lang: "pl-PL" },
    { href: "https://made-in-germany.global/se", lang: "sv-SE" },
    { href: "https://made-in-germany.global/ch", lang: "de-CH" },
    { href: "https://made-in-germany.global/at", lang: "de-AT" },
    { href: "https://made-in-germany.global/uk", lang: "en-GB" },
    { href: "https://made-in-germany.global/fi", lang: "fi-FI" },
    { href: "https://made-in-germany.global/ir", lang: "en-IE" },
    { href: "https://made-in-germany.global/us", lang: "en-US" },
    { href: "https://made-in-germany.global/ca", lang: "en-CA" },
    { href: "https://made-in-germany.global/mx", lang: "es-MX" },
    { href: "https://made-in-germany.global/br", lang: "pt-BR" },
    { href: "https://made-in-germany.global/ar", lang: "es-AR" },
    { href: "https://made-in-germany.global/co", lang: "es-CO" },
    { href: "https://made-in-germany.global/cn", lang: "zh-CN" },
    { href: "https://made-in-germany.global/in", lang: "en-IN" },
    { href: "https://made-in-germany.global/jp", lang: "ja-JP" },
    { href: "https://made-in-germany.global/kr", lang: "ko-KR" },
    { href: "https://made-in-germany.global/id", lang: "id-ID" },
    { href: "https://made-in-germany.global/th", lang: "th-TH" },
    { href: "https://made-in-germany.global/vn", lang: "vi-VN" },
    { href: "https://made-in-germany.global/ph", lang: "en-PH" },
    { href: "https://made-in-germany.global/sg", lang: "en-SG" },
    { href: "https://made-in-germany.global/ae", lang: "ar-AE" },
    { href: "https://made-in-germany.global/sa", lang: "ar-SA" },
    { href: "https://made-in-germany.global/eg", lang: "ar-EG" },
    { href: "https://made-in-germany.global/qa", lang: "ar-QA" },
    { href: "https://made-in-germany.global/kw", lang: "ar-KW" },
    { href: "https://made-in-germany.global/om", lang: "ar-OM" },
    { href: "https://made-in-germany.global/za", lang: "en-ZA" },
    { href: "https://made-in-germany.global/ng", lang: "en-NG" },
    { href: "https://made-in-germany.global/ma", lang: "ar-MA" },
    { href: "https://made-in-germany.global/ke", lang: "en-KE" },
    { href: "https://made-in-germany.global/gh", lang: "en-GH" },
    { href: "https://made-in-germany.global/ci", lang: "fr-CI" },
    { href: "https://made-in-germany.global", lang: "en" }, // x-default
  ];

  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="author" content="Made in Germany Global" />
      <meta httpEquiv="content-language" content={lang} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Made in Germany" />
      <meta property="og:locale" content={lang} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@MadeInGermanyGL" />
      <meta name="twitter:creator" content="@MadeInGermanyGL" />
      <link rel="canonical" href={url} />
      {hreflangLinks.map((link, index) => (
        <link
          key={index}
          rel="alternate"
          href={link.href}
          hrefLang={link.lang}
        />
      ))}
      <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>
      <link
        rel="icon"
        type="image/png"
        href="https://made-in-germany.global/favicon.ico"
      />
      <link
        rel="apple-touch-icon"
        href="https://made-in-germany.global/apple-touch-icon.png"
      />
      <link
        rel="manifest"
        href="https://made-in-germany.global/site.webmanifest"
      />
      <meta name="theme-color" content="#000000" />
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
};

export const HomePageSEO = () => (
  <SEO
    title="Made in Germany - Premium German Products & Services"
    description="Discover the excellence of German craftsmanship at Made in Germany. Explore high-quality products and services crafted with precision and innovation."
    keywords="German products, made in Germany, German craftsmanship, quality goods, German services, premium manufacturing, Germany export"
    url="https://made-in-germany.global"
    image="https://made-in-germany.global/assets/og-image.jpg"
    lang="de-DE"
  />
);

export const ProductPageSEO = () => (
  <SEO
    title="German-Made Precision Tools - Made in Germany"
    description="Shop our range of precision tools, crafted in Germany with unmatched quality and durability. Perfect for professionals and enthusiasts alike."
    keywords="German tools, precision tools, German manufacturing, high-quality tools, made in Germany tools"
    url="https://made-in-germany.global/products/precision-tools"
    image="https://made-in-germany.global/assets/precision-tools-og.jpg"
    lang="de-DE"
  />
);

export default SEO;